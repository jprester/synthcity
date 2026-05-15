import type { FiniteCityLayout } from "../../config/cityLayouts";
import {
  ADS_PORTRAIT,
  ADS_SQUARE,
  adMatKey,
  type AdMeta,
} from "../../config/ads";
import type { WallAd } from "./types";

/**
 * Procedural wall ads on small buildings (s_01 / s_02 / s_03). Small,
 * low-density signage that's seeded by the world seed for determinism.
 * Always uses the "holo" style — towers/skyscrapers get the manual list.
 */
export function resolveProceduralWallAds(
  layout: FiniteCityLayout,
  worldSeed: number,
): WallAd[] {
  const ads: WallAd[] = [];

  let seed = worldSeed ^ 0xb1ad;
  const seededRandom = () => {
    seed = (seed * 16807 + 0) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  const pick = <T,>(arr: readonly T[]): T =>
    arr[Math.floor(seededRandom() * arr.length)];

  type Tier = {
    spawn: number;
    sizeBase: number;
    sizeJitter: number;
    offset: number;
    baseY: number;
    yJitter: number;
    pickPool: (r: number) => readonly AdMeta[];
  };

  const TIERS: Record<string, Tier> = {
    smallResidential: {
      spawn: 0.18,
      sizeBase: 10,
      sizeJitter: 6,
      offset: 12,
      baseY: 18,
      yJitter: 14,
      pickPool: (r) => (r < 0.45 ? ADS_PORTRAIT : ADS_SQUARE),
    },
    smallCommercial: {
      spawn: 0.32,
      sizeBase: 12,
      sizeJitter: 7,
      offset: 12,
      baseY: 16,
      yJitter: 14,
      pickPool: (r) => (r < 0.5 ? ADS_PORTRAIT : ADS_SQUARE),
    },
    smallIndustrial: {
      spawn: 0.12,
      sizeBase: 12,
      sizeJitter: 8,
      offset: 13,
      baseY: 20,
      yJitter: 18,
      pickPool: (r) => (r < 0.4 ? ADS_PORTRAIT : ADS_SQUARE),
    },
  };

  const classifySmall = (modelKey: string): Tier | null => {
    if (modelKey.startsWith("s_01_")) return TIERS.smallResidential;
    if (modelKey.startsWith("s_02_")) return TIERS.smallCommercial;
    if (modelKey.startsWith("s_03_")) return TIERS.smallIndustrial;
    return null;
  };

  for (const b of layout.buildings) {
    const tier = classifySmall(b.modelKey);
    if (!tier) continue;
    if (seededRandom() > tier.spawn) continue;

    const pool = tier.pickPool(seededRandom());
    const meta = pick(pool);
    const baseHeight = tier.sizeBase + seededRandom() * tier.sizeJitter;
    const height = baseHeight * b.scaleY;
    const width = height * meta.aspect;

    const faceIdx = Math.floor(seededRandom() * 4);
    const faceAngle = (faceIdx * Math.PI) / 2;
    const y = (tier.baseY + seededRandom() * tier.yJitter) * b.scaleY;
    const totalAngle = b.rotationY + faceAngle;
    const dx = Math.sin(totalAngle) * tier.offset;
    const dz = Math.cos(totalAngle) * tier.offset;

    ads.push({
      matKey: adMatKey(meta.id, "holo"),
      aspect: meta.aspect,
      x: b.x + dx,
      y,
      z: b.z + dz,
      width: width / 1.5,
      height: height / 1.5,
      rotationY: totalAngle,
      rotationX: 0,
    });
  }

  return ads;
}
