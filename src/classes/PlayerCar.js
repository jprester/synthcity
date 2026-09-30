import { Mesh, PointLight, PerspectiveCamera, Object3D, Vector3 } from 'three';

import { Perlin } from '../lib/perlin.js';
import { updateCameraLook, angleDist, clamp } from './cameraLook.js';

class PlayerCar {
  constructor(params) {
    // params

    this.scene = params.scene;
    this.renderer = params.renderer;
    this.controller = params.controller;
    this.collider = params.collider;
    this.respawnX = params.respawnX;
    const assets = params.assets;

    // settings

    this.player_height = 250;
    this.mouse_sensitivity = 0.001;
    this.look_smooth = 0.1;
    this.look_roll_factor = -0.065;
    this.max_look_speed = 200;

    this.move_accel = 0.02;

    this.brake_speed = 0.4;
    this.walk_speed = 0.8;
    this.run_speed = 2.2;

    this.light = new PointLight(0x00d2ed, 0.25, 3);
    this.light.decay = 1;
    this.scene.add(this.light);

    // audio

    this.soundWind = null;
    this.soundStress = null;
    this.soundChimeUp = null;
    this.soundChimeDown = null;
    this.soundCrash = null;

    // init

    this.crashed = false;

    this.car = null;
    this.car_windows = null;
    this.car = new Mesh(assets.getModel('spinner'), [
      assets.getMaterial('spinner_interior'),
      assets.getMaterial('spinner_exterior'),
    ]);
    const windowsMat =
      params.windshieldShader == 'advanced'
        ? assets.getMaterial('spinner_windows_advanced')
        : assets.getMaterial('spinner_windows_simple');
    this.car_windows = new Mesh(assets.getModel('spinner_windows'), windowsMat);
    if (this.car) this.scene.add(this.car);
    if (this.car_windows) this.scene.add(this.car_windows);

    this.camera_fov = 50;
    this.camera_fov_to = this.camera_fov;

    this.camera = new PerspectiveCamera(this.camera_fov, window.innerWidth / window.innerHeight, 0.15, 2800);
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

    this.noise_shake = new Perlin();
    this.noise_shake.noiseDetail(8, 0.5);

    this.car_dir = 0;
    this.car_dir_v = 0;
    this.car_dir_to = 0;
    this.car_pitch = 0;
    this.car_pitch_v = 0;
    this.car_pitch_to = 0;

    this.velocity = new Vector3();
    this.move_max_speed = 0;
    this.move_max_speed_current = 0;
    this.autopilot = true;
    this.autoaltitude = true;

    this.height_step = Math.PI;
  }

