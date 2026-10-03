import {
  LoadingManager,
  TextureLoader,
  EquirectangularReflectionMapping,
  LinearFilter,
  LinearMipmapLinearFilter,
  SRGBColorSpace,
  VideoTexture,
  RepeatWrapping,
  PlaneGeometry,
  MeshPhongMaterial,
  MeshStandardMaterial,
  MeshPhysicalMaterial,
  AdditiveBlending,
  DoubleSide,
} from 'three';

import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

import { writeAsset } from '../ui/terminal.ts';
import { hashFloat } from '../hash.ts';
import type { Seed } from '../hash.ts';
import type { BufferGeometry, Group, Material, Mesh, Texture } from 'three';
import type { Environment } from '../Game.ts';
import { CELL_SIZE } from '../generation/world.ts';
import { MODELS, TEXTURES } from '../assets/manifest.ts';
import { useInstanceArt } from '../rendering/adArt.ts';
import { beamMaterial, hologramMaterial, useHologramShading } from '../rendering/hologram.ts';
import type { ModelEntry, TextureEntry } from '../assets/manifest.ts';

// the geometry of an OBJ file's first mesh
const firstGeometry = (obj: Group): BufferGeometry => (obj.children[0] as Mesh).geometry;

// Loads every texture and model and creates the materials, keyed by name.
class AssetManager {
  path = '';
  environment: Environment;
  onLoad: () => void;

  textureAnisotropy = 8;
  buildingWindowsEmissiveIntensity: number;
  adsEmissiveIntensity = 0.1; // rooftop holograms
  signsEmissiveIntensity = 0.3; // wall signs (dark-background art, emission only)
  time = { value: 0 }; // world time in seconds, the animated materials' clock (Game advances it)
  videos: HTMLVideoElement[] = []; // video textures; they play once the world starts (playVideos)

  textures: Record<string, Texture> = {};
  models: Record<string, BufferGeometry> = {};
  materials: Record<string, Material> = {};

  loadingManager!: LoadingManager;
  textureLoader!: TextureLoader;
  objLoader!: OBJLoader;

  // onLoad: called when everything has loaded
  constructor({ environment, onLoad }: { environment: Environment; onLoad: () => void }) {
    this.environment = environment;
    this.onLoad = onLoad;
    this.buildingWindowsEmissiveIntensity = environment.windowLights ? 1.5 : 0;
  }

  setPath(path: string): void {
    this.path = path;
  }

  load(): void {
    console.log('AssetManager: Loading assets');

    /*----- loaders -----*/

    this.loadingManager = new LoadingManager();
    this.loadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
      writeAsset(url, itemsLoaded, itemsTotal);
    };
    this.loadingManager.onLoad = () => {
      console.log('AssetManager: Assets loaded');
      this.onLoad();
    };
    this.loadingManager.onError = (url) => {
      console.error('AssetManager: Failed to load ' + url);
    };

    this.textureLoader = new TextureLoader(this.loadingManager);
    this.objLoader = new OBJLoader(this.loadingManager);

    for (const entry of TEXTURES) this.loadTexture(entry);
    for (const entry of MODELS) this.loadModel(entry);

    // generated geometry
    this.models['ground'] = new PlaneGeometry(CELL_SIZE, CELL_SIZE);
    this.models['smoke'] = new PlaneGeometry(64, 64);
    // unit quads for wall signs, one per atlas (see SIGN_MODELS)
    this.models['sign_neon'] = new PlaneGeometry(1, 1);
    this.models['sign_posters'] = new PlaneGeometry(1, 1);
    this.models['sign_screens'] = new PlaneGeometry(1, 1);
    this.models['sign_videos'] = new PlaneGeometry(1, 1);

