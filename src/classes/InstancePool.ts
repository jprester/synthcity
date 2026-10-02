import {
  InstancedMesh,
  InstancedBufferAttribute,
  InstancedInterleavedBuffer,
  InterleavedBufferAttribute,
  DynamicDrawUsage,
  Frustum,
  Matrix4,
  Sphere,
} from 'three';
import type { BufferGeometry, Camera, Material } from 'three';
import type { InstanceHandle, SceneLike } from './WorldContext.ts';

export interface PoolHandle extends InstanceHandle {
  batch: Batch | null;
  index: number;
}

const INITIAL_CAPACITY = 64;

const _frustum = new Frustum();
const _projScreen = new Matrix4();
const _sphere = new Sphere();

// Optional per-instance data: DATA_SIZE floats, read in the material's shader
// as the vec4 attributes named in INSTANCE_DATA (e.g. a sign's art rectangle,
// the art it is switching from and its animation state). It is stored on the
// geometry, so a geometry that carries data must be used by one batch only.
export const INSTANCE_DATA = ['instanceData', 'instancePrev', 'instanceAnim'];
export const DATA_SIZE = 4 * INSTANCE_DATA.length;

// Draws many static objects that share a geometry and material with one
// InstancedMesh per (geometry, material) pair. Slots are handed out and freed
// as city blocks stream in and out; freeing moves the last instance into the
// hole, so the instances stay packed.
//
// A batch spans the whole visible disc, so three.js can't frustum cull it.
// cull() does it per instance instead, with the same bounding-sphere test the
// renderer uses per mesh, and packs the visible instances (in slot order) into
// the InstancedMesh.
export class InstancePool {
  scene: SceneLike;
  batches = new Map<BufferGeometry, Map<Material, Batch>>();

  constructor(scene: SceneLike) {
    this.scene = scene;
  }

  // Adds an instance with the given world matrix; returns a handle for remove().
  add(
    geometry: BufferGeometry,
    material: Material,
    matrix: Matrix4,
    brightness?: number,
    data?: ArrayLike<number>,
  ): PoolHandle {
    let byMaterial = this.batches.get(geometry);
    if (!byMaterial) this.batches.set(geometry, (byMaterial = new Map()));
    let batch = byMaterial.get(material);
    if (!batch) byMaterial.set(material, (batch = new Batch(this.scene, geometry, material)));
    return batch.add(matrix, brightness, data);
  }

  // Replaces an instance's brightness (takes effect at the next cull).
  setBrightness(handle: InstanceHandle, brightness: number): void {
    const h = handle as PoolHandle;
    if (!h.batch) throw new Error('InstancePool: instance already removed');
    h.batch.brightness[h.index] = brightness;
  }

  // Replaces an instance's per-instance data from offset on (takes effect at
  // the next cull).
  setData(handle: InstanceHandle, data: ArrayLike<number>, offset = 0): void {
    const h = handle as PoolHandle;
    if (!h.batch) throw new Error('InstancePool: instance already removed');
    h.batch.data.set(data, h.index * DATA_SIZE + offset);
  }

  remove(handle: InstanceHandle): void {
    const h = handle as PoolHandle;
    if (!h.batch) throw new Error('InstancePool: instance already removed');
    h.batch.remove(h);
  }

  // Call once per frame before rendering with the camera being rendered.
  cull(camera: Camera): void {
    camera.updateWorldMatrix(true, false);
    _projScreen.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
    _frustum.setFromProjectionMatrix(_projScreen);
    for (const byMaterial of this.batches.values()) {
      for (const batch of byMaterial.values()) batch.cull(_frustum);
    }
  }

  // number of instanced draw calls (batches with visible instances)
  get drawCount(): number {
    let n = 0;
    for (const byMaterial of this.batches.values()) {
      for (const batch of byMaterial.values()) if (batch.mesh.visible) n++;
    }
    return n;
  }
}

export class Batch {
  scene: SceneLike;
  geometry: BufferGeometry;
  material: Material;
  handles: PoolHandle[] = [];
  capacity = 0;
  matrices = new Float32Array(0); // every instance, 16 per slot
  spheres = new Float64Array(0); // world bounding sphere, 4 per slot
  brightness = new Float32Array(0); // window emission multiplier per slot
  hasBrightness = false;
  data = new Float32Array(0); // INSTANCE_DATA, DATA_SIZE per slot
  hasData = false;
  mesh!: InstancedMesh;

  constructor(scene: SceneLike, geometry: BufferGeometry, material: Material) {
    this.scene = scene;
    this.geometry = geometry;
    this.material = material;
    if (geometry.boundingSphere === null) geometry.computeBoundingSphere();
    this.grow(INITIAL_CAPACITY);
  }

