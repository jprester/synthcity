import { Vector2, Mesh } from 'three';

import { generateTrafficCell } from '../generation/traffic.js';

// Spawns and moves the cars of one traffic cell.
//
// context: { seed, assets, scene, player }
class GeneratorItem_Traffic {
  constructor(x, z, context) {
    this.x = x;
    this.z = z;

    this.cars = generateTrafficCell({ seed: context.seed, x, z }).map((c) => new Car(c, context));
  }
  remove() {
    for (var i = 0; i < this.cars.length; i++) {
      this.cars[i].remove();
    }
  }
  update() {
    for (var i = 0; i < this.cars.length; i++) {
      this.cars[i].update();
    }
  }
}

class Car {
  constructor(c, context) {
    this.context = context;

    this.x = c.x;
    this.z = c.z;
    this.alt = c.alt;
    this.alt_offset = c.altOffset;
    this.speed_factor = c.speedFactor;
    this.reverseDistance = c.reverseDistance;
    this.v = new Vector2(c.vx, c.vz);

    this.mesh = new Mesh(context.assets.getModel(c.model), context.assets.getMaterial('cars'));
    this.mesh.position.set(c.spawnX, 0, c.spawnZ + c.meshZOffset);
    context.scene.add(this.mesh);
    if (c.rotation !== null) this.mesh.rotateY(c.rotation);
  }
  remove() {
    this.context.scene.remove(this.mesh);
  }
  update() {
    if (this.mesh != null) {
      this.x += this.v.x * this.speed_factor;
      this.z += this.v.y * this.speed_factor;

      this.mesh.position.set(this.x, this.alt + this.alt_offset, this.z);

      // turn around when too far from the player
      if (this.mesh.position.distanceTo(this.context.player.body.position) > this.reverseDistance) {
        this.v.multiplyScalar(-1);
      }
    }
  }
}

export { GeneratorItem_Traffic };
