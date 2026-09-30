import { describe, it, expect, afterEach, vi } from 'vitest';
import { installFakeGame, seedMathRandom, describeMesh } from './helpers.js';
import { GeneratorItem_CityBlock } from '../src/classes/GeneratorItem_CityBlock.js';

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

  // Ads, toppers, smoke, spotlights and traffic currently use Math.random, so a
  // revisited block can look different. Making them seed-driven is planned.
  it.todo('decorations are the same for a world seed regardless of Math.random');
});
