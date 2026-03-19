import type { ZoneBias } from "./types";

/**
 * Organic city layout — smooth center-to-edge gradient.
 *
 * Small buildings (residential / commercial / industrial) form the bulk of
 * the city. Towers are placed explicitly by generateLayout (not zone-driven).
 * Skyscrapers disabled for Phase 1.
 *
 * Distance is normalized [0, 1] from grid center to corner.
 */

// ── Bias at the very center (d = 0) ────────────────────────────────────────
const CENTER_BIAS: ZoneBias = {
  emptyProbability: 0,
  smallProbability: 1.0,
  skyscraperProbability: 0,
  towerProbability: 0,
  smallWeights: { residential: 0.15, commercial: 0.6, industrial: 0.25 },
};

// ── Bias at the edge (d = 1) ────────────────────────────────────────────────
const EDGE_BIAS: ZoneBias = {
  emptyProbability: 0.1,
  smallProbability: 0.9,
  skyscraperProbability: 0,
  towerProbability: 0,
  smallWeights: { residential: 0.6, commercial: 0.25, industrial: 0.15 },
};

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function interpolateZoneBias(a: ZoneBias, b: ZoneBias, t: number): ZoneBias {
  return {
    emptyProbability: lerp(a.emptyProbability, b.emptyProbability, t),
    smallProbability: lerp(a.smallProbability, b.smallProbability, t),
    skyscraperProbability: lerp(a.skyscraperProbability, b.skyscraperProbability, t),
    towerProbability: lerp(a.towerProbability, b.towerProbability, t),
    smallWeights: {
      residential: lerp(a.smallWeights.residential, b.smallWeights.residential, t),
      commercial: lerp(a.smallWeights.commercial, b.smallWeights.commercial, t),
      industrial: lerp(a.smallWeights.industrial, b.smallWeights.industrial, t),
    },
  };
}

/**
 * Returns the zone bias for a block at grid position (gi, gj).
 * Uses a smooth gradient from center to edge — no hard zone boundaries.
 * Controls small building mix and empty block probability only;
 * tower placement is handled separately by explicit positions.
 */
export function getZoneBias(gi: number, gj: number, gridSize: number): ZoneBias {
  const center = (gridSize - 1) / 2;
  const dx = gi - center;
  const dz = gj - center;
  const dist = Math.sqrt(dx * dx + dz * dz);
  const cornerDist = Math.sqrt(center * center + center * center);
  const t = Math.min(dist / cornerDist, 1);

  return interpolateZoneBias(CENTER_BIAS, EDGE_BIAS, t);
}
