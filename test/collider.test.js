import { describe, it, expect } from 'vitest';
import { BoxGeometry, BufferGeometry, Matrix4, Mesh, Object3D, Sphere, Vector3 } from 'three';
import { computeBoundsTree } from 'three-mesh-bvh';
import { Collider } from '../src/classes/Collider.js';

BufferGeometry.prototype.computeBoundsTree = computeBoundsTree;

function building(x, z, scaleY, rotation) {
  const geometry = new BoxGeometry(20, 100, 20);
  geometry.computeBoundsTree();
  const mesh = new Mesh(geometry);
  mesh.position.set(x, 50 * scaleY, z);
  mesh.scale.set(1, scaleY, 1);
  mesh.rotateY(rotation);
  mesh.updateMatrixWorld();
  return mesh;
}

// the original implementation, allocating per mesh
function originalHit(mesh, pos, rad) {
  const obj = new Object3D();
  obj.position.set(pos.x, pos.y, pos.z);
  obj.updateMatrixWorld();
  const m = new Matrix4().copy(mesh.matrixWorld).invert().multiply(obj.matrixWorld);
  const sphere = new Sphere(undefined, rad).applyMatrix4(m);
  return mesh.geometry.boundsTree.intersectsSphere(sphere);
}

describe('Collider', () => {
  it('intersectsSphere agrees with the original implementation', () => {
    for (const scaleY of [0.75, 1, 1.4]) {
      const mesh = building(0, 0, scaleY, Math.PI / 2);
      const collider = new Collider();
      collider.enabled = true;
      collider.add(mesh);
      for (let x = -20; x <= 20; x += 0.5) {
        for (const y of [10, 60, 99, 120]) {
          const pos = new Vector3(x, y, 3);
          expect(collider.intersectsSphere(pos, 1)).toBe(originalHit(mesh, pos, 1));
        }
      }
    }
  });

  it('removing an unknown mesh leaves the others alone', () => {
    const collider = new Collider();
    const a = building(0, 0, 1, 0);
    const b = building(100, 0, 1, 0);
    collider.add(a);
    collider.add(b);
    collider.remove('not-a-uuid');
    expect(collider.meshes).toEqual([a, b]);
  });

  it('stops colliding with a removed mesh right away', () => {
    const collider = new Collider();
    collider.enabled = true;
    const a = building(0, 0, 1, 0);
    collider.add(a);
    const nearWall = new Vector3(0, 50, 9.5); // the BVH tests triangles, so touch a face
    expect(collider.intersectsSphere(nearWall, 1)).toBe(true);
    collider.remove(a.uuid);
    expect(collider.intersectsSphere(nearWall, 1)).toBe(false);
  });
});
