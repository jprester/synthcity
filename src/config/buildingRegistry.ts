import type { EmissiveMultipliers, ModelManifestEntry } from "../assets/types";

// ============================================================================
// Types
// ============================================================================

type BuildingModelSource =
  | { format: "obj"; path?: string }
  | {
      format: "glb";
      path: string;
      scale?: number;
      emissiveBase?: number;
    };

export type BuildingVariant = {
  key: string;
  /** Relative selection weight (normalized per-series) */
  weight: number;
  /** Model source. Defaults to OBJ at "models/{key}.obj" if omitted. */
  source?: BuildingModelSource;
};

export type BuildingSeries = {
  id: string;
  ads: string[];
  variants: BuildingVariant[];
};

// ============================================================================
// Registry Data
// ============================================================================

// Small buildings — used for asset pipeline derivation ONLY.
// Runtime selection in GeneratorItem_CityBlock.js stays hardcoded for these.
const SMALL_SERIES: BuildingSeries[] = [
  {
    id: "01",
    ads: ["ads_s_01_01", "ads_s_01_02"],
    variants: [
      { key: "s_01_01", weight: 1 },
      { key: "s_01_02", weight: 1 },
      { key: "s_01_03", weight: 1 },
    ],
  },
  {
    id: "02",
    ads: ["ads_s_02_01", "ads_s_02_02"],
    variants: [
      { key: "s_02_01", weight: 1 },
      { key: "s_02_02", weight: 1 },
      { key: "s_02_03", weight: 1 },
    ],
  },
  {
    id: "03",
    ads: ["ads_s_03_01", "ads_s_03_02"],
    variants: [
      { key: "s_03_01", weight: 1 },
      { key: "s_03_02", weight: 1 },
      { key: "s_03_03", weight: 1 },
      {
        key: "s_03_04",
        weight: 1,
        source: {
          format: "glb",
          path: "models/cylinder-building.glb",
          emissiveBase: 2.0,
        },
      },
    ],
  },
];

// Large buildings — used for both asset derivation AND runtime selection
export const LARGE_SERIES: BuildingSeries = {
  id: "04",
  ads: ["ads_s_04_01", "ads_s_04_02", "ads_s_04_03", "ads_s_04_04"],
  variants: [
    { key: "s_04_02", weight: 22.5 },
    {
      key: "s_04_03",
      weight: 22.5,
      source: {
        format: "glb",
        path: "models/sci-fi-corporate-building.glb",
        emissiveBase: 2.0,
      },
    },
    {
      key: "s_04_04",
      weight: 22.5,
      source: {
        format: "glb",
        path: "models/dark_skyscraper_new2.glb",
        scale: 2,
        emissiveBase: 2.0,
      },
    },
    {
      key: "s_04_05",
      weight: 5,
      source: {
        format: "glb",
        path: "models/glowing-industrial-building.glb",
        emissiveBase: 1.5,
      },
    },
    {
      key: "s_04_06",
      weight: 22.5,
      source: {
        format: "glb",
        path: "models/brutalist-tower.glb",
        emissiveBase: 2.0,
      },
    },
    {
      key: "s_04_07",
      weight: 20,
      source: {
        format: "glb",
        path: "models/brutalist-skyscraper-4.glb",
        scale: 3.5,
        emissiveBase: 2.0,
      },
    },
  ],
};

// Tower buildings — used for both asset derivation AND runtime selection
export const TOWER_SERIES: BuildingSeries = {
  id: "05",
  ads: ["ads_s_05_01", "ads_s_05_02", "ads_s_05_03", "ads_s_05_04"],
  variants: [
    { key: "s_05_01", weight: 31.7 },
    { key: "s_05_03", weight: 31.6 },
    {
      key: "s_05_04",
      weight: 31.7,
      source: {
        format: "glb",
        path: "models/new-massive-skyscraper.glb",
        scale: 1.7,
        emissiveBase: 2.0,
      },
    },
  ],
};

