// Every texture and model the game loads, keyed by the name code uses with
// AssetManager.getTexture/getModel. Files are relative to public/assets/.
//
// To add an asset, add an entry here; materials that use it are created in
// AssetManager.createMaterials. Entries load in list order.

export interface TextureEntry {
  key: string;
  file: string;
  srgb?: boolean; // colour data in sRGB (only the skies; other maps are read as linear, like the original)
  equirect?: boolean; // equirectangular sky or environment map, sampled with linear magnification
  tiled?: boolean; // repeats across the surface (RepeatWrapping) with anisotropic filtering
  repeat?: number; // repeats this many times per UV unit (RepeatWrapping, no anisotropy)
  anisotropic?: boolean; // anisotropic filtering without repeating (atlases seen at an angle)
}

export interface ModelEntry {
  key: string;
  file: string; // OBJ; the first mesh's geometry is used
  collides?: boolean; // build a BVH for Collider (computeBoundsTree)
  rotateY?: number; // radians, baked into the geometry
}

const pad = (n: number) => String(n).padStart(2, '0');
// ids '01'..'NN'
const ids = (count: number) => Array.from({ length: count }, (_, i) => pad(i + 1));

export const TEXTURES: TextureEntry[] = [
  { key: 'sky_night', file: 'textures/sky_night.jpg', srgb: true, equirect: true },
  { key: 'sky_day', file: 'textures/sky_day.jpg', srgb: true, equirect: true },
  { key: 'env_night', file: 'textures/environment_night.jpg', equirect: true },
  { key: 'env_night_windshield', file: 'textures/environment_night_windshield.jpg', equirect: true },

  { key: 'ground', file: 'textures/ground.jpg' },
  { key: 'ground_em', file: 'textures/ground_em.jpg' },

  // the player's car
  { key: 'spinner_interior', file: 'textures/0QuazDeckardCarLowpoly_interior_BaseColor.webp' },
  { key: 'spinner_interior_norm', file: 'textures/0QuazDeckardCarLowpoly_interior_Normal.webp' },
  { key: 'spinner_interior_em', file: 'textures/0QuazDeckardCarLowpoly_interior_Emissive.webp' },
  { key: 'spinner_interior_ao', file: 'textures/0QuazDeckardCarLowpoly_interior_AmbientOcclusion.webp' },
  { key: 'spinner_exterior', file: 'textures/0QuazDeckardCarLowpoly_car_BaseColor.webp' },
  { key: 'spinner_windows_norm', file: 'textures/rain_normal_1024.jpg', repeat: 2.5 },
  { key: 'spinner_windows_rough', file: 'textures/smudges2_1024.jpg', repeat: 2.5 },
  { key: 'spinner_windows_trans', file: 'textures/smudges_inverted_1024.jpg', repeat: 2.5 },

  // traffic
  { key: 'cars', file: 'textures/cars.jpg' },
  { key: 'cars_em', file: 'textures/cars_em.jpg' },

  { key: 'storefronts', file: 'textures/storefronts_01.jpg', tiled: true },
  { key: 'storefronts_em', file: 'textures/storefronts_01_em.jpg', tiled: true },
  { key: 'mega_building_01', file: 'textures/mega_building_01.jpg', tiled: true },
  { key: 'mega_building_01_em', file: 'textures/mega_building_01_em.jpg', tiled: true },

  // buildings: colour, emissive windows, specular
  ...ids(10).flatMap((id) => [
    { key: `building_${id}`, file: `textures/building_${id}.jpg`, tiled: true },
    { key: `building_${id}_em`, file: `textures/building_${id}_em.jpg`, tiled: true },
    { key: `building_${id}_rough`, file: `textures/building_${id}_spec.jpg`, tiled: true },
  ]),

  // ad art atlases, built by scripts/assets/build_ad_atlases.py (entries in src/assets/adAtlases.json)
  { key: 'ads_neon', file: 'textures/ads_neon.webp', anisotropic: true, srgb: true },
  { key: 'ads_posters', file: 'textures/ads_posters.webp', anisotropic: true, srgb: true },
  ...ids(5).map((id) => ({ key: `ads_large_${id}`, file: `textures/ads_large_${id}.jpg` })),
  ...ids(3).map((id) => ({ key: `smoke_${id}`, file: `textures/smoke_${id}.jpg` })),
  ...ids(4).map((id) => ({ key: `spotlight_${id}`, file: `textures/spotlight_${id}.jpg` })),
];

// small building variants s_01..s_03 (lots), s_04 (big blocks), s_05 (towers)
const BUILDINGS = ['01', '02', '03', '04', '05'].flatMap((group) =>
  ids(3).map((variant) => `s_${group}_${variant}`),
);

export const MODELS: ModelEntry[] = [
  // the player's car; the OBJs face +x, the game expects -z
  { key: 'spinner', file: 'models/spinner.obj', rotateY: -Math.PI / 2 },
  { key: 'spinner_windows', file: 'models/spinner_windows.obj', rotateY: -Math.PI / 2 },

  { key: 'storefronts', file: 'models/storefronts.obj', collides: true },
  ...BUILDINGS.map((key) => ({ key, file: `models/${key}.obj`, collides: true })),
  ...ids(6).map((id) => ({ key: `mega_${id}`, file: `models/mega_${id}.obj`, collides: true })),

  ...ids(12).map((id) => ({ key: `topper_${id}`, file: `models/topper_${id}.obj` })),
  ...ids(8).map((id) => ({ key: `car_${id}`, file: `models/car_${id}.obj` })),
  { key: 'spotlight', file: 'models/spotlight.obj' },
];
