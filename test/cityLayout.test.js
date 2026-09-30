// Mesh-level layout: runs the three.js builders (GeneratorItem_*) over the
// generated data. The snapshots pin the exact meshes; the pure data is covered
// in generation.test.js.
import { describe, it, expect, afterEach, vi } from 'vitest';
import { makeWorld, seedMathRandom, describeMesh } from './helpers.js';
import { GeneratorItem_CityBlock } from '../src/classes/GeneratorItem_CityBlock.js';
import { GeneratorItem_Traffic } from '../src/classes/GeneratorItem_Traffic.js';
import { CELL_SIZE as CELL } from '../src/generation/world.js';

// 13x13 blocks around the origin; includes the cells where mega buildings
// may appear (multiples of 6 cells) and the storefront cells (multiples of 2).
const RANGE = 6;

function layout(worldSeed, randomSeed = 1) {
  const world = makeWorld({ worldSeed });
  seedMathRandom(randomSeed);
  const blocks = {};
  for (let i = -RANGE; i <= RANGE; i++) {
    for (let j = -RANGE; j <= RANGE; j++) {
      const block = new GeneratorItem_CityBlock(i * CELL, j * CELL, world);
      blocks[`${i},${j}`] = {
        buildings: block.meshesCollid.map(describeMesh),
        ground: block.meshes.map(describeMesh),
        decorations: block.updateables.map((u) => `${u.constructor.name} ${describeMesh(u.mesh)}`),
      };
    }
  }
  return blocks;
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe('city block layout', () => {
  it.each([9746, 6362])('matches the recorded layout for seed %i', (seed) => {
    expect(layout(seed)).toMatchSnapshot();
  });

  it('hands the collider proxies with world transforms, and instances everything else', () => {
    const world = makeWorld({ worldSeed: 9746 });
    const collided = [];
    const instanced = [];
    world.collider.add = (mesh) => collided.push(mesh);
    world.instances.add = (geometry, material, matrix) => instanced.push(matrix.clone());
    const block = new GeneratorItem_CityBlock(0, 0, world);
    expect(collided.length).toBeGreaterThan(0);
    expect(collided).toEqual(block.meshesCollid);
    for (const mesh of collided) {
      expect(mesh.parent).toBe(null);
      mesh.updateMatrix();
      expect(mesh.matrixWorld.elements).toEqual(mesh.matrix.elements);
      expect(mesh.matrixWorld.elements[12]).toBe(mesh.position.x);
    }
    // ground + every collidable
    expect(instanced.length).toBe(block.meshes.length + block.meshesCollid.length);
  });

  it('builds the same meshes for a world seed regardless of Math.random', () => {
    expect(layout(9746, 1)).toEqual(layout(9746, 2));
  });
});

describe('traffic', () => {
  const cars = (worldSeed, randomSeed) => {
    const world = makeWorld({ worldSeed });
    seedMathRandom(randomSeed);
    const out = [];
    for (let i = -3; i <= 3; i++) {
      for (let j = -3; j <= 3; j++) {
        for (const car of new GeneratorItem_Traffic(i * CELL, j * CELL, world).cars) {
          out.push(`${describeMesh(car.mesh)} x=${car.x} z=${car.z} v=${car.v.x},${car.v.y}`);
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
});
