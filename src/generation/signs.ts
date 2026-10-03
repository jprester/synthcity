// Wall signs: ads placed on a building's exposed walls at the art's own shape.
//
// The walls come from src/assets/facades.json (scripts/assets/
// extract_facades.mjs): per building model, rectangles on flat walls that are
// really there and not hidden by the building itself. The art comes from the
// ad atlases (src/assets/adAtlases.json).
//
// Placement follows how signage sits on real streets:
//   - tall banners down the walls of skyscrapers
//   - big posters and designs in the middle band, more on tall walls
//   - small neon shop signs low on the building, several per wall; on walls
//     facing a street some stick out from the wall (blade signs)
// Sizes are physical (world units) and each sign keeps its art's aspect, so
// nothing is cropped or stretched. Signs never overlap and keep a margin from
// the wall's edges. Everything is a hash of (seed, building position).

import { hashFloat, hashRandom } from '../hash.ts';
import type { Random, Seed } from '../hash.ts';
import type { DistrictStyle } from './districts.ts';
import { CELL_SIZE, CITY_BLOCK_SIZE } from './world.ts';
import facadeData from '../assets/facades.json';
import atlasData from '../assets/adAtlases.json';

// neon: shop signs; posters: posters and designs; screens: tall picture ads
// for skyscraper screens, at high resolution; videos: looping video ads
export type SignAtlas = 'neon' | 'posters' | 'screens' | 'videos';

// wall: flat against the wall. blade: sticks out perpendicular to it (neon
// shop signs over a street). banner: a tall billboard down a skyscraper.
export type SignMount = 'wall' | 'blade' | 'banner';

// how a sign moves (drawn by the sign shader, src/rendering/adArt.ts)
// video: picture ads slowly zoom and pan, like a looping video ad
// flicker: a failing neon tube that drops out now and then
export type SignEffect = 'none' | 'video' | 'flicker';

export interface SignObject {
  kind: 'sign';
  mount: SignMount;
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
  effect: SignEffect;
}

export interface FacadeRect {
  n: [number, number]; // outward normal, x and z
  d: number; // plane offset (n . p)
  s0: number; // extent along the tangent [-n.z, n.x]
  s1: number;
  y0: number;
  y1: number;
}

// rects: flat walls for posters and neon; banners: tall walls, ribbed facades
// measured at their front; screens: a tower's outer faces, where big screens
// hang on frames (all from scripts/assets/extract_facades.mjs)
export const FACADES = facadeData as unknown as Record<
  string,
  { height: number; rects: FacadeRect[]; banners: FacadeRect[]; screens: FacadeRect[] }
>;
// normals are stored rounded; make them unit length again
for (const { rects, banners, screens } of Object.values(FACADES)) {
  for (const r of [...rects, ...banners, ...screens]) {
    const len = Math.hypot(r.n[0], r.n[1]);
    r.n = [r.n[0] / len, r.n[1] / len];
  }
}
const ART = atlasData as unknown as Record<SignAtlas, { entries: { aspect: number }[] }>;

// how signs sit on a building (world units, fractions of the building's height)
export const SIGN_LAYOUT = {
  offset: 0.6, // in front of the wall: clear of ledges and frames (the facade scan casts from 0.5)
  margin: 2, // from the wall's edges and between signs
  neon: {
    size: [14, 28] as [number, number], // long side
    zone: [0.02, 0.5] as [number, number], // band of the building's height
    zoneCap: 200, // top of the band, at most
    skyscraper: { density: 0.3, zoneCap: 120 }, // on 250+ unit buildings: fewer, lower
    perWallMax: 14,
    attempts: 4,
  },
  blade: {
    maxAspect: 0.6, // only upright art sticks out
    gap: 0.6, // between the wall and the sign's inner edge
    footprint: 3, // width it takes on the wall, for spacing
    street: 6, // a point this far in front of the wall must be outside the block
  },
  poster: {
    height: [35, 80] as [number, number],
    skyscraperHeight: [60, 130] as [number, number], // bigger on 250+ unit buildings
    minHeight: 24, // smaller than this after fitting the wall: skip
    spacing: 110, // one poster chance per this much band height
    zone: [0.45, 0.85] as [number, number],
    switchChance: 0.35,
  },
  // big screens on skyscraper faces, filling most of a wall's width
  banner: {
    minBuilding: 250, // only on buildings at least this tall
    minWall: 120, // and walls at least this tall
    maxAspect: 1, // upright to square art
    fill: [0.72, 0.95] as [number, number], // share of the wall's width a screen spans
    minFill: 0.55, // narrower than this share after fitting: not a screen, skip
    maxHeight: 420,
    minHeight: 70,
    zone: [0.2, 0.98] as [number, number], // band of the building's height
    perWall: 3, // screens stacked on one wall at most; each further one is less likely
    stackFalloff: 0.55,
    screenShare: 0.65, // chance a screen shows one of the picture ads made for screens
  },
  // share of skyscraper screens showing a video ad instead of a picture (the
  // videos are few, so they stay a highlight)
  videoShare: 0.12,
  videoCrop: 0.6, // a screen may show down to this share of a video's width
  // chance of each effect, by kind of sign
  effects: {
    bannerVideo: 0.6,
    posterVideo: 0.35,
    neonFlicker: 0.07,
  },
};

