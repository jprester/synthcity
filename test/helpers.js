import { vi } from 'vitest';
import { BufferGeometry, MeshBasicMaterial, Vector3 } from 'three';
import { Perlin } from '../src/lib/perlin.js';

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

// Minimal `window.game` for running the city generators headless. Models and
// materials are placeholders named after their asset key.
export function installFakeGame({ worldSeed = 9746, environment = 'night' } = {}) {
  const geometries = new Map();
  const materials = new Map();
  const cached = (map, key, make) => {
    if (!map.has(key)) map.set(key, make(key));
    return map.get(key);
  };
  const noise = new Perlin(worldSeed);
  noise.noiseDetail(8, 0.5);

  const game = {
    settings: { worldSeed },
    cityBlockSize: 128,
    roadWidth: 24,
    cityBlockNoise: noise,
    cityBlockNoiseFactor: 0.0017,
    environment: { name: environment, spotLights: environment === 'night' },
    assets: {
      getModel: (key) => cached(geometries, key, (k) => Object.assign(new BufferGeometry(), { name: k })),
      getMaterial: (key) => cached(materials, key, (k) => new MeshBasicMaterial({ name: k })),
    },
    scene: { add() {}, remove() {} },
    collider: { add() {}, remove() {} },
    player: { camera: { position: { x: 0, y: 0, z: 0 } }, body: { position: new Vector3() } },
  };
  globalThis.window = { game };
  return game;
}

const r = (n) => Math.round(n * 1000) / 1000;

export function describeMesh(mesh) {
  const p = mesh.position;
  return `${mesh.geometry.name}/${mesh.material.name} @(${r(p.x)},${r(p.y)},${r(p.z)}) ry=${r(mesh.rotation.y)} s=(${r(mesh.scale.x)},${r(mesh.scale.y)},${r(mesh.scale.z)})`;
}
