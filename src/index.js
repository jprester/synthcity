import {
  Clock,
  Scene,
  WebGLRenderer,
  ACESFilmicToneMapping,
  SRGBColorSpace,
  BufferGeometry,
  Mesh,
  Fog,
  DirectionalLight,
  AmbientLight,
  PointLight,
  Audio,
  AudioLoader,
  AudioListener
} from 'three';

import { AssetManager } from './classes/AssetManager.js';
import { Shaders } from './classes/Shaders.js';

import { Player } from './classes/Player.js';
import { PlayerCar } from './classes/PlayerCar.js';
import { PlayerController } from './classes/PlayerController.js';

import { Radio } from './classes/Radio.js';


import { computeBoundsTree, disposeBoundsTree, acceleratedRaycast } from 'three-mesh-bvh';
import { Collider } from './classes/Collider.js';

class Game {

  constructor(options = {}) {

    this.initialized = false;
    this.options = options;
    this.externalRenderer = Boolean(options.renderer);
    this.setupEnvironment = options.setupEnvironment ?? true;
    this.settingsOverrides = options.settings ? { ...options.settings } : {};
    this.terminal = options.terminal || null;

    this.environment = this.getEnvironment('night');

    // query params

    const urlParams = new URLSearchParams(window.location.search);

    this.uiOnUnfocus = true;
    if (urlParams.has('uiOnUnfocus')) this.uiOnUnfocus = urlParams.get('uiOnUnfocus')==1 ? true : false;

    // elements

    this.blocker = document.getElementById('blocker');
    this.enterBtn = document.getElementById('enterBtn');
    this.canvas = options.canvas || document.getElementById('canvas');

    // fade in / volume

    this.canvasOpacity = 0;
    this.masterVolume = 0;
    this.userMasterVolume = 1;

    // launch button

    this.enterBtn.addEventListener( 'click', () => this.onEnterClick(), false );

    // world settings (do not change)

    this.cityBlockSize = 128;
    this.roadWidth = 24;

    // collision

    BufferGeometry.prototype.computeBoundsTree = computeBoundsTree;
    BufferGeometry.prototype.disposeBoundsTree = disposeBoundsTree;
    Mesh.prototype.raycast = acceleratedRaycast;

    this.collider = new Collider();

  }

  load() {

    this.assets = new AssetManager(this, this.terminal);
    this.assets.setPath('assets/');
    this.assets.load();

  }

  onLoad() {

    // terminal
    if (this.terminal) {
      this.terminal.setColor('c2');
      this.terminal.newLine();
      this.terminal.newLine();
      this.terminal.write('>> boot sequence complete', 0, 0, null);
      this.terminal.showCredits();
    }

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
      renderScaling: 1.0
    };

    const overrides = this.settingsOverrides || {};
    if (Object.prototype.hasOwnProperty.call(overrides, 'mode')) this.settings.mode = overrides.mode;
    if (Object.prototype.hasOwnProperty.call(overrides, 'worldSeed')) this.settings.worldSeed = overrides.worldSeed;
    if (Object.prototype.hasOwnProperty.call(overrides, 'music')) this.settings.music = overrides.music;
    if (Object.prototype.hasOwnProperty.call(overrides, 'soundFx')) this.settings.soundFx = overrides.soundFx;
    if (Object.prototype.hasOwnProperty.call(overrides, 'renderScaling')) this.settings.renderScaling = parseFloat(overrides.renderScaling);
    if (Object.prototype.hasOwnProperty.call(overrides, 'windshieldShader')) this.settings.windshieldShader = overrides.windshieldShader;

    console.log('Game: World seed: '+this.settings.worldSeed);

    /*----- setup -----*/

    // audio loader

    this.audioLoader = new AudioLoader();
    this.audioListener = null;
    this.audioInitialized = false;

    // renderer

    this.renderer = this.options.renderer || null;
    if (this.renderer) {
      this.renderer.setPixelRatio(window.devicePixelRatio * this.settings.renderScaling);
      this.renderer.toneMapping = ACESFilmicToneMapping;
      this.renderer.toneMappingExposure = 1.0;
      this.renderer.outputColorSpace = SRGBColorSpace;
    } else {
      this.renderer = new WebGLRenderer({ canvas: this.canvas || undefined });
      this.renderer.setPixelRatio(window.devicePixelRatio * this.settings.renderScaling);
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.toneMapping = ACESFilmicToneMapping;
      this.renderer.toneMappingExposure = 1.0;
      this.renderer.outputColorSpace = SRGBColorSpace;
      document.body.appendChild(this.renderer.domElement);
    }

