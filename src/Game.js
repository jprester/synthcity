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

import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';

import { AssetManager } from './classes/AssetManager.js';

import { Player } from './classes/Player.js';
import { PlayerCar } from './classes/PlayerCar.js';
import { PlayerController } from './classes/PlayerController.js';

import { Radio } from './classes/Radio.js';

import { Generator } from './classes/Generator.js';
import { GeneratorItem_CityBlock } from './classes/GeneratorItem_CityBlock.js';
import { GeneratorItem_CityLight } from './classes/GeneratorItem_CityLight.js';
import { GeneratorItem_Traffic } from './classes/GeneratorItem_Traffic.js';

import { computeBoundsTree, disposeBoundsTree, acceleratedRaycast } from 'three-mesh-bvh';
import { Collider } from './classes/Collider.js';
import { InstancePool } from './classes/InstancePool.js';
import { frameScale } from './classes/frameRate.js';

import { CITY_BLOCK_SIZE, ROAD_WIDTH, CELL_SIZE, createDistrictNoise } from './generation/world.js';
import { userSettings } from './settings.js';
import { setColor, newLine, write, showCredits } from './ui/terminal.js';
import { StatsOverlay } from './ui/stats.js';
import { setCrashMessage } from './ui/hud.js';

export class Game {
  constructor() {
    this.initialized = false;

    this.environment = this.getEnvironment(userSettings.environment == 'day' ? 'day' : 'night');

    // query params

    const urlParams = new URLSearchParams(window.location.search);

    // dev panel: on under `npm run dev`, ?gui=1 / ?gui=0 to force
    this.devPanel = urlParams.has('gui') ? urlParams.get('gui') == '1' : import.meta.env.DEV;

    // show the terminal again when the pointer is released (not while tweaking in the dev panel)
    this.uiOnUnfocus = !this.devPanel;
    if (urlParams.has('uiOnUnfocus')) this.uiOnUnfocus = urlParams.get('uiOnUnfocus') == 1 ? true : false;

    // world speed multiplier (dev panel; 0 pauses)
    this.timeScale = 1;

    // elements

    this.blocker = document.getElementById('blocker');
    this.enterBtn = document.getElementById('enterBtn');
    this.canvas = document.getElementById('canvas');

    // fade in / volume

    this.canvasOpacity = 0;
    this.masterVolume = 0;
    this.userMasterVolume = 1;

    // launch button

    this.enterBtn.addEventListener('click', () => this.onEnterClick(), false);
    this.canvas.addEventListener('click', () => this.onCanvasClick(), false);

    // world settings (do not change)

    this.cityBlockSize = CITY_BLOCK_SIZE;
    this.roadWidth = ROAD_WIDTH;

    // collision

    BufferGeometry.prototype.computeBoundsTree = computeBoundsTree;
    BufferGeometry.prototype.disposeBoundsTree = disposeBoundsTree;
    Mesh.prototype.raycast = acceleratedRaycast;

    this.collider = new Collider();
  }

  load() {
    this.assets = new AssetManager({ environment: this.environment, onLoad: () => this.onLoad() });
    this.assets.setPath('assets/');
    this.assets.load();
  }

  onLoad() {
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
    document.getElementById('enterBtn').style.display = 'block';
  }

