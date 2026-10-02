import { describe, it, expect } from 'vitest';
import {
  BoxGeometry,
  BufferGeometry,
  Frustum,
  InterleavedBufferAttribute,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
} from 'three';
import { DATA_SIZE, INSTANCE_DATA, InstancePool } from '../src/classes/InstancePool.ts';
import type { Batch, PoolHandle } from '../src/classes/InstancePool.ts';

const translation = (x: number, z = 0) => new Matrix4().makeTranslation(x, 0, z);

// x translation of every instance of a batch, in slot order
const xs = (batch: Batch) => batch.handles.map((h, i) => batch.matrices[i * 16 + 12]);

describe('InstancePool', () => {
  it('keeps emission attached to its transform through growth, removal and culling', () => {
    const pool = new InstancePool(new Scene());
    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshBasicMaterial();
    const handles = Array.from({ length: 100 }, (_, i) =>
      pool.add(geometry, material, translation(i - 50), i / 100),
    );
    pool.remove(handles[4]); // swaps the final handle into slot 4
    pool.remove(handles[23]);
    const camera = new PerspectiveCamera(50, 1, 1, 1000);
    camera.position.set(0, 0, 30);
    pool.cull(camera);
    const mesh = handles[0].batch!.mesh;
    expect(mesh.count).toBeGreaterThan(0);
    expect(mesh.count).toBeLessThan(98);
    for (let i = 0; i < mesh.count; i++) {
      const matrix = new Matrix4();
      mesh.getMatrixAt(i, matrix);
      const originalIndex = matrix.elements[12] + 50;
      const colors = mesh.instanceColor!.array;
      for (let channel = 0; channel < 3; channel++) {
        expect(colors[i * 3 + channel]).toBeCloseTo(originalIndex / 100);
      }
    }
    // An unmodified material/default instance retains a neutral colour.
    const neutral = pool.add(geometry, material, translation(0));
    expect(neutral.batch!.brightness[neutral.index]).toBe(1);
  });

  it('groups instances by geometry and material', () => {
    const scene = new Scene();
    const pool = new InstancePool(scene);
    const [g1, g2] = [new BoxGeometry(), new BoxGeometry()];
    const [m1, m2] = [new MeshBasicMaterial(), new MeshBasicMaterial()];
    pool.add(g1, m1, translation(1));
    pool.add(g1, m1, translation(2));
    pool.add(g1, m2, translation(3));
    pool.add(g2, m1, translation(4));
    expect(scene.children.length).toBe(3);
  });

  it('keeps instances packed when removing, and handles stay valid', () => {
    const pool = new InstancePool(new Scene());
    const g = new BoxGeometry();
    const m = new MeshBasicMaterial();
    const h = [0, 1, 2, 3].map((x) => pool.add(g, m, translation(x)));
    const batch = h[0].batch!;
    pool.remove(h[1]);
    expect(xs(batch)).toEqual([0, 3, 2]);
    pool.remove(h[3]); // was moved into slot 1
    expect(xs(batch)).toEqual([0, 2]);
    pool.remove(h[2]); // the last one
    expect(xs(batch)).toEqual([0]);
    pool.remove(h[0]);
    expect(xs(batch)).toEqual([]);
  });

  it('grows past its initial capacity, keeping matrices and the scene tidy', () => {
    const scene = new Scene();
    const pool = new InstancePool(scene);
    const g = new BufferGeometry();
    const m = new MeshBasicMaterial();
    const handles: PoolHandle[] = [];
    for (let x = 0; x < 300; x++) handles.push(pool.add(g, m, translation(x)));
    const batch = handles[0].batch!;
    expect(scene.children).toEqual([batch.mesh]);
    expect(xs(batch)).toEqual([...Array(300).keys()]);
    for (let x = 0; x < 300; x += 2) pool.remove(handles[x]);
    expect(xs(batch).sort((a: number, b: number) => a - b)).toEqual(
      [...Array(150).keys()].map((i) => 2 * i + 1),
    );
  });

  it('culls exactly like three.js culls separate meshes', () => {
    const pool = new InstancePool(new Scene());
    const g = new BoxGeometry(10, 40, 10);
    const m = new MeshBasicMaterial();
    const camera = new PerspectiveCamera(50, 16 / 9, 0.15, 2800);
    camera.position.set(3, 20, 7);
    camera.rotation.set(0.1, 0.7, 0);

    const meshes = [];
    for (let x = -30; x <= 30; x++) {
      for (let z = -30; z <= 30; z++) {
        const mesh = new Mesh(g, m);
        mesh.position.set(x * 50, 0, z * 50);
        mesh.scale.set(1, 1 + ((x * z) % 3), 1);
        mesh.rotateY(x);
        mesh.updateMatrixWorld();
        pool.add(g, m, mesh.matrixWorld);
        meshes.push(mesh);
      }
    }
    pool.cull(camera);

    const frustum = new Frustum().setFromProjectionMatrix(
      new Matrix4().multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse),
    );
    const visible = meshes.filter((mesh) => frustum.intersectsObject(mesh)).map((mesh) => mesh.matrixWorld);
    const batch = pool.batches.get(g)!.get(m)!;
    expect(batch.mesh.count).toBe(visible.length);
    expect(visible.length).toBeGreaterThan(0);
    expect(visible.length).toBeLessThan(meshes.length);
    const drawn: number[][] = [];
    for (let i = 0; i < batch.mesh.count; i++) {
      const mat = new Matrix4();
      batch.mesh.getMatrixAt(i, mat);
      drawn.push(mat.elements);
    }
    expect(drawn).toEqual(visible.map((mat) => Array.from(new Float32Array(mat.elements))));
  });

  it('keeps per-instance data with its transform, and exposes every vec4 to the shader', () => {
    const pool = new InstancePool(new Scene());
    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshBasicMaterial();
    // data: the instance's x in every slot, so the packed buffer can be checked against the matrix
    const handles = Array.from({ length: 100 }, (_, i) =>
      pool.add(geometry, material, translation(i - 50), 1, new Array(DATA_SIZE).fill(i - 50)),
    );
    pool.remove(handles[4]);
    pool.setData(handles[50], [7, 7, 7, 7], 8); // only the third vec4
    let updated = false;
    const camera = new PerspectiveCamera(50, 1, 1, 1000);
    camera.position.set(0, 0, 30);
    pool.cull(camera);
    const attributes = INSTANCE_DATA.map((name) => geometry.getAttribute(name) as InterleavedBufferAttribute);
    expect(attributes.map((a) => a.offset)).toEqual([0, 4, 8]);
    const mesh = handles[0].batch!.mesh;
    expect(mesh.count).toBeGreaterThan(0);
    for (let i = 0; i < mesh.count; i++) {
      const matrix = new Matrix4();
      mesh.getMatrixAt(i, matrix);
      const x = matrix.elements[12];
      const expected = x == 0 ? [x, x, x, x, x, x, x, x, 7, 7, 7, 7] : new Array(DATA_SIZE).fill(x);
      expect(attributes.flatMap((a) => [a.getX(i), a.getY(i), a.getZ(i), a.getW(i)])).toEqual(expected);
      if (x == 0) updated = true;
    }
    expect(updated).toBe(true);
  });
});
