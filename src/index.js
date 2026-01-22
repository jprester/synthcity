import {
  Clock,
  Scene,
  BufferGeometry,
  Mesh,
  Fog,
  DirectionalLight,
  AmbientLight,
  PointLight
} from 'three';

import { AssetManager } from './classes/AssetManager.js';
import { Shaders } from './classes/Shaders.js';

import { Player } from './classes/Player.js';
import { PlayerCar } from './classes/PlayerCar.js';

import { Radio } from './classes/Radio.js';


import { computeBoundsTree, disposeBoundsTree, acceleratedRaycast } from 'three-mesh-bvh';
import { Collider } from './classes/Collider.js';

class Game {

  constructor(options = {}) {

    this.initialized = false;
    this.options = options;
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

    // scene

    this.scene = this.options.scene || new Scene();

    // controls

    this.playerController = this.options.controller || null;

    // create player

    if (!this.playerController) {
      throw new Error('Game requires a controller instance');
    }

    if (this.settings.mode=='drive') {
      this.player = new PlayerCar({
        scene: this.scene,
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
        controller: this.playerController,
        game: this,
        camera: this.options.camera,
        x: 0,
        z: 0
      });
    }

    // radio

    this.radio = null;

    // post processing handled by R3F

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

    window.addEventListener('resize', () => this.onWindowResize(), false);

    this.pointerLockElement = this.canvas || document.body;

  }


  updatePlayer(deltaOverride) {
    const delta = typeof deltaOverride === 'number' ? deltaOverride : this.clock.getDelta();
    this.clockDelta += delta;

    // update

    this.player.update();
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
  
    this.player.onWindowResize();
  
  }

  onEnterClick() {
    this.init();
    this.blocker.style.backgroundColor = '#25004bb9';
    this.blocker.classList.add('hide');
    if (!this.pointerLockElement) {
      this.pointerLockElement = this.canvas || document.body;
    }
    if (this.pointerLockElement && this.pointerLockElement.requestPointerLock) {
      this.pointerLockElement.requestPointerLock();
    }
  }
}

export { Game };