    if (!this.canvas) {
      this.canvas = this.renderer.domElement;
    }

    // scene

    this.scene = this.options.scene || new Scene();

    // controls

    this.playerController = new PlayerController();

    // create player

    if (this.settings.mode=='drive') {
      this.player = new PlayerCar({
        scene: this.scene,
        renderer: this.renderer,
        controller: this.playerController,
        game: this,
        camera: this.options.camera,
        x: -this.roadWidth/2,
        z: 0
      });
    }
    else {
      this.player = new Player({
        scene: this.scene,
        renderer: this.renderer,
        controller: this.playerController,
        game: this,
        camera: this.options.camera,
        x: 0,
        z: 0
      });
    }

    // radio

    this.radio = null;

    /*----- post processing -----*/

    this.composer = null;

    /*----- environment -----*/

    if (this.setupEnvironment) {
      // sky and fog

      this.scene.background = this.assets.getTexture(this.environment.sky);

      // this.scene.environment = this.assets.getTexture(this.environment.environmentMap);

      this.scene.fog = new Fog(this.environment.fog.color, this.environment.fog.start, this.environment.fog.end);

      // lights

      const light_sun = new DirectionalLight(this.environment.sun.color, this.environment.sun.intensity);
      light_sun.castShadow = false;
      light_sun.position.x = this.environment.sun.x;
      light_sun.position.y = this.environment.sun.y;
      light_sun.position.z = this.environment.sun.z;
      this.scene.add(light_sun);
      this.scene.add(light_sun.target);

      const light_ambient = new AmbientLight(this.environment.ambient.color, this.environment.ambient.intensity);
      this.scene.add(light_ambient);
    }

    // generators are managed by the R3F system
    /*----- animate -----*/

    // time

    this.clock = new Clock();
    this.clockDelta = 0;
    this.isRunning = true;

    /*----- event listeners -----*/

    window.addEventListener( 'resize', () => this.onWindowResize(), false );

