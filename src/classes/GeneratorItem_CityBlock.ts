import { Mesh } from 'three';

import { hashRandom } from '../hash.ts';
import type { Random } from '../hash.ts';
import { generateBlock } from '../generation/cityBlock.ts';
import type { AdvertObject, SmokeObject, SpotlightObject, TopperObject } from '../generation/cityBlock.ts';
import type { GeneratorItem } from './Generator.ts';
import type { InstanceHandle, WorldContext } from './WorldContext.ts';
import type { BufferGeometry, Material } from 'three';

// a mesh with one material
type SingleMesh = Mesh<BufferGeometry, Material>;

// Builds one city block from generateBlock's data.
//
// Buildings, storefronts and ground are drawn through the shared InstancePool.
// Each still has an off-scene Mesh that holds its transform and serves as the
// collision proxy. Decorations are ordinary scene meshes.
//
class GeneratorItem_CityBlock implements GeneratorItem {
  x: number;
  z: number;
  context: WorldContext;
  meshes: SingleMesh[] = []; // ground; no collision
  meshesCollid: SingleMesh[] = []; // buildings and storefronts; collision proxies
  updateables: Decoration[] = [];
  instances: InstanceHandle[] = [];

  constructor(x: number, z: number, context: WorldContext) {
    this.x = x;
    this.z = z;
    this.context = context;

    const { assets, collider } = context;
    const objects = generateBlock({
      seed: context.seed,
      noise: context.noise,
      x,
      z,
      spotLights: context.spotLights,
    });

    // create in the generated order (it breaks ties in render sorting for
    // the decorations)
    for (const o of objects) {
      switch (o.kind) {
        case 'building': {
          const mesh = new Mesh(assets.getModel(o.model), assets.getMaterial(o.material));
          mesh.position.set(o.x, 0, o.z);
          mesh.scale.set(1, o.scaleY, 1);
          mesh.rotateY((o.rotation * Math.PI) / 180);
          this.meshesCollid.push(mesh);
          break;
        }
        case 'storefront': {
          const mesh = new Mesh(assets.getModel(o.model), assets.getMaterial(o.material));
          mesh.position.set(o.x, 0, o.z);
          this.meshesCollid.push(mesh);
          break;
        }
        case 'ground': {
          const mesh = new Mesh(assets.getModel(o.model), assets.getMaterial(o.material));
          mesh.rotateX(-Math.PI / 2);
          mesh.position.set(o.x, 0, o.z);
          this.meshes.push(mesh);
          break;
        }
        case 'advert':
          this.updateables.push(new Advert(o, context));
          break;
        case 'topper':
          this.updateables.push(new Topper(o, context));
          break;
        case 'smoke':
          this.updateables.push(new Smoke(o, context));
          break;
        case 'spotlight':
          this.updateables.push(new Spotlight(o, context));
          break;
      }
    }

    // draw ground and buildings as instances
    for (const mesh of [...this.meshes, ...this.meshesCollid]) {
      mesh.updateMatrixWorld();
      this.instances.push(context.instances.add(mesh.geometry, mesh.material, mesh.matrixWorld));
    }
    // buildings collide
    for (let i = 0; i < this.meshesCollid.length; i++) {
      collider.add(this.meshesCollid[i]);
    }
  }
  remove(): void {
    const { collider, instances } = this.context;
    for (let i = 0; i < this.instances.length; i++) {
      instances.remove(this.instances[i]);
    }
    for (let i = 0; i < this.updateables.length; i++) {
      this.updateables[i].remove();
    }
    for (let i = 0; i < this.meshesCollid.length; i++) {
      collider.remove(this.meshesCollid[i].uuid);
    }
  }
  update(k: number): void {
    for (let i = 0; i < this.updateables.length; i++) {
      this.updateables[i].update(k);
    }
  }
}

// building decorations

abstract class Decoration {
  context: WorldContext;
  mesh: Mesh;

  constructor(context: WorldContext, mesh: Mesh) {
    this.context = context;
    this.mesh = mesh;
    context.scene.add(mesh);
  }
  remove(): void {
    this.context.scene.remove(this.mesh);
  }
  abstract update(k: number): void;
}

class Advert extends Decoration {
  materials: readonly string[];
  interval: number;
  counter: number;
  switches: boolean;
  switchRandom: Random;

  constructor(o: AdvertObject, context: WorldContext) {
    const mesh = new Mesh(context.assets.getModel(o.model), context.assets.getMaterial(o.material));
    mesh.position.set(o.x, 0, o.z);
    super(context, mesh);
    mesh.scale.set(1, o.scaleY, 1);
    mesh.rotateY((-o.rotation * Math.PI) / 180);

    this.materials = o.materials;
    this.interval = o.interval;
    this.counter = o.counter;
    this.switches = o.switches;
    this.switchRandom = hashRandom(context.seed, o.x, o.z, 'advert-switch');
  }
  override update(k: number): void {
    if (this.switches) {
      this.counter += k;
      if (this.counter > this.interval) {
        this.counter = 0;
        this.mesh.material = this.context.assets.getMaterial(
          this.materials[Math.floor(this.switchRandom() * this.materials.length)],
        );
      }
    }
  }
}

class Topper extends Decoration {
  rdir: number;

  constructor(o: TopperObject, context: WorldContext) {
    const mesh = new Mesh(context.assets.getModel(o.model), context.assets.getMaterial(o.material));
    mesh.position.set(o.x, o.y, o.z);
    mesh.scale.set(o.scale, o.scale, o.scale);
    super(context, mesh);
    this.rdir = o.spin;
  }
  override update(k: number): void {
    this.mesh.rotation.y = this.mesh.rotation.y + this.rdir * k;
  }
}

class Smoke extends Decoration {
  rstep: number;

  constructor(o: SmokeObject, context: WorldContext) {
    const mesh = new Mesh(context.assets.getModel(o.model), context.assets.getMaterial(o.material));
    mesh.position.set(o.x, o.y, o.z);
    mesh.scale.set(o.scale, o.scaleY, o.scale);
    super(context, mesh);
    this.rstep = o.phase;
  }
  override update(k: number): void {
    this.rstep += 0.0025 * k;
    this.mesh.lookAt(this.context.player.camera.position);
    this.mesh.rotation.x += Math.cos(this.rstep) * 0.25;
  }
}

class Spotlight extends Decoration {
  rstep: number;

  constructor(o: SpotlightObject, context: WorldContext) {
    const mesh = new Mesh(context.assets.getModel(o.model), context.assets.getMaterial(o.material));
    mesh.position.set(o.x, o.y, o.z);
    mesh.scale.set(o.scale, o.scale, o.scale);
    super(context, mesh);
    this.rstep = o.phase;
  }
  override update(k: number): void {
    this.rstep += 0.01 * k;
    this.mesh.lookAt(this.context.player.camera.position);
    this.mesh.rotation.x += Math.cos(this.rstep) * 0.4;
  }
}

export { GeneratorItem_CityBlock };
