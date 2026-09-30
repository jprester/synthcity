import {
  Scene,
  WebGLRenderer,
  ACESFilmicToneMapping,
  SRGBColorSpace,
  PerspectiveCamera,
  BufferGeometry,
  Mesh,
  Vector2,
  Fog,
  DirectionalLight,
  AmbientLight,
  PointLight,
  Audio,
  AudioLoader,
  AudioListener,
} from 'three';

import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';

import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from './lib/three-r159/UnrealBloomPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { FXAAShader } from './lib/three-r159/FXAAShader.js';

import { AssetManager } from './classes/AssetManager.ts';

import { Player } from './classes/Player.ts';
import { PlayerCar } from './classes/PlayerCar.ts';
import { PlayerController } from './classes/PlayerController.ts';

import { Radio } from './classes/Radio.ts';

import { Generator } from './classes/Generator.ts';
import { GeneratorItem_CityBlock } from './classes/GeneratorItem_CityBlock.ts';
import { GeneratorItem_CityLight } from './classes/GeneratorItem_CityLight.ts';
import { GeneratorItem_Traffic } from './classes/GeneratorItem_Traffic.ts';

import { computeBoundsTree, disposeBoundsTree, acceleratedRaycast } from 'three-mesh-bvh';
import { Collider } from './classes/Collider.ts';
import { InstancePool } from './classes/InstancePool.ts';
import { frameScale } from './classes/frameRate.ts';

import { CITY_BLOCK_SIZE, ROAD_WIDTH, CELL_SIZE, createDistrictNoise } from './generation/world.ts';
import { userSettings } from './settings.ts';
import type { EnvironmentName, Mode, WindshieldShader } from './settings.ts';
import type { Seed } from './hash.ts';
import type { CityLight, WorldContext } from './classes/WorldContext.ts';
import { setColor, newLine, write, showCredits } from './ui/terminal.ts';
import { StatsOverlay } from './ui/stats.ts';
import { setCrashMessage } from './ui/hud.ts';

export interface Environment {
  name: EnvironmentName;
  sky: string; // texture key
  environmentMap: string;
  cityLights: boolean; // coloured district PointLights
  windowLights: boolean; // emissive building windows
  spotLights: boolean; // rooftop spotlights
  fog: { color: number; start: number; end: number };
  sun: { color: number; intensity: number; x: number; y: number; z: number };
  ambient: { color: number; intensity: number };
}

// resolved launch settings (userSettings with defaults), fixed at launch
export interface GameSettings {
  mode: Mode;
  worldSeed: Seed;
  music: boolean;
  soundFx: boolean;
  windshieldShader: WindshieldShader;
  renderScaling: number;
  stats: boolean;
}

export class Game {
  initialized = false;
  environment: Environment;
  devPanel: boolean;
  uiOnUnfocus: boolean;
  timeScale = 1; // world speed multiplier (dev panel; 0 pauses)

  blocker: HTMLElement;
  enterBtn: HTMLElement;
  canvas: HTMLCanvasElement;

  // fade in / volume
  canvasOpacity = 0;
  masterVolume = 0;
  userMasterVolume = 1;

  cityBlockSize = CITY_BLOCK_SIZE;
  roadWidth = ROAD_WIDTH;

  collider: Collider;
  assets!: AssetManager; // from load()

  // everything below exists after init()
  settings!: GameSettings;
  audioLoader!: AudioLoader;
  audioListener: AudioListener | null = null;
  audioInitialized = false;
  renderer!: WebGLRenderer;
  scene!: Scene;
  camera!: PerspectiveCamera; // for PointerLockControls; the player has its own
  controls!: PointerLockControls;
  playerController!: PlayerController;
  player!: PlayerCar | Player;
  radio: Radio | null = null;
  composer!: EffectComposer;
  fxaa!: ShaderPass;
  bloomPass!: UnrealBloomPass;
  sunLight!: DirectionalLight;
  ambientLight!: AmbientLight;
  cityLights: CityLight[] = [];
  instances!: InstancePool;
  generatorCityBlock!: Generator<WorldContext>;
  generatorCityLights: Generator<WorldContext> | null = null;
  generatorTraffic!: Generator<WorldContext>;
  stats: StatsOverlay | null = null;
  lastFrameTime: number | null = null; // rAF timestamp of the previous frame (ms)
  fadeTime = 0; // seconds since launch, for the fade-in