// Landmark buildings — unique high-quality assets, one instance per type per city.
// Placed in the downtown zone by the layout generator (guaranteed, noise-driven position).
// Adding a new landmark = one entry here. No other changes needed.
export const LANDMARK_SERIES: BuildingVariant[] = [
  {
    key: "landmark_01",
    weight: 1,
    source: {
      format: "glb",
      path: "models/hero-skyscraper.glb",
      scale: 1.4,
      emissiveBase: 1.0,
    },
  },
  {
    key: "landmark_02",
    weight: 1,
    source: {
      format: "glb",
      path: "models/sci-fi-building-9_1.glb",
      emissiveBase: 2.0,
    },
  },
];

// ============================================================================
// Asset Pipeline Helpers
// ============================================================================

function getAllVariants(): BuildingVariant[] {
  return [
    ...SMALL_SERIES.flatMap((s) => s.variants),
    ...LARGE_SERIES.variants,
    ...TOWER_SERIES.variants,
    ...LANDMARK_SERIES,
  ];
}

/** All building model keys (replaces BUILDING_MODEL_KEYS) */
export function getAllModelKeys(): string[] {
  return getAllVariants().map((v) => v.key);
}

/** Set of model keys using embedded GLB materials (replaces MODELS_WITH_EMBEDDED_MATERIALS) */
export function getEmbeddedMaterialKeys(): Set<string> {
  const set = new Set<string>();
  for (const v of getAllVariants()) {
    if (v.source?.format === "glb") set.add(v.key);
  }
  return set;
}

/** Emissive intensity entries for embedded GLB materials */
export function getEmbeddedEmissiveEntries(): Record<
  string,
  { category: keyof EmissiveMultipliers; base: number }
> {
  const entries: Record<
    string,
    { category: keyof EmissiveMultipliers; base: number }
  > = {};
  for (const v of getAllVariants()) {
    if (v.source?.format === "glb") {
      entries[`__embedded_${v.key}`] = {
        category: "buildings",
        base: v.source.emissiveBase ?? 2.0,
      };
    }
  }
  return entries;
}

/** Model manifest entries for all buildings */
export function getBuildingManifestEntries(): Record<
  string,
  ModelManifestEntry
> {
  const entries: Record<string, ModelManifestEntry> = {};
  for (const v of getAllVariants()) {
    if (v.source?.format === "glb") {
      entries[v.key] = {
        path: v.source.path,
        format: "glb",
        options: {
          computeBVH: true,
          useEmbeddedMaterial: true,
          scale: v.source.scale ?? 1,
        },
      };
    } else {
      entries[v.key] = {
        path: v.source?.path ?? `models/${v.key}.obj`,
        options: { computeBVH: true },
      };
    }
  }
  return entries;
}

/** Set of landmark model keys — these appear at most once in any scene */
export function getLandmarkModelKeys(): Set<string> {
  return new Set(LANDMARK_SERIES.map((v) => v.key));
}

/** All ad model keys across all series */
export function getAllAdModelKeys(): string[] {
  return [
    ...SMALL_SERIES.flatMap((s) => s.ads),
    ...LARGE_SERIES.ads,
    ...TOWER_SERIES.ads,
  ];
}

// ============================================================================
// Runtime Selection Helpers (for s_04/s_05 in GeneratorItem_CityBlock.js)
// ============================================================================

type VariantThreshold = { key: string; threshold: number };

/** Build cumulative thresholds from weights, normalized to [0, 1] */
export function buildVariantThresholds(
  variants: BuildingVariant[],
): VariantThreshold[] {
  const totalWeight = variants.reduce((sum, v) => sum + v.weight, 0);
  let cumulative = 0;
  return variants.map((v) => {
    cumulative += v.weight / totalWeight;
    return { key: v.key, threshold: cumulative };
  });
}

/** Select variant key from thresholds using a noise value. Deterministic. */
export function selectVariantFromNoise(
  thresholds: VariantThreshold[],
  noise: number,
): string {
  for (const entry of thresholds) {
    if (noise < entry.threshold) return entry.key;
  }
  return thresholds[thresholds.length - 1].key;
}

// Pre-computed thresholds (computed once at module load)
export const LARGE_THRESHOLDS = buildVariantThresholds(LARGE_SERIES.variants);
export const TOWER_THRESHOLDS = buildVariantThresholds(TOWER_SERIES.variants);
export const LANDMARK_THRESHOLDS = buildVariantThresholds(LANDMARK_SERIES);