  init() {
    if (this.initialized) return;
    this.initialized = true;

    console.log('Game: Initializing');

    /*----- user settings -----*/

    // defaults
    this.settings = {
      mode: 'drive',
      worldSeed: 9746,
      music: true,
      soundFx: true,
      windshieldShader: 'simple',
      renderScaling: 1.0,
      stats: false,
    };

    if (Object.hasOwn(userSettings, 'mode')) this.settings.mode = userSettings.mode;
    if (Object.hasOwn(userSettings, 'worldSeed')) this.settings.worldSeed = userSettings.worldSeed;
    if (Object.hasOwn(userSettings, 'music')) this.settings.music = userSettings.music;
    if (Object.hasOwn(userSettings, 'soundFx')) this.settings.soundFx = userSettings.soundFx;
    if (Object.hasOwn(userSettings, 'renderScaling'))
      this.settings.renderScaling = parseFloat(userSettings.renderScaling);
    if (Object.hasOwn(userSettings, 'windshieldShader'))
      this.settings.windshieldShader = userSettings.windshieldShader;
    if (Object.hasOwn(userSettings, 'stats')) this.settings.stats = userSettings.stats;

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
        renderer: this.renderer,
        controller: this.playerController,
        x: -this.roadWidth / 2,
        z: 0,
      });
    } else {
      this.player = new Player({
        scene: this.scene,
        renderer: this.renderer,
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
    const world = {
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
        let light = new PointLight(0x000000, 100, 2000);
        light.decay = 1;
        let l = {
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
    if (this.devPanel) import('./ui/devPanel.js').then(({ createDevPanel }) => createDevPanel(this));

    /*----- event listeners -----*/

    window.addEventListener('resize', () => this.onWindowResize(), false);

    this.controls.addEventListener('lock', () => this.onControlsLock(), false);
    this.controls.addEventListener('unlock', () => this.onControlsUnlock(), false);
  }

  setStats(on) {
    if (on && !this.stats) this.stats = new StatsOverlay(this.renderer, this.scene);
    if (!on && this.stats) {
      this.stats.dispose();
      this.stats = null;
    }
  }

  initAudio() {
    const self = this;

    if (!this.audioInitialized) {
      this.audioListener = new AudioListener();
      this.player.camera.add(this.audioListener);

      // music
      if (this.settings.music == 1) {
        this.radio = new Radio({
          audioListener: this.audioListener,
          controller: this.playerController,
        });
      }
      // sound effects
      if (this.settings.soundFx == 1) {
        // traffic ambient
        const soundTrafficAmbient = new Audio(this.audioListener);
        this.audioLoader.load('assets/sounds/traffic_ambient.wav', function (buffer) {
          soundTrafficAmbient.setBuffer(buffer);
          soundTrafficAmbient.setLoop(true);
          soundTrafficAmbient.setVolume(1);
          soundTrafficAmbient.play();
        });
        // car sounds
        if (this.settings.mode == 'drive') {
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
            self.player.soundWind = soundCarWind;
          });
          const soundCarStress = new Audio(this.audioListener);
          this.audioLoader.load('assets/sounds/car_stress.wav', function (buffer) {
            soundCarStress.setBuffer(buffer);
            soundCarStress.setLoop(true);
            soundCarStress.setVolume(0);
            soundCarStress.play();
            self.player.soundStress = soundCarStress;
          });
          const soundCarChimeUp = new Audio(this.audioListener);
          this.audioLoader.load('assets/sounds/chime_up.wav', function (buffer) {
            soundCarChimeUp.setBuffer(buffer);
            soundCarChimeUp.setLoop(false);
            soundCarChimeUp.setVolume(1);
            self.player.soundChimeUp = soundCarChimeUp;
          });
          const soundCarChimeDown = new Audio(this.audioListener);
          this.audioLoader.load('assets/sounds/chime_down.wav', function (buffer) {
            soundCarChimeDown.setBuffer(buffer);
            soundCarChimeDown.setLoop(false);
            soundCarChimeDown.setVolume(1);
            self.player.soundChimeDown = soundCarChimeDown;
          });
          const soundCarCrash = new Audio(this.audioListener);
          this.audioLoader.load('assets/sounds/crash.wav', function (buffer) {
            soundCarCrash.setBuffer(buffer);
            soundCarCrash.setLoop(false);
            soundCarCrash.setVolume(1);
            self.player.soundCrash = soundCarCrash;
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
            self.player.soundCityAmbient = soundCityAmbient;
          });
          const soundWind = new Audio(this.audioListener);
          this.audioLoader.load('assets/sounds/car_wind.wav', function (buffer) {
            soundWind.setBuffer(buffer);
            soundWind.setLoop(true);
            soundWind.setVolume(0);
            soundWind.play();
            self.player.soundWind = soundWind;
          });
        }
      }

      this.audioInitialized = true;
    }
  }

  // now: rAF timestamp in ms (undefined for the first, direct call)
  animate(now) {
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
      this.canvas.style.opacity = this.canvasOpacity;
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

  getEnvironment(id) {
    const environments = {
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

  onWindowResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.renderer.setSize(width, height);
    this.composer.setSize(width, height);
    this.updateFxaaResolution();

    this.player.onWindowResize();
  }

  updateFxaaResolution() {
    const pixelRatio = this.renderer.getPixelRatio();
    this.fxaa.material.uniforms['resolution'].value.x = 1 / (window.innerWidth * pixelRatio);
    this.fxaa.material.uniforms['resolution'].value.y = 1 / (window.innerHeight * pixelRatio);
  }

  onEnterClick() {
    this.launch();
    this.initAudio();
    this.controls.lock();
  }

  // start the world and hide the terminal (no user gesture needed)
  launch() {
    this.init();
    this.blocker.style.backgroundColor = '#25004bb9';
    this.blocker.classList.add('hide');
    if (userSettings.skip) {
      this.canvasOpacity = 1;
      this.canvas.style.opacity = 1;
    }
  }

  // click on the canvas while not locked (skip mode, dev panel, no terminal)
  onCanvasClick() {
    if (this.initialized && !this.controls.isLocked) this.onEnterClick();
  }
  onControlsLock() {
    this.playerController.enabled = true;
  }
  onControlsUnlock() {
    this.playerController.enabled = false;
    if (this.uiOnUnfocus) {
      this.blocker.classList.remove('hide');
    }
  }
}
