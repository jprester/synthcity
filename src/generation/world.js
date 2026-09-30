// World constants and helpers shared by the generators. Plain data only: no
// three.js, no DOM, no global state.

import { Perlin } from '../lib/perlin.js';

export const CITY_BLOCK_SIZE = 128;
export const ROAD_WIDTH = 24;
export const CELL_SIZE = CITY_BLOCK_SIZE + ROAD_WIDTH;

// frequency of the low-frequency district map
export const DISTRICT_NOISE_FACTOR = 0.0017;

// Perlin noise for the district map of a world seed.
export function createDistrictNoise(seed) {
  const noise = new Perlin(seed);
  noise.noiseDetail(8, 0.5);
  return noise;
}

// greatly improves proc-noise distribution
export function fixNoise(noise) {
  let inMin = 0.2;
  let inMax = 0.75;
  let outMin = 0;
  let outMax = 0.9999;
  let n = ((noise - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  if (n < outMin) n = outMin;
  if (n > outMax) n = outMax;
  return n;
}

// district value in [0, 1) at a world position
export function districtAt(noise, x, z) {
  return fixNoise(noise.noise(x * DISTRICT_NOISE_FACTOR, z * DISTRICT_NOISE_FACTOR));
}

// pick an element by a value in [0, 1)
export function pick(list, value) {
  return list[Math.floor(value * list.length)];
}
