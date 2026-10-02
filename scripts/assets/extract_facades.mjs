// Finds the flat, exposed wall areas of every building model, where ads can
// hang, and writes them as rectangles to src/assets/facades.json.
//
//   node scripts/assets/extract_facades.mjs
//
// For each model: group vertical triangles into planes (outward normal +
// offset), sample every plane on a GRID-unit grid, and keep a cell only if the
// model's surface is really there (not a gap in an L-shaped plane) and a ray
// going outward leaves the building without hitting it again (not a courtyard,
// a notch between wings or an inner wall).
// Usable cells are then covered greedily with the largest rectangles.
//
// Rectangles are in model space, before the building's rotation and height
// scale: n = outward normal [x, z], d = plane offset (n . p), s0..s1 = extent
// along the wall's tangent t = [-n.z, n.x], y0..y1 = height range.

import { readFileSync, writeFileSync } from 'node:fs';
import { Ray, Vector3, Raycaster, Mesh, MeshBasicMaterial, DoubleSide } from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MeshBVH, acceleratedRaycast } from 'three-mesh-bvh';

const GRID = 3; // world units per sample cell
const MIN_W = 8; // smallest rectangle worth keeping (units)
const MIN_H = 8;
const BANNER_DEPTH = 4; // parallel surfaces this close count as one wall for banners
const BANNER_MIN_H = 100;
const SCREEN_DEPTH = 12; // how far behind a screen's frame the building may be
const MAX_RECTS = 60; // per model, largest first (mega buildings have hundreds of small ones)

Mesh.prototype.raycast = acceleratedRaycast;

const models = ['01', '02', '03', '04', '05']
  .flatMap((g) => ['01', '02', '03'].map((v) => `s_${g}_${v}`))
  .concat(['01', '02', '03', '04', '05', '06'].map((i) => `mega_${i}`));

// Vertical planes by outward normal and offset. depth > 0 merges parallel
// surfaces within ~depth units (ribbed facades) into one plane at the front-most
// surface.
function planesOf(geometry, depth = 0) {
  const p = geometry.attributes.position;
  const n = geometry.attributes.normal;
  const planes = new Map();
  const a = new Vector3();
  const e1 = new Vector3();
  const e2 = new Vector3();
  for (let t = 0; t < p.count; t += 3) {
    a.fromBufferAttribute(p, t);
    e1.fromBufferAttribute(p, t + 1).sub(a);
    e2.fromBufferAttribute(p, t + 2).sub(a);
    const normal = new Vector3().crossVectors(e1, e2);
    const area = normal.length() / 2;
    if (area < 1e-6) continue;
    normal.normalize();
    // orient like the stored vertex normal (outward)
    if (normal.x * n.getX(t) + normal.y * n.getY(t) + normal.z * n.getZ(t) < 0) normal.negate();
    if (Math.abs(normal.y) > 0.05) continue;
    const len = Math.hypot(normal.x, normal.z);
    const nx = normal.x / len;
    const nz = normal.z / len;
    const d = nx * a.x + nz * a.z;
    // + 0 turns -0 into 0, so '-0.00' and '0.00' don't split one wall into two planes
    const bucket = depth > 0 ? Math.round(d / depth) : Math.round(d);
    const key = `${(Math.round(nx * 100) / 100 + 0).toFixed(2)},${(Math.round(nz * 100) / 100 + 0).toFixed(2)},${bucket + 0}`;
    const plane = planes.get(key) ?? {
      nx,
      nz,
      d,
      area: 0,
      s0: Infinity,
      s1: -Infinity,
      y0: Infinity,
      y1: -Infinity,
    };
    plane.d = Math.max(plane.d, d); // the front-most surface
    plane.area += area;
    for (let k = t; k < t + 3; k++) {
      const x = p.getX(k);
      const y = p.getY(k);
      const z = p.getZ(k);
      const s = -nz * x + nx * z;
      plane.s0 = Math.min(plane.s0, s);
      plane.s1 = Math.max(plane.s1, s);
      plane.y0 = Math.min(plane.y0, y);
      plane.y1 = Math.max(plane.y1, y);
    }
    planes.set(key, plane);
  }
  return [...planes.values()].filter((pl) => pl.s1 - pl.s0 >= MIN_W && pl.y1 - pl.y0 >= MIN_H);
}

// largest all-true rectangle in a boolean grid (rows = y, cols = s)
function largestRect(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  const heights = new Array(cols).fill(0);
  let best = { area: 0 };
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) heights[c] = grid[r][c] ? heights[c] + 1 : 0;
    const stack = [];
    for (let c = 0; c <= cols; c++) {
      const h = c < cols ? heights[c] : 0;
      let start = c;
      while (stack.length && stack.at(-1)[1] >= h) {
        const [i, sh] = stack.pop();
        const area = sh * (c - i);
        if (area > best.area) best = { area, r0: r - sh + 1, r1: r, c0: i, c1: c - 1 };
        start = i;
      }
      stack.push([start, h]);
    }
  }
  return best;
}

