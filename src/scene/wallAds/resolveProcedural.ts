import type { FiniteCityLayout } from "../../config/cityLayouts";
import {
  SMALL_ADS_BY_BUCKET,
  smallAdMatKey,
  type SmallAdBucket,
  type SmallAdMeta,
} from "../../config/smallAds";
import { CITY_BLOCK_SIZE, CELL_SIZE } from "../../config/world";
import type { WallAd } from "./types";

/**
 * Procedural wall ads on small buildings (s_01 / s_02 / s_03). Currently
 * just the small-signs pass; the older ADS_META holo-on-small pass was
 * removed because it reused tower-billboard art at miniature scale on
 * inner walls, which read as "tiny copies of the big ads."
 */
export function resolveProceduralWallAds(
  layout: FiniteCityLayout,
  worldSeed: number,
): WallAd[] {
  return resolveSmallSignsProcedural(layout, worldSeed);
}

// ── Small-signs procedural pass ─────────────────────────────────────────────
//
// Places PNG neon signs / posters from SMALL_ADS_META on the lower floors
// of small buildings (s_01 / s_02 / s_03). Each small building sits in a
// quadrant of its block, so it has exactly two world-cardinal sides that
// face a road — those are the only sides we use, so signs stay visible
// from the street rather than getting buried between buildings.
//
// Bucket-specific placement rules:
//   • 1-4 tall vertical neon  → near a wall edge, sometimes hanging out
//                               past the wall (DoubleSide handles back face)
//   • 4-1 wide horizontal     → centered on the wall, low signage band or
//                               occasionally near the top like a logo strip
//   • 3-2 / 2-3 posters       → mid-low, near edge or centered

type SignTier = {
  spawn: number;
  bucketWeights: Record<SmallAdBucket, number>;
};

const SIGN_TIERS: Record<string, SignTier> = {
  residential: {
    spawn: 0.3,
    bucketWeights: { "1-4": 3, "2-3": 2, "3-2": 1, "4-1": 1 },
  },
  commercial: {
    spawn: 0.42,
    bucketWeights: { "1-4": 3, "2-3": 1.5, "3-2": 1.5, "4-1": 2 },
  },
  industrial: {
    spawn: 0.22,
    bucketWeights: { "1-4": 2, "2-3": 0.5, "3-2": 1, "4-1": 1.5 },
  },
};

function classifySignTier(modelKey: string): SignTier | null {
  if (modelKey.startsWith("s_01_")) return SIGN_TIERS.residential;
  if (modelKey.startsWith("s_02_")) return SIGN_TIERS.commercial;
  if (modelKey.startsWith("s_03_")) return SIGN_TIERS.industrial;
  return null;
}

/**
 * Each small building lives in one of four 64×64 quadrants of its 128×128
 * city block. Derived from world position so we don't need extra metadata
 * on the placement; works whether `gi`/`gj` are present or not.
 *
 * Returns the two cardinal world directions that face open road:
 *   • i=0 → west road (-X)        i=1 → east road (+X)
 *   • j=0 → north road (-Z)       j=1 → south road (+Z)
 *
 * Each direction is the world Y rotation that orients a plane's +Z normal
 * outward toward that road.
 */
function getRoadFacingDirs(x: number, z: number): number[] {
  const localX = ((x % CELL_SIZE) + CELL_SIZE) % CELL_SIZE;
  const localZ = ((z % CELL_SIZE) + CELL_SIZE) % CELL_SIZE;
  const half = CITY_BLOCK_SIZE / 2;
  const dirs: number[] = [];
  // X side: i=0 (west) → rotationY = -π/2  ;  i=1 (east) → rotationY = π/2
  dirs.push(localX < half ? -Math.PI / 2 : Math.PI / 2);
  // Z side: j=0 (north) → rotationY = π    ;  j=1 (south) → rotationY = 0
  dirs.push(localZ < half ? Math.PI : 0);
  return dirs;
}

function weightedPick<T extends string>(
  weights: Record<T, number>,
  r: number,
): T {
  const entries = Object.entries(weights) as [T, number][];
  const total = entries.reduce((s, [, w]) => s + w, 0);
  let acc = 0;
  const target = r * total;
  for (const [key, w] of entries) {
    acc += w;
    if (target < acc) return key;
  }
  return entries[entries.length - 1][0];
}

