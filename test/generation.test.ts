// Pure generation: plain data from (seed, position), no three.js and no stubs.
import { describe, it, expect, afterEach, vi } from 'vitest';
import { seedMathRandom } from './helpers.ts';
import { generateBlock } from '../src/generation/cityBlock.ts';
import type { BlockObject, BuildingObject } from '../src/generation/cityBlock.ts';
import { generateTrafficCell } from '../src/generation/traffic.ts';
import type { CarSpawn } from '../src/generation/traffic.ts';
import { cityLightHue } from '../src/generation/cityLight.ts';
import { CELL_SIZE as CELL, createDistrictNoise } from '../src/generation/world.ts';
import { DISTRICT_STYLES, districtKindAt, districtStyleAt } from '../src/generation/districts.ts';
import type { DistrictKind, DistrictStyle } from '../src/generation/districts.ts';

const RANGE = 6;

function blocks(seed: number, style?: DistrictStyle, range = RANGE, origin = [0, 0]) {
  const noise = createDistrictNoise(seed);
  const out: Record<string, BlockObject[]> = {};
  for (let i = -range; i <= range; i++) {
    for (let j = -range; j <= range; j++) {
      const x = (origin[0] + i) * CELL;
      const z = (origin[1] + j) * CELL;
      out[`${i},${j}`] = generateBlock({ seed, noise, x, z, style });
    }
  }
  return out;
}

const objectsOf = (b: Record<string, BlockObject[]>, kinds: BlockObject['kind'][]) =>
  Object.values(b).flatMap((objs) => objs.filter((o) => kinds.includes(o.kind)));
const DECORATIONS: BlockObject['kind'][] = ['sign', 'topper', 'smoke', 'spotlight'];
const STRUCTURES: BlockObject['kind'][] = ['building', 'storefront', 'ground'];

afterEach(() => {
  vi.restoreAllMocks();
});

describe('generateBlock', () => {
  // The original generator, recorded before districts existed: the 'mixed'
  // style must keep reproducing it exactly.
  it('matches the recorded data for seed 9746', () => {
    expect(blocks(9746, DISTRICT_STYLES.mixed)).toMatchSnapshot();
  });

  it('matches the recorded district data for seed 9746', () => {
    expect(blocks(9746)).toMatchSnapshot();
  });

  it('returns plain JSON data', () => {
    const b = blocks(6362);
    expect(JSON.parse(JSON.stringify(b))).toEqual(b);
  });

  it('does not depend on Math.random', () => {
    seedMathRandom(1);
    const a = blocks(9746);
    seedMathRandom(2);
    expect(blocks(9746)).toEqual(a);
  });

  it('gives different buildings and decorations for different seeds', () => {
    const a = blocks(9746);
    const b = blocks(6362);
    expect(objectsOf(a, STRUCTURES)).not.toEqual(objectsOf(b, STRUCTURES));
    expect(objectsOf(a, DECORATIONS)).not.toEqual(objectsOf(b, DECORATIONS));
  });

  it('leaves out spotlights when the environment has none', () => {
    const noise = createDistrictNoise(9746);
    let withLights = 0;
    for (let i = -RANGE; i <= RANGE; i++) {
      for (let j = -RANGE; j <= RANGE; j++) {
        const args = { seed: 9746, noise, x: i * CELL, z: j * CELL };
        withLights += generateBlock(args).filter((o) => o.kind == 'spotlight').length;
        const without = generateBlock({ ...args, spotLights: false });
        expect(without.filter((o) => o.kind == 'spotlight')).toEqual([]);
      }
    }
    expect(withLights).toBeGreaterThan(0);
  });

  it('picks variant, rotation and height of small buildings independently', () => {
    const lots = objectsOf(blocks(9746), ['building'])
      .filter((o): o is BuildingObject => o.kind == 'building' && /^s_0[123]_0\d$/.test(o.model))
      .map((o) => ({ variant: Number(o.model.slice(-1)), rotation: o.rotation, height: o.scaleY }));
    expect(lots.length).toBeGreaterThan(300);

    // every variant appears with every rotation
    for (let v = 1; v <= 3; v++) {
      expect(new Set(lots.filter((l) => l.variant == v).map((l) => l.rotation)).size).toBe(4);
    }

    const correlation = (a: number[], b: number[]) => {
      const mean = (xs: number[]) => xs.reduce((s, x) => s + x, 0) / xs.length;
      const ma = mean(a);
      const mb = mean(b);
      let cov = 0;
      let va = 0;
      let vb = 0;
      for (let k = 0; k < a.length; k++) {
        cov += (a[k] - ma) * (b[k] - mb);
        va += (a[k] - ma) ** 2;
        vb += (b[k] - mb) ** 2;
      }
      return cov / Math.sqrt(va * vb);
    };
    const variants = lots.map((l) => l.variant);
    const rotations = lots.map((l) => l.rotation);
    const heights = lots.map((l) => l.height);
    expect(Math.abs(correlation(variants, rotations))).toBeLessThan(0.15);
    expect(Math.abs(correlation(variants, heights))).toBeLessThan(0.15);
    expect(Math.abs(correlation(rotations, heights))).toBeLessThan(0.15);
  });
});