// Cover each plane's usable cells with rectangles. A cell is usable when the
// model's surface lies within `tolerance` behind the plane there and an outward
// ray from just in front of the plane leaves the building.
function scan(geometry, mesh, planes, { tolerance, minW, minH }) {
  const raycaster = new Raycaster();
  raycaster.firstHitOnly = true;
  const rects = [];
  for (const pl of planes) {
    const cols = Math.floor((pl.s1 - pl.s0) / GRID);
    const rows = Math.floor((pl.y1 - pl.y0) / GRID);
    if (cols < 1 || rows < 1) continue;
    const grid = [];
    const point = new Vector3();
    const target = {};
    for (let r = 0; r < rows; r++) {
      const row = [];
      for (let c = 0; c < cols; c++) {
        const s = pl.s0 + (c + 0.5) * GRID;
        const y = pl.y0 + (r + 0.5) * GRID;
        // point on the plane
        point.set(pl.nx * pl.d - pl.nz * s, y, pl.nz * pl.d + pl.nx * s);
        const hit = geometry.boundsTree.closestPointToPoint(point, target);
        let ok = hit && hit.distance < tolerance;
        if (ok) {
          const origin = point.clone().addScaledVector(new Vector3(pl.nx, 0, pl.nz), 0.5);
          raycaster.ray = new Ray(origin, new Vector3(pl.nx, 0, pl.nz));
          ok = raycaster.intersectObject(mesh).length == 0;
        }
        row.push(ok);
      }
      grid.push(row);
    }
    // cover the usable cells with rectangles, largest first
    for (;;) {
      const best = largestRect(grid);
      if (!best.area) break;
      const w = (best.c1 - best.c0 + 1) * GRID;
      const h = (best.r1 - best.r0 + 1) * GRID;
      if (w < minW || h < minH) break;
      for (let r = best.r0; r <= best.r1; r++) for (let c = best.c0; c <= best.c1; c++) grid[r][c] = false;
      const round = (v) => Math.round(v * 100) / 100;
      const unit = (v) => Math.round(v * 10000) / 10000;
      rects.push({
        n: [unit(pl.nx), unit(pl.nz)],
        d: round(pl.d),
        s0: round(pl.s0 + best.c0 * GRID),
        s1: round(pl.s0 + (best.c1 + 1) * GRID),
        y0: round(pl.y0 + best.r0 * GRID),
        y1: round(pl.y0 + (best.r1 + 1) * GRID),
      });
    }
  }
  // Layered surfaces (cladding a fraction of a unit in front of a wall) give
  // near-coplanar rectangles over the same area: keep the front-most one.
  const layered = (a, b) =>
    Math.abs(a.n[0] - b.n[0]) < 1e-3 &&
    Math.abs(a.n[1] - b.n[1]) < 1e-3 &&
    Math.abs(a.d - b.d) < Math.max(1.5, tolerance) &&
    a.s0 < b.s1 &&
    b.s0 < a.s1 &&
    a.y0 < b.y1 &&
    b.y0 < a.y1;
  rects.sort((a, b) => b.d - a.d);
  const front = [];
  for (const r of rects) if (!front.some((f) => layered(f, r))) front.push(r);
  front.sort((a, b) => (b.s1 - b.s0) * (b.y1 - b.y0) - (a.s1 - a.s0) * (a.y1 - a.y0));
  return front.slice(0, MAX_RECTS);
}

// The four outer sides of the model's bounding box as planes: big screens hang
// on frames in front of a tower's face, over its ribs and setbacks.
function boxSides(geometry) {
  const b = geometry.boundingBox;
  const sides = [
    { nx: 1, nz: 0, d: b.max.x, s0: b.min.z, s1: b.max.z },
    { nx: -1, nz: 0, d: -b.min.x, s0: -b.max.z, s1: -b.min.z },
    { nx: 0, nz: 1, d: b.max.z, s0: -b.max.x, s1: -b.min.x },
    { nx: 0, nz: -1, d: -b.min.z, s0: b.min.x, s1: b.max.x },
  ];
  return sides.map((side) => ({ ...side, y0: b.min.y, y1: b.max.y, area: 0 }));
}

function facadesOf(key) {
  const geometry = new OBJLoader().parse(readFileSync(`public/assets/models/${key}.obj`, 'utf8')).children[0]
    .geometry;
  geometry.boundsTree = new MeshBVH(geometry);
  const mesh = new Mesh(geometry, new MeshBasicMaterial({ side: DoubleSide }));
  geometry.computeBoundingBox();
  return {
    height: Math.round(geometry.boundingBox.max.y * 100) / 100,
    // flat walls for posters and neon signs
    rects: scan(geometry, mesh, planesOf(geometry), { tolerance: 0.3, minW: MIN_W, minH: MIN_H }),
    // tall walls for banners: ribbed facades count, measured at their front
    banners: scan(geometry, mesh, planesOf(geometry, BANNER_DEPTH), {
      tolerance: BANNER_DEPTH + 0.2,
      minW: 12,
      minH: BANNER_MIN_H,
    }),
    // tower faces for big framed screens: the building within SCREEN_DEPTH behind
    screens: scan(geometry, mesh, boxSides(geometry), {
      tolerance: SCREEN_DEPTH,
      minW: 30,
      minH: BANNER_MIN_H,
    }),
  };
}

const out = {};
for (const key of models) {
  out[key] = facadesOf(key);
  const area = out[key].rects.reduce((sum, r) => sum + (r.s1 - r.s0) * (r.y1 - r.y0), 0);
  const tallest = Math.max(0, ...out[key].banners.map((r) => r.y1 - r.y0));
  const screen = out[key].screens[0];
  console.log(
    `${key}: ${out[key].rects.length} rects (${Math.round(area)} units^2), ${out[key].banners.length} banner walls (tallest ${tallest}), ${out[key].screens.length} screen faces (largest ${screen ? `${Math.round(screen.s1 - screen.s0)}x${Math.round(screen.y1 - screen.y0)}` : '-'}), height ${out[key].height}`,
  );
}
writeFileSync('src/assets/facades.json', JSON.stringify(out) + '\n');
console.log('-> src/assets/facades.json');