  constructor() {
    this.environment = this.getEnvironment(userSettings.environment == 'day' ? 'day' : 'night');

    // query params

    const urlParams = new URLSearchParams(window.location.search);

    // dev panel: on under `npm run dev`, ?gui=1 / ?gui=0 to force
    this.devPanel = urlParams.has('gui') ? urlParams.get('gui') == '1' : import.meta.env.DEV;

    // show the terminal again when the pointer is released (not while tweaking in the dev panel)
    this.uiOnUnfocus = !this.devPanel;
    if (urlParams.has('uiOnUnfocus')) this.uiOnUnfocus = urlParams.get('uiOnUnfocus') == '1';

    // elements

    this.blocker = document.getElementById('blocker')!;
    this.enterBtn = document.getElementById('enterBtn')!;
    this.canvas = document.getElementById('canvas') as HTMLCanvasElement;

    // launch button

    this.enterBtn.addEventListener('click', () => this.onEnterClick(), false);
    this.canvas.addEventListener('click', () => this.onCanvasClick(), false);

    // collision

    BufferGeometry.prototype.computeBoundsTree = computeBoundsTree;
    BufferGeometry.prototype.disposeBoundsTree = disposeBoundsTree;
    Mesh.prototype.raycast = acceleratedRaycast;

    this.collider = new Collider();
  }

  load(): void {
    this.assets = new AssetManager({ environment: this.environment, onLoad: () => this.onLoad() });
    this.assets.setPath('assets/');
    this.assets.load();
  }

  onLoad(): void {
    // ?skip=1: launch straight away; the first click on the canvas grabs the
    // pointer and starts audio (browsers require a user gesture for both)
    if (userSettings.skip) {
      this.launch();
      return;
    }

    // terminal
    setColor('c2');
    newLine();
    newLine();
    write('>> boot sequence complete', 0, 0, null);
    showCredits();

    // show launch button
    this.enterBtn.style.display = 'block';
  }

  init(): void {
    if (this.initialized) return;
    this.initialized = true;

    console.log('Game: Initializing');

    /*----- user settings -----*/

    this.settings = {
      mode: userSettings.mode ?? 'drive',
      worldSeed: userSettings.worldSeed ?? 9746,
      music: userSettings.music ?? true,
      soundFx: userSettings.soundFx ?? true,
      windshieldShader: userSettings.windshieldShader ?? 'simple',
      renderScaling: userSettings.renderScaling ?? 1.0,
      stats: userSettings.stats ?? false,
    };

    console.log('Game: World seed: ' + this.settings.worldSeed);

    /*----- setup -----*/

    // audio loader

    this.audioLoader = new AudioLoader();
    this.audioListener = null;
    this.audioInitialized = false;

    // renderer

    this.renderer = new WebGLRenderer({ canvas: this.canvas });
    this.renderer.setPixelRatio(window.devicePixelRatio * this.settings.renderScaling);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.toneMapping = ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.0;
    this.renderer.outputColorSpace = SRGBColorSpace;
    document.body.appendChild(this.renderer.domElement);

    // scene

    this.scene = new Scene();

    // camera (for pointer lock controls, player creates own camera)

    this.camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);

    // controls

    this.controls = new PointerLockControls(this.camera, document.body);
    this.playerController = new PlayerController();

    // create player

    if (this.settings.mode == 'drive') {
      this.player = new PlayerCar({
        scene: this.scene,
        assets: this.assets,
        collider: this.collider,
        windshieldShader: this.settings.windshieldShader,
        respawnX: -this.roadWidth / 2,
        onCrash: setCrashMessage,
        controller: this.playerController,
        x: -this.roadWidth / 2,
        z: 0,
      });
    } else {
      this.player = new Player({
        scene: this.scene,
        controller: this.playerController,
        x: 0,
        z: 0,
      });
    }

    // radio

    this.radio = null;

    /*----- post processing -----*/

    this.composer = new EffectComposer(this.renderer);

