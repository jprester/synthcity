// Pure generation of one city block: returns plain data describing every
// object, with no three.js objects. GeneratorItem_CityBlock turns it into
// meshes.
//
// Perlin noise only decides the district (low frequency). Every per-lot choice
// (variant, rotation, height, material, extras) is an independent hash of
// (seed, lot position, purpose).
//
// Objects are listed in the order the builder must create them, because mesh
// creation order breaks ties in three.js render sorting.

import { hashFloat, hashRandom } from '../hash.ts';
import type { Random, Seed } from '../hash.ts';
import type { Perlin } from '../lib/perlin.js';
import { CITY_BLOCK_SIZE, ROAD_WIDTH, CELL_SIZE, districtAt, pick } from './world.ts';
import { districtStyleAt } from './districts.ts';
import type { DistrictStyle } from './districts.ts';

// Model and material names are asset keys (AssetManager).
interface Placed {
  model: string;
  material: string;
  x: number;
  z: number;
}

// a building; collides
export interface BuildingObject extends Placed {
  kind: 'building';
  rotation: number; // degrees about y
  scaleY: number;
}

// storefronts and tramway at a road crossing; collides
export interface StorefrontObject extends Placed {
  kind: 'storefront';
}

export interface GroundObject extends Placed {
  kind: 'ground';
}

// an ad wrapping its building; switches material over time
export interface AdvertObject extends Placed {
  kind: 'advert';
  materials: readonly string[]; // pool it switches between
  rotation: number; // degrees about y (applied negated, like the original)
  scaleY: number;
  interval: number; // frames between switches
  counter: number; // initial frame counter
  switches: boolean;
}

// a spinning rooftop sign
export interface TopperObject extends Placed {
  kind: 'topper';
  y: number;
  scale: number;
  spin: number; // radians per 60 Hz frame
}

export interface SmokeObject extends Placed {
  kind: 'smoke';
  y: number;
  scale: number;
  scaleY: number;
  phase: number;
}

export interface SpotlightObject extends Placed {
  kind: 'spotlight';
  y: number;
  scale: number;
  phase: number;
}

export type BlockObject =
  | BuildingObject
  | StorefrontObject
  | GroundObject
  | AdvertObject
  | TopperObject
  | SmokeObject
  | SpotlightObject;

export interface BlockOptions {
  seed: Seed;
  noise: Perlin; // district noise for the seed (createDistrictNoise)
  x: number; // block corner, a multiple of CELL_SIZE
  z: number;
  spotLights?: boolean; // whether the environment has rooftop spotlights
  style?: DistrictStyle; // override the district kind (tests)
}

const BUILDING_MATERIALS = [
  'building_01',
  'building_02',
  'building_03',
  'building_04',
  'building_05',
  'building_07',
];
const BIG_BUILDING_MATERIALS = ['building_01', 'building_02', 'building_03', 'building_04', 'building_05'];
const RARE_BUILDING_MATERIALS = ['building_06', 'building_08', 'building_09', 'building_10'];
const STOREFRONT_MATERIALS = ['storefronts', 'building_02', 'building_03', 'building_07'];
const ROTATIONS = [0, 90, 180, 270];
const MEGA_MODELS = ['mega_01', 'mega_02', 'mega_03', 'mega_04', 'mega_05', 'mega_06'];

export const ADVERT_MATERIALS = ['ads_01', 'ads_02', 'ads_03', 'ads_04', 'ads_05'];
export const ADVERT_MATERIALS_LARGE = [
  'ads_large_01',
  'ads_large_02',
  'ads_large_03',
  'ads_large_04',
  'ads_large_05',
];
const TOWER_ADVERT_MODELS = ['ads_s_05_01', 'ads_s_05_02', 'ads_s_05_03', 'ads_s_05_04'];
const BIG_ADVERT_MODELS = ['ads_s_04_01', 'ads_s_04_02', 'ads_s_04_03', 'ads_s_04_04'];
const TOPPER_MODELS = [
  'topper_01',
  'topper_02',
  'topper_03',
  'topper_04',
  'topper_05',
  'topper_06',
  'topper_07',
  'topper_08',
  'topper_09',
  'topper_10',
  'topper_11',
  'topper_12',
];
const SMOKE_MATERIALS = ['smoke_01', 'smoke_02', 'smoke_03'];
const SPOTLIGHT_MATERIALS = ['spotlight_01', 'spotlight_02', 'spotlight_03', 'spotlight_04'];

