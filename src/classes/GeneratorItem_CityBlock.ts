import { BufferGeometry, Matrix4, Mesh, Object3D, Quaternion, Vector3 } from 'three';

import { hashRandom } from '../hash.ts';
import type { Random } from '../hash.ts';
import { AD_ATLASES, AD_MATERIALS, SIGN_MODELS, signData } from '../rendering/adArt.ts';
import type { AdArt } from '../rendering/adArt.ts';
import { generateBlock } from '../generation/cityBlock.ts';
import { windowBrightness } from '../generation/buildingDetails.ts';
import { districtKindAt } from '../generation/districts.ts';
import type { SmokeObject, SpotlightObject, TopperObject } from '../generation/cityBlock.ts';
import type { SignObject } from '../generation/signs.ts';
import type { HologramObject } from '../generation/holograms.ts';
import { beamGeometry, figureGeometry } from '../rendering/hologram.ts';
import type { GeneratorItem } from './Generator.ts';
import type { InstanceHandle, WorldContext } from './WorldContext.ts';
import type { Material } from 'three';

// a mesh with one material
type SingleMesh = Mesh<BufferGeometry, Material>;

// Builds one city block from generateBlock's data.
//
// Buildings, storefronts, ground and wall signs are drawn through the shared
// InstancePool. Buildings and storefronts still have an off-scene Mesh that
// holds their transform and serves as the collision proxy. Decorations are
// ordinary scene meshes.
//
class GeneratorItem_CityBlock implements GeneratorItem {
  x: number;
  z: number;
  context: WorldContext;
  meshes: SingleMesh[] = []; // ground; no collision
  meshesCollid: SingleMesh[] = []; // buildings and storefronts; collision proxies
  updateables: Updateable[] = [];
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
      objects
        .filter((o) => o.kind === 'topper' || o.kind === 'spotlight' || o.kind === 'hologram')
        .map((o) => `${o.x},${o.z}`),
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
        case 'lightbars': {
          // like the original tower ad: building position and height, rotation negated
          const holder = new Object3D();
          holder.position.set(o.x, 0, o.z);
          holder.scale.set(1, o.scaleY, 1);
          holder.rotateY((-o.rotation * Math.PI) / 180);
          holder.updateMatrixWorld();
          this.instances.push(
            context.instances.add(
              assets.getModel(o.model),
              assets.getMaterial(o.material),
              holder.matrixWorld,
            ),
          );
          break;
        }
        case 'ground': {
          const mesh = new Mesh(assets.getModel(o.model), assets.getMaterial(o.material));
          mesh.rotateX(-Math.PI / 2);
          mesh.position.set(o.x, 0, o.z);
          this.meshes.push(mesh);
          break;
        }
        case 'sign':
          this.addSign(o);
          break;
        case 'topper':
          this.updateables.push(new Topper(o, context));
          break;
        case 'hologram':
          this.updateables.push(new Hologram(o, context));
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
  // A sign: an instance of the atlas's single-sided sign quad, its art as
  // instance data. A blade sign (sticking out of the wall) is two quads back to
  // back, so it reads correctly from both sides of the street.
  addSign(o: SignObject): void {
    const { assets, instances } = this.context;
    const art = AD_ATLASES[o.atlas].entries[o.art];
    const faces = o.mount == 'blade' ? [o.yaw, o.yaw + Math.PI] : [o.yaw];
    for (const yaw of faces) {
      _position.set(o.x, o.y, o.z);
      _rotation.setFromAxisAngle(_up, yaw);
      _scale.set(o.width, o.height, 1);
      _matrix.compose(_position, _rotation, _scale);
      const handle = instances.add(
        assets.getModel(SIGN_MODELS[o.atlas]),
        assets.getMaterial(AD_MATERIALS[o.atlas]),
        _matrix,
        art.gain * signSizeGain(o.width, o.height),
        signData(art, o.effect, o.counter / o.interval),
      );
      this.instances.push(handle);
      if (o.switches) this.updateables.push(new SignSwitcher(o, handle, this.context));
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

// Emitted light grows with a sign's area, so big signs glow far harder under
// the bloom than small ones at the same intensity. Scale intensity gently by
// size, so a 300-unit banner and a small neon sign read at a similar glow.
const SIGN_REFERENCE_AREA = 40 * 40;
export function signSizeGain(width: number, height: number): number {
  // gentle: big screens should still stand out across the skyline
  return Math.min(Math.max((SIGN_REFERENCE_AREA / (width * height)) ** 0.2, 0.6), 1.2);
}

interface Updateable {
  update(k: number): void;
  remove(): void;
}

const _matrix = new Matrix4();
const _position = new Vector3();
const _rotation = new Quaternion();
const _scale = new Vector3();
const _up = new Vector3(0, 1, 0);

abstract class Decoration implements Updateable {
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

// A screen that cycles its art, wiping from one ad to the next (the sign
// shader animates the wipe). It only picks art of the same shape, so the sign
// keeps its size on the wall.
class SignSwitcher implements Updateable {
  handle: InstanceHandle;
  context: WorldContext;
  sign: SignObject;
  choices: number[]; // art indices with the sign's aspect
  entries: AdArt[];
  current: number;
  counter: number;
  random: Random;
  sizeGain: number;

  constructor(o: SignObject, handle: InstanceHandle, context: WorldContext) {
    this.handle = handle;
    this.context = context;
    this.sign = o;
    const entries = AD_ATLASES[o.atlas].entries;
    const aspect = entries[o.art].aspect;
    this.entries = entries;
    this.choices = entries.flatMap((e, i) => (Math.abs(e.aspect / aspect - 1) < 0.03 ? [i] : []));
    this.current = o.art;
    this.sizeGain = signSizeGain(o.width, o.height);
    this.counter = o.counter;
    this.random = hashRandom(context.seed, o.x, o.z, 'sign-switch');
  }
  update(k: number): void {
    this.counter += k;
    if (this.counter > this.sign.interval) {
      this.counter = 0;
      const from = this.entries[this.current];
      this.current = this.choices[Math.floor(this.random() * this.choices.length)];
      const art = this.entries[this.current];
      const { instances, time } = this.context;
      const phase = this.sign.counter / this.sign.interval;
      instances.setData(
        this.handle,
        signData(art, this.sign.effect, phase, from, time.value, from.gain * this.sizeGain),
      );
      instances.setBrightness(this.handle, art.gain * this.sizeGain);
    }
  }
  // the instance itself is freed with the block's other instances
  remove(): void {}
}

// A hologram projection: the figure turns about its upright axis to face the
// camera (it is flat); the beam is round, so it stays put.
class Hologram implements Updateable {
  context: WorldContext;
  figure: Mesh;
  beam: Mesh;

  constructor(o: HologramObject, context: WorldContext) {
    this.context = context;
    const { assets, scene } = context;
    const art = AD_ATLASES[o.atlas].entries[o.art];
    this.figure = new Mesh(
      figureGeometry(art.uv, o.hue, o.phase, o.height, art.gain),
      assets.getMaterial('hologram_' + o.atlas),
    );
    this.figure.position.set(o.x, o.y + o.lift, o.z);
    this.figure.scale.set(o.width, o.height, 1);
    // the beam rises into the figure, at most 50 units across
    const beamHeight = o.lift + o.height * 0.25;
    const beamWidth = Math.min(o.width * 0.7, 50);
    this.beam = new Mesh(beamGeometry(o.hue, o.phase, beamHeight), assets.getMaterial('hologram_beam'));
    this.beam.position.set(o.x, o.y, o.z);
    this.beam.scale.set(beamWidth, beamHeight, beamWidth);
    scene.add(this.beam);
    scene.add(this.figure);
  }
  update(): void {
    const camera = this.context.player.camera.position;
    const p = this.figure.position;
    this.figure.rotation.y = Math.atan2(camera.x - p.x, camera.z - p.z);
  }
  remove(): void {
    for (const mesh of [this.figure, this.beam]) {
      this.context.scene.remove(mesh);
      mesh.geometry.dispose();
    }
  }
}

// A spinning rooftop hologram, bobbing gently (hologram shading: AssetManager)
class Topper extends Decoration {
  rdir: number;
  baseY: number;
  rstep: number;

  constructor(o: TopperObject, context: WorldContext) {
    const material = context.assets.getMaterial(o.material.replace('ads_large_', 'hologram_large_'));
    const mesh = new Mesh(context.assets.getModel(o.model), material);
    mesh.position.set(o.x, o.y, o.z);
    mesh.scale.set(o.scale, o.scale, o.scale);
    super(context, mesh);
    this.rdir = o.spin;
    this.baseY = o.y;
    this.rstep = o.spin * 1000; // phase, out of step between toppers
  }
  override update(k: number): void {
    this.mesh.rotation.y = this.mesh.rotation.y + this.rdir * k;
    this.rstep += 0.02 * k;
    this.mesh.position.y = this.baseY + Math.sin(this.rstep) * 2.5;
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
