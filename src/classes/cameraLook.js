// Mouse look, zoom and roll shared by Player (freeroam) and PlayerCar.

import { ease } from './frameRate.js';

// Updates player.camera_target from mouse movement, zooms player.camera with
// the wheel, moves the camera to player.body and eases it towards the target.
// Uses player.controller, max_look_speed, mouse_sensitivity, camera_fov_to,
// look_roll_factor and look_smooth.
//   pitchMargin: how close to straight up/down the camera may look (radians)
//   maxFov: widest zoom
//   k: frame time in 60 Hz frames (mouse movement is a distance, not scaled)
export function updateCameraLook(player, { pitchMargin, maxFov }, k) {
  const target = player.camera_target;
  const camera = player.camera;

  var movementX = player.controller.mouse_move_x;
  var movementY = player.controller.mouse_move_y;
  // limit movement
  if (movementX > player.max_look_speed) movementX = player.max_look_speed;
  if (movementX < -player.max_look_speed) movementX = -player.max_look_speed;
  if (movementY > player.max_look_speed) movementY = player.max_look_speed;
  if (movementY < -player.max_look_speed) movementY = -player.max_look_speed;
  // pitch
  target.rotation.x -= movementY * player.mouse_sensitivity;
  if (target.rotation.x < -Math.PI / 2 + pitchMargin) target.rotation.x = -Math.PI / 2 + pitchMargin;
  if (target.rotation.x > Math.PI / 2 - pitchMargin) target.rotation.x = Math.PI / 2 - pitchMargin;
  // yaw
  target.rotation.y -= movementX * player.mouse_sensitivity;

  // zoom
  let mouse_wheel_delta = player.controller.get_mouse_wheel();
  if (mouse_wheel_delta !== 0) {
    player.camera_fov_to += mouse_wheel_delta * 0.05;
    player.camera_fov_to = Math.max(Math.min(player.camera_fov_to, maxFov), 30);
  }
  camera.fov += (player.camera_fov_to - camera.fov) * ease(0.1, k);
  camera.updateProjectionMatrix();

  // set camera postion to body position
  camera.position.z = player.body.position.z;
  camera.position.x = player.body.position.x;
  camera.position.y = player.body.position.y;

  // roll
  target.rotation.z = -angleDist(target.rotation.y, camera.rotation.y) * player.look_roll_factor;

  // smooth look
  camera.quaternion.slerp(target.quaternion, ease(player.look_smooth, k));
}

// shortest signed distance between two angles (radians)
export function angleDist(a, b) {
  var posDist, negDist;
  a = fixAngle(a);
  b = fixAngle(b);
  if (b > a) {
    posDist = b - a;
    negDist = a + (Math.PI * 2 - b);
  } else {
    posDist = b + (Math.PI * 2 - a);
    negDist = a - b;
  }
  if (posDist < negDist) {
    return posDist;
  } else {
    return -negDist;
  }
}

// wraps an angle into [0, 2π)
export function fixAngle(a) {
  return a - Math.PI * 2 * Math.floor(a / (Math.PI * 2));
}

export function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max);
}
