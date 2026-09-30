import { vi } from 'vitest';
import { BufferGeometry, MeshBasicMaterial, Vector3 } from 'three';
import type { Material, Mesh } from 'three';
import { createDistrictNoise } from '../src/generation/world.ts';
import { PlayerController } from '../src/classes/PlayerController.ts';
import type { WorldContext } from '../src/classes/WorldContext.ts';

// Seeded stand-in for Math.random (mulberry32).
export function seedMathRandom(seed: number) {
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
export function makeWorld({ worldSeed = 9746, environment = 'night' } = {}): WorldContext {
  const geometries = new Map<string, BufferGeometry>();
  const materials = new Map<string, Material>();
  const cached = <T>(map: Map<string, T>, key: string, make: (key: string) => T): T => {
    if (!map.has(key)) map.set(key, make(key));
    return map.get(key)!;
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
    instances: { add: () => ({}), remove() {} },
  };
}

// A PlayerController with no DOM listeners and every key released, with the
// given overrides (e.g. { key_up: true }).
export function fakeController(overrides: Partial<PlayerController> = {}): PlayerController {
  const controller = Object.create(PlayerController.prototype) as PlayerController;
  const blank = { enabled: false, mouse_move_x: 0, mouse_move_y: 0, mouse_scroll: 0 };
  return Object.assign(controller, blank, overrides);
}

const r = (n: number) => Math.round(n * 1000) / 1000;

export function describeMesh(mesh: Mesh): string {
  const p = mesh.position;
  const material = mesh.material as Material;
  return `${mesh.geometry.name}/${material.name} @(${r(p.x)},${r(p.y)},${r(p.z)}) ry=${r(mesh.rotation.y)} s=(${r(mesh.scale.x)},${r(mesh.scale.y)},${r(mesh.scale.z)})`;
}
