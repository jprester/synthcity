import {
  LoadingManager,
  TextureLoader,
  EquirectangularReflectionMapping,
  LinearFilter,
  SRGBColorSpace,
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
  adsEmissiveIntensity = 0.1;

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

    this.createMaterials();
  }

  loadTexture({ key, file, srgb, equirect, tiled, repeat }: TextureEntry): void {
    const texture = (this.textures[key] = this.textureLoader.load(this.path + file));
    if (srgb) texture.colorSpace = SRGBColorSpace;
    if (equirect) {
      texture.mapping = EquirectangularReflectionMapping;
      texture.magFilter = LinearFilter;
    }
    if (tiled || repeat) {
      texture.wrapS = RepeatWrapping;
      texture.wrapT = RepeatWrapping;
    }
    if (tiled) texture.anisotropy = this.textureAnisotropy;
    if (repeat) texture.repeat.set(repeat, repeat);
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

    // ads small
    for (let i = 0; i < 5; i++) {
      const id = this.padNumber(i + 1);
      this.materials['ads_' + id] = new MeshPhongMaterial({
        // map: this.getTexture('ads_'+id),
        emissive: 0xffffff,
        emissiveMap: this.getTexture('ads_' + id),
        emissiveIntensity: this.adsEmissiveIntensity,
        blending: AdditiveBlending,
        fog: false,
        side: DoubleSide,
      });
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
