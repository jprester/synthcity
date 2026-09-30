import { BufferAttribute, BufferGeometry, Mesh } from 'three';

import { hashRandom } from '../hash.ts';
import type { Random } from '../hash.ts';
import { AD_ATLASES, adPanels, fillAdUVs } from '../rendering/adArt.ts';
import type { AdAtlas, AdPanel } from '../rendering/adArt.ts';
import { generateBlock } from '../generation/cityBlock.ts';
import { windowBrightness } from '../generation/buildingDetails.ts';
import { districtKindAt } from '../generation/districts.ts';
import type { AdvertObject, SmokeObject, SpotlightObject, TopperObject } from '../generation/cityBlock.ts';
import type { GeneratorItem } from './Generator.ts';
import type { InstanceHandle, WorldContext } from './WorldContext.ts';
import type { Material } from 'three';

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
  detailMeshes: SingleMesh[] = []; // procedural rooftop collision proxies

  constructor(x: number, z: number, context: WorldContext) {
    this.x = x;
    this.z = z;
    this.context = context;

    const { assets, collider } = context;
    const district = districtKindAt(context.noise, x, z);
    const brightness = new Map<SingleMesh, number>();
    const objects = generateBlock({
      seed: context.seed,
      noise: context.noise,
      x,
      z,
      spotLights: context.spotLights,
    });
    const occupiedRoofs = new Set(
      objects.filter((o) => o.kind === 'topper' || o.kind === 'spotlight').map((o) => `${o.x},${o.z}`),
    );

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
          brightness.set(mesh, windowBrightness(context.seed, o.x, o.z, district));
          if (context.rooftops && !occupiedRoofs.has(`${o.x},${o.z}`)) {
            this.detailMeshes.push(...context.rooftops.build(o, mesh.geometry, district));
          }
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
    for (const mesh of [...this.meshes, ...this.meshesCollid, ...this.detailMeshes]) {
      mesh.updateMatrixWorld();
      this.instances.push(
        context.instances.add(mesh.geometry, mesh.material, mesh.matrixWorld, brightness.get(mesh)),
      );
    }
    // buildings collide
    for (const mesh of [...this.meshesCollid, ...this.detailMeshes]) {
      collider.add(mesh);
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
    for (const mesh of [...this.meshesCollid, ...this.detailMeshes]) {
      collider.remove(mesh.uuid);
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
  interval: number;
  counter: number;
  switches: boolean;
  switchRandom: Random;
  atlas: AdAtlas;
  panels: AdPanel[];
  uv: BufferAttribute;

  constructor(o: AdvertObject, context: WorldContext) {
    // the model's positions and normals are shared; each ad has its own UVs
    const model = context.assets.getModel(o.model);
    const geometry = new BufferGeometry();
    geometry.name = model.name;
    geometry.setAttribute('position', model.attributes.position);
    geometry.setAttribute('normal', model.attributes.normal);
    const uv = new BufferAttribute(new Float32Array(model.attributes.position.count * 2), 2);
    geometry.setAttribute('uv', uv);
    if (model.boundingSphere === null) model.computeBoundingSphere();
    geometry.boundingSphere = model.boundingSphere;

    const mesh = new Mesh(geometry, context.assets.getMaterial(o.material));
    mesh.position.set(o.x, 0, o.z);
    super(context, mesh);
    mesh.scale.set(1, o.scaleY, 1);
    mesh.rotateY((-o.rotation * Math.PI) / 180);

    this.uv = uv;
    this.atlas = AD_ATLASES[o.material == 'ads_neon' ? 'neon' : 'posters'];
    this.panels = adPanels(model);
    fillAdUVs(
      uv.array as Float32Array,
      this.panels,
      this.atlas,
      hashRandom(context.seed, o.x, o.z, 'advert-art'),
    );

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
        fillAdUVs(this.uv.array as Float32Array, this.panels, this.atlas, this.switchRandom);
        this.uv.needsUpdate = true;
      }
    }
  }
  override remove(): void {
    super.remove();
    // Free the ad's own UV buffer. dispose() frees the GPU buffers of every
    // attribute still attached, so detach the shared model buffers first.
    const geometry = this.mesh.geometry;
    geometry.deleteAttribute('position');
    geometry.deleteAttribute('normal');
    geometry.dispose();
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