  grow(capacity: number): void {
    const matrices = new Float32Array(capacity * 16);
    matrices.set(this.matrices);
    this.matrices = matrices;
    const spheres = new Float64Array(capacity * 4);
    spheres.set(this.spheres);
    this.spheres = spheres;
    const brightness = new Float32Array(capacity);
    brightness.set(this.brightness);
    this.brightness = brightness;
    const data = new Float32Array(capacity * DATA_SIZE);
    data.set(this.data);
    this.data = data;
    this.capacity = capacity;
    if (this.hasData) this.attachData();

    const mesh = new InstancedMesh(this.geometry, this.material, capacity);
    mesh.instanceMatrix.setUsage(DynamicDrawUsage);
    if (this.hasBrightness) {
      mesh.instanceColor = new InstancedBufferAttribute(new Float32Array(capacity * 3), 3);
      mesh.instanceColor.setUsage(DynamicDrawUsage);
    }
    mesh.frustumCulled = false;
    mesh.matrixAutoUpdate = false;
    mesh.count = 0;
    mesh.visible = false;
    if (this.mesh) {
      this.scene.remove(this.mesh);
      this.mesh.dispose();
    }
    this.scene.add(mesh);
    this.mesh = mesh;
  }

  // the packed (visible) per-instance data the shader reads
  attachData(): void {
    const buffer = new InstancedInterleavedBuffer(new Float32Array(this.capacity * DATA_SIZE), DATA_SIZE);
    buffer.setUsage(DynamicDrawUsage);
    INSTANCE_DATA.forEach((name, i) =>
      this.geometry.setAttribute(name, new InterleavedBufferAttribute(buffer, 4, i * 4)),
    );
  }

  add(matrix: Matrix4, brightness?: number, data?: ArrayLike<number>): PoolHandle {
    if (this.handles.length == this.capacity) this.grow(this.capacity * 2);
    if (data !== undefined && !this.hasData) {
      this.hasData = true;
      this.attachData();
    }
    if (data !== undefined) {
      this.data.fill(0, this.handles.length * DATA_SIZE, (this.handles.length + 1) * DATA_SIZE);
      this.data.set(data, this.handles.length * DATA_SIZE);
    }
    if (brightness !== undefined && !this.hasBrightness) {
      this.hasBrightness = true;
      this.mesh.instanceColor = new InstancedBufferAttribute(new Float32Array(this.capacity * 3), 3);
      this.mesh.instanceColor.setUsage(DynamicDrawUsage);
    }
    const handle: PoolHandle = { batch: this, index: this.handles.length };
    this.handles.push(handle);
    matrix.toArray(this.matrices, handle.index * 16);
    this.brightness[handle.index] = brightness ?? 1;
    _sphere.copy(this.geometry.boundingSphere!).applyMatrix4(matrix);
    this.spheres[handle.index * 4] = _sphere.center.x;
    this.spheres[handle.index * 4 + 1] = _sphere.center.y;
    this.spheres[handle.index * 4 + 2] = _sphere.center.z;
    this.spheres[handle.index * 4 + 3] = _sphere.radius;
    return handle;
  }

  remove(handle: PoolHandle): void {
    const last = this.handles.pop()!;
    if (last !== handle) {
      // move the last instance into the freed slot
      const i = handle.index;
      const j = last.index;
      this.matrices.copyWithin(i * 16, j * 16, j * 16 + 16);
      this.spheres.copyWithin(i * 4, j * 4, j * 4 + 4);
      this.brightness[i] = this.brightness[j];
      this.data.copyWithin(i * DATA_SIZE, j * DATA_SIZE, (j + 1) * DATA_SIZE);
      last.index = i;
      this.handles[i] = last;
    }
    handle.batch = null;
  }

  cull(frustum: Frustum): void {
    const out = this.mesh.instanceMatrix.array;
    const colors = this.mesh.instanceColor?.array;
    const dataBuffer = this.hasData
      ? (this.geometry.getAttribute(INSTANCE_DATA[0]) as InterleavedBufferAttribute).data
      : null;
    const packed = dataBuffer?.array as Float32Array | undefined;
    let count = 0;
    for (let i = 0; i < this.handles.length; i++) {
      const s = i * 4;
      _sphere.center.set(this.spheres[s], this.spheres[s + 1], this.spheres[s + 2]);
      _sphere.radius = this.spheres[s + 3];
      if (!frustum.intersectsSphere(_sphere)) continue;
      out.set(this.matrices.subarray(i * 16, i * 16 + 16), count * 16);
      if (colors) colors.fill(this.brightness[i], count * 3, count * 3 + 3);
      if (packed) packed.set(this.data.subarray(i * DATA_SIZE, (i + 1) * DATA_SIZE), count * DATA_SIZE);
      count++;
    }
    this.mesh.count = count;
    this.mesh.visible = count > 0;
    if (count > 0) {
      this.mesh.instanceMatrix.needsUpdate = true;
      if (this.mesh.instanceColor) this.mesh.instanceColor.needsUpdate = true;
      if (dataBuffer) dataBuffer.needsUpdate = true;
    }
  }
}