  update() {
    /*--- UPDATE CAMERA ---*/

    updateCameraLook(this, { pitchMargin: 0.1, maxFov: 70 });

    /*--- UPDATE CAR ---*/

    if (this.controller.key_pressed_space) {
      // on engage
      if (!this.autopilot) {
        this.car_pitch_to = 0;
        if (this.soundChimeUp !== null) {
          if (this.soundChimeUp.isPlaying) this.soundChimeUp.stop();
          this.soundChimeUp.play();
        }
      }
      // on disengage
      else {
        if (this.soundChimeDown !== null) {
          if (this.soundChimeDown.isPlaying) this.soundChimeDown.stop();
          this.soundChimeDown.play();
        }
      }
      // disable autoaltitude
      this.autoaltitude = false;
      // toggle autopilot
      this.autopilot = !this.autopilot;
    }

    if (this.autoaltitude) {
      this.height_step += 0.001;
      this.body.position.y = (Math.cos(this.height_step) + 1) * 150 + 115;
    }
    if (!this.autopilot) {
      this.car_dir_to = this.camera.rotation.y + Math.PI;
      this.car_pitch_to = this.camera.rotation.x;
    }

    // steering
    this.car_dir_v += angleDist(this.car_dir, this.car_dir_to) * 0.001;
    this.car_pitch_v += angleDist(this.car_pitch, this.car_pitch_to) * 0.004;
    // damping
    this.car_dir_v *= 0.965;
    this.car_pitch_v *= 0.965;
    // update direction
    if (!this.crashed) {
      this.car_dir += this.car_dir_v;
      this.car_pitch += this.car_pitch_v;
    }

    this.car.rotation.set(0, this.car_dir, 0);
    var forward = new Vector3(0, 0, 1);
    var left = new Vector3(-1, 0, 0);
    if (!this.crashed) this.car.rotateOnAxis(forward, this.car_dir_v * -20);
    this.car.rotateOnAxis(left, this.car_pitch);

    this.car.position.set(this.camera.position.x, this.camera.position.y, this.camera.position.z);

    // shake car direction (affects direction)
    if (!this.autopilot) {
      let n = this.noise_shake.noise(this.body.position.x * 0.01, this.body.position.z * 0.01) - 0.5;
      this.car_dir += n * 0.0015;
      this.car_pitch += n * 0.003;
    }

    // shake car position
    var noise = this.noise_shake.noise(this.body.position.x * 0.0005, this.body.position.z * 0.0005) - 0.5;
    var speed_noise =
      this.noise_shake.noise(this.body.position.x * 0.005, this.body.position.z * 0.005) - 0.5;
    var speed_noise2 =
      this.noise_shake.noise(-this.body.position.x * 0.005, -this.body.position.z * 0.005) - 0.5;
    var speed_factor = clamp(this.velocity.length() - this.walk_speed, 0, 1);
    this.car.position.x = this.car.position.x + noise * 0.15 + speed_noise * speed_factor * 0.1;
    this.car.position.z = this.car.position.z + noise * 0.15 + speed_noise2 * speed_factor * 0.1;
    this.car.position.y = this.car.position.y + noise * 0.25 + speed_noise * speed_factor * 0.1;

    // windows
    if (this.car_windows)
      this.car_windows.position.set(this.car.position.x, this.car.position.y, this.car.position.z);
    if (this.car_windows)
      this.car_windows.rotation.set(this.car.rotation.x, this.car.rotation.y, this.car.rotation.z);

    // light
    this.light.position.set(this.car.position.x, this.car.position.y, this.car.position.z);

    /*--- UPDATE CAR POSITION ---*/

    let accel = this.controller.key_shift ? this.move_accel * 2 : this.move_accel;

    this.velocity.z -= Math.cos(-this.car_dir + Math.PI) * Math.cos(this.car_pitch) * accel;
    this.velocity.x += Math.sin(-this.car_dir + Math.PI) * Math.cos(this.car_pitch) * accel;
    this.velocity.y += Math.sin(this.car_pitch) * accel;

    // max speed
    this.move_max_speed = this.walk_speed;
    if (this.controller.key_up || this.controller.key_shift) this.move_max_speed = this.run_speed;
    else if (this.controller.key_down) this.move_max_speed = this.brake_speed;
    this.move_max_speed *= 1 + (-this.car_pitch / Math.PI) * 2;
    if (this.move_max_speed_current < this.move_max_speed) this.move_max_speed_current = this.move_max_speed;
    if (this.move_max_speed_current >= this.move_max_speed)
      this.move_max_speed_current -= this.move_accel * 2;

    // enforce max speed
    this.velocity.clampLength(0, this.move_max_speed_current);

    // update body position
    if (!this.crashed) {
      this.body.position.x += this.velocity.x;
      this.body.position.z += this.velocity.z;
      this.body.position.y += this.velocity.y;
    }

    // min max altitude

    if (this.body.position.y < 15) {
      this.body.position.y = 15;
    }
    if (this.body.position.y > 800) {
      this.body.position.y = 800;
    }

    /*--- COLLISION ---*/

    if (!this.crashed) {
      if (this.collider.intersectsSphere(this.body.position, 1)) {
        this.crashed = true;
        document.getElementById('crashMessage').style.display = 'flex';

        if (this.soundCrash) this.soundCrash.play();

        setTimeout(() => {
          this.crashed = false;
          document.getElementById('crashMessage').style.display = 'none';

          this.car_dir = 0;
          this.car_dir_v = 0;
          this.car_dir_to = 0;
          this.car_pitch = 0;
          this.car_pitch_v = 0;
          this.car_pitch_to = 0;

          this.velocity.set(0, 0, 0);

          this.camera.rotation.x = 0;
          this.camera.rotation.y = Math.PI;
          this.camera_target.rotation.x = this.camera.rotation.x;
          this.camera_target.rotation.y = this.camera.rotation.y;

          this.body.position.x = this.respawnX;
          this.body.position.z = 0;
          if (this.body.position.y < 150) this.body.position.y = 150;
        }, 2000);
      }
    }

    /*--- UPDATE AUDIO ---*/

    if (this.soundWind) this.soundWind.setVolume(clamp(this.velocity.length() - this.walk_speed, 0, 1));
    if (this.soundStress) {
      this.soundStress.setVolume(
        clamp(Math.max(Math.abs(this.car_dir_v), Math.abs(this.car_pitch_v)) * 40, 0, 1),
      );
    }
  }

  // window resize callback
  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  }
}

export { PlayerCar };