    // render pass
    this.composer.addPass(new RenderPass(this.scene, this.player.camera));

    // anti aliasing
    this.fxaa = new ShaderPass(FXAAShader);
    this.updateFxaaResolution();
    this.composer.addPass(this.fxaa);

    // bloom
    const bloomPass = (this.bloomPass = new UnrealBloomPass(
      new Vector2(window.innerWidth, window.innerHeight),
      0,
      0,
      0,
    ));
    if (this.environment.name == 'night') {
      bloomPass.threshold = 0.0;
      bloomPass.strength = 7.0;
      bloomPass.radius = 1.0;
    } else if (this.environment.name == 'day') {
      bloomPass.threshold = 0;
      bloomPass.strength = 0.35;
      bloomPass.radius = 1;
    }
    this.composer.addPass(bloomPass);

    /*----- environment -----*/

    // sky and fog

    this.scene.background = this.assets.getTexture(this.environment.sky);

    // this.scene.environment = this.assets.getTexture(this.environment.environmentMap);

    this.scene.fog = new Fog(
      this.environment.fog.color,
      this.environment.fog.start,
      this.environment.fog.end,
    );

    // lights

    const light_sun = (this.sunLight = new DirectionalLight(
      this.environment.sun.color,
      this.environment.sun.intensity,
    ));
    light_sun.castShadow = false;
    light_sun.position.x = this.environment.sun.x;
    light_sun.position.y = this.environment.sun.y;
    light_sun.position.z = this.environment.sun.z;
    this.scene.add(light_sun);
    this.scene.add(light_sun.target);

    const light_ambient = (this.ambientLight = new AmbientLight(
      this.environment.ambient.color,
      this.environment.ambient.intensity,
    ));
    this.scene.add(light_ambient);

    this.assets.setBuildingHues(this.settings.worldSeed);

    /*----- generators -----*/

    this.cityLights = [];

    this.instances = new InstancePool(this.scene);

    // what generator items need from the game
    const world: WorldContext = {
      seed: this.settings.worldSeed,
      noise: createDistrictNoise(this.settings.worldSeed),
      spotLights: this.environment.spotLights,
      assets: this.assets,
      scene: this.scene,
      collider: this.collider,
      player: this.player,
      cityLights: this.cityLights,
      instances: this.instances,
    };

    this.generatorCityBlock = new Generator({
      camera: this.player.camera,
      cell_size: CELL_SIZE,
      cell_count: 40,
      spawn_obj: GeneratorItem_CityBlock,
      context: world,
    });

    this.generatorCityLights = null;
    if (this.environment.cityLights) {
      // create lights
      for (let i = 0; i < 10; i++) {
        const light = new PointLight(0x000000, 100, 2000);
        light.decay = 1;
        const l = {
          light: light,
          free: true,
        };
        this.scene.add(l.light);
        this.cityLights.push(l);
      }
      // create generator
      this.generatorCityLights = new Generator({
        camera: this.player.camera,
        cell_size: CELL_SIZE * 4,
        cell_count: 8,
        spawn_obj: GeneratorItem_CityLight,
        context: world,
      });
    }

    this.generatorTraffic = new Generator({
      camera: this.player.camera,
      cell_size: CELL_SIZE,
      cell_count: 12,
      debug: false,
      spawn_obj: GeneratorItem_Traffic,
      context: world,
    });

    /*----- animate -----*/

    // performance overlay

    this.stats = this.settings.stats ? new StatsOverlay(this.renderer, this.scene) : null;

    // time

    this.lastFrameTime = null; // rAF timestamp of the previous frame (ms)
    this.fadeTime = 0; // seconds since launch, for the fade-in

    // animate

    this.animate();

    // dev panel (a lazy chunk, only fetched when enabled)
    if (this.devPanel) import('./ui/devPanel.ts').then(({ createDevPanel }) => createDevPanel(this));

    /*----- event listeners -----*/

    window.addEventListener('resize', () => this.onWindowResize(), false);

