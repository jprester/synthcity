// Pure generation of district lights: a coloured PointLight over the edges of
// the city districts. GeneratorItem_CityLight assigns one from the pool.

import { hashFloat } from '../hash.ts';
import { districtAt } from './world.ts';
import { districtStyleAt } from './districts.ts';
import type { Seed } from '../hash.ts';
import type { Perlin } from '../lib/perlin.js';

// Hue in [0.5, 1) for the light at (x, z), or null for no light.
export function cityLightHue({
  seed,
  noise,
  x,
  z,
}: {
  seed: Seed;
  noise: Perlin;
  x: number;
  z: number;
}): number | null {
  const typeNoise = districtAt(noise, x, z);
  if (!(typeNoise < 0.2 || typeNoise > 0.8)) return null;
  const [min, max] = districtStyleAt(noise, x, z).lightHue;
  return min + hashFloat(seed, x, z, 'light-hue') * (max - min);
}
