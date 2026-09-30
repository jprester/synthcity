// District kinds: a second, lower-frequency noise channel splits the city into
// areas (roughly 1-2 km across) that each shape their blocks differently:
// building mix and height, ads, rooftop decorations and light colour.
//
// The density map (districtAt, DISTRICT_NOISE_FACTOR) still decides where the
// city is sparse or dense; the kind decides what that density looks like.
// 'mixed' reproduces the original generator exactly.

import { CELL_SIZE, fixNoise } from './world.ts';
import type { Perlin } from '../lib/perlin.js';

export type DistrictKind = 'mixed' | 'downtown' | 'neon' | 'industrial' | 'residential';

export interface DistrictStyle {
  kind: DistrictKind;
  // block layout by the block's density value (0..1)
  emptyBelow: number; // no buildings
  smallBelow: number; // four small lots; above: one big block
  towerAbove: number; // big block becomes a tower
  megaBelow: number; // rare mega buildings (every 6 cells) appear below this density
  // small-lot building group (s_01 / s_02 / s_03) by the lot's density value
  groupBounds: [number, number];
  heightScale: number; // multiplies every building's height
  // ads
  noAdsBand: [number, number] | null; // lots with density in this band have no ads
  smallAdChance: number; // chance a small lot outside the band has ads
  bigAdChance: number; // chance a big block or tower has ads
  // rooftop decorations, chance per lot
  topperChance: number; // on s_03 lots with ads
  spotlightChance: number; // on s_03_03 lots
  smokeChance: number;
  // share of ads showing neon shop signs; the rest show posters and designs
  neonAdShare: number;
  // district lights (GeneratorItem_CityLight): hue range, as in HSL (0..1)
  lightHue: [number, number];
}

export const DISTRICT_STYLES: Record<DistrictKind, DistrictStyle> = {
  // the original city
  mixed: {
    kind: 'mixed',
    emptyBelow: 0.1,
    smallBelow: 0.8,
    towerAbove: 0.975,
    megaBelow: 0.2,
    groupBounds: [0.267, 0.534],
    heightScale: 1,
    noAdsBand: [0.33, 0.66],
    smallAdChance: 1,
    bigAdChance: 0.55,
    topperChance: 0.06,
    spotlightChance: 0.05,
    smokeChance: 0.05,
    neonAdShare: 0.5,
    lightHue: [0.5, 1],
  },
  // dense core: more big blocks and towers, taller, big ads, cold light
  downtown: {
    kind: 'downtown',
    emptyBelow: 0,
    smallBelow: 0.5,
    towerAbove: 0.8,
    megaBelow: 0.3,
    groupBounds: [0.2, 0.45],
    heightScale: 1.15,
    noAdsBand: [0.4, 0.6],
    smallAdChance: 1,
    bigAdChance: 0.85,
    topperChance: 0.06,
    spotlightChance: 0.12,
    smokeChance: 0.03,
    neonAdShare: 0.15,
    lightHue: [0.5, 0.66],
  },
  // entertainment strip: every lot lit with ads, signs and spotlights
  neon: {
    kind: 'neon',
    emptyBelow: 0.05,
    smallBelow: 0.85,
    towerAbove: 0.97,
    megaBelow: 0.2,
    groupBounds: [0.15, 0.35],
    heightScale: 0.95,
    noAdsBand: null,
    smallAdChance: 1,
    bigAdChance: 1,
    topperChance: 0.12, // more blow out into white blobs under the bloom
    spotlightChance: 0.2,
    smokeChance: 0.04,
    neonAdShare: 0.8,
    lightHue: [0.8, 0.95],
  },
  // low, spread out, few ads, lots of smoke, sodium-amber light
  industrial: {
    kind: 'industrial',
    emptyBelow: 0.2,
    smallBelow: 0.92,
    towerAbove: 1.01,
    megaBelow: 0,
    groupBounds: [0.3, 0.75],
    heightScale: 0.7,
    noAdsBand: null,
    smallAdChance: 0.2,
    bigAdChance: 0.25,
    topperChance: 0,
    spotlightChance: 0,
    smokeChance: 0.3,
    neonAdShare: 0.7,
    lightHue: [0.04, 0.1],
  },
  // small, quiet buildings, a few ads, violet light
  residential: {
    kind: 'residential',
    emptyBelow: 0.1,
    smallBelow: 0.95,
    towerAbove: 1.01,
    megaBelow: 0,
    groupBounds: [0.45, 0.8],
    heightScale: 0.85,
    noAdsBand: [0.2, 0.8],
    smallAdChance: 0.6,
    bigAdChance: 0.3,
    topperChance: 0.02,
    spotlightChance: 0,
    smokeChance: 0.02,
    neonAdShare: 0.55,
    lightHue: [0.7, 0.85],
  },
};

// frequency of the district-kind map (the density map uses 0.0017)
export const KIND_NOISE_FACTOR = 0.0006;
// sample the same noise far away from the density map, so the two don't correlate
const KIND_OFFSET = 10000;
// kinds are decided per neighbourhood of 4x4 blocks, so district borders run
// along roads instead of following the noise's fine detail
export const NEIGHBOURHOOD_SIZE = CELL_SIZE * 4;

// Kind by noise value. The bounds are quantiles of the noise over many seeds,
// for roughly: industrial 15%, residential 18%, mixed 32%, neon 17%,
// downtown 18%. 'mixed' keeps the original look in part of every city.
const KIND_BOUNDS: [number, DistrictKind][] = [
  [0.31, 'industrial'],
  [0.445, 'residential'],
  [0.65, 'mixed'],
  [0.775, 'neon'],
  [Infinity, 'downtown'],
];

export function districtKindAt(noise: Perlin, x: number, z: number): DistrictKind {
  // centre of the neighbourhood containing (x, z)
  const cx = (Math.floor(x / NEIGHBOURHOOD_SIZE) + 0.5) * NEIGHBOURHOOD_SIZE;
  const cz = (Math.floor(z / NEIGHBOURHOOD_SIZE) + 0.5) * NEIGHBOURHOOD_SIZE;
  const n = fixNoise(noise.noise(cx * KIND_NOISE_FACTOR + KIND_OFFSET, cz * KIND_NOISE_FACTOR + KIND_OFFSET));
  return KIND_BOUNDS.find(([bound]) => n < bound)![1];
}

export function districtStyleAt(noise: Perlin, x: number, z: number): DistrictStyle {
  return DISTRICT_STYLES[districtKindAt(noise, x, z)];
}