// a framed screen may stand this far in front of the building (see the extractor)
const SCREEN_DEPTH = 12;

// tall art from both atlases, for banners
// banners are picture ads (posters atlas), never neon text signs
const TALL = (['screens', 'posters'] as SignAtlas[]).flatMap((atlas) =>
  ART[atlas].entries.flatMap((e, art) =>
    e.aspect <= SIGN_LAYOUT.banner.maxAspect ? [{ atlas, art, aspect: e.aspect }] : [],
  ),
);

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

// a point on a wall (s along it, y up, dist in front) in world space
function wallPoint(b: Building, rect: FacadeRect, s: number, dist: number): [number, number] {
  const [nx, nz] = rect.n;
  const d = rect.d + dist;
  const px = nx * d - nz * s;
  const pz = nz * d + nx * s;
  const angle = (b.rotation * Math.PI) / 180;
  const c = Math.cos(angle);
  const sn = Math.sin(angle);
  return [b.x + c * px + sn * pz, b.z - sn * px + c * pz];
}

// a model-space direction [x, z] in world space
function worldDir(b: Building, [x, z]: [number, number]): [number, number] {
  const angle = (b.rotation * Math.PI) / 180;
  const c = Math.cos(angle);
  const sn = Math.sin(angle);
  return [c * x + sn * z, -sn * x + c * z];
}

// Signs for one building with ads, appended to out.
// bannersOnly: a skyscraper without the district's ads roll still gets banners
export function placeSigns(
  out: SignObject[],
  building: Building,
  seed: Seed,
  district: DistrictStyle,
  bannersOnly = false,
  keepClear: [number, number] | null = null, // world normal of a face to leave free (light bars)
): void {
  const start = out.length;
  placeOnWalls(out, building, seed, district, bannersOnly, keepClear);
  // videos and effects: hashes of each sign's own position, apart from the placement stream
  for (let i = start; i < out.length; i++) {
    useVideo(seed, out[i]);
    out[i].effect = signEffect(seed, out[i]);
  }
}

const VIDEOS = ART.videos?.entries ?? [];

// A skyscraper screen may show a video instead. It keeps its height and
// centre. A narrower screen shows the middle of the video (the sides cropped,
// down to VIDEO_CROP of its width; see artRect); a slightly wider one narrows
// to the video's shape, so it still fits its wall.
function useVideo(seed: Seed, sign: SignObject): void {
  if (sign.mount != 'banner' || VIDEOS.length == 0) return;
  const aspect = sign.width / sign.height;
  const { videoCrop, videoShare } = SIGN_LAYOUT;
  const fits = VIDEOS.flatMap((v, i) =>
    aspect >= v.aspect * videoCrop && aspect <= v.aspect / 0.85 ? [i] : [],
  );
  if (fits.length == 0) return;
  const random = hashRandom(seed, sign.x, sign.z, Math.floor(sign.y), 'sign-video');
  if (random() >= videoShare) return;
  sign.atlas = 'videos';
  sign.art = fits[Math.floor(random() * fits.length)];
  sign.width = sign.height * Math.min(aspect, VIDEOS[sign.art].aspect);
}

