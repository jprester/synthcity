// Ad artwork on the ad models.
//
// The ad models (ads_s_*) wrap a building with flat panels. Originally every
// panel sampled some cut of a small 3x3 pixel-art grid. Now each panel shows
// one whole piece of art from an atlas (built by scripts/assets/
// build_ad_atlases.py), chosen to match the panel's shape: a tall strip gets a
// vertical neon sign, a square gets a square design, and so on.
//
// adPanels() splits a model into panels once (by the UV rectangle each
// triangle samples in the original layout); fillAdUVs() writes a UV buffer that
// maps every panel to a chosen piece of art.

import type { BufferGeometry } from 'three';
import type { Random } from '../hash.ts';
import atlasData from '../assets/adAtlases.json';

export type AdAtlasName = 'neon' | 'posters';

export interface AdArt {
  id: string;
  kind: string; // 'neon' | 'ad' | 'design'
  aspect: number; // width / height
  uv: [number, number, number, number]; // u0, v0, u1, v1 in the atlas
}

export interface AdAtlas {
  file: string;
  size: number;
  entries: AdArt[];
}

export const AD_ATLASES = atlasData as unknown as Record<AdAtlasName, AdAtlas>;

// material key per atlas (AssetManager)
export const AD_MATERIALS: Record<AdAtlasName, string> = { neon: 'ads_neon', posters: 'ads_posters' };

export interface AdPanel {
  vertices: number[]; // vertex indices (the models are non-indexed)
  s: number[]; // each vertex's position across the panel, 0..1, in the original UV layout
  t: number[];
  aspect: number; // world width / height
}

const panelCache = new WeakMap<BufferGeometry, AdPanel[]>();

// The model's panels: triangles grouped by the UV rectangle they sampled.
export function adPanels(geometry: BufferGeometry): AdPanel[] {
  const cached = panelCache.get(geometry);
  if (cached) return cached;

  const position = geometry.attributes.position;
  const uv = geometry.attributes.uv;
  const groups = new Map<string, number[]>();
  for (let t = 0; t < position.count; t += 3) {
    let u0 = Infinity;
    let u1 = -Infinity;
    let v0 = Infinity;
    let v1 = -Infinity;
    for (let k = t; k < t + 3; k++) {
      u0 = Math.min(u0, uv.getX(k));
      u1 = Math.max(u1, uv.getX(k));
      v0 = Math.min(v0, uv.getY(k));
      v1 = Math.max(v1, uv.getY(k));
    }
    const key = [u0, u1, v0, v1].map((n) => n.toFixed(4)).join(',');
    const group = groups.get(key) ?? [];
    group.push(t, t + 1, t + 2);
    groups.set(key, group);
  }

  const panels: AdPanel[] = [];
  for (const vertices of groups.values()) {
    const us = vertices.map((i) => uv.getX(i));
    const vs = vertices.map((i) => uv.getY(i));
    const [u0, u1, v0, v1] = [Math.min(...us), Math.max(...us), Math.min(...vs), Math.max(...vs)];
    const xs = vertices.map((i) => position.getX(i));
    const ys = vertices.map((i) => position.getY(i));
    const zs = vertices.map((i) => position.getZ(i));
    const width = Math.max(Math.max(...xs) - Math.min(...xs), Math.max(...zs) - Math.min(...zs));
    const height = Math.max(...ys) - Math.min(...ys);
    // a horizontal panel has no height; fall back to its UV shape
    const aspect = height > 0.01 ? width / height : (u1 - u0) / Math.max(v1 - v0, 1e-6);
    panels.push({
      vertices,
      s: us.map((u) => (u - u0) / Math.max(u1 - u0, 1e-6)),
      t: vs.map((v) => (v - v0) / Math.max(v1 - v0, 1e-6)),
      aspect,
    });
  }
  panelCache.set(geometry, panels);
  return panels;
}

// art whose shape is within this factor of the panel's is a candidate
const ASPECT_TOLERANCE = 1.35;
// beyond this the panel is a light strip, not an ad (e.g. the bars running up
// ads_s_05_01's tower): stretch the closest art along it instead of cropping a
// sliver that may be all background
export const STRIP_FACTOR = 2;

const uvAspect = ([u0, v0, u1, v1]: readonly number[]) => (u1 - u0) / (v1 - v0);

// A piece of art for a panel of this aspect, cropped (centred) to exactly that
// aspect so nothing is stretched. Returns [u0, v0, u1, v1].
export function pickArt(atlas: AdAtlas, aspect: number, random: Random): [number, number, number, number] {
  const fit = (a: AdArt) => Math.abs(Math.log(a.aspect / aspect));
  let candidates = atlas.entries.filter((a) => fit(a) < Math.log(ASPECT_TOLERANCE));
  if (candidates.length == 0) {
    const best = Math.min(...atlas.entries.map(fit));
    candidates = atlas.entries.filter((a) => fit(a) == best);
    if (best > Math.log(STRIP_FACTOR)) {
      const art = candidates[Math.floor(random() * candidates.length)];
      return [...art.uv];
    }
  }
  const art = candidates[Math.floor(random() * candidates.length)];
  let [u0, v0, u1, v1] = art.uv;
  const artAspect = uvAspect(art.uv);
  if (artAspect > aspect) {
    // art is wider: keep its height, crop the sides
    const w = (u1 - u0) * (aspect / artAspect);
    const c = (u0 + u1) / 2;
    [u0, u1] = [c - w / 2, c + w / 2];
  } else {
    // art is taller: keep its width, crop top and bottom
    const h = (v1 - v0) * (artAspect / aspect);
    const c = (v0 + v1) / 2;
    [v0, v1] = [c - h / 2, c + h / 2];
  }
  return [u0, v0, u1, v1];
}

// Maps every panel to a freshly chosen piece of art.
export function fillAdUVs(uv: Float32Array, panels: AdPanel[], atlas: AdAtlas, random: Random): void {
  for (const panel of panels) {
    const [u0, v0, u1, v1] = pickArt(atlas, panel.aspect, random);
    panel.vertices.forEach((vertex, i) => {
      uv[vertex * 2] = u0 + panel.s[i] * (u1 - u0);
      uv[vertex * 2 + 1] = v0 + panel.t[i] * (v1 - v0);
    });
  }
}