export function resolveSmallSignsProcedural(
  layout: FiniteCityLayout,
  worldSeed: number,
): WallAd[] {
  const ads: WallAd[] = [];

  // Separate LCG branch so this pass doesn't shift the existing holo-ads
  // layout when SMALL_ADS_META grows.
  let seed = (worldSeed ^ 0x5169) >>> 0;
  const rand = () => {
    seed = (seed * 48271) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  const pickFrom = <T>(arr: readonly T[]): T =>
    arr[Math.floor(rand() * arr.length)];

  // Small building OBJs measure ~58-60 units wide along both ground axes
  // (s_01/s_02/s_03 are all roughly square in plan, with half-width ~29-30).
  // Plane needs to sit just outside the wall, plus a small clearance so it
  // doesn't z-fight with the wall surface.
  const WALL_RADIUS = 30;
  // Max lateral slide along a 60-unit-wide wall before the plane corner
  // pokes past the building edge.
  const MAX_SIDE_OFFSET = 24;

  for (const b of layout.buildings) {
    const tier = classifySignTier(b.modelKey);
    if (!tier) continue;
    if (rand() > tier.spawn) continue;

    const bucket = weightedPick(tier.bucketWeights, rand());
    const pool = SMALL_ADS_BY_BUCKET[bucket];
    if (pool.length === 0) continue;
    const meta: SmallAdMeta = pickFrom(pool);

    // Pick one of the two road-facing world directions.
    const roadDirs = getRoadFacingDirs(b.x, b.z);
    const rotationY = roadDirs[Math.floor(rand() * roadDirs.length)];

    // Per-bucket sizing + placement.
    let height: number;
    let width: number;
    let y: number;
    let offsetOut = WALL_RADIUS;
    let offsetSide = 0;

    switch (bucket) {
      case "1-4": {
        // Tall vertical neon — building edge, sometimes hanging out.
        // Heights span lower floors; width stays narrow (4-6.5 units).
        height = (18 + rand() * 14) * b.scaleY; // 18-32
        width = height * meta.aspect;
        // Mid-point puts the bottom near street level; cap so top stays
        // within the lower portion of the building (~40 units up).
        y = (4 + rand() * 6) * b.scaleY + height / 2;
        // Push toward a wall edge — half-width is ~29; leave the sign's
        // own half-width as margin so it doesn't poke past the corner.
        const sideRoom = Math.max(0, MAX_SIDE_OFFSET - width / 2);
        offsetSide =
          (rand() < 0.5 ? -1 : 1) * (sideRoom * (0.6 + rand() * 0.4));
        // ~35% chance to hang outside the wall — pull the plane out so
        // most of its width sits beyond the wall, like a perpendicular
        // blade sign. DoubleSide renders the same texture both ways.
        if (rand() < 0.35) {
          offsetOut = WALL_RADIUS + width * 0.55;
          // Anchor close to the corner when hanging, so it reads as
          // mounted to the building edge.
          offsetSide = (offsetSide < 0 ? -1 : 1) * sideRoom;
        }
        break;
      }
      case "4-1": {
        // Wide horizontal — signage band over the storefront.
        height = (4 + rand() * 3) * b.scaleY; // 4-7
        width = height * meta.aspect;
        // Cap width to wall extent (~58 units). If the picked height makes
        // the sign too wide, shrink it proportionally.
        const maxW = MAX_SIDE_OFFSET * 2 + 4;
        if (width > maxW) {
          const scale = maxW / width;
          width *= scale;
          height *= scale;
        }
        // Most sit at storefront height; small chance of a roof-line band.
        const onTop = rand() < 0.15;
        y = onTop
          ? (38 + rand() * 6) * b.scaleY
          : (6 + rand() * 8) * b.scaleY + height / 2;
        // Roughly centered; small slide for variety.
        offsetSide = (rand() - 0.5) * 8;
        break;
      }
      case "3-2": {
        // Landscape poster — lower-mid, slightly off-center.
        height = (8 + rand() * 5) * b.scaleY; // 8-13
        width = height * meta.aspect;
        const maxW = MAX_SIDE_OFFSET * 2;
        if (width > maxW) {
          const scale = maxW / width;
          width *= scale;
          height *= scale;
        }
        y = (6 + rand() * 8) * b.scaleY + height / 2;
        offsetSide = (rand() - 0.5) * (MAX_SIDE_OFFSET - width / 2) * 0.8;
        break;
      }
      case "2-3": {
        // Portrait poster — near edge or centered, mid-low.
        height = (12 + rand() * 8) * b.scaleY; // 12-20
        width = height * meta.aspect;
        y = (5 + rand() * 8) * b.scaleY + height / 2;
        offsetSide =
          (rand() - 0.5) * Math.max(0, MAX_SIDE_OFFSET - width / 2) * 1.4;
        break;
      }
    }

    // Convert wall-relative offsets to world deltas. sin/cos with rotationY:
    //   forward (out from wall) = (sin, cos)
    //   right (along wall)      = (cos, -sin)
    const sin = Math.sin(rotationY);
    const cos = Math.cos(rotationY);
    const dx = sin * offsetOut + cos * offsetSide;
    const dz = cos * offsetOut - sin * offsetSide;

    ads.push({
      matKey: smallAdMatKey(meta.id),
      aspect: meta.aspect,
      x: b.x + dx,
      y,
      z: b.z + dz,
      width,
      height,
      rotationY,
      rotationX: 0,
    });
  }

  return ads;
}
