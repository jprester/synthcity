// Every model must have one normal and uv per position. OBJ exports with stray
// `l` (line) records append extra positions; WebGL then rejects the draw
// ("vertex buffer is not big enough") and the model silently never renders.
import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import type { Mesh } from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

const dir = 'public/assets/models/';
const models = readdirSync(dir).filter((f) => f.endsWith('.obj'));

describe('OBJ models', () => {
  it.each(models)('%s has consistent vertex attributes', (file) => {
    const obj = new OBJLoader().parse(readFileSync(dir + file, 'utf8'));
    expect(obj.children.length).toBeGreaterThan(0);
    // AssetManager uses the first child's geometry
    const { attributes } = (obj.children[0] as Mesh).geometry;
    const positions = attributes.position.count;
    for (const [name, attribute] of Object.entries(attributes)) {
      expect(attribute.count, name).toBe(positions);
    }
  });
});