// Neighbouring buildings on a block can share a wall line, so their signs can
// land on the same plane and fight over the same pixels (placeSigns only keeps
// one building's signs apart). Of two signs that overlap there, this keeps the
// more prominent one (banners, then posters, then neon; first placed on a tie)
// and drops the other. Everything else keeps its order.
export function dropOverlappingSigns<T extends { kind: string }>(objects: T[]): T[] {
  const signs = objects.filter((o): o is T & SignObject => o.kind == 'sign');
  const rank = (s: SignObject) => (s.mount == 'banner' ? 0 : s.atlas == 'neon' ? 2 : 1);
  const kept: SignObject[] = [];
  const dropped = new Set<object>();
  for (const sign of [...signs].sort((a, b) => rank(a) - rank(b))) {
    if (kept.some((k) => signsOverlap(k, sign))) dropped.add(sign);
    else kept.push(sign);
  }
  return dropped.size == 0 ? objects : objects.filter((o) => !dropped.has(o));
}

// Do two signs cover the same area, facing the same way? Banners stand up to a
// screen's frame depth in front of a wall, so they count from further away.
export function signsOverlap(a: SignObject, b: SignObject): boolean {
  const n = [Math.sin(a.yaw), Math.cos(a.yaw)];
  if (Math.abs(n[0] * Math.sin(b.yaw) + n[1] * Math.cos(b.yaw)) < 0.999) return false;
  const dx = b.x - a.x;
  const dz = b.z - a.z;
  const depth = a.mount == 'banner' || b.mount == 'banner' ? SCREEN_DEPTH + 2 : 1.5;
  if (Math.abs(dx * n[0] + dz * n[1]) > depth) return false;
  const along = Math.abs(dx * n[1] - dz * n[0]);
  return along < (a.width + b.width) / 2 && Math.abs(b.y - a.y) < (a.height + b.height) / 2;
}

function signEffect(seed: Seed, sign: SignObject): SignEffect {
  const e = SIGN_LAYOUT.effects;
  const roll = hashFloat(seed, sign.x, sign.z, Math.floor(sign.y), 'sign-effect');
  if (sign.atlas == 'neon') return roll < e.neonFlicker ? 'flicker' : 'none';
  if (sign.atlas == 'videos') return 'none'; // already moving
  return roll < (sign.mount == 'banner' ? e.bannerVideo : e.posterVideo) ? 'video' : 'none';
}