    this.createMaterials();
  }

  loadTexture({ key, file, srgb, equirect, tiled, repeat, anisotropic, video }: TextureEntry): void {
    const texture = (this.textures[key] = video
      ? this.loadVideo(file, video)
      : this.textureLoader.load(this.path + file));
    if (srgb) texture.colorSpace = SRGBColorSpace;
    if (equirect) {
      texture.mapping = EquirectangularReflectionMapping;
      texture.magFilter = LinearFilter;
    }
    if (tiled || repeat) {
      texture.wrapS = RepeatWrapping;
      texture.wrapT = RepeatWrapping;
    }
    if (tiled || anisotropic) texture.anisotropy = this.textureAnisotropy;
    if (repeat) texture.repeat.set(repeat, repeat);
  }

  // A muted, looping video texture. It counts as loaded once its first frame
  // is ready, and holds that frame until playVideos().
  loadVideo(file: string, fallback: string): VideoTexture {
    const video = document.createElement('video');
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = 'auto';
    video.crossOrigin = 'anonymous';
    for (const src of [file, fallback]) {
      const source = document.createElement('source');
      source.src = this.path + src;
      source.type = src.endsWith('.webm') ? 'video/webm' : 'video/mp4';
      video.appendChild(source);
    }
    const texture = new VideoTexture(video);
    // mipmaps, so distant screens don't shimmer (regenerated with every frame)
    texture.generateMipmaps = true;
    texture.minFilter = LinearMipmapLinearFilter;
    const url = this.path + file;
    this.loadingManager.itemStart(url);
    video.addEventListener(
      'loadeddata',
      () => {
        texture.needsUpdate = true; // the first frame, also while paused
        this.loadingManager.itemEnd(url);
      },
      { once: true },
    );
    video.addEventListener(
      'error',
      () => {
        this.loadingManager.itemError(url);
        this.loadingManager.itemEnd(url);
      },
      { once: true, capture: true }, // errors fire on the <source> elements
    );
    video.load();
    this.videos.push(video);
    return texture;
  }

  // Starts the video ads (muted, so browsers allow it without a user gesture).
  playVideos(): void {
    for (const video of this.videos) video.play().catch(() => {});
  }

  loadModel({ key, file, collides, rotateY }: ModelEntry): void {
    this.objLoader.load(this.path + file, (obj) => {
      const geometry = (this.models[key] = firstGeometry(obj));
      if (rotateY) geometry.rotateY(rotateY);
      if (collides) geometry.computeBoundsTree();
    });
  }

  // Materials are created in a fixed order: material ids break ties in
  // three.js render sorting, so reordering them can change the image.
  createMaterials(): void {
    this.materials['ground'] = new MeshPhongMaterial({
      map: this.getTexture('ground'),
      emissive: 0x0090ff,
      emissiveMap: this.getTexture('ground_em'),
      emissiveIntensity: this.environment.name == 'night' ? 0.2 : 0,
      shininess: 0,
    });

    this.materials['spinner_interior'] = new MeshStandardMaterial({
      map: this.getTexture('spinner_interior'),
      normalMap: this.getTexture('spinner_interior_norm'),
      aoMap: this.getTexture('spinner_interior_ao'),
      aoMapIntensity: 1,
      roughness: 0.6,
      metalness: 0,
      emissive: 0xffffff,
      emissiveMap: this.getTexture('spinner_interior_em'),
      emissiveIntensity: 0.1,
    });
    this.materials['spinner_exterior'] = new MeshPhongMaterial({
      map: this.getTexture('spinner_exterior'),
      shininess: 0,
    });

    this.materials['spinner_windows_advanced'] = new MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: false,
      opacity: 1,
      roughness: 0.5,
      roughnessMap: this.getTexture('spinner_windows_rough'),
      metalness: 0,
      reflectivity: 1, //0.5
      transmission: 1,
      transmissionMap: this.getTexture('spinner_windows_trans'),
      thickness: 0.01,
      normalMap: this.getTexture('spinner_windows_norm'),
    });

    this.materials['spinner_windows_simple'] = new MeshStandardMaterial({
      color: 0x808080,
      transparent: true,
      opacity: 0.1,
      envMap: this.getTexture('env_night_windshield'),
      roughness: 0,
      metalness: 1,
      normalMap: this.getTexture('spinner_windows_norm'),
      blending: AdditiveBlending,
    });

    this.materials['cars'] = new MeshPhongMaterial({
      map: this.getTexture('cars'),
      emissive: 0xffffff,
      emissiveMap: this.getTexture('cars_em'),
      emissiveIntensity: 1.0,
      side: DoubleSide,
    });

    this.materials['storefronts'] = new MeshPhongMaterial({
      map: this.getTexture('storefronts'),
      emissive: 0xffffff,
      emissiveMap: this.getTexture('storefronts_em'),
      emissiveIntensity: this.buildingWindowsEmissiveIntensity,
      shininess: 0,
    });

    // buildings
    for (let i = 0; i < 10; i++) {
      const id = this.padNumber(i + 1);
      this.materials['building_' + id] = new MeshPhongMaterial({
        map: this.getTexture('building_' + id),
        specular: 0xffffff,
        specularMap: this.getTexture('building_' + id + '_rough'),
        envMap: this.getTexture('env_night'),
        emissive: 0xffffff, // hue set per world seed in setBuildingHues
        emissiveMap: this.getTexture('building_' + id + '_em'),
        emissiveIntensity: this.buildingWindowsEmissiveIntensity,
        bumpMap: this.getTexture('building_' + id),
        bumpScale: 5,
      });
    }

    // mega building
    this.materials['mega_building_01'] = new MeshPhongMaterial({
      map: this.getTexture('mega_building_01'),
      specular: 0x777777,
      shininess: 1,
      emissive: 0xffffff,
      emissiveMap: this.getTexture('mega_building_01_em'),
      emissiveIntensity: this.buildingWindowsEmissiveIntensity,
      bumpMap: this.getTexture('mega_building_01'),
      bumpScale: 10,
    });

    // wall signs: one material per art atlas; each sign instance samples its
    // own art rectangle (src/rendering/adArt.ts). Emission only: a black diffuse colour keeps the
    // district lights from washing every panel in their colour.
    for (const key of ['ads_neon', 'ads_posters', 'ads_screens']) {
      const material = (this.materials[key] = new MeshPhongMaterial({
        color: 0x000000,
        specular: 0x000000,
        emissive: 0xffffff,
        emissiveMap: this.getTexture(key),
        emissiveIntensity: this.signsEmissiveIntensity,
        blending: AdditiveBlending,
        fog: false,
      }));
      useInstanceArt(material, this.time);
    }

    // ads large
    for (let i = 0; i < 5; i++) {
      const id = this.padNumber(i + 1);
      this.materials['ads_large_' + id] = new MeshPhongMaterial({
        // map: this.getTexture('ads_large_'+id),
        emissive: 0xffffff,
        emissiveMap: this.getTexture('ads_large_' + id),
        emissiveIntensity: this.adsEmissiveIntensity,
        blending: AdditiveBlending,
        fog: false,
        side: DoubleSide,
      });
    }

    // smoke
    for (let i = 0; i < 3; i++) {
      const id = this.padNumber(i + 1);
      this.materials['smoke_' + id] = new MeshPhongMaterial({
        alphaMap: this.getTexture('smoke_' + id),
        color: 0xffffff,
        shininess: 0,
        specular: 0x000000,
        blending: AdditiveBlending,
        depthWrite: false,
        transparent: false,
      });
    }

    // spotlights
    for (let i = 0; i < 4; i++) {
      const id = this.padNumber(i + 1);
      this.materials['spotlight_' + id] = new MeshPhongMaterial({
        alphaMap: this.getTexture('spotlight_' + id),
        color: 0xffffff,
        shininess: 0,
        specular: 0x000000,
        blending: AdditiveBlending,
        depthWrite: false,
        transparent: false,
      });
    }

    // rooftop toppers: the large ad materials with hologram shading
    for (let i = 0; i < 5; i++) {
      const id = this.padNumber(i + 1);
      const material = (this.materials['hologram_large_' + id] = this.materials['ads_large_' + id].clone());
      useHologramShading(material, this.time);
    }

    // hologram projections (src/rendering/hologram.ts), from the picture atlases
    for (const atlas of ['posters', 'screens']) {
      this.materials['hologram_' + atlas] = hologramMaterial(this.getTexture('ads_' + atlas), this.time);
    }
    this.materials.hologram_beam = beamMaterial(this.time);

    // video ads: like the other wall signs (created last, to keep material ids)
    const videos = (this.materials['ads_videos'] = new MeshPhongMaterial({
      color: 0x000000,
      specular: 0x000000,
      emissive: 0xffffff,
      emissiveMap: this.getTexture('ads_videos'),
      emissiveIntensity: this.signsEmissiveIntensity,
      blending: AdditiveBlending,
      fog: false,
    }));
    useInstanceArt(videos, this.time);
  }

  // Pale emissive window tint per building material, derived from the world
  // seed. Materials are created before the seed is final (it can still change
  // in the settings form), so this runs at launch.
  setBuildingHues(seed: Seed): void {
    for (let i = 0; i < 10; i++) {
      const id = this.padNumber(i + 1);
      const hue = hashFloat(seed, i, 'building-hue');
      (this.materials['building_' + id] as MeshPhongMaterial).emissive.setHSL(hue, 1, 0.95, SRGBColorSpace);
    }
  }

  getTexture(id: string): Texture {
    return this.textures[id];
  }

  getModel(id: string): BufferGeometry {
    return this.models[id];
  }

  getMaterial(id: string): Material {
    return this.materials[id];
  }

  // utils

  padNumber(num: number): string {
    const i = num.toString();
    return i.padStart(2, '0');
  }
}

export { AssetManager };
