import { describe, it, expect } from 'vitest';
import { Generator } from '../src/classes/Generator.ts';
import type { GeneratorItem } from '../src/classes/Generator.ts';

interface Item extends GeneratorItem {
  x: number;
  z: number;
}

type Camera = { position: { x: number; z: number } };

function makeSpawn() {
  const live = new Set<Item>();
  const log = { created: 0, removed: 0, doubleRemoved: 0 };
  class Item {
    x: number;
    z: number;
    alive: boolean;
    constructor(x: number, z: number) {
      this.x = x;
      this.z = z;
      this.alive = true;
      live.add(this);
      log.created++;
    }
    remove() {
      if (!this.alive) log.doubleRemoved++;
      this.alive = false;
      live.delete(this);
      log.removed++;
    }
  }
  return { Item, live, log };
}

const keys = (items: Iterable<Item>) => [...items].map((i) => `${i.x},${i.z}`).sort();
const gridKeys = (gen: Generator) =>
  (gen.grid.flat().filter(Boolean) as Item[]).map((i) => `${i.x},${i.z}`).sort();

function make(camera: Camera, count = 8, size = 10) {
  const spawn = makeSpawn();
  const gen = new Generator({ camera, cell_size: size, cell_count: count, spawn_obj: spawn.Item });
  return { gen, ...spawn };
}

describe('Generator', () => {
  it('fills a disc of cells around the camera', () => {
    const { gen, live } = make({ position: { x: 0, z: 0 } });
    expect(live.size).toBeGreaterThan(0);
    expect(gridKeys(gen)).toEqual(keys(live));
    // every item sits on the cell lattice
    for (const i of live) {
      expect(Math.abs(i.x % 10)).toBe(0);
      expect(Math.abs(i.z % 10)).toBe(0);
    }
  });

  // steps stay within the grid width; see the teleport test below
  const path = [
    [5, 0],
    [15, 0],
    [15, 25],
    [-40, 25],
    [-40, -33],
    [30, -33],
    [31, 40],
  ];

  type Made = ReturnType<typeof make>;
  function walk(check: (current: Made, fresh: Made) => void) {
    const camera = { position: { x: 0, z: 0 } };
    const g = make(camera);
    for (const [x, z] of path) {
      camera.position.x = x;
      camera.position.z = z;
      g.gen.update();
      check(g, make({ position: { x, z } }));
    }
    return g;
  }

  it('after any walk, covers what a fresh generator would and tracks every item', () => {
    const { log, live } = walk(({ gen, live }, fresh) => {
      const have = new Set(keys(live));
      for (const k of keys(fresh.live)) expect(have.has(k)).toBe(true);
      expect(gridKeys(gen)).toEqual(keys(live));
    });
    expect(log.doubleRemoved).toBe(0);
    expect(log.created - log.removed).toBe(live.size);
  });

  // Items shifted into the grid corners (outside the disc) used to linger.
  it('after any walk, holds exactly what a fresh generator at the end position would', () => {
    walk(({ live }, fresh) => expect(keys(live)).toEqual(keys(fresh.live)));
  });

  it('does not rebuild items while the camera stays inside a cell', () => {
    const camera = { position: { x: 1, z: 1 } };
    const { gen, log } = make(camera);
    const created = log.created;
    camera.position.x = 9;
    camera.position.z = 9;
    gen.update();
    expect(log.created).toBe(created);
    expect(log.removed).toBe(0);
  });

  // Crash respawn teleports the car to the origin. A jump of more than
  // cell_count cells used to index past the grid in remove_items and throw.
  it.each([
    ['z', 0, -2000],
    ['x', -2000, 0],
    ['both', 5000, -5000],
  ])('survives a teleport further than the grid along %s (crash respawn)', (_, x, z) => {
    const camera = { position: { x: -12, z: 0 } };
    const { gen, live, log } = make(camera, 12, 152);
    camera.position.x = x;
    camera.position.z = z;
    gen.update();
    expect(keys(live)).toEqual(keys(make({ position: { x, z } }, 12, 152).live));
    camera.position.x = -12;
    camera.position.z = 0;
    gen.update();
    expect(keys(live)).toEqual(keys(make({ position: { x: -12, z: 0 } }, 12, 152).live));
    expect(gridKeys(gen)).toEqual(keys(live));
    expect(log.doubleRemoved).toBe(0);
  });
});
