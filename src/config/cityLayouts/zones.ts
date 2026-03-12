import type { ZoneBias, ZoneType } from "./types";

// Zone definitions ordered from center outward.
// Distance is normalized [0, 1] from grid center to corner.
type ZoneDef = {
  type: ZoneType;
  maxDistance: number;
  bias: ZoneBias;
};

const ZONE_DEFS: ZoneDef[] = [
  {
    type: "downtown",
    maxDistance: 0.15,
    bias: {
      emptyProbability: 0,
      smallProbability: 0,
      skyscraperProbability: 0,
      towerProbability: 1.0,
      smallWeights: { residential: 0, commercial: 1, industrial: 0 },
    },
  },
  {
    type: "financial",
    maxDistance: 0.35,
    bias: {
      emptyProbability: 0,
      smallProbability: 0.1,
      skyscraperProbability: 0.9,
      towerProbability: 0,
      smallWeights: { residential: 0.1, commercial: 0.8, industrial: 0.1 },
    },
  },
  {
    type: "business",
    maxDistance: 0.55,
    bias: {
      emptyProbability: 0.05,
      smallProbability: 0.35,
      skyscraperProbability: 0.6,
      towerProbability: 0,
      smallWeights: { residential: 0.15, commercial: 0.55, industrial: 0.3 },
    },
  },
  {
    type: "urban",
    maxDistance: 0.75,
    bias: {
      emptyProbability: 0.1,
      smallProbability: 0.7,
      skyscraperProbability: 0.2,
      towerProbability: 0,
      smallWeights: { residential: 0.4, commercial: 0.35, industrial: 0.25 },
    },
  },
  {
    type: "suburbs",
    maxDistance: 1.0,
    bias: {
      emptyProbability: 0.25,
      smallProbability: 0.7,
      skyscraperProbability: 0.05,
      towerProbability: 0,
      smallWeights: { residential: 0.7, commercial: 0.2, industrial: 0.1 },
    },
  },
];

// Transition half-width for smooth zone blending
const TRANSITION_BAND = 0.05;

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
 * Returns the zone bias for a block at grid position (gi, gj) in a grid of
 * size `gridSize`. Uses Euclidean distance from center, normalized by the
 * corner distance, with smooth interpolation at zone boundaries.
 */
export function getZoneBias(gi: number, gj: number, gridSize: number): ZoneBias {
  const center = (gridSize - 1) / 2;
  const dx = gi - center;
  const dz = gj - center;
  const dist = Math.sqrt(dx * dx + dz * dz);
  const cornerDist = Math.sqrt(center * center + center * center);
  const normalizedDist = dist / cornerDist;

  // Find which zone this distance falls in
  for (let i = 0; i < ZONE_DEFS.length; i++) {
    const zone = ZONE_DEFS[i];
    if (normalizedDist <= zone.maxDistance) {
      // Check if we're in a transition band with the next zone
      if (i < ZONE_DEFS.length - 1) {
        const boundary = zone.maxDistance;
        const distFromBoundary = boundary - normalizedDist;
        if (distFromBoundary < TRANSITION_BAND) {
          const t = 1 - distFromBoundary / TRANSITION_BAND;
          return interpolateZoneBias(zone.bias, ZONE_DEFS[i + 1].bias, t * 0.5);
        }
      }
      // Check if we're in a transition band with the previous zone
      if (i > 0) {
        const prevBoundary = ZONE_DEFS[i - 1].maxDistance;
        const distFromPrevBoundary = normalizedDist - prevBoundary;
        if (distFromPrevBoundary < TRANSITION_BAND) {
          const t = 1 - distFromPrevBoundary / TRANSITION_BAND;
          return interpolateZoneBias(zone.bias, ZONE_DEFS[i - 1].bias, t * 0.5);
        }
      }
      return zone.bias;
    }
  }

  // Beyond all zones — use suburbs
  return ZONE_DEFS[ZONE_DEFS.length - 1].bias;
}