export function generateBlock({ seed, noise, x, z, spotLights = true, style }: BlockOptions): BlockObject[] {
  const objects: BlockObject[] = [];
  const h = (lx: number, lz: number, purpose: string) => hashFloat(seed, lx, lz, purpose);

  const typeNoise = districtAt(noise, x, z);
  const district = style ?? districtStyleAt(noise, x, z);

  // rare mega building
  if (typeNoise < district.megaBelow && x % (CELL_SIZE * 6) == 0 && z % (CELL_SIZE * 6) == 0) {
    const lotX = x + CITY_BLOCK_SIZE / 2;
    const lotZ = z + CITY_BLOCK_SIZE / 2;
    // don't place too close to path of player car
    if (!(lotX < 128 && lotX > -128)) {
      objects.push({
        kind: 'building',
        model: pick(MEGA_MODELS, h(lotX, lotZ, 'mega-variant')),
        material: 'mega_building_01',
        x: lotX,
        z: lotZ,
        rotation: pick(ROTATIONS, h(lotX, lotZ, 'mega-rotation')),
        scaleY: 0.75 + h(lotX, lotZ, 'mega-height') * 0.25,
      });
    }
  }

  if (typeNoise < district.emptyBelow) {
    // nothing
  } else if (typeNoise < district.smallBelow) {
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 2; j++) {
        const lotX = x + i * (CITY_BLOCK_SIZE / 2) + CITY_BLOCK_SIZE / 4;
        const lotZ = z + j * (CITY_BLOCK_SIZE / 2) + CITY_BLOCK_SIZE / 4;
        smallLot(objects, seed, noise, lotX, lotZ, spotLights, district);
      }
    }
  } else {
    bigLot(
      objects,
      seed,
      x + CITY_BLOCK_SIZE / 2,
      z + CITY_BLOCK_SIZE / 2,
      typeNoise > district.towerAbove,
      district,
    );
  }

  objects.push({
    kind: 'ground',
    model: 'ground',
    material: 'ground',
    x: x + CITY_BLOCK_SIZE / 2,
    z: z + CITY_BLOCK_SIZE / 2,
  });

  // storefronts and tramways
  if (x % (CELL_SIZE * 2) == 0 && z % (CELL_SIZE * 2) == 0) {
    objects.push({
      kind: 'storefront',
      model: 'storefronts',
      material: pick(STOREFRONT_MATERIALS, h(x, z, 'storefront')),
      x: x + CITY_BLOCK_SIZE + ROAD_WIDTH / 2,
      z: z + CITY_BLOCK_SIZE + ROAD_WIDTH / 2,
    });
  }

  return objects;
}

function smallLot(
  objects: BlockObject[],
  seed: Seed,
  noise: Perlin,
  lotX: number,
  lotZ: number,
  spotLights: boolean,
  district: DistrictStyle,
): void {
  const h = (purpose: string) => hashFloat(seed, lotX, lotZ, purpose);

  const rotation = pick(ROTATIONS, h('rotation'));
  const scale = (0.75 + h('height') * 0.45) * district.heightScale;
  const variant = Math.floor(h('variant') * 3) + 1; // 1..3
  const adsVariant = h('ads-variant') < 0.5 ? 1 : 2;

  const typeNoise = districtAt(noise, lotX, lotZ);
  let group;
  if (typeNoise < district.groupBounds[0]) group = 1;
  else if (typeNoise < district.groupBounds[1]) group = 2;
  else group = 3;

  let topper = false;
  if (group == 3) {
    // topper (the old noise threshold hit about 6% of these lots)
    topper = h('topper') < district.topperChance;
    // spotlight: sized for the s_03_03 roof
    if (spotLights && variant == 3 && h('spotlight') < district.spotlightChance && !topper) {
      objects.push(spotlight(lotX, 160 * scale, lotZ, hashRandom(seed, lotX, lotZ, 'spotlight-look')));
    }
  }

  // no ads in the district's quiet band
  const band = district.noAdsBand;
  const inQuietBand = band !== null && typeNoise > band[0] && typeNoise < band[1];
  const hasAds = !inQuietBand && h('ad-chance') < district.smallAdChance;

  if (topper && hasAds) {
    objects.push(topperAt(lotX, 190 * scale, lotZ, hashRandom(seed, lotX, lotZ, 'topper-look')));
  }

  if (h('smoke') < district.smokeChance) {
    objects.push(smoke(lotX, 190 * scale, lotZ, hashRandom(seed, lotX, lotZ, 'smoke-look')));
  }

  objects.push({
    kind: 'building',
    model: 's_0' + group + '_0' + variant,
    material: pick(BUILDING_MATERIALS, h('material')),
    x: lotX,
    z: lotZ,
    rotation,
    scaleY: scale,
  });

  if (hasAds) {
    objects.push(
      advert('ads_s_0' + group + '_0' + adsVariant, ADVERT_MATERIALS, lotX, lotZ, rotation, scale, seed),
    );
  }
}

