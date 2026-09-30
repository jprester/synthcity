import { describe, it, expect, afterEach, vi } from 'vitest';
import { Vector3 } from 'three';
import { installFakeGame, seedMathRandom, describeMesh } from './helpers.js';
import { GeneratorItem_CityBlock } from '../src/classes/GeneratorItem_CityBlock.js';
import { GeneratorItem_Traffic } from '../src/classes/GeneratorItem_Traffic.js';

const CELL = 128 + 24;
// 13x13 blocks around the origin; includes the cells where mega buildings
// may appear (multiples of 6 cells) and the storefront cells (multiples of 2).
const RANGE = 6;

function layout(worldSeed, randomSeed = 1) {
  installFakeGame({ worldSeed });
  seedMathRandom(randomSeed);
  const blocks = {};
  for (let i = -RANGE; i <= RANGE; i++) {
    for (let j = -RANGE; j <= RANGE; j++) {
      const block = new GeneratorItem_CityBlock(i * CELL, j * CELL);
      blocks[`${i},${j}`] = {
        buildings: block.meshesCollid.map(describeMesh),
        ground: block.meshes.map(describeMesh),
        decorations: block.updateables.map((u) => `${u.constructor.name} ${describeMesh(u.mesh)}`),
      };
    }
  }
  return blocks;
}

const buildingsOnly = (blocks) =>
  Object.fromEntries(Object.entries(blocks).map(([k, v]) => [k, [...v.buildings, ...v.ground]]));

afterEach(() => {
  vi.restoreAllMocks();
});

describe('city block layout', () => {
  it.each([9746, 6362])('matches the recorded layout for seed %i', (seed) => {
    expect(layout(seed)).toMatchSnapshot();
  });

  it('places the same buildings for a world seed regardless of Math.random', () => {
    expect(buildingsOnly(layout(9746, 1))).toEqual(buildingsOnly(layout(9746, 2)));
  });

  it('places different buildings for different world seeds', () => {
    expect(buildingsOnly(layout(9746))).not.toEqual(buildingsOnly(layout(6362)));
  });

  it('picks variant, rotation and height of small buildings independently', () => {
    installFakeGame({ worldSeed: 9746 });
    const lots = [];
    for (let i = -RANGE; i <= RANGE; i++) {
      for (let j = -RANGE; j <= RANGE; j++) {
        for (const mesh of new GeneratorItem_CityBlock(i * CELL, j * CELL).meshesCollid) {
          const m = /^s_0[123]_0(\d)$/.exec(mesh.geometry.name);
          if (!m) continue;
          // Euler y is ambiguous at 180°, so read the facing from the quaternion
          const facing = new Vector3(1, 0, 0).applyQuaternion(mesh.quaternion);
          const rotation = (Math.round(Math.atan2(-facing.z, facing.x) / (Math.PI / 2)) + 4) % 4;
          lots.push({ variant: Number(m[1]), rotation, height: mesh.scale.y });
        }
      }
    }
    expect(lots.length).toBeGreaterThan(300);

    // every variant appears with every rotation
    for (let v = 1; v <= 3; v++) {
      const rotations = new Set(lots.filter((l) => l.variant == v).map((l) => l.rotation));
      expect(rotations.size).toBe(4);
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

  it('places the same decorations for a world seed regardless of Math.random', () => {
    const a = layout(9746, 1);
    const b = layout(9746, 2);
    for (const key of Object.keys(a)) expect(b[key].decorations).toEqual(a[key].decorations);
  });

  it('places decorations whose parameters differ between world seeds', () => {
    const decorations = (blocks) => Object.values(blocks).flatMap((b) => b.decorations);
    expect(decorations(layout(9746))).not.toEqual(decorations(layout(6362)));
  });
});

describe('traffic', () => {
  const cars = (worldSeed, randomSeed) => {
    installFakeGame({ worldSeed });
    seedMathRandom(randomSeed);
    const out = [];
    for (let i = -3; i <= 3; i++) {
      for (let j = -3; j <= 3; j++) {
        const cell = new GeneratorItem_Traffic(i * CELL, j * CELL);
        for (const car of cell.cars) {
          out.push(
            `${describeMesh(car.mesh)} x=${car.x} z=${car.z} alt=${car.alt + car.alt_offset} v=${car.v.x},${car.v.y} rev=${car.reverseDistance.toFixed(3)}`,
          );
        }
      }
    }
    return out;
  };

  it('spawns the same cars for a world seed regardless of Math.random', () => {
    const a = cars(9746, 1);
    expect(a.length).toBeGreaterThan(0);
    expect(cars(9746, 2)).toEqual(a);
  });

  it('spawns different cars for different world seeds', () => {
    expect(cars(9746, 1)).not.toEqual(cars(6362, 1));
  });
});
