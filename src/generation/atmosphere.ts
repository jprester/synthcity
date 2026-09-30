import { hashFloat } from '../hash.ts';
import type { Seed } from '../hash.ts';
import type { DistrictKind } from './districts.ts';
import { CELL_SIZE } from './world.ts';

export const HAZE_CELL_SIZE = CELL_SIZE * 4;

// Two bands of weather per neighbourhood. Hash the world cell, never the
// camera-relative texture slot, so streaming and teleports cannot change it.
export function hazeWeather(seed: Seed, x: number, z: number, district: DistrictKind): [number, number] {
  if (district === 'mixed') return [0, 0];
  const low = hashFloat(seed, x, z, 'haze-low-density');
  const high = hashFloat(seed, x, z, 'haze-high-density');
  const amount = district === 'industrial' ? 1 : district === 'residential' ? 0.55 : 0.8;
  return [amount * (0.25 + low * 0.75), amount * Math.max(0, high - 0.35)];
}