function placeOnWalls(
  out: SignObject[],
  building: Building,
  seed: Seed,
  district: DistrictStyle,
  bannersOnly: boolean,
  keepClear: [number, number] | null,
): void {
  const facades = FACADES[building.model];
  if (!facades) return;
  const random = hashRandom(seed, building.x, building.z, 'signs');
  const height = facades.height * building.scaleY;
  // skyscrapers lead with big picture ads; neon stays small and low
  const tall = height >= SIGN_LAYOUT.banner.minBuilding;
  // skip walls facing the same way as a face that must stay clear
  const facesAway = (rect: FacadeRect) => {
    if (!keepClear) return false;
    const [wx, wz] = worldDir(building, rect.n);
    return wx * keepClear[0] + wz * keepClear[1] > 0.95;
  };
  const { margin } = SIGN_LAYOUT;
  // the building's block, to tell walls facing a street from walls facing a neighbour
  const bx = Math.floor(building.x / CELL_SIZE) * CELL_SIZE;
  const bz = Math.floor(building.z / CELL_SIZE) * CELL_SIZE;
  const outsideBlock = ([x, z]: [number, number]) =>
    x < bx || x > bx + CITY_BLOCK_SIZE || z < bz || z > bz + CITY_BLOCK_SIZE;

  // tall banners down skyscrapers, on their own (coarser) walls; the areas
  // they take are blocked for the posters and neon signs placed after them
  const blocked: { rect: FacadeRect; box: Box }[] = [];
  // does a box on a wall overlap a banner already on that wall, or on a
  // parallel wall a screen's frame depth away?
  const underBanner = (rect: FacadeRect, box: Box) =>
    blocked.some(
      (b) =>
        Math.abs(b.rect.n[0] - rect.n[0]) < 1e-3 &&
        Math.abs(b.rect.n[1] - rect.n[1]) < 1e-3 &&
        Math.abs(b.rect.d - rect.d) < SCREEN_DEPTH + 2 &&
        overlaps(b.box, box, margin),
    );

  // A blade sign sticks out of its wall, so near a corner it can reach into the
  // space of a banner on the next face: in front of it, or behind a framed
  // screen, which stands up to SCREEN_DEPTH in front of the wall. Its
  // footprint, from the wall out to reach, in each banner's frame.
  const bladeHitsBanner = (rect: FacadeRect, s: number, y0: number, y1: number, reach: number) => {
    const [nx, nz] = rect.n;
    const half = SIGN_LAYOUT.blade.footprint / 2;
    // corners of the footprint (model space): along the wall +-half, out 0..reach
    const corners = [-half, half].flatMap((ds) =>
      [0, reach].map((out) => [nx * (rect.d + out) - nz * (s + ds), nz * (rect.d + out) + nx * (s + ds)]),
    );
    return blocked.some(({ rect: b, box }) => {
      const along = corners.map(([x, z]) => -b.n[1] * x + b.n[0] * z);
      const out = corners.map(([x, z]) => b.n[0] * x + b.n[1] * z);
      return (
        Math.max(...along) > box[0] - margin &&
        Math.min(...along) < box[1] + margin &&
        Math.max(...out) > b.d - SCREEN_DEPTH - margin &&
        Math.min(...out) < b.d + SCREEN_DEPTH + margin &&
        y1 > box[2] - margin &&
        y0 < box[3] + margin
      );
    });
  };

  const bn = SIGN_LAYOUT.banner;
  if (height >= bn.minBuilding) {
    // framed screens on the tower's outer faces first, then the ribbed walls
    for (const rect of [...facades.screens, ...facades.banners]) {
      if (facesAway(rect)) continue;
      const wall: Box = [rect.s0, rect.s1, rect.y0 * building.scaleY, rect.y1 * building.scaleY];
      const wallWidth = wall[1] - wall[0];
      if (wall[3] - wall[2] < bn.minWall) continue;
      const y0 = Math.max(wall[2], height * bn.zone[0]);
      const y1 = Math.min(wall[3], height * bn.zone[1]);
      const usable = wallWidth - 2 * margin;
      const maxH = Math.min(bn.maxHeight, y1 - y0 - 2 * margin);
      let chance = district.bannerChance;
      for (let k = 0; k < bn.perWall && random() < chance; k++, chance *= bn.stackFalloff) {
        const targetW = usable * (bn.fill[0] + random() * (bn.fill[1] - bn.fill[0]));
        // art that, at the target width, fits the band; else as tall as the band allows
        const fits = TALL.map((t) => {
          const h = Math.min(targetW / t.aspect, maxH);
          return { ...t, h, w: h * t.aspect };
        }).filter((t) => t.h >= bn.minHeight && t.w >= usable * bn.minFill);
        if (fits.length == 0) break;
        // prefer the high-resolution picture ads made for screens
        const screens = fits.filter((t) => t.atlas == 'screens');
        const pool = screens.length > 0 && random() < bn.screenShare ? screens : fits;
        const pick = pool[Math.floor(random() * pool.length)];
        const { w, h } = pick;
        // centred on the face, with a little play
        const s = wall[0] + margin + w / 2 + (0.5 + (random() - 0.5) * 0.4) * (usable - w);
        let placed = false;
        for (let attempt = 0; attempt < 4 && !placed; attempt++) {
          const y = y0 + margin + h / 2 + random() * (y1 - y0 - 2 * margin - h);
          const box: Box = [s - w / 2, s + w / 2, y - h / 2, y + h / 2];
          if (underBanner(rect, box)) continue;
          blocked.push({ rect, box });
          out.push(flat(building, rect, 'banner', pick.atlas, pick.art, w, h, s, y, random));
          placed = true;
        }
      }
    }
  }
  if (bannersOnly) return;

  for (const rect of facades.rects) {
    if (facesAway(rect)) continue;
    const wall: Box = [rect.s0, rect.s1, rect.y0 * building.scaleY, rect.y1 * building.scaleY];
    const wallWidth = wall[1] - wall[0];
    const taken: Box[] = [];
    const free = (box: Box) => !taken.some((t) => overlaps(t, box, margin)) && !underBanner(rect, box);
    // centre of a w-wide, h-tall sign placed at random within [s0, s1] x [y0, y1]
    const spot = (w: number, h: number, y0: number, y1: number): [number, number] => [
      wall[0] + margin + w / 2 + random() * (wallWidth - 2 * margin - w),
      y0 + margin + h / 2 + random() * (y1 - y0 - 2 * margin - h),
    ];

    // big posters in the middle band: a chance per ~spacing units of it
    const p = SIGN_LAYOUT.poster;
    const py0 = Math.max(wall[2], height * p.zone[0]);
    const py1 = Math.min(wall[3], height * p.zone[1]);
    const chances = Math.max(1, Math.floor((py1 - py0) / p.spacing));
    for (let i = 0; i < chances; i++) {
      if (random() >= district.posterChance) continue;
      const art = Math.floor(random() * ART.posters.entries.length);
      const aspect = ART.posters.entries[art].aspect;
      const range = tall ? p.skyscraperHeight : p.height;
      let h = range[0] + random() * (range[1] - range[0]);
      h = Math.min(h, py1 - py0 - 2 * margin, (wallWidth - 2 * margin) / aspect);
      if (h < p.minHeight) continue;
      const w = h * aspect;
      const [s, y] = spot(w, h, py0, py1);
      const box: Box = [s - w / 2, s + w / 2, y - h / 2, y + h / 2];
      if (!free(box)) continue;
      taken.push(box);
      out.push(flat(building, rect, 'wall', 'posters', art, w, h, s, y, random));
    }

    // small neon shop signs low on the building; on street walls some stick out
    const n = SIGN_LAYOUT.neon;
    const bl = SIGN_LAYOUT.blade;
    const top = Math.min(wall[3], height * n.zone[1], tall ? n.skyscraper.zoneCap : n.zoneCap);
    const bottom = Math.max(wall[2], height * n.zone[0]);
    const expected = ((tall ? n.skyscraper.density : 1) * district.neonSigns * wallWidth) / 100;
    const count = Math.min(n.perWallMax, Math.floor(expected + random()));
    for (let i = 0; i < count; i++) {
      const art = Math.floor(random() * ART.neon.entries.length);
      const aspect = ART.neon.entries[art].aspect;
      const long = n.size[0] + random() * (n.size[1] - n.size[0]);
      const [w, h] = aspect < 1 ? [long * aspect, long] : [long, long / aspect];
      const blade = aspect <= bl.maxAspect && random() < district.bladeShare;
      const onWall = blade ? bl.footprint : w; // width taken on the wall
      if (onWall > wallWidth - 2 * margin || h > top - bottom - 2 * margin) continue;
      for (let attempt = 0; attempt < n.attempts; attempt++) {
        const [s, y] = spot(onWall, h, bottom, top);
        const box: Box = [s - onWall / 2, s + onWall / 2, y - h / 2, y + h / 2];
        if (!free(box)) continue;
        if (blade && bladeHitsBanner(rect, s, y - h / 2, y + h / 2, bl.gap + w)) continue;
        // blade signs only over a street, never towards a neighbour on the block
        if (blade && !outsideBlock(wallPoint(building, rect, s, bl.street))) continue;
        taken.push(box);
        out.push(
          blade
            ? bladeSign(building, rect, art, w, h, s, y, random)
            : flat(building, rect, 'wall', 'neon', art, w, h, s, y, random),
        );
        break;
      }
    }
  }
}

