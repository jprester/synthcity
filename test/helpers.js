import { vi } from 'vitest';
import { BufferGeometry, MeshBasicMaterial, Vector3 } from 'three';
import { createDistrictNoise } from '../src/generation/world.js';

// Seeded stand-in for Math.random (mulberry32).
export function seedMathRandom(seed) {
  let s = seed >>> 0;
  return vi.spyOn(Math, 'random').mockImplementation(() => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  });
}

// Generator context (see Game.init) for building city items headless. Models
// and materials are placeholders named after their asset key.
export function makeWorld({ worldSeed = 9746, environment = 'night' } = {}) {
  const geometries = new Map();
  const materials = new Map();
  const cached = (map, key, make) => {
    if (!map.has(key)) map.set(key, make(key));
    return map.get(key);
  };
  return {
    seed: worldSeed,
    noise: createDistrictNoise(worldSeed),
    spotLights: environment === 'night',
    assets: {
      getModel: (key) => cached(geometries, key, (k) => Object.assign(new BufferGeometry(), { name: k })),
      getMaterial: (key) => cached(materials, key, (k) => new MeshBasicMaterial({ name: k })),
    },
    scene: { add() {}, remove() {} },
    collider: { add() {}, remove() {} },
    player: { camera: { position: new Vector3() }, body: { position: new Vector3() } },
    cityLights: [],
  };
}

const r = (n) => Math.round(n * 1000) / 1000;

export function describeMesh(mesh) {
  const p = mesh.position;
  return `${mesh.geometry.name}/${mesh.material.name} @(${r(p.x)},${r(p.y)},${r(p.z)}) ry=${r(mesh.rotation.y)} s=(${r(mesh.scale.x)},${r(mesh.scale.y)},${r(mesh.scale.z)})`;
}
