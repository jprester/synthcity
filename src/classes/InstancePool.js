import { InstancedMesh, DynamicDrawUsage, Frustum, Matrix4, Sphere } from 'three';

const INITIAL_CAPACITY = 64;

const _frustum = new Frustum();
const _projScreen = new Matrix4();
const _sphere = new Sphere();

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
  constructor(scene) {
    this.scene = scene;
    this.batches = new Map(); // geometry -> Map(material -> Batch)
  }

  // Adds an instance with the given world matrix; returns a handle for remove().
  add(geometry, material, matrix) {
    let byMaterial = this.batches.get(geometry);
    if (!byMaterial) this.batches.set(geometry, (byMaterial = new Map()));
    let batch = byMaterial.get(material);
    if (!batch) byMaterial.set(material, (batch = new Batch(this.scene, geometry, material)));
    return batch.add(matrix);
  }

  remove(handle) {
    handle.batch.remove(handle);
  }

  // Call once per frame before rendering with the camera being rendered.
  cull(camera) {
    camera.updateWorldMatrix(true, false);
    _projScreen.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
    _frustum.setFromProjectionMatrix(_projScreen);
    for (const byMaterial of this.batches.values()) {
      for (const batch of byMaterial.values()) batch.cull(_frustum);
    }
  }

  // number of instanced draw calls (batches with visible instances)
  get drawCount() {
    let n = 0;
    for (const byMaterial of this.batches.values()) {
      for (const batch of byMaterial.values()) if (batch.mesh.visible) n++;
    }
    return n;
  }
}

class Batch {
  constructor(scene, geometry, material) {
    this.scene = scene;
    this.geometry = geometry;
    this.material = material;
    if (geometry.boundingSphere === null) geometry.computeBoundingSphere();

    this.handles = [];
    this.capacity = 0;
    this.matrices = new Float32Array(0); // every instance, 16 per slot
    this.spheres = new Float64Array(0); // world bounding sphere, 4 per slot
    this.mesh = null;
    this.grow(INITIAL_CAPACITY);
  }

  grow(capacity) {
    const matrices = new Float32Array(capacity * 16);
    matrices.set(this.matrices);
    this.matrices = matrices;
    const spheres = new Float64Array(capacity * 4);
    spheres.set(this.spheres);
    this.spheres = spheres;
    this.capacity = capacity;

    const mesh = new InstancedMesh(this.geometry, this.material, capacity);
    mesh.instanceMatrix.setUsage(DynamicDrawUsage);
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

  add(matrix) {
    if (this.handles.length == this.capacity) this.grow(this.capacity * 2);
    const handle = { batch: this, index: this.handles.length };
    this.handles.push(handle);
    matrix.toArray(this.matrices, handle.index * 16);
    _sphere.copy(this.geometry.boundingSphere).applyMatrix4(matrix);
    this.spheres[handle.index * 4] = _sphere.center.x;
    this.spheres[handle.index * 4 + 1] = _sphere.center.y;
    this.spheres[handle.index * 4 + 2] = _sphere.center.z;
    this.spheres[handle.index * 4 + 3] = _sphere.radius;
    return handle;
  }

  remove(handle) {
    const last = this.handles.pop();
    if (last !== handle) {
      // move the last instance into the freed slot
      const i = handle.index;
      const j = last.index;
      this.matrices.copyWithin(i * 16, j * 16, j * 16 + 16);
      this.spheres.copyWithin(i * 4, j * 4, j * 4 + 4);
      last.index = i;
      this.handles[i] = last;
    }
    handle.batch = null;
  }

  cull(frustum) {
    const out = this.mesh.instanceMatrix.array;
    let count = 0;
    for (let i = 0; i < this.handles.length; i++) {
      const s = i * 4;
      _sphere.center.set(this.spheres[s], this.spheres[s + 1], this.spheres[s + 2]);
      _sphere.radius = this.spheres[s + 3];
      if (!frustum.intersectsSphere(_sphere)) continue;
      out.set(this.matrices.subarray(i * 16, i * 16 + 16), count * 16);
      count++;
    }
    this.mesh.count = count;
    this.mesh.visible = count > 0;
    if (count > 0) this.mesh.instanceMatrix.needsUpdate = true;
  }
}