function common(random: Random, atlas: SignAtlas) {
  const interval = 200 + random() * 800;
  return {
    interval,
    counter: random() * interval,
    switches: atlas != 'neon' && random() < SIGN_LAYOUT.poster.switchChance,
    effect: 'none' as SignEffect, // set by placeSigns
  };
}

// a sign flat against the wall, centred at (s, y)
function flat(
  b: Building,
  rect: FacadeRect,
  mount: SignMount,
  atlas: SignAtlas,
  art: number,
  width: number,
  height: number,
  s: number,
  y: number,
  random: Random,
): SignObject {
  const [x, z] = wallPoint(b, rect, s, SIGN_LAYOUT.offset);
  const [wx, wz] = worldDir(b, rect.n);
  return {
    kind: 'sign',
    mount,
    atlas,
    art,
    x,
    y,
    z,
    width,
    height,
    yaw: Math.atan2(wx, wz),
    ...common(random, atlas),
  };
}

// a neon sign sticking out of the wall at (s, y), its art facing along the wall
function bladeSign(
  b: Building,
  rect: FacadeRect,
  art: number,
  width: number,
  height: number,
  s: number,
  y: number,
  random: Random,
): SignObject {
  const [x, z] = wallPoint(b, rect, s, SIGN_LAYOUT.blade.gap + width / 2);
  const [tx, tz] = worldDir(b, [-rect.n[1], rect.n[0]]); // along the wall
  return {
    kind: 'sign',
    mount: 'blade',
    atlas: 'neon',
    art,
    x,
    y,
    z,
    width,
    height,
    yaw: Math.atan2(tx, tz),
    ...common(random, 'neon'),
  };
}
