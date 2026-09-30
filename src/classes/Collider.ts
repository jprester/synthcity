import { Raycaster, Matrix4, Vector2, Sphere, MeshBasicMaterial } from 'three';
import type { Intersection, Mesh, Vector3 } from 'three';

const _inverse = new Matrix4();
const _sphere = new Sphere();

// Sphere collision against building meshes whose geometry has a BVH
// (computeBoundsTree). Only meshes within maxDist of the query are tested; that
// set is refreshed when the query point moves by updateDist.
class Collider {
  enabled = false;
  debug = false;
  meshes: Mesh[] = [];
  rayCaster = new Raycaster();

  // distance optimization
  maxDist = 600;
  updateDist = 160;
  meshesInRange: Mesh[] = [];
  vectorFromPrev: Vector2 | null = null;
  vectorFrom = new Vector2();
  vectorTo = new Vector2();

  add(mesh: Mesh): void {
    this.meshes.push(mesh);

    // console.log(this.meshes);
  }

  remove(uuid: string): void {
    const index = this.meshes.findIndex((e) => e.uuid === uuid);
    if (index != -1) this.meshes.splice(index, 1);
    const inRange = this.meshesInRange.findIndex((e) => e.uuid === uuid);
    if (inRange != -1) this.meshesInRange.splice(inRange, 1);
  }

  intersectsSphere(pos: Vector3, rad: number): boolean {
    if (!this.enabled) return false;

    this.updateMeshesInRange(pos);

    for (let i = 0; i < this.meshesInRange.length; i++) {
      // the sphere in the mesh's local space
      _inverse.copy(this.meshesInRange[i].matrixWorld).invert();
      _sphere.center.set(pos.x, pos.y, pos.z).applyMatrix4(_inverse);
      _sphere.radius = rad * _inverse.getMaxScaleOnAxis();
      const hit = this.meshesInRange[i].geometry.boundsTree!.intersectsSphere(_sphere);
      if (hit) return true;
    }

    return false;
  }

  raycast(origin: Vector3, dir: Vector3): Intersection[] {
    if (!this.enabled) return [];

    // update meshes
    this.updateMeshesInRange(origin);

    // raycast
    this.rayCaster.set(origin, dir);
    return this.rayCaster.intersectObjects(this.meshesInRange);
  }

  updateMeshesInRange(pos: Vector3): void {
    // determine whether to update meshesInRange
    let updateMeshesInRange = false;
    if (this.vectorFromPrev === null) {
      this.vectorFromPrev = new Vector2(pos.x, pos.z);
      updateMeshesInRange = true;
    } else {
      if (
        Math.round(pos.x / this.updateDist) * this.updateDist !=
          Math.round(this.vectorFromPrev.x / this.updateDist) * this.updateDist ||
        Math.round(pos.z / this.updateDist) * this.updateDist !=
          Math.round(this.vectorFromPrev.y / this.updateDist) * this.updateDist
      ) {
        this.vectorFromPrev.set(pos.x, pos.z);
        updateMeshesInRange = true;
      }
    }

    // update meshesInRange
    if (updateMeshesInRange) {
      this.meshesInRange = [];
      for (let i = 0; i < this.meshes.length; i++) {
        this.vectorFrom.set(pos.x, pos.z);
        this.vectorTo.set(this.meshes[i].position.x, this.meshes[i].position.z);
        if (this.vectorFrom.distanceTo(this.vectorTo) < this.maxDist) {
          this.meshesInRange.push(this.meshes[i]);
          // debug
          if (this.debug) {
            this.meshes[i].material = new MeshBasicMaterial({
              color: 0x444444,
              wireframe: true,
            });
          }
        }
      }
    }
  }
}

export { Collider };