function bigLot(
  objects: BlockObject[],
  seed: Seed,
  lotX: number,
  lotZ: number,
  isTower: boolean,
  district: DistrictStyle,
): void {
  const h = (purpose: string) => hashFloat(seed, lotX, lotZ, purpose);

  const variant = Math.floor(h('variant') * 3) + 1; // 1..3
  const rare = h('rare-material') < 0.1;
  const material = pick(rare ? RARE_BUILDING_MATERIALS : BIG_BUILDING_MATERIALS, h('material'));
  const rotation = pick(ROTATIONS, h('rotation'));
  const scale = (1 + h('height') * 0.5) * district.heightScale;

  objects.push({
    kind: 'building',
    model: (isTower ? 's_05_0' : 's_04_0') + variant,
    material,
    x: lotX,
    z: lotZ,
    rotation,
    scaleY: scale,
  });

  // maybe have ads (the old parity test came out true for about 55%)
  if (h('ads') < district.bigAdChance) {
    const model = pick(isTower ? TOWER_ADVERT_MODELS : BIG_ADVERT_MODELS, h('ads-variant'));
    const materials = isTower ? ADVERT_MATERIALS_LARGE : ADVERT_MATERIALS;
    objects.push(advert(model, materials, lotX, lotZ, rotation, scale, seed));
  }
}

// An advert wraps its building. Its material switches over time using the
// 'advert-switch' stream at the same position (see GeneratorItem_CityBlock).
function advert(
  model: string,
  materials: readonly string[],
  x: number,
  z: number,
  rotation: number,
  scaleY: number,
  seed: Seed,
): AdvertObject {
  const random = hashRandom(seed, x, z, 'advert');
  const material = pick(materials, random());
  const interval = 200 + random() * 800;
  const counter = random() * interval;
  const switches = random() < 0.5;
  return { kind: 'advert', model, materials, material, x, z, rotation, scaleY, interval, counter, switches };
}

function topperAt(x: number, y: number, z: number, random: Random): TopperObject {
  const material = pick(ADVERT_MATERIALS_LARGE, random());
  const model = pick(TOPPER_MODELS, random());
  const scale = 0.8 + random();
  const spin = random() <= 0.5 ? random() * 0.01 : -random() * 0.01;
  return { kind: 'topper', model, material, x, y, z, scale, spin };
}

function smoke(x: number, y: number, z: number, random: Random): SmokeObject {
  const material = pick(SMOKE_MATERIALS, random());
  const scale = 1 + random() * 8;
  const scaleY = scale * (1 + random() * 0.5);
  const phase = random() * 7;
  return { kind: 'smoke', model: 'smoke', material, x, y, z, scale, scaleY, phase };
}

function spotlight(x: number, y: number, z: number, random: Random): SpotlightObject {
  const material = pick(SPOTLIGHT_MATERIALS, random());
  const scale = 10 + random() * 10;
  const phase = random() * 7;
  return { kind: 'spotlight', model: 'spotlight', material, x, y, z, scale, phase };
}
