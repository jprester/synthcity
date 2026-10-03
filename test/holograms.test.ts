// Hologram projections: picture art on a dark background, floating over a roof.
import { describe, it, expect } from 'vitest';
import { HOLOGRAM_ART, HOLOGRAM_LAYOUT, hologramAt } from '../src/generation/holograms.ts';
import type { HologramObject } from '../src/generation/holograms.ts';
import { generateBlock } from '../src/generation/cityBlock.ts';
import { DISTRICT_STYLES } from '../src/generation/districts.ts';
import type { DistrictKind } from '../src/generation/districts.ts';
import { createDistrictNoise, CELL_SIZE } from '../src/generation/world.ts';
import { AD_ATLASES } from '../src/rendering/adArt.ts';

const seed = 9746;
const noise = createDistrictNoise(seed);

function holograms(kind: DistrictKind) {
  const out: HologramObject[] = [];
  for (let i = -10; i < 10; i++) {
    for (let j = -10; j < 10; j++) {
      const objects = generateBlock({
        seed,
        noise,
        x: i * CELL_SIZE,
        z: j * CELL_SIZE,
        style: DISTRICT_STYLES[kind],
      });
      for (const o of objects) if (o.kind == 'hologram') out.push(o);
    }
  }
  return out;
}

describe('holograms', () => {
  it('only projects art on a dark background', () => {
    expect(HOLOGRAM_ART.length).toBeGreaterThan(10);
    for (const { atlas, art } of HOLOGRAM_ART) {
      expect(AD_ATLASES[atlas].entries[art].edge).toBeLessThanOrEqual(HOLOGRAM_LAYOUT.maxEdge);
    }
  });

  it('keeps the art aspect and size limits', () => {
    for (let i = 0; i < 200; i++) {
      const h = hologramAt(seed, i * 64, 150, -i * 64);
      const art = AD_ATLASES[h.atlas].entries[h.art];
      expect(h.width / h.height).toBeCloseTo(art.aspect, 6);
      expect(art.edge).toBeLessThanOrEqual(HOLOGRAM_LAYOUT.maxEdge);
      expect(h.height).toBeLessThanOrEqual(HOLOGRAM_LAYOUT.height[1] + 1e-9);
      expect(h.width).toBeLessThanOrEqual(HOLOGRAM_LAYOUT.maxWidth + 1e-9);
      expect(h.lift).toBeGreaterThanOrEqual(HOLOGRAM_LAYOUT.lift[0]);
    }
  });

  it('stands on the roof of its building, instead of a topper', () => {
    for (let i = -6; i < 6; i++) {
      for (let j = -6; j < 6; j++) {
        const objects = generateBlock({
          seed,
          noise,
          x: i * CELL_SIZE,
          z: j * CELL_SIZE,
          style: DISTRICT_STYLES.neon,
        });
        for (const h of objects.filter((o) => o.kind == 'hologram')) {
          const building = objects.find((o) => o.kind == 'building' && o.x == h.x && o.z == h.z);
          expect(building).toBeDefined();
          expect(objects.some((o) => o.kind == 'topper' && o.x == h.x && o.z == h.z)).toBe(false);
        }
      }
    }
  });

  it('is common in neon districts and rare in industrial ones', () => {
    const neon = holograms('neon').length;
    expect(neon).toBeGreaterThan(20);
    expect(neon).toBeGreaterThan(3 * holograms('mixed').length);
    expect(holograms('industrial').length).toBeLessThan(holograms('mixed').length);
  });

  it('is deterministic per seed and position', () => {
    expect(hologramAt(seed, 304, 160, 608)).toEqual(hologramAt(seed, 304, 160, 608));
    expect(hologramAt(seed, 304, 160, 608)).not.toEqual(hologramAt(6362, 304, 160, 608));
  });
});
