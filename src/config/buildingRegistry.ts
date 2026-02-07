import type { EmissiveMultipliers, ModelManifestEntry } from "../assets/types";

// ============================================================================
// Types
// ============================================================================

/** Model source for a building variant */
type BuildingModelSource =
  | { format: "obj"; path: string }
  | {
      format: "glb";
      path: string;
      scale?: number;
      emissiveBase?: number;
    };

/** A single building variant within a series */
export type BuildingVariant = {
  key: string;
  /** Relative selection weight (normalized per-series) */
  weight: number;
  /** Model source. Defaults to OBJ at "models/{key}.obj" if omitted. */
  source?: BuildingModelSource;
};

/** How external materials are chosen for OBJ variants */
type MaterialStrategy = "small" | "large";

/** Building placement mode on a city block */
type PlacementMode = {
  type: "grid2x2" | "single";
  baseScale: number;
  scaleVariance: number;
};

/** Definition of a building series */
export type BuildingSeries = {
  id: string;
  placement: PlacementMode;
  materialStrategy: MaterialStrategy;
  ads: string[];
  toppers?: boolean;
  spotlights?: boolean;
  variants: BuildingVariant[];
};

/** Top-level noise bracket selecting a series group */
export type SeriesGroup = {
  name: string;
  /** Noise range [min, max) from typeNoise */
  noiseRange: [number, number];
  series: BuildingSeries[];
};

// ============================================================================
// The Registry
// ============================================================================

export const BUILDING_REGISTRY: SeriesGroup[] = [
  {
    name: "small",
    noiseRange: [0.1, 0.8],
    series: [
      {
        id: "01",
        placement: { type: "grid2x2", baseScale: 0.75, scaleVariance: 0.45 },
        materialStrategy: "small",
        ads: ["ads_s_01_01", "ads_s_01_02"],
        variants: [
          { key: "s_01_01", weight: 1 },
          { key: "s_01_02", weight: 1 },
          { key: "s_01_03", weight: 1 },
        ],
      },
      {
        id: "02",
        placement: { type: "grid2x2", baseScale: 0.75, scaleVariance: 0.45 },
        materialStrategy: "small",
        ads: ["ads_s_02_01", "ads_s_02_02"],
        variants: [
          { key: "s_02_01", weight: 1 },
          { key: "s_02_02", weight: 1 },
          { key: "s_02_03", weight: 1 },
        ],
      },
      {
        id: "03",
        placement: { type: "grid2x2", baseScale: 0.75, scaleVariance: 0.45 },
        materialStrategy: "small",
        ads: ["ads_s_03_01", "ads_s_03_02"],
        toppers: true,
        spotlights: true,
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
    ],
  },
  {
    name: "large",
    noiseRange: [0.8, 0.975],
    series: [
      {
        id: "04",
        placement: { type: "single", baseScale: 1, scaleVariance: 0.5 },
        materialStrategy: "large",
        ads: ["ads_s_04_01", "ads_s_04_02", "ads_s_04_03", "ads_s_04_04"],
        variants: [
          {
            key: "s_04_01",
            weight: 4.75,
            source: {
              format: "glb",
              path: "models/sci-fi-building-9_1.glb",
              emissiveBase: 2.0,
            },
          },
          { key: "s_04_02", weight: 4.75 },
          {
            key: "s_04_03",
            weight: 4.75,
            source: {
              format: "glb",
              path: "models/sci-fi-corporate-building.glb",
              emissiveBase: 2.0,
            },
          },
          {
            key: "s_04_04",
            weight: 4.75,
            source: {
              format: "glb",
              path: "models/dark_skyscraper_new2.glb",
              scale: 2,
              emissiveBase: 2.0,
            },
          },
          {
            key: "s_04_05",
            weight: 1,
            source: {
              format: "glb",
              path: "models/glowing-industrial-building.glb",
              emissiveBase: 1.5,
            },
          },
        ],
      },
    ],
  },
  {
    name: "tower",
    noiseRange: [0.975, 1.0],
    series: [
      {
        id: "05",
        placement: { type: "single", baseScale: 1, scaleVariance: 0.5 },
        materialStrategy: "large",
        ads: ["ads_s_05_01", "ads_s_05_02", "ads_s_05_03", "ads_s_05_04"],
        variants: [
          { key: "s_05_01", weight: 1 },
          {
            key: "s_05_02",
            weight: 1,
            source: {
              format: "glb",
              path: "models/hero-skyscraper.glb",
              emissiveBase: 1.0,
            },
          },
          { key: "s_05_03", weight: 1 },
          {
            key: "s_05_04",
            weight: 1,
            source: {
              format: "glb",
              path: "models/new-massive-skyscraper.glb",
              emissiveBase: 0.7,
              scale: 1.8,
            },
          },
        ],
      },
    ],
  },
];

// ============================================================================
// Derived-data helpers
// ============================================================================

/** All building variant entries, flattened */
export function getAllVariants(): BuildingVariant[] {
  const result: BuildingVariant[] = [];
  for (const group of BUILDING_REGISTRY) {
    for (const series of group.series) {
      result.push(...series.variants);
    }
  }
  return result;
}

/** All building model keys (replaces BUILDING_MODEL_KEYS) */
export function getAllModelKeys(): string[] {
  return getAllVariants().map((v) => v.key);
}

/** Set of model keys that use embedded GLB materials (replaces MODELS_WITH_EMBEDDED_MATERIALS) */
export function getEmbeddedMaterialKeys(): Set<string> {
  const set = new Set<string>();
  for (const v of getAllVariants()) {
    if (v.source?.format === "glb") {
      set.add(v.key);
    }
  }
  return set;
}

/** Emissive intensity entries for embedded materials (merges into BASE_EMISSIVE_INTENSITIES) */
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

/** Generate model manifest entries for all buildings */
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
      const path =
        v.source?.format === "obj" ? v.source.path : `models/${v.key}.obj`;
      entries[v.key] = {
        path,
        options: { computeBVH: true },
      };
    }
  }
  return entries;
}

/** Get all ad model keys referenced by building series */
export function getAllAdModelKeys(): string[] {
  const keys: string[] = [];
  for (const group of BUILDING_REGISTRY) {
    for (const series of group.series) {
      keys.push(...series.ads);
    }
  }
  return keys;
}

/**
 * Build cumulative-weight thresholds for a variant list.
 * Returns array of { key, threshold } where threshold is the upper bound [0..1).
 */
export function buildVariantThresholds(
  variants: BuildingVariant[],
): Array<{ key: string; threshold: number }> {
  const totalWeight = variants.reduce((sum, v) => sum + v.weight, 0);
  let cumulative = 0;
  return variants.map((v) => {
    cumulative += v.weight / totalWeight;
    return { key: v.key, threshold: cumulative };
  });
}

/**
 * Select a variant key from pre-built thresholds using a noise value.
 * Deterministic: same noise always produces the same variant.
 */
export function selectVariantFromNoise(
  thresholds: Array<{ key: string; threshold: number }>,
  noise: number,
): string {
  for (const entry of thresholds) {
    if (noise < entry.threshold) {
      return entry.key;
    }
  }
  return thresholds[thresholds.length - 1].key;
}

/** Find a series group by name */
export function getSeriesGroup(name: string): SeriesGroup | undefined {
  return BUILDING_REGISTRY.find((g) => g.name === name);
}

/** Find a series by its id (e.g. "04") */
export function getSeries(id: string): BuildingSeries | undefined {
  for (const group of BUILDING_REGISTRY) {
    for (const series of group.series) {
      if (series.id === id) return series;
    }
  }
  return undefined;
}