    this.controls.addEventListener('lock', () => this.onControlsLock());
    this.controls.addEventListener('unlock', () => this.onControlsUnlock());
  }

  setStats(on: boolean): void {
    if (on && !this.stats) this.stats = new StatsOverlay(this.renderer, this.scene);
    if (!on && this.stats) {
      this.stats.dispose();
      this.stats = null;
    }
  }

  initAudio(): void {
    if (!this.audioInitialized) {
      const player = this.player;
      this.audioListener = new AudioListener();
      this.player.camera.add(this.audioListener);

      // music
      if (this.settings.music) {
        this.radio = new Radio({
          audioListener: this.audioListener,
          controller: this.playerController,
        });
      }
      // sound effects
      if (this.settings.soundFx) {
        // traffic ambient
        const soundTrafficAmbient = new Audio(this.audioListener);
        this.audioLoader.load('assets/sounds/traffic_ambient.wav', function (buffer) {
          soundTrafficAmbient.setBuffer(buffer);
          soundTrafficAmbient.setLoop(true);
          soundTrafficAmbient.setVolume(1);
          soundTrafficAmbient.play();
        });
        // car sounds
        if (player instanceof PlayerCar) {
          const soundCarAmbient = new Audio(this.audioListener);
          this.audioLoader.load('assets/sounds/car_ambient.wav', function (buffer) {
            soundCarAmbient.setBuffer(buffer);
            soundCarAmbient.setLoop(true);
            soundCarAmbient.setVolume(1);
            soundCarAmbient.play();
          });
          const soundCarWind = new Audio(this.audioListener);
          this.audioLoader.load('assets/sounds/car_wind.wav', function (buffer) {
            soundCarWind.setBuffer(buffer);
            soundCarWind.setLoop(true);
            soundCarWind.setVolume(0);
            soundCarWind.play();
            player.soundWind = soundCarWind;
          });
          const soundCarStress = new Audio(this.audioListener);
          this.audioLoader.load('assets/sounds/car_stress.wav', function (buffer) {
            soundCarStress.setBuffer(buffer);
            soundCarStress.setLoop(true);
            soundCarStress.setVolume(0);
            soundCarStress.play();
            player.soundStress = soundCarStress;
          });
          const soundCarChimeUp = new Audio(this.audioListener);
          this.audioLoader.load('assets/sounds/chime_up.wav', function (buffer) {
            soundCarChimeUp.setBuffer(buffer);
            soundCarChimeUp.setLoop(false);
            soundCarChimeUp.setVolume(1);
            player.soundChimeUp = soundCarChimeUp;
          });
          const soundCarChimeDown = new Audio(this.audioListener);
          this.audioLoader.load('assets/sounds/chime_down.wav', function (buffer) {
            soundCarChimeDown.setBuffer(buffer);
            soundCarChimeDown.setLoop(false);
            soundCarChimeDown.setVolume(1);
            player.soundChimeDown = soundCarChimeDown;
          });
          const soundCarCrash = new Audio(this.audioListener);
          this.audioLoader.load('assets/sounds/crash.wav', function (buffer) {
            soundCarCrash.setBuffer(buffer);
            soundCarCrash.setLoop(false);
            soundCarCrash.setVolume(1);
            player.soundCrash = soundCarCrash;
          });
        }
        // city sounds
        else {
          const soundCityAmbient = new Audio(this.audioListener);
          this.audioLoader.load('assets/sounds/city_ambient.wav', function (buffer) {
            soundCityAmbient.setBuffer(buffer);
            soundCityAmbient.setLoop(true);
            soundCityAmbient.setVolume(0);
            soundCityAmbient.play();
            player.soundCityAmbient = soundCityAmbient;
          });
          const soundWind = new Audio(this.audioListener);
          this.audioLoader.load('assets/sounds/car_wind.wav', function (buffer) {
            soundWind.setBuffer(buffer);
            soundWind.setLoop(true);
            soundWind.setVolume(0);
            soundWind.play();
            player.soundWind = soundWind;
          });
        }
      }

      this.audioInitialized = true;
    }
  }

  // now: rAF timestamp in ms (undefined for the first, direct call)
  animate(now?: number): void {
    requestAnimationFrame((t) => this.animate(t));

    // frame time; the first frame counts as one nominal frame
    let delta = null;
    if (now !== undefined && this.lastFrameTime !== null) delta = (now - this.lastFrameTime) / 1000;
    if (now !== undefined) this.lastFrameTime = now;
    const k = frameScale(delta);
    delta = k / 60;
    const worldK = k * this.timeScale;

    // fade in (~2.6 s, easing in like the original did at 60 Hz)

    if (this.canvasOpacity < 1) {
      this.fadeTime += delta;
      this.canvasOpacity = Math.min(0.15 * this.fadeTime * this.fadeTime, 1);
      this.canvas.style.opacity = String(this.canvasOpacity);
      this.masterVolume = this.canvasOpacity;
    }

    // master volume

    if (this.playerController.key_plus) {
      this.userMasterVolume = Math.min(this.userMasterVolume + 0.02 * k, 1);
    }
    if (this.playerController.key_minus) {
      this.userMasterVolume = Math.max(this.userMasterVolume - 0.02 * k, 0);
    }

    if (this.audioListener) {
      this.audioListener.setMasterVolume(this.masterVolume * this.userMasterVolume);
    }

    // update

    if (this.stats) this.stats.beginUpdate();
    this.player.update(worldK);
    if (this.radio) this.radio.update();
    this.playerController.update();

    this.generatorCityBlock.update(worldK);
    if (this.generatorCityLights !== null) this.generatorCityLights.update(worldK);
    this.generatorTraffic.update(worldK);

    // render

    this.instances.cull(this.player.camera);

    if (this.stats) this.stats.begin();
    this.composer.render();
    if (this.stats) this.stats.end(delta);
    // this.renderer.render(this.scene, this.player.camera);

    // start collision checking
    if (!this.collider.enabled) this.collider.enabled = true;
  }

  getEnvironment(id: EnvironmentName): Environment {
    const environments: Record<EnvironmentName, Environment> = {
      night: {
        name: 'night',
        sky: 'sky_night',
        environmentMap: 'env_night',
        cityLights: true,
        windowLights: true,
        spotLights: true,
        fog: {
          color: 0x12122a,
          start: 0,
          end: 2700,
        },
        sun: {
          color: 0x8b79ff,
          intensity: 0.1,
          x: 1,
          y: 0.5,
          z: 0.25,
        },
        ambient: {
          color: 0x1b2c80,
          intensity: 0.5,
        },
      },
      day: {
        name: 'day',
        sky: 'sky_day',
        environmentMap: 'env_day',
        cityLights: false,
        windowLights: false,
        spotLights: false,
        fog: {
          color: 0xaf6a3b,
          start: -500,
          end: 2700,
        },
        sun: {
          color: 0xffa25e,
          intensity: 2,
          x: 1,
          y: 0.2,
          z: 0.65,
        },
        ambient: {
          color: 0x825233,
          intensity: 0.65,
        },
      },
    };

    return environments[id];
  }

  // event listener callbacks

  onWindowResize(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.renderer.setSize(width, height);
    this.composer.setSize(width, height);
    this.updateFxaaResolution();

    this.player.onWindowResize();
  }

  updateFxaaResolution(): void {
    const pixelRatio = this.renderer.getPixelRatio();
    this.fxaa.material.uniforms['resolution'].value.x = 1 / (window.innerWidth * pixelRatio);
    this.fxaa.material.uniforms['resolution'].value.y = 1 / (window.innerHeight * pixelRatio);
  }

  onEnterClick(): void {
    this.launch();
    this.initAudio();
    this.controls.lock();
  }

  // start the world and hide the terminal (no user gesture needed)
  launch(): void {
    this.init();
    this.blocker.style.backgroundColor = '#25004bb9';
    this.blocker.classList.add('hide');
    if (userSettings.skip) {
      // no fade-in; the master volume normally fades in with the canvas
      this.canvasOpacity = 1;
      this.canvas.style.opacity = '1';
      this.masterVolume = 1;
    }
  }

  // click on the canvas while not locked (skip mode, dev panel, no terminal)
  onCanvasClick(): void {
    if (this.initialized && !this.controls.isLocked) this.onEnterClick();
  }
  onControlsLock(): void {
    this.playerController.enabled = true;
  }
  onControlsUnlock(): void {
    this.playerController.enabled = false;
    if (this.uiOnUnfocus) {
      this.blocker.classList.remove('hide');
    }
  }
}
