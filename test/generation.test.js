// Pure generation: plain data from (seed, position), no three.js and no stubs.
import { describe, it, expect, afterEach, vi } from 'vitest';
import { seedMathRandom } from './helpers.js';
import { generateBlock } from '../src/generation/cityBlock.js';
import { generateTrafficCell } from '../src/generation/traffic.js';
import { cityLightHue } from '../src/generation/cityLight.js';
import { CELL_SIZE as CELL, createDistrictNoise } from '../src/generation/world.js';

const RANGE = 6;

function blocks(seed) {
  const noise = createDistrictNoise(seed);
  const out = {};
  for (let i = -RANGE; i <= RANGE; i++) {
    for (let j = -RANGE; j <= RANGE; j++) {
      out[`${i},${j}`] = generateBlock({ seed, noise, x: i * CELL, z: j * CELL });
    }
  }
  return out;
}

const objectsOf = (b, kinds) =>
  Object.values(b).flatMap((objs) => objs.filter((o) => kinds.includes(o.kind)));
const DECORATIONS = ['advert', 'topper', 'smoke', 'spotlight'];
const STRUCTURES = ['building', 'storefront', 'ground'];

afterEach(() => {
  vi.restoreAllMocks();
});

describe('generateBlock', () => {
  it('matches the recorded data for seed 9746', () => {
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
      .filter((o) => /^s_0[123]_0\d$/.test(o.model))
      .map((o) => ({ variant: Number(o.model.slice(-1)), rotation: o.rotation, height: o.scaleY }));
    expect(lots.length).toBeGreaterThan(300);

    // every variant appears with every rotation
    for (let v = 1; v <= 3; v++) {
      expect(new Set(lots.filter((l) => l.variant == v).map((l) => l.rotation)).size).toBe(4);
    }

    const correlation = (a, b) => {
      const mean = (xs) => xs.reduce((s, x) => s + x, 0) / xs.length;
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
  const cells = (seed) => {
    const out = [];
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
  it('lights only district edges, with hues in [0.5, 1)', () => {
    const noise = createDistrictNoise(9746);
    let lit = 0;
    for (let i = -20; i < 20; i++) {
      for (let j = -20; j < 20; j++) {
        const hue = cityLightHue({ seed: 9746, noise, x: i * CELL * 4, z: j * CELL * 4 });
        if (hue === null) continue;
        lit++;
        expect(hue).toBeGreaterThanOrEqual(0.5);
        expect(hue).toBeLessThan(1);
      }
    }
    expect(lit).toBeGreaterThan(0);
    expect(lit).toBeLessThan(1600);
  });
});
