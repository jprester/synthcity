import { PerspectiveCamera, Object3D, Vector3 } from 'three';

import { updateCameraLook } from './cameraLook.js';
import { decay } from './frameRate.js';

class Player {
  constructor(params) {
    // params

    this.scene = params.scene;
    this.renderer = params.renderer;
    this.controller = params.controller;

    // settings

    this.player_height = 250; // 1.67
    this.mouse_sensitivity = 0.00125; //0.002;
    this.look_smooth = 0.15; //0.075;
    this.look_roll_factor = 0.1;
    this.max_look_speed = 200;

    this.move_accel = 0.25; //0.01;

    this.walk_speed = 0.65; //0.1;
    this.run_speed = 4; //0.2;

    // audio

    this.soundWind = null;
    this.soundCityAmbient = null;

    // init

    this.camera_fov = 80;
    this.camera_fov_to = this.camera_fov;

    this.camera = new PerspectiveCamera(this.camera_fov, window.innerWidth / window.innerHeight, 1, 2800);
    this.camera.rotation.order = 'YXZ';
    this.camera.rotation.y = Math.PI;
    this.camera.position.y = this.player_height;

    this.camera_target = new Object3D(); // used to get camera rotation set by PointerLockControls
    this.camera_target.rotation.order = 'YXZ';
    this.camera_target.rotation.y = Math.PI;

    this.body = new Object3D();
    this.body.position.x = params.x;
    this.body.position.z = params.z;
    this.body.position.y = this.player_height;

    this.velocity = new Vector3();
    this.move_max_speed = 0;
    this.move_max_speed_current = 0;
  }

  // k: frame time in 60 Hz frames
  update(k) {
    /*--- UPDATE CAMERA ---*/

    updateCameraLook(this, { pitchMargin: 0.01, maxFov: 90 }, k);

    /*--- UPDATE VELOCITY ---*/

    let accel = this.move_accel * k;

    // accelerate
    if (
      this.controller.key_up ||
      this.controller.key_down ||
      this.controller.key_left ||
      this.controller.key_right
    ) {
      if (this.controller.key_up) {
        this.velocity.z -= Math.cos(-this.camera.rotation.y) * accel;
        this.velocity.x += Math.sin(-this.camera.rotation.y) * accel;
      }
      if (this.controller.key_down) {
        this.velocity.z -= Math.cos(-this.camera.rotation.y + Math.PI) * accel;
        this.velocity.x += Math.sin(-this.camera.rotation.y + Math.PI) * accel;
      }
      if (this.controller.key_left) {
        this.velocity.z -= Math.cos(-this.camera.rotation.y - Math.PI / 2) * accel;
        this.velocity.x += Math.sin(-this.camera.rotation.y - Math.PI / 2) * accel;
      }
      if (this.controller.key_right) {
        this.velocity.z -= Math.cos(-this.camera.rotation.y + Math.PI / 2) * accel;
        this.velocity.x += Math.sin(-this.camera.rotation.y + Math.PI / 2) * accel;
      }
    }
    // decelerate
    else {
      this.velocity.clampLength(0, this.velocity.length() - accel);
    }

    // max speed
    this.move_max_speed = this.controller.key_shift ? this.run_speed : this.walk_speed;
    if (this.move_max_speed_current < this.move_max_speed) this.move_max_speed_current = this.move_max_speed;
    if (this.move_max_speed_current > this.move_max_speed) this.move_max_speed_current -= accel;
    this.velocity.clampLength(0, this.move_max_speed_current);

    /*--- UPDATE POSITION ---*/

    // x, z
    this.body.position.x += this.velocity.x * (this.body.position.y * 0.01) * k;
    this.body.position.z += this.velocity.z * (this.body.position.y * 0.01) * k;

    // y
    if (this.controller.key_r) {
      this.body.position.y = this.body.position.y * decay(1.02, k);
    }
    if (this.controller.key_f) {
      this.body.position.y = this.body.position.y / decay(1.02, k);
    }
    if (this.body.position.y < 15) this.body.position.y = 15;
    if (this.body.position.y > 800) this.body.position.y = 800;

    /*--- UPDATE AUDIO ---*/

    if (this.soundWind)
      this.soundWind.setVolume(Math.min(Math.max(this.velocity.length() - this.walk_speed, 0), 1) * 0.1);
    if (this.soundCityAmbient) this.soundCityAmbient.setVolume(1 - this.body.position.y / 800);
  }

  // window resize callback
  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  }
}

export { Player };
