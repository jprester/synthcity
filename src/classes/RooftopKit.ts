import {
  BoxGeometry,
  CylinderGeometry,
  SphereGeometry,
  Mesh,
  MeshPhongMaterial,
  MeshBasicMaterial,
  Vector3,
} from 'three';
import type { BufferGeometry, Material } from 'three';
import { rooftopDetails } from '../generation/buildingDetails.ts';
import type { RoofSurface } from '../generation/buildingDetails.ts';
import type { BuildingObject } from '../generation/cityBlock.ts';
import type { DistrictKind } from '../generation/districts.ts';
import type { Seed } from '../hash.ts';
import { MeshBVH } from 'three-mesh-bvh';

// Use the inscribed circle of an actual horizontal roof triangle, rather than
// the model's bounding-box top (which often belongs to an existing antenna).
export function findRoofSurface(geometry: BufferGeometry): RoofSurface | null {
  const positions = geometry.getAttribute('position');
  if (!positions || positions.count < 3) return null;
  geometry.computeBoundingBox();
  const top = geometry.boundingBox!.max.y;
  const index = geometry.index;
  const count = index ? index.count : positions.count;
  const a = new Vector3(),
    b = new Vector3(),
    c = new Vector3();
  const ab = new Vector3(),
    ac = new Vector3(),
    cross = new Vector3();
  let largestArea = 0;
  let surface: RoofSurface | null = null;
  for (let i = 0; i < count; i += 3) {
    a.fromBufferAttribute(positions, index ? index.getX(i) : i);
    b.fromBufferAttribute(positions, index ? index.getX(i + 1) : i + 1);
    c.fromBufferAttribute(positions, index ? index.getX(i + 2) : i + 2);
    if (Math.min(a.y, b.y, c.y) < top * 0.65) continue;
    ab.subVectors(b, a);
    ac.subVectors(c, a);
    cross.crossVectors(ab, ac);
    const twiceArea = cross.length();
    if (twiceArea < largestArea || twiceArea === 0 || cross.y / twiceArea < 0.999) continue;
    const wa = b.distanceTo(c),
      wb = c.distanceTo(a),
      wc = a.distanceTo(b);
    const perimeter = wa + wb + wc;
    surface = {
      x: (a.x * wa + b.x * wb + c.x * wc) / perimeter,
      y: a.y,
      z: (a.z * wa + b.z * wb + c.z * wc) / perimeter,
      radius: twiceArea / perimeter,
    };
    largestArea = twiceArea;
  }
  return surface;
}

// Three shared low-poly shapes/materials, all drawn by the existing pool.
// No per-building textures, cloned materials or real point lights.
export class RooftopKit {
  readonly surfaces = new Map<BufferGeometry, RoofSurface | null>();
  readonly box = new BoxGeometry(1, 1, 1);
  readonly mast = new CylinderGeometry(0.5, 0.8, 1, 5);
  readonly beacon = new SphereGeometry(0.5, 6, 4);
  readonly equipmentMaterial = new MeshPhongMaterial({ color: 0x252b39, shininess: 18 });
  readonly mastMaterial = new MeshPhongMaterial({ color: 0x343844, shininess: 25 });
  readonly beaconMaterial: Material;

  constructor(
    readonly seed: Seed,
    night = true,
  ) {
    this.beaconMaterial = night ? new MeshBasicMaterial({ color: 0x9d1234 }) : this.mastMaterial;
    for (const geometry of [this.box, this.mast, this.beacon]) geometry.boundsTree = new MeshBVH(geometry);
  }

  build(
    building: BuildingObject,
    geometry: BufferGeometry,
    district: DistrictKind,
  ): Mesh<BufferGeometry, Material>[] {
    if (district === 'mixed') return [];
    if (!this.surfaces.has(geometry)) this.surfaces.set(geometry, findRoofSurface(geometry));
    const surface = this.surfaces.get(geometry);
    if (!surface) return [];
    return rooftopDetails(this.seed, building, district, surface).map((part) => {
      const geometry = part.kind === 'equipment' ? this.box : part.kind === 'mast' ? this.mast : this.beacon;
      const material =
        part.kind === 'equipment'
          ? this.equipmentMaterial
          : part.kind === 'mast'
            ? this.mastMaterial
            : this.beaconMaterial;
      const mesh = new Mesh(geometry, material);
      mesh.position.set(part.x, part.y, part.z);
      mesh.scale.set(part.width, part.height, part.depth);
      mesh.rotation.y = part.rotation;
      return mesh;
    });
  }
}
