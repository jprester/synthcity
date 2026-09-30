// Pure generation of one city block: returns plain data describing every
// object, with no three.js objects. GeneratorItem_CityBlock turns it into
// meshes.
//
// Perlin noise only decides the district (low frequency). Every per-lot choice
// (variant, rotation, height, material, extras) is an independent hash of
// (seed, lot position, purpose).
//
// Objects are listed in the order the builder must create them, because mesh
// creation order breaks ties in three.js render sorting. Kinds:
//   building    { model, material, x, z, rotation (degrees), scaleY }  collides
//   storefront  { model, material, x, z }                              collides
//   ground      { model, material, x, z }
//   advert      { model, materials, material, x, z, rotation, scaleY, interval, counter, switches }
//   topper      { model, material, x, y, z, scale, spin }
//   smoke       { model, material, x, y, z, scale, scaleY, phase }
//   spotlight   { model, material, x, y, z, scale, phase }

import { hashFloat, hashRandom } from '../hash.js';
import { CITY_BLOCK_SIZE, ROAD_WIDTH, CELL_SIZE, districtAt, pick } from './world.js';

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

// The block's corner is at (x, z), a multiple of CELL_SIZE.
// spotLights: whether the environment has rooftop spotlights.
export function generateBlock({ seed, noise, x, z, spotLights = true }) {
  const objects = [];
  const h = (lx, lz, purpose) => hashFloat(seed, lx, lz, purpose);

  let typeNoise = districtAt(noise, x, z);

  // rare mega building
  if (typeNoise < 0.2 && x % (CELL_SIZE * 6) == 0 && z % (CELL_SIZE * 6) == 0) {
    let lotX = x + CITY_BLOCK_SIZE / 2;
    let lotZ = z + CITY_BLOCK_SIZE / 2;
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

  if (typeNoise < 0.1) {
    // nothing
  } else if (typeNoise < 0.8) {
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 2; j++) {
        let lotX = x + i * (CITY_BLOCK_SIZE / 2) + CITY_BLOCK_SIZE / 4;
        let lotZ = z + j * (CITY_BLOCK_SIZE / 2) + CITY_BLOCK_SIZE / 4;
        smallLot(objects, seed, noise, lotX, lotZ, spotLights);
      }
    }
  } else {
    bigLot(objects, seed, x + CITY_BLOCK_SIZE / 2, z + CITY_BLOCK_SIZE / 2, typeNoise > 0.975);
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

function smallLot(objects, seed, noise, lotX, lotZ, spotLights) {
  const h = (purpose) => hashFloat(seed, lotX, lotZ, purpose);

  let rotation = pick(ROTATIONS, h('rotation'));
  let scale = 0.75 + h('height') * 0.45;
  let variant = Math.floor(h('variant') * 3) + 1; // 1..3
  let adsVariant = h('ads-variant') < 0.5 ? 1 : 2;

  let typeNoise = districtAt(noise, lotX, lotZ);
  let group;
  if (typeNoise < 0.267) group = 1;
  else if (typeNoise < 0.534) group = 2;
  else group = 3;

  let topper = false;
  if (group == 3) {
    // topper (the old noise threshold hit about 6% of these lots)
    topper = h('topper') < 0.06;
    // spotlight: sized for the s_03_03 roof
    if (spotLights && variant == 3 && h('spotlight') < 0.05 && !topper) {
      objects.push(spotlight(lotX, 160 * scale, lotZ, hashRandom(seed, lotX, lotZ, 'spotlight-look')));
    }
  }

  // no ads in the middle districts
  let hasAds = !(typeNoise > 0.33 && typeNoise < 0.66);

  if (topper && hasAds) {
    objects.push(topperAt(lotX, 190 * scale, lotZ, hashRandom(seed, lotX, lotZ, 'topper-look')));
  }

  if (h('smoke') < 0.05) {
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

function bigLot(objects, seed, lotX, lotZ, isTower) {
  const h = (purpose) => hashFloat(seed, lotX, lotZ, purpose);

  let variant = Math.floor(h('variant') * 3) + 1; // 1..3
  let rare = h('rare-material') < 0.1;
  let material = pick(rare ? RARE_BUILDING_MATERIALS : BIG_BUILDING_MATERIALS, h('material'));
  let rotation = pick(ROTATIONS, h('rotation'));
  let scale = 1 + h('height') * 0.5;

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
  if (h('ads') < 0.55) {
    let model = pick(isTower ? TOWER_ADVERT_MODELS : BIG_ADVERT_MODELS, h('ads-variant'));
    let materials = isTower ? ADVERT_MATERIALS_LARGE : ADVERT_MATERIALS;
    objects.push(advert(model, materials, lotX, lotZ, rotation, scale, seed));
  }
}

// An advert wraps its building. Its material switches over time using the
// 'advert-switch' stream at the same position (see GeneratorItem_CityBlock).
function advert(model, materials, x, z, rotation, scaleY, seed) {
  const random = hashRandom(seed, x, z, 'advert');
  const material = pick(materials, random());
  const interval = 200 + random() * 800;
  const counter = random() * interval;
  const switches = random() < 0.5;
  return { kind: 'advert', model, materials, material, x, z, rotation, scaleY, interval, counter, switches };
}

function topperAt(x, y, z, random) {
  const material = pick(ADVERT_MATERIALS_LARGE, random());
  const model = pick(TOPPER_MODELS, random());
  const scale = 0.8 + random();
  const spin = random() <= 0.5 ? random() * 0.01 : -random() * 0.01;
  return { kind: 'topper', model, material, x, y, z, scale, spin };
}

function smoke(x, y, z, random) {
  const material = pick(SMOKE_MATERIALS, random());
  const scale = 1 + random() * 8;
  const scaleY = scale * (1 + random() * 0.5);
  const phase = random() * 7;
  return { kind: 'smoke', model: 'smoke', material, x, y, z, scale, scaleY, phase };
}

function spotlight(x, y, z, random) {
  const material = pick(SPOTLIGHT_MATERIALS, random());
  const scale = 10 + random() * 10;
  const phase = random() * 7;
  return { kind: 'spotlight', model: 'spotlight', material, x, y, z, scale, phase };
}
