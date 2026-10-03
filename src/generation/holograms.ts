// Hologram projections: a picture ad floating above a roof in a projector's
// light beam, like the giant holograms of Blade Runner.
//
// Only art on a dark background works: under the additive hologram material
// black is see-through, so the figure floats free, while a full-bleed picture
// would read as a lit rectangle. The atlas build script measures each piece's
// border brightness (edge in src/assets/adAtlases.json).

import { hashRandom } from '../hash.ts';
import type { Seed } from '../hash.ts';
import type { SignAtlas } from './signs.ts';
import atlasData from '../assets/adAtlases.json';

export interface HologramObject {
  kind: 'hologram';
  atlas: SignAtlas;
  art: number; // index into the atlas entries
  x: number; // the projector, on the roof
  y: number;
  z: number;
  width: number; // the figure, keeping the art's aspect
  height: number;
  lift: number; // gap between the projector and the figure's bottom
  hue: number; // tint, as in HSL (0..1)
  phase: number; // offsets its animation (0..1)
}

export const HOLOGRAM_LAYOUT = {
  maxEdge: 0.04, // art whose border is at most this bright (linear luminance)
  height: [70, 130] as [number, number],
  maxWidth: 110, // wide art is scaled down to this
  lift: [8, 20] as [number, number],
  hues: [0.5, 0.55, 0.8, 0.88], // cyan, sky blue, violet, magenta
};

const ART = atlasData as unknown as Record<SignAtlas, { entries: { aspect: number; edge: number }[] }>;

// picture art on a dark background
export const HOLOGRAM_ART = (['screens', 'posters'] as SignAtlas[]).flatMap((atlas) =>
  ART[atlas].entries.flatMap((e, art) =>
    e.edge <= HOLOGRAM_LAYOUT.maxEdge ? [{ atlas, art, aspect: e.aspect }] : [],
  ),
);

// a hologram projected from the roof at (x, roof, z)
export function hologramAt(seed: Seed, x: number, roof: number, z: number): HologramObject {
  const random = hashRandom(seed, x, z, 'hologram-look');
  const L = HOLOGRAM_LAYOUT;
  const { atlas, art, aspect } = HOLOGRAM_ART[Math.floor(random() * HOLOGRAM_ART.length)];
  let height = L.height[0] + random() * (L.height[1] - L.height[0]);
  if (height * aspect > L.maxWidth) height = L.maxWidth / aspect;
  return {
    kind: 'hologram',
    atlas,
    art,
    x,
    y: roof,
    z,
    width: height * aspect,
    height,
    lift: L.lift[0] + random() * (L.lift[1] - L.lift[0]),
    hue: L.hues[Math.floor(random() * L.hues.length)],
    phase: random(),
  };
}