describe('generateTrafficCell', () => {
  const cells = (seed: number) => {
    const out: CarSpawn[][] = [];
    for (let i = -3; i <= 3; i++) {
      for (let j = -3; j <= 3; j++) out.push(generateTrafficCell({ seed, x: i * CELL, z: j * CELL }));
    }
    return out;
  };

  it('is deterministic per seed and independent of Math.random', () => {
    seedMathRandom(1);
    const a = cells(9746);
    seedMathRandom(2);
    expect(cells(9746)).toEqual(a);
    expect(a.flat().length).toBeGreaterThan(0);
  });

  it('differs between seeds', () => {
    expect(cells(9746)).not.toEqual(cells(6362));
  });

  it('keeps the original car count distribution (0.89 per lane)', () => {
    let cars = 0;
    let lanes = 0;
    for (let i = 0; i < 2000; i++) {
      cars += generateTrafficCell({ seed: 1, x: i * CELL, z: 0 }).length;
      lanes += 3;
    }
    expect(cars / lanes).toBeCloseTo(8 / 9, 1);
  });
});

describe('cityLightHue', () => {
  it('lights only district edges, with hues in the district range', () => {
    const noise = createDistrictNoise(9746);
    let lit = 0;
    for (let i = -20; i < 20; i++) {
      for (let j = -20; j < 20; j++) {
        const hue = cityLightHue({ seed: 9746, noise, x: i * CELL * 4, z: j * CELL * 4 });
        if (hue === null) continue;
        lit++;
        const [min, max] = districtStyleAt(noise, i * CELL * 4, j * CELL * 4).lightHue;
        expect(hue).toBeGreaterThanOrEqual(min);
        expect(hue).toBeLessThan(max);
      }
    }
    expect(lit).toBeGreaterThan(0);
    expect(lit).toBeLessThan(1600);
  });
});

describe('districts', () => {
  // count objects per district kind over the same large area, forcing each style
  const stats = (kind: DistrictKind) => {
    const b = blocks(9746, DISTRICT_STYLES[kind], 12);
    const buildings = objectsOf(b, ['building']) as BuildingObject[];
    const count = (k: BlockObject['kind']) => objectsOf(b, [k]).length;
    return {
      buildings: buildings.length,
      towers: buildings.filter((o) => o.model.startsWith('s_05')).length,
      meanHeight: buildings.reduce((sum, o) => sum + o.scaleY, 0) / buildings.length,
      adsPerBuilding: count('sign') / buildings.length,
      smoke: count('smoke'),
      spotlights: count('spotlight') + count('topper'),
    };
  };
  const all = Object.fromEntries(
    (Object.keys(DISTRICT_STYLES) as DistrictKind[]).map((k) => [k, stats(k)]),
  ) as Record<DistrictKind, ReturnType<typeof stats>>;

  it('gives each kind its character', () => {
    expect(all.downtown.towers).toBeGreaterThan(all.mixed.towers);
    expect(all.downtown.meanHeight).toBeGreaterThan(all.mixed.meanHeight);
    expect(all.neon.adsPerBuilding).toBeGreaterThan(all.mixed.adsPerBuilding);
    expect(all.neon.spotlights).toBeGreaterThan(2 * all.mixed.spotlights);
    expect(all.industrial.smoke).toBeGreaterThan(3 * all.mixed.smoke);
    expect(all.industrial.meanHeight).toBeLessThan(all.mixed.meanHeight);
    expect(all.industrial.adsPerBuilding).toBeLessThan(all.mixed.adsPerBuilding / 2);
    expect(all.residential.towers).toBe(0);
    expect(all.residential.adsPerBuilding).toBeLessThan(all.mixed.adsPerBuilding);
  });

  it('every kind appears in a city, with mixed still common', () => {
    const noise = createDistrictNoise(9746);
    const counts: Record<string, number> = {};
    for (let i = -60; i < 60; i++) {
      for (let j = -60; j < 60; j++) {
        const kind = districtKindAt(noise, i * CELL * 2, j * CELL * 2);
        counts[kind] = (counts[kind] ?? 0) + 1;
      }
    }
    const total = 120 * 120;
    for (const kind of Object.keys(DISTRICT_STYLES))
      expect(counts[kind] ?? 0, kind).toBeGreaterThan(total * 0.05);
    expect(counts.mixed).toBeGreaterThan(total * 0.15);
  });

  it('keeps a block in one kind (decided by its corner)', () => {
    const noise = createDistrictNoise(9746);
    // neighbouring blocks mostly share their kind: districts are regions, not noise
    let same = 0;
    let n = 0;
    for (let i = -40; i < 40; i++) {
      const a = districtKindAt(noise, i * CELL, 0);
      const b = districtKindAt(noise, (i + 1) * CELL, 0);
      n++;
      if (a == b) same++;
    }
    expect(same / n).toBeGreaterThan(0.85);
  });
});

describe('light bars', () => {
  it('appear on towers and keep their face free of signs', () => {
    const noise = createDistrictNoise(9746);
    let bars = 0;
    for (let i = -15; i <= 15; i++) {
      for (let j = -15; j <= 15; j++) {
        const objects = generateBlock({ seed: 9746, noise, x: i * CELL, z: j * CELL });
        for (const o of objects) {
          if (o.kind != 'lightbars') continue;
          bars++;
          const a = (-o.rotation * Math.PI) / 180;
          const face = [Math.cos(a), -Math.sin(a)];
          for (const s of objects) {
            if (s.kind != 'sign' || Math.hypot(s.x - o.x, s.z - o.z) > 100) continue;
            // the wall a sign is on faces (sin yaw, cos yaw); a blade's wall is turned by 90 degrees
            const n =
              s.mount == 'blade' ? [Math.cos(s.yaw), -Math.sin(s.yaw)] : [Math.sin(s.yaw), Math.cos(s.yaw)];
            expect(n[0] * face[0] + n[1] * face[1]).toBeLessThanOrEqual(0.95);
          }
        }
      }
    }
    expect(bars).toBeGreaterThan(0);
  });
});
