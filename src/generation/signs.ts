// Wall signs: ads placed on a building's exposed walls at the art's own shape.
//
// The walls come from src/assets/facades.json (scripts/assets/
// extract_facades.mjs): per building model, rectangles on flat walls that are
// really there and not hidden by the building itself. The art comes from the
// ad atlases (src/assets/adAtlases.json).
//
// Placement follows how signage sits on real streets:
//   - small neon shop signs low on the building, several per wall
//   - big posters and designs in the middle band, more on tall walls
// Sizes are physical (world units) and each sign keeps its art's aspect, so
// nothing is cropped or stretched. Signs never overlap and keep a margin from
// the wall's edges. Everything is a hash of (seed, building position).

import { hashRandom } from '../hash.ts';
import type { Random, Seed } from '../hash.ts';
import type { DistrictStyle } from './districts.ts';
import facadeData from '../assets/facades.json';
import atlasData from '../assets/adAtlases.json';

export type SignAtlas = 'neon' | 'posters';

export interface SignObject {
  kind: 'sign';
  atlas: SignAtlas;
  art: number; // index into the atlas entries (src/assets/adAtlases.json)
  x: number; // centre, world units
  y: number;
  z: number;
  width: number;
  height: number;
  yaw: number; // radians about y; the sign faces (sin yaw, 0, cos yaw)
  interval: number; // frames between art switches
  counter: number; // initial frame counter
  switches: boolean; // screens cycle their art; neon signs don't
}

export interface FacadeRect {
  n: [number, number]; // outward normal, x and z
  d: number; // plane offset (n . p)
  s0: number; // extent along the tangent [-n.z, n.x]
  s1: number;
  y0: number;
  y1: number;
}

export const FACADES = facadeData as unknown as Record<string, { height: number; rects: FacadeRect[] }>;
// normals are stored rounded; make them unit length again
for (const { rects } of Object.values(FACADES)) {
  for (const r of rects) {
    const len = Math.hypot(r.n[0], r.n[1]);
    r.n = [r.n[0] / len, r.n[1] / len];
  }
}
const ART = atlasData as unknown as Record<SignAtlas, { entries: { aspect: number }[] }>;

// how signs sit on a building (world units, fractions of the building's height)
export const SIGN_LAYOUT = {
  offset: 0.35, // in front of the wall, against z-fighting
  margin: 2, // from the wall's edges and between signs
  neon: {
    size: [14, 28] as [number, number], // long side
    zone: [0.02, 0.5] as [number, number], // band of the building's height
    zoneCap: 200, // top of the band, at most
    perWallMax: 10,
    attempts: 4,
  },
  poster: {
    height: [35, 80] as [number, number],
    minHeight: 24, // smaller than this after fitting the wall: skip
    spacing: 110, // one poster chance per this much band height
    zone: [0.45, 0.85] as [number, number],
    switchChance: 0.35,
  },
};

interface Building {
  model: string;
  x: number;
  z: number;
  rotation: number; // degrees
  scaleY: number;
}

type Box = [number, number, number, number]; // s0, s1, y0, y1 on one wall

const overlaps = (a: Box, b: Box, m: number) =>
  a[0] < b[1] + m && b[0] < a[1] + m && a[2] < b[3] + m && b[2] < a[3] + m;

// Signs for one building with ads, appended to out.
export function placeSigns(out: SignObject[], building: Building, seed: Seed, district: DistrictStyle): void {
  const facades = FACADES[building.model];
  if (!facades) return;
  const random = hashRandom(seed, building.x, building.z, 'signs');
  const height = facades.height * building.scaleY;
  const { margin } = SIGN_LAYOUT;

  for (const rect of facades.rects) {
    const wall: Box = [rect.s0, rect.s1, rect.y0 * building.scaleY, rect.y1 * building.scaleY];
    const taken: Box[] = [];
    const place = (
      atlas: SignAtlas,
      art: number,
      w: number,
      h: number,
      s: number,
      y: number,
      rnd: Random,
    ) => {
      const box: Box = [s - w / 2, s + w / 2, y - h / 2, y + h / 2];
      if (taken.some((t) => overlaps(t, box, margin))) return false;
      taken.push(box);
      out.push(sign(building, rect, atlas, art, w, h, s, y, rnd));
      return true;
    };

    // big posters in the middle band: a chance per ~posterSpacing units of it
    const p = SIGN_LAYOUT.poster;
    const band: [number, number] = [
      Math.max(wall[2], height * p.zone[0]),
      Math.min(wall[3], height * p.zone[1]),
    ];
    const chances = Math.max(1, Math.floor((band[1] - band[0]) / p.spacing));
    for (let i = 0; i < chances; i++) {
      if (random() >= district.posterChance) continue;
      const art = Math.floor(random() * ART.posters.entries.length);
      const aspect = ART.posters.entries[art].aspect;
      let h = p.height[0] + random() * (p.height[1] - p.height[0]);
      h = Math.min(h, band[1] - band[0] - 2 * margin, (wall[1] - wall[0] - 2 * margin) / aspect);
      const w = h * aspect;
      const rs = random();
      const ry = random();
      if (h < p.minHeight) continue;
      const s = wall[0] + margin + w / 2 + rs * (wall[1] - wall[0] - 2 * margin - w);
      const y = band[0] + margin + h / 2 + ry * (band[1] - band[0] - 2 * margin - h);
      place('posters', art, w, h, s, y, random);
    }

    // small neon shop signs low on the building
    const n = SIGN_LAYOUT.neon;
    const top = Math.min(wall[3], height * n.zone[1], n.zoneCap);
    const bottom = Math.max(wall[2], height * n.zone[0]);
    const expected = (district.neonSigns * (wall[1] - wall[0])) / 100;
    const count = Math.min(n.perWallMax, Math.floor(expected + random()));
    for (let i = 0; i < count; i++) {
      const art = Math.floor(random() * ART.neon.entries.length);
      const aspect = ART.neon.entries[art].aspect;
      const long = n.size[0] + random() * (n.size[1] - n.size[0]);
      const [w, h] = aspect < 1 ? [long * aspect, long] : [long, long / aspect];
      if (w > wall[1] - wall[0] - 2 * margin || h > top - bottom - 2 * margin) continue;
      for (let attempt = 0; attempt < n.attempts; attempt++) {
        const s = wall[0] + margin + w / 2 + random() * (wall[1] - wall[0] - 2 * margin - w);
        const y = bottom + margin + h / 2 + random() * (top - bottom - 2 * margin - h);
        if (place('neon', art, w, h, s, y, random)) break;
      }
    }
  }
}

function sign(
  b: Building,
  rect: FacadeRect,
  atlas: SignAtlas,
  art: number,
  width: number,
  height: number,
  s: number,
  y: number,
  random: Random,
): SignObject {
  const [nx, nz] = rect.n;
  const d = rect.d + SIGN_LAYOUT.offset;
  // centre in model space (y already scaled), then the building's rotation
  const px = nx * d - nz * s;
  const pz = nz * d + nx * s;
  const angle = (b.rotation * Math.PI) / 180;
  const c = Math.cos(angle);
  const sn = Math.sin(angle);
  const wx = c * nx + sn * nz;
  const wz = -sn * nx + c * nz;
  const interval = 200 + random() * 800;
  return {
    kind: 'sign',
    atlas,
    art,
    x: b.x + c * px + sn * pz,
    y,
    z: b.z - sn * px + c * pz,
    width,
    height,
    yaw: Math.atan2(wx, wz),
    interval,
    counter: random() * interval,
    switches: atlas == 'posters' && random() < SIGN_LAYOUT.poster.switchChance,
  };
}
