import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import type { Mesh } from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { AD_ATLASES, STRIP_FACTOR, adPanels, fillAdUVs, pickArt } from '../src/rendering/adArt.ts';
import { hashRandom } from '../src/hash.ts';

const dir = 'public/assets/models/';
const adModels = readdirSync(dir)
  .filter((f) => f.startsWith('ads_s_'))
  .map((f) => (new OBJLoader().parse(readFileSync(dir + f, 'utf8')).children[0] as Mesh).geometry);

// width/height of a UV rectangle in atlas pixels
const pixelAspect = ([u0, v0, u1, v1]: number[]) => (u1 - u0) / (v1 - v0);

describe('ad art', () => {
  it('finds the panels of every ad model, covering every vertex once', () => {
    let panels = 0;
    for (const g of adModels) {
      const p = adPanels(g);
      panels += p.length;
      const covered = p.flatMap((panel) => panel.vertices).sort((a, b) => a - b);
      expect(covered).toEqual([...Array(g.attributes.position.count).keys()]);
    }
    expect(panels).toBe(202);
  });

  it('crops art to exactly the panel shape, inside one piece of art', () => {
    for (const atlas of Object.values(AD_ATLASES)) {
      for (const aspect of [0.2, 0.35, 0.6, 0.8, 1, 1.4, 2, 3.5]) {
        const random = hashRandom(1, aspect, 0, 'test');
        for (let i = 0; i < 20; i++) {
          const rect = pickArt(atlas, aspect, random);
          expect(pixelAspect(rect)).toBeCloseTo(aspect, 3);
          const inside = atlas.entries.some(
            ({ uv }) =>
              rect[0] >= uv[0] - 1e-9 &&
              rect[1] >= uv[1] - 1e-9 &&
              rect[2] <= uv[2] + 1e-9 &&
              rect[3] <= uv[3] + 1e-9,
          );
          expect(inside).toBe(true);
        }
      }
    }
  });

  it('maps every panel of an ad into the atlas, deterministically per seed', () => {
    const g = adModels[0];
    const panels = adPanels(g);
    const fill = (seed: number) => {
      const uv = new Float32Array(g.attributes.position.count * 2);
      fillAdUVs(uv, panels, AD_ATLASES.neon, hashRandom(seed, 10, 20, 'advert-art'));
      return uv;
    };
    const a = fill(9746);
    expect(fill(9746)).toEqual(a);
    expect(fill(6362)).not.toEqual(a);
    for (const value of a) {
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThanOrEqual(1);
    }
  });

  it('has art for every panel shape the models use (within the crop tolerance)', () => {
    for (const atlas of Object.values(AD_ATLASES)) {
      for (const g of adModels) {
        for (const { aspect } of adPanels(g)) {
          if (aspect < 0.05) continue; // light strips are stretched, not cropped
          const closest = Math.min(...atlas.entries.map((a) => Math.abs(Math.log(a.aspect / aspect))));
          // otherwise the crop would cut away more than half the art
          expect(closest).toBeLessThan(Math.log(STRIP_FACTOR));
        }
      }
    }
  });
});
