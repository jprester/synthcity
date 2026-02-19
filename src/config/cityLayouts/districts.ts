import type { DistrictType, FiniteDistrict } from "./types";

type DistrictBias = {
  /** typeNoise below this = empty block */
  emptyThreshold: number;
  /** typeNoise below this = small buildings (2×2 grid) */
  smallThreshold: number;
  /** typeNoise above this = tower (within large building range) */
  towerThreshold: number;
};

const DISTRICT_BIASES: Record<DistrictType, DistrictBias> = {
  default:     { emptyThreshold: 0.1,  smallThreshold: 0.8,  towerThreshold: 0.975 },
  downtown:    { emptyThreshold: 0.0,  smallThreshold: 0.3,  towerThreshold: 0.85  },
  industrial:  { emptyThreshold: 0.1,  smallThreshold: 0.6,  towerThreshold: 0.999 },
  residential: { emptyThreshold: 0.1,  smallThreshold: 0.95, towerThreshold: 0.999 },
  outskirts:   { emptyThreshold: 0.3,  smallThreshold: 0.85, towerThreshold: 0.999 },
};

/**
 * Default district layout for a 15×15 grid.
 * gi/gj are 0-based block indices (0..14).
 * Districts are checked in order — first match wins.
 */
export const DEFAULT_DISTRICTS: FiniteDistrict[] = [
  // Dense tower core in the center 5×5
  { type: "downtown",    minGi: 5,  maxGi: 9,  minGj: 5,  maxGj: 9  },
  // Industrial strip along the south
  { type: "industrial",  minGi: 2,  maxGi: 12, minGj: 2,  maxGj: 4  },
  // Residential strip along the north
  { type: "residential", minGi: 0,  maxGi: 14, minGj: 11, maxGj: 14 },
  // Sparse west edge
  { type: "outskirts",   minGi: 0,  maxGi: 1,  minGj: 0,  maxGj: 14 },
  // Sparse east edge
  { type: "outskirts",   minGi: 13, maxGi: 14, minGj: 0,  maxGj: 14 },
  // Everything else falls through to "default"
];

/**
 * Returns the DistrictBias for the block at grid position (gi, gj).
 * Districts are checked in order — first match wins.
 */
export function getDistrictBias(
  gi: number,
  gj: number,
  districts: FiniteDistrict[],
): DistrictBias {
  for (const d of districts) {
    if (gi >= d.minGi && gi <= d.maxGi && gj >= d.minGj && gj <= d.maxGj) {
      return DISTRICT_BIASES[d.type];
    }
  }
  return DISTRICT_BIASES["default"];
}
