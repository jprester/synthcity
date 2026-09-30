import { Vector2, Mesh } from 'three';

import { generateTrafficCell } from '../generation/traffic.ts';
import type { CarSpawn } from '../generation/traffic.ts';
import type { GeneratorItem } from './Generator.ts';
import type { WorldContext } from './WorldContext.ts';

// Spawns and moves the cars of one traffic cell.
class GeneratorItem_Traffic implements GeneratorItem {
  x: number;
  z: number;
  cars: Car[];

  constructor(x: number, z: number, context: WorldContext) {
    this.x = x;
    this.z = z;

    this.cars = generateTrafficCell({ seed: context.seed, x, z }).map((c) => new Car(c, context));
  }
  remove(): void {
    for (var i = 0; i < this.cars.length; i++) {
      this.cars[i].remove();
    }
  }
  update(k: number): void {
    for (var i = 0; i < this.cars.length; i++) {
      this.cars[i].update(k);
    }
  }
}

class Car {
  context: WorldContext;
  x: number;
  z: number;
  alt: number;
  alt_offset: number;
  speed_factor: number;
  reverseDistance: number;
  v: Vector2;
  mesh: Mesh;

  constructor(c: CarSpawn, context: WorldContext) {
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
  remove(): void {
    this.context.scene.remove(this.mesh);
  }
  update(k: number): void {
    if (this.mesh != null) {
      this.x += this.v.x * this.speed_factor * k;
      this.z += this.v.y * this.speed_factor * k;

      this.mesh.position.set(this.x, this.alt + this.alt_offset, this.z);

      // turn around when too far from the player
      if (this.mesh.position.distanceTo(this.context.player.body.position) > this.reverseDistance) {
        this.v.multiplyScalar(-1);
      }
    }
  }
}

export { GeneratorItem_Traffic };
