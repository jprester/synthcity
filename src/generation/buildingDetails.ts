import { hashFloat } from '../hash.ts';
import type { Seed } from '../hash.ts';
import type { BuildingObject } from './cityBlock.ts';
import type { DistrictKind } from './districts.ts';

// Keep the original mixed district intact. Other districts get a hierarchy of
// quiet facades and occasional bright buildings, independent of model choice.
export function windowBrightness(seed: Seed, x: number, z: number, district: DistrictKind): number {
  if (district === 'mixed') return 1;
  const h = hashFloat(seed, x, z, 'window-brightness');
  const base = district === 'residential' ? 0.28 : district === 'industrial' ? 0.22 : 0.4;
  return h > 0.92 ? 0.95 : base + h * 0.35;
}

// A safe circle on a horizontal roof triangle, measured from the asset. The
// generation function consumes plain data, without depending on three.js.
export interface RoofSurface {
  x: number;
  y: number;
  z: number;
  radius: number;
}

export interface RoofPart {
  kind: 'equipment' | 'mast' | 'beacon';
  x: number;
  y: number;
  z: number;
  width: number;
  height: number;
  depth: number;
  rotation: number;
}

export function rooftopDetails(
  seed: Seed,
  building: BuildingObject,
  district: DistrictKind,
  surface: RoofSurface,
): RoofPart[] {
  const { x, z, scaleY, rotation } = building;
  const h = (salt: string) => hashFloat(seed, x, z, salt);
  const chance = district === 'industrial' ? 0.65 : district === 'downtown' ? 0.5 : 0.3;
  if (district === 'mixed' || surface.radius < 3 || h('roof-kit-presence') >= chance) return [];

  const angle = (rotation * Math.PI) / 180;
  const radius = Math.min(surface.radius, 10);
  const localX = surface.x + (h('roof-kit-x') - 0.5) * radius * 0.3;
  const localZ = surface.z + (h('roof-kit-z') - 0.5) * radius * 0.3;
  const cx = x + localX * Math.cos(angle) + localZ * Math.sin(angle);
  const cz = z - localX * Math.sin(angle) + localZ * Math.cos(angle);
  const roofY = surface.y * scaleY;
  const height = 2 + h('roof-kit-height') * 3;
  const parts: RoofPart[] = [
    {
      kind: 'equipment',
      x: cx,
      y: roofY + height / 2,
      z: cz,
      width: radius * 0.8,
      height,
      depth: radius * 0.65,
      rotation: angle,
    },
  ];
  if (district === 'residential' && h('roof-mast-presence') < 0.7) return parts;
  const mastHeight = 10 + h('roof-mast-height') * (district === 'downtown' ? 32 : 18);
  parts.push({
    kind: 'mast',
    x: cx,
    y: roofY + height + mastHeight / 2,
    z: cz,
    width: 0.35,
    height: mastHeight,
    depth: 0.35,
    rotation: angle,
  });
  parts.push({
    kind: 'beacon',
    x: cx,
    y: roofY + height + mastHeight,
    z: cz,
    width: 0.55,
    height: 0.55,
    depth: 0.55,
    rotation: angle,
  });
  return parts;
}
