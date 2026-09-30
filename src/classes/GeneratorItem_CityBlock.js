import { Mesh } from 'three';

import { hashRandom } from '../hash.js';
import { generateBlock } from '../generation/cityBlock.js';

// Builds one city block from generateBlock's data.
//
// Buildings, storefronts and ground are drawn through the shared InstancePool.
// Each still has an off-scene Mesh that holds its transform and serves as the
// collision proxy. Decorations are ordinary scene meshes.
//
// context: { seed, noise, spotLights, assets, scene, collider, player, instances }
class GeneratorItem_CityBlock {
  constructor(x, z, context) {
    this.x = x;
    this.z = z;
    this.context = context;

    this.meshes = []; // no collision
    this.meshesCollid = [];
    this.updateables = [];
    this.instances = [];

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
          let mesh = new Mesh(assets.getModel(o.model), assets.getMaterial(o.material));
          mesh.position.set(o.x, 0, o.z);
          mesh.scale.set(1, o.scaleY, 1);
          mesh.rotateY((o.rotation * Math.PI) / 180);
          this.meshesCollid.push(mesh);
          break;
        }
        case 'storefront': {
          let mesh = new Mesh(assets.getModel(o.model), assets.getMaterial(o.material));
          mesh.position.set(o.x, 0, o.z);
          this.meshesCollid.push(mesh);
          break;
        }
        case 'ground': {
          let mesh = new Mesh(assets.getModel(o.model), assets.getMaterial(o.material));
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
  remove() {
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
  update() {
    for (let i = 0; i < this.updateables.length; i++) {
      this.updateables[i].update();
    }
  }
}

// building decorations

class Decoration {
  constructor(context, mesh) {
    this.context = context;
    this.mesh = mesh;
    context.scene.add(mesh);
  }
  remove() {
    this.context.scene.remove(this.mesh);
  }
}

class Advert extends Decoration {
  constructor(o, context) {
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
  update() {
    if (this.switches) {
      this.counter++;
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
  constructor(o, context) {
    const mesh = new Mesh(context.assets.getModel(o.model), context.assets.getMaterial(o.material));
    mesh.position.set(o.x, o.y, o.z);
    mesh.scale.set(o.scale, o.scale, o.scale);
    super(context, mesh);
    this.rdir = o.spin;
  }
  update() {
    this.mesh.rotation.y = this.mesh.rotation.y + this.rdir;
  }
}

class Smoke extends Decoration {
  constructor(o, context) {
    const mesh = new Mesh(context.assets.getModel(o.model), context.assets.getMaterial(o.material));
    mesh.position.set(o.x, o.y, o.z);
    mesh.scale.set(o.scale, o.scaleY, o.scale);
    super(context, mesh);
    this.rstep = o.phase;
  }
  update() {
    this.rstep += 0.0025;
    this.mesh.lookAt(this.context.player.camera.position);
    this.mesh.rotation.x += Math.cos(this.rstep) * 0.25;
  }
}

class Spotlight extends Decoration {
  constructor(o, context) {
    const mesh = new Mesh(context.assets.getModel(o.model), context.assets.getMaterial(o.material));
    mesh.position.set(o.x, o.y, o.z);
    mesh.scale.set(o.scale, o.scale, o.scale);
    super(context, mesh);
    this.rstep = o.phase;
  }
  update() {
    this.rstep += 0.01;
    this.mesh.lookAt(this.context.player.camera.position);
    this.mesh.rotation.x += Math.cos(this.rstep) * 0.4;
  }
}

export { GeneratorItem_CityBlock };
