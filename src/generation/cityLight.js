// Pure generation of district lights: a coloured PointLight over the edges of
// the city districts. GeneratorItem_CityLight assigns one from the pool.

import { hashFloat } from '../hash.js';
import { districtAt } from './world.js';

// Hue in [0.5, 1) for the light at (x, z), or null for no light.
export function cityLightHue({ seed, noise, x, z }) {
  const typeNoise = districtAt(noise, x, z);
  if (!(typeNoise < 0.2 || typeNoise > 0.8)) return null;
  return 0.5 + hashFloat(seed, x, z, 'light-hue') / 2;
}
