// What generator items (city blocks, lights, traffic) get from the game.
// Game.init builds one and passes it through each Generator. The members are
// narrow structural types so tests can pass lightweight fakes.

import type { BufferGeometry, Material, Matrix4, Mesh, Object3D, PointLight, Vector3 } from 'three';
import type { Seed } from '../hash.ts';
import type { Perlin } from '../lib/perlin.js';
import type { BuildingObject } from '../generation/cityBlock.ts';
import type { DistrictKind } from '../generation/districts.ts';

export interface AssetSource {
  getModel(key: string): BufferGeometry;
  getMaterial(key: string): Material;
}

export interface SceneLike {
  add(object: Object3D): unknown;
  remove(object: Object3D): unknown;
}

export interface ColliderLike {
  add(mesh: Mesh): void;
  remove(uuid: string): void;
}

// opaque handle for one instance in the pool
export interface InstanceHandle {
  readonly index?: number;
}

export interface InstancesLike {
  add(
    geometry: BufferGeometry,
    material: Material,
    matrix: Matrix4,
    brightness?: number,
    data?: ArrayLike<number>, // per-instance data (InstancePool INSTANCE_DATA)
  ): InstanceHandle;
  setData(handle: InstanceHandle, data: ArrayLike<number>, offset?: number): void;
  setBrightness(handle: InstanceHandle, brightness: number): void;
  remove(handle: InstanceHandle): void;
}

export interface RooftopSource {
  build(
    building: BuildingObject,
    geometry: BufferGeometry,
    district: DistrictKind,
  ): Mesh<BufferGeometry, Material>[];
}

// the player as seen by the world: decorations face the camera, traffic turns
// around relative to the body
export interface Viewer {
  camera: { position: Vector3 };
  body: { position: Vector3 };
}

// a pooled district light (see GeneratorItem_CityLight)
export interface CityLight {
  light: PointLight;
  free: boolean;
}

export interface WorldContext {
  seed: Seed;
  noise: Perlin;
  spotLights: boolean;
  assets: AssetSource;
  scene: SceneLike;
  collider: ColliderLike;
  player: Viewer;
  cityLights: CityLight[];
  instances: InstancesLike;
  rooftops?: RooftopSource;
  time: { readonly value: number }; // world time in seconds, the shaders' animation clock
}
