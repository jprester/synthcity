export type FiniteBuildingPlacement = {
  modelKey: string;
  materialKey: string;
  x: number;
  z: number;
  scaleX: number;
  scaleY: number;
  scaleZ: number;
  rotationY: number;
};

export type FiniteMegaPlacement = {
  modelKey: string;
  x: number;
  z: number;
  scaleX: number;
  scaleY: number;
  scaleZ: number;
  rotationY: number;
};

export type FiniteStorefrontPlacement = {
  x: number;
  z: number;
  materialKey: string;
};

export type DistrictType = "default" | "downtown" | "industrial" | "residential" | "outskirts";

export type FiniteDistrict = {
  type: DistrictType;
  /** Block-grid indices (gi, gj), 0-based from top-left of the grid */
  minGi: number;
  maxGi: number;
  minGj: number;
  maxGj: number;
};

export type FiniteCityLayout = {
  name: string;
  bounds: { minX: number; maxX: number; minZ: number; maxZ: number };
  spawn: { x: number; z: number; rotationY: number };
  buildings: FiniteBuildingPlacement[];
  megaBuildings?: FiniteMegaPlacement[];
  groundTiles: { x: number; z: number }[];
  storefronts: FiniteStorefrontPlacement[];
};

// ── Concentric zone system ──────────────────────────────────────────────────

export type ZoneType = "suburbs" | "urban" | "business" | "financial" | "downtown";

export type ZoneBias = {
  emptyProbability: number;
  smallProbability: number;
  skyscraperProbability: number;
  towerProbability: number;
  smallWeights: { residential: number; commercial: number; industrial: number };
};
