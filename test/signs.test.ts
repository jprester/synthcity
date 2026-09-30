// Wall signs: placed on exposed walls at the art's own shape, small neon low,
// big posters in the middle, never overlapping.
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { DoubleSide, Mesh, MeshBasicMaterial, Raycaster, Vector3 } from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MeshBVH, acceleratedRaycast } from 'three-mesh-bvh';
import { FACADES, SIGN_LAYOUT, placeSigns } from '../src/generation/signs.ts';
import type { SignObject } from '../src/generation/signs.ts';
import { DISTRICT_STYLES } from '../src/generation/districts.ts';
import { AD_ATLASES } from '../src/rendering/adArt.ts';

Mesh.prototype.raycast = acceleratedRaycast;

const MODELS = Object.keys(FACADES).filter((k) => k.startsWith('s_'));

// every model at every rotation, a few heights, in a sign-heavy district
function cases() {
  const out: {
    building: { model: string; x: number; z: number; rotation: number; scaleY: number };
    signs: SignObject[];
  }[] = [];
  let i = 0;
  for (const model of MODELS) {
    for (const rotation of [0, 90, 180, 270]) {
      for (const scaleY of [0.75, 1.2]) {
        const building = { model, x: 1000 + i * 152, z: -500, rotation, scaleY };
        const signs: SignObject[] = [];
        placeSigns(signs, building, 9746, DISTRICT_STYLES.neon);
        out.push({ building, signs });
        i++;
      }
    }
  }
  return out;
}
const all = cases();

// a sign back in its building's model space: [s, y, width, height] on a wall
function onWall(sign: SignObject, b: (typeof all)[number]['building']) {
  const angle = (b.rotation * Math.PI) / 180;
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  const dx = sign.x - b.x;
  const dz = sign.z - b.z;
  // inverse of the rotation used by placeSigns
  const px = c * dx - s * dz;
  const pz = s * dx + c * dz;
  return { px, pz };
}

describe('wall signs', () => {
  it('places plenty of signs in a neon district', () => {
    const total = all.reduce((n, c) => n + c.signs.length, 0);
    expect(total).toBeGreaterThan(all.length * 2);
    expect(all.some((c) => c.signs.some((s) => s.atlas == 'posters'))).toBe(true);
  });

  it('keeps every sign at its art aspect and on an exposed wall rectangle', () => {
    for (const { building, signs } of all) {
      const facades = FACADES[building.model];
      for (const sign of signs) {
        const art = AD_ATLASES[sign.atlas].entries[sign.art];
        expect(sign.width / sign.height).toBeCloseTo(art.aspect, 6);
        const { px, pz } = onWall(sign, building);
        const fits = facades.rects.some((r) => {
          const along = -r.n[1] * px + r.n[0] * pz;
          const out = r.n[0] * px + r.n[1] * pz - r.d;
          return (
            Math.abs(out - SIGN_LAYOUT.offset) < 1e-6 &&
            along - sign.width / 2 >= r.s0 - 1e-6 &&
            along + sign.width / 2 <= r.s1 + 1e-6 &&
            sign.y - sign.height / 2 >= r.y0 * building.scaleY - 1e-6 &&
            sign.y + sign.height / 2 <= r.y1 * building.scaleY + 1e-6
          );
        });
        expect(fits, `${building.model} r${building.rotation} ${sign.atlas}#${sign.art}`).toBe(true);
      }
    }
  });

  it('faces each sign out of its building: nothing of it in front of the sign', () => {
    const raycaster = new Raycaster();
    raycaster.firstHitOnly = true;
    const meshes = new Map<string, Mesh>();
    const meshOf = (model: string) => {
      let mesh = meshes.get(model);
      if (!mesh) {
        const obj = new OBJLoader().parse(readFileSync(`public/assets/models/${model}.obj`, 'utf8'));
        const geometry = (obj.children[0] as Mesh).geometry;
        geometry.boundsTree = new MeshBVH(geometry);
        mesh = new Mesh(geometry, new MeshBasicMaterial({ side: DoubleSide }));
        meshes.set(model, mesh);
      }
      return mesh;
    };
    for (const { building, signs } of all) {
      const mesh = meshOf(building.model);
      mesh.position.set(building.x, 0, building.z);
      mesh.scale.set(1, building.scaleY, 1);
      mesh.rotation.set(0, (building.rotation * Math.PI) / 180, 0);
      mesh.updateMatrixWorld(true);
      for (const sign of signs) {
        const dir = new Vector3(Math.sin(sign.yaw), 0, Math.cos(sign.yaw));
        raycaster.set(new Vector3(sign.x, sign.y, sign.z).addScaledVector(dir, 0.2), dir);
        expect(raycaster.intersectObject(mesh), `${building.model} r${building.rotation}`).toEqual([]);
      }
    }
  });

  it('puts small neon signs low and big posters in the middle band', () => {
    for (const { building, signs } of all) {
      const height = FACADES[building.model].height * building.scaleY;
      for (const sign of signs) {
        const top = sign.y + sign.height / 2;
        const bottom = sign.y - sign.height / 2;
        if (sign.atlas == 'neon') {
          expect(top).toBeLessThanOrEqual(
            Math.min(height * SIGN_LAYOUT.neon.zone[1], SIGN_LAYOUT.neon.zoneCap) + 1e-6,
          );
          expect(Math.max(sign.width, sign.height)).toBeLessThanOrEqual(SIGN_LAYOUT.neon.size[1] + 1e-6);
        } else {
          expect(bottom).toBeGreaterThanOrEqual(height * SIGN_LAYOUT.poster.zone[0] - 1e-6);
          expect(top).toBeLessThanOrEqual(height * SIGN_LAYOUT.poster.zone[1] + 1e-6);
          expect(sign.height).toBeGreaterThanOrEqual(SIGN_LAYOUT.poster.minHeight - 1e-6);
        }
      }
    }
  });

  it('never overlaps signs on the same wall', () => {
    for (const { signs } of all) {
      for (let i = 0; i < signs.length; i++) {
        for (let j = i + 1; j < signs.length; j++) {
          const a = signs[i];
          const b = signs[j];
          if (Math.abs(a.yaw - b.yaw) > 1e-6) continue; // different walls
          // distance along the wall and vertically
          const along = Math.abs((a.x - b.x) * Math.cos(a.yaw) - (a.z - b.z) * Math.sin(a.yaw));
          const across = Math.abs((a.x - b.x) * Math.sin(a.yaw) + (a.z - b.z) * Math.cos(a.yaw));
          if (across > 0.01) continue; // parallel but different walls
          const apartX = along >= (a.width + b.width) / 2;
          const apartY = Math.abs(a.y - b.y) >= (a.height + b.height) / 2;
          expect(apartX || apartY).toBe(true);
        }
      }
    }
  });

  it('is deterministic per seed and building', () => {
    const b = { model: 's_03_02', x: 304, z: 608, rotation: 90, scaleY: 1 };
    const place = (seed: number) => {
      const out: SignObject[] = [];
      placeSigns(out, b, seed, DISTRICT_STYLES.mixed);
      return out;
    };
    expect(place(9746)).toEqual(place(9746));
    expect(place(9746)).not.toEqual(place(6362));
  });
});