    this.pointerLockElement = this.canvas || (this.renderer ? this.renderer.domElement : null);
    this.bindPointerLock();

  }

  initAudio() {

    const self = this;

    if (!this.audioInitialized) {

      this.audioListener = new AudioListener();
      this.player.camera.add( this.audioListener );

      // music
      if ( this.settings.music == 1 ) {
        this.radio = new Radio({
          audioListener: this.audioListener,
          controller: this.playerController
        });
      }
      // sound effects
      if ( this.settings.soundFx == 1 ) {
        // traffic ambient
        const soundTrafficAmbient = new Audio( this.audioListener );
        this.audioLoader.load( 'assets/sounds/traffic_ambient.wav', function( buffer ) {
          soundTrafficAmbient.setBuffer( buffer );
          soundTrafficAmbient.setLoop(true);
          soundTrafficAmbient.setVolume(1);
          soundTrafficAmbient.play();
        });
        // car sounds
        if ( this.settings.mode == 'drive' ) {
          const soundCarAmbient = new Audio( this.audioListener );
          this.audioLoader.load( 'assets/sounds/car_ambient.wav', function( buffer ) {
            soundCarAmbient.setBuffer( buffer );
            soundCarAmbient.setLoop(true);
            soundCarAmbient.setVolume(1);
            soundCarAmbient.play();
          });
          const soundCarWind = new Audio( this.audioListener );
          this.audioLoader.load( 'assets/sounds/car_wind.wav', function( buffer ) {
            soundCarWind.setBuffer( buffer );
            soundCarWind.setLoop(true);
            soundCarWind.setVolume(0);
            soundCarWind.play();
            self.player.soundWind = soundCarWind;
          });
          const soundCarStress = new Audio( this.audioListener );
          this.audioLoader.load( 'assets/sounds/car_stress.wav', function( buffer ) {
            soundCarStress.setBuffer( buffer );
            soundCarStress.setLoop(true);
            soundCarStress.setVolume(0);
            soundCarStress.play();
            self.player.soundStress = soundCarStress;
          });
          const soundCarChimeUp = new Audio( this.audioListener );
          this.audioLoader.load( 'assets/sounds/chime_up.wav', function( buffer ) {
            soundCarChimeUp.setBuffer( buffer );
            soundCarChimeUp.setLoop(false);
            soundCarChimeUp.setVolume(1);
            self.player.soundChimeUp = soundCarChimeUp;
          });
          const soundCarChimeDown = new Audio( this.audioListener );
          this.audioLoader.load( 'assets/sounds/chime_down.wav', function( buffer ) {
            soundCarChimeDown.setBuffer( buffer );
            soundCarChimeDown.setLoop(false);
            soundCarChimeDown.setVolume(1);
            self.player.soundChimeDown = soundCarChimeDown;
          });
          const soundCarCrash = new Audio( this.audioListener );
          this.audioLoader.load( 'assets/sounds/crash.wav', function( buffer ) {
            soundCarCrash.setBuffer( buffer );
            soundCarCrash.setLoop(false);
            soundCarCrash.setVolume(1);
            self.player.soundCrash = soundCarCrash;
          });
        }
        // city sounds
        else {
          const soundCityAmbient = new Audio( this.audioListener );
          this.audioLoader.load( 'assets/sounds/city_ambient.wav', function( buffer ) {
            soundCityAmbient.setBuffer( buffer );
            soundCityAmbient.setLoop(true);
            soundCityAmbient.setVolume(0);
            soundCityAmbient.play();
            self.player.soundCityAmbient = soundCityAmbient;
          });
          const soundWind = new Audio( this.audioListener );
          this.audioLoader.load( 'assets/sounds/car_wind.wav', function( buffer ) {
            soundWind.setBuffer( buffer );
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

  updatePlayer(deltaOverride) {
    const delta = typeof deltaOverride === 'number' ? deltaOverride : this.clock.getDelta();
    this.clockDelta += delta;

    // fade in

    if (this.canvasOpacity < 1 && this.canvas) {
      // canvas
      this.canvasOpacity += this.clockDelta * 0.005;
      this.canvas.style.opacity = this.canvasOpacity;
      // audio
      this.masterVolume += this.clockDelta * 0.005;
    }

    // master volume

    if (this.playerController.key_plus) {
      this.userMasterVolume = Math.min(this.userMasterVolume + 0.02, 1);
    }
    if (this.playerController.key_minus) {
      this.userMasterVolume = Math.max(this.userMasterVolume - 0.02, 0);
    }

    if (this.audioListener) {
      this.audioListener.setMasterVolume(this.masterVolume * this.userMasterVolume);
    }

    // update

    this.player.update();
    if (this.radio) this.radio.update();
    this.playerController.update();
  }

  setSettings(nextSettings = {}) {
    this.settingsOverrides = { ...this.settingsOverrides, ...nextSettings };
    if (this.initialized) {
      this.settings = { ...this.settings, ...nextSettings };
    }
  }

  setTerminal(terminal) {
    this.terminal = terminal;
    if (this.assets && typeof this.assets.setTerminal === 'function') {
      this.assets.setTerminal(terminal);
    }
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
          end: 2700
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
        }
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
          end: 2700
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
        }
      }
    };

    return environments[id];

  }

  // event listener callbacks

  onWindowResize() {

    const width = window.innerWidth;
    const height = window.innerHeight;
  
    this.renderer.setSize(width, height);

    this.player.onWindowResize();
  
  }

  onEnterClick() {
    this.init();
    this.initAudio();
    this.blocker.style.backgroundColor = '#25004bb9';
    this.blocker.classList.add('hide');
    if (!this.pointerLockElement) {
      this.pointerLockElement = this.canvas || (this.renderer ? this.renderer.domElement : null);
    }
    if (this.pointerLockElement && this.pointerLockElement.requestPointerLock) {
      this.pointerLockElement.requestPointerLock();
    }
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

  bindPointerLock() {
    const element = this.pointerLockElement || document.body;
    this.pointerLockElement = element;
    document.addEventListener('pointerlockchange', () => {
      if (document.pointerLockElement === this.pointerLockElement) {
        this.onControlsLock();
      } else {
        this.onControlsUnlock();
      }
    });
  }

}

export { Game };
