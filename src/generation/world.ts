// World constants and helpers shared by the generators. Plain data only: no
// three.js, no DOM, no global state.

import { Perlin } from '../lib/perlin.js';
import type { Seed } from '../hash.ts';

export const CITY_BLOCK_SIZE = 128;
export const ROAD_WIDTH = 24;
export const CELL_SIZE = CITY_BLOCK_SIZE + ROAD_WIDTH;

// frequency of the low-frequency district map
export const DISTRICT_NOISE_FACTOR = 0.0017;

// Perlin noise for the district map of a world seed.
export function createDistrictNoise(seed: Seed): Perlin {
  const noise = new Perlin(seed);
  noise.noiseDetail(8, 0.5);
  return noise;
}

// greatly improves proc-noise distribution
export function fixNoise(noise: number): number {
  const inMin = 0.2;
  const inMax = 0.75;
  const outMin = 0;
  const outMax = 0.9999;
  let n = ((noise - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  if (n < outMin) n = outMin;
  if (n > outMax) n = outMax;
  return n;
}

// district value in [0, 1) at a world position
export function districtAt(noise: Perlin, x: number, z: number): number {
  return fixNoise(noise.noise(x * DISTRICT_NOISE_FACTOR, z * DISTRICT_NOISE_FACTOR));
}

// pick an element by a value in [0, 1)
export function pick<T>(list: readonly T[], value: number): T {
  return list[Math.floor(value * list.length)];
}
