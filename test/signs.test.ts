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
import { CELL_SIZE, CITY_BLOCK_SIZE } from '../src/generation/world.ts';

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

// where a sign meets its wall, and the wall's outward normal (world space)
function attachment(sign: SignObject) {
  if (sign.mount != 'blade') {
    const n = [Math.sin(sign.yaw), Math.cos(sign.yaw)];
    return {
      x: sign.x - n[0] * SIGN_LAYOUT.offset,
      z: sign.z - n[1] * SIGN_LAYOUT.offset,
      n,
      widthOnWall: sign.width,
    };
  }
  // a blade faces along the wall: its normal is the wall's tangent
  const n = [Math.cos(sign.yaw), -Math.sin(sign.yaw)];
  const out = SIGN_LAYOUT.blade.gap + sign.width / 2;
  return { x: sign.x - n[0] * out, z: sign.z - n[1] * out, n, widthOnWall: SIGN_LAYOUT.blade.footprint };
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
        const a = attachment(sign);
        const { px, pz } = onWall({ ...sign, x: a.x, z: a.z }, building);
        const walls = sign.mount == 'banner' ? [...facades.screens, ...facades.banners] : facades.rects;
        const fits = walls.some((r) => {
          const along = -r.n[1] * px + r.n[0] * pz;
          const out = r.n[0] * px + r.n[1] * pz - r.d;
          return (
            Math.abs(out) < 1e-6 &&
            along - a.widthOnWall / 2 >= r.s0 - 1e-6 &&
            along + a.widthOnWall / 2 <= r.s1 + 1e-6 &&
            sign.y - sign.height / 2 >= r.y0 * building.scaleY - 1e-6 &&
            sign.y + sign.height / 2 <= r.y1 * building.scaleY + 1e-6
          );
        });
        expect(fits, `${building.model} r${building.rotation} ${sign.mount} ${sign.atlas}#${sign.art}`).toBe(
          true,
        );
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
        const a = attachment(sign);
        const dir = new Vector3(a.n[0], 0, a.n[1]);
        raycaster.set(new Vector3(a.x, sign.y, a.z).addScaledVector(dir, 0.55), dir);
        const hits = raycaster.intersectObject(mesh);
        expect(
          hits.length ? `${sign.mount} ${sign.atlas} hit at ${hits[0].distance.toFixed(2)}` : 'clear',
          `${building.model} r${building.rotation}`,
        ).toBe('clear');
      }
    }
  });

  it('puts neon low, posters in the middle and banners down skyscrapers', () => {
    for (const { building, signs } of all) {
      const height = FACADES[building.model].height * building.scaleY;
      for (const sign of signs) {
        const top = sign.y + sign.height / 2;
        const bottom = sign.y - sign.height / 2;
        if (sign.mount == 'banner') {
          const b = SIGN_LAYOUT.banner;
          expect(height).toBeGreaterThanOrEqual(b.minBuilding);
          expect(sign.atlas).not.toBe('neon'); // picture ads, not neon text
          expect(sign.width / sign.height).toBeLessThanOrEqual(b.maxAspect + 1e-6);
          expect(sign.height).toBeGreaterThanOrEqual(b.minHeight - 1e-6);
          expect(sign.height).toBeLessThanOrEqual(b.maxHeight + 1e-6);
          expect(bottom).toBeGreaterThanOrEqual(height * b.zone[0] - 1e-6);
          expect(top).toBeLessThanOrEqual(height * b.zone[1] + 1e-6);
        } else if (sign.atlas == 'neon') {
          const n = SIGN_LAYOUT.neon;
          const cap = height >= SIGN_LAYOUT.banner.minBuilding ? n.skyscraper.zoneCap : n.zoneCap;
          expect(top).toBeLessThanOrEqual(Math.min(height * n.zone[1], cap) + 1e-6);
          expect(Math.max(sign.width, sign.height)).toBeLessThanOrEqual(SIGN_LAYOUT.neon.size[1] + 1e-6);
        } else {
          expect(bottom).toBeGreaterThanOrEqual(height * SIGN_LAYOUT.poster.zone[0] - 1e-6);
          expect(top).toBeLessThanOrEqual(height * SIGN_LAYOUT.poster.zone[1] + 1e-6);
          expect(sign.height).toBeGreaterThanOrEqual(SIGN_LAYOUT.poster.minHeight - 1e-6);
        }
      }
    }
  });

  it('only sticks signs out over streets, never towards a neighbour on the block', () => {
    let blades = 0;
    for (const { building, signs } of all) {
      const bx = Math.floor(building.x / CELL_SIZE) * CELL_SIZE;
      const bz = Math.floor(building.z / CELL_SIZE) * CELL_SIZE;
      for (const sign of signs) {
        if (sign.mount != 'blade') continue;
        blades++;
        expect(sign.atlas).toBe('neon');
        expect(sign.width / sign.height).toBeLessThanOrEqual(SIGN_LAYOUT.blade.maxAspect + 1e-6);
        // a point in front of where it meets the wall is over the street, outside the block
        const a = attachment(sign);
        const d = SIGN_LAYOUT.blade.street;
        const front = [a.x + a.n[0] * d, a.z + a.n[1] * d];
        const outside =
          front[0] < bx ||
          front[0] > bx + CITY_BLOCK_SIZE ||
          front[1] < bz ||
          front[1] > bz + CITY_BLOCK_SIZE;
        expect(outside).toBe(true);
      }
    }
    expect(blades).toBeGreaterThan(0);
  });

  it('gives skyscrapers banners', () => {
    const banners = all.flatMap((c) => c.signs).filter((s) => s.mount == 'banner');
    expect(banners.length).toBeGreaterThan(10);
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
          // parallel but different walls (banners hang up to a few units in front of ribbed walls)
          const mixed = a.mount == 'banner' || b.mount == 'banner';
          if (across > (mixed ? 14 : 0.01)) continue;
          const apartX = along >= (a.width + b.width) / 2;
          const apartY = Math.abs(a.y - b.y) >= (a.height + b.height) / 2;
          expect(
            apartX || apartY
              ? 'apart'
              : `${a.mount}/${a.atlas} ${a.width.toFixed(1)}x${a.height.toFixed(1)} y${a.y.toFixed(1)} vs ${b.mount}/${b.atlas} ${b.width.toFixed(1)}x${b.height.toFixed(1)} y${b.y.toFixed(1)} along ${along.toFixed(2)}`,
          ).toBe('apart');
        }
      }
    }
  });

  it('has no overlapping wall rectangles on one plane (each wall area appears once)', () => {
    for (const [model, { rects, banners, screens }] of Object.entries(FACADES)) {
      expect(
        screens.every((r) => r.y1 - r.y0 >= 100 - 1e-6),
        model,
      ).toBe(true);
      expect(
        banners.every((r) => r.y1 - r.y0 >= 100 - 1e-6),
        model,
      ).toBe(true);
      for (let i = 0; i < rects.length; i++) {
        for (let j = i + 1; j < rects.length; j++) {
          const a = rects[i];
          const b = rects[j];
          const samePlane =
            Math.abs(a.n[0] - b.n[0]) < 1e-3 && Math.abs(a.n[1] - b.n[1]) < 1e-3 && Math.abs(a.d - b.d) < 1;
          if (!samePlane) continue;
          const overlap = a.s0 < b.s1 && b.s0 < a.s1 && a.y0 < b.y1 && b.y0 < a.y1;
          expect(overlap, `${model} rects ${i} and ${j}`).toBe(false);
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
