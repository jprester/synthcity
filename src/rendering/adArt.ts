// Ad art: the two atlases (built by scripts/assets/build_ad_atlases.py) and how
// wall signs (src/generation/signs.ts) are drawn from them.
//
// Every sign is one instance of a unit quad in the InstancePool. Its art's
// rectangle in the atlas and its animation are per-instance data
// (INSTANCE_DATA); the sign material's shader maps the quad's UVs into that
// rectangle and animates it on the world clock.

import type { Material } from 'three';
import { INSTANCE_DATA } from '../classes/InstancePool.ts';
import atlasData from '../assets/adAtlases.json';
import type { SignAtlas, SignEffect } from '../generation/signs.ts';

export interface AdArt {
  id: string;
  kind: string; // 'neon' | 'ad' | 'design'
  aspect: number; // width / height
  uv: [number, number, number, number]; // u0, v0, u1, v1 in the atlas
  brightness: number; // how bright it reads (see the build script)
  edge: number; // how bright its border is: dark-background art works as a hologram
  gain: number; // emission multiplier that evens out brightness across all art
}

export interface AdAtlas {
  file: string;
  size: number;
  entries: AdArt[];
}

export const AD_ATLASES = atlasData as unknown as Record<SignAtlas, AdAtlas>;

// material and quad model per atlas (AssetManager). Each atlas has its own quad
// geometry because the pool keeps per-instance data on the geometry.
export const AD_MATERIALS: Record<SignAtlas, string> = {
  neon: 'ads_neon',
  posters: 'ads_posters',
  screens: 'ads_screens',
};
export const SIGN_MODELS: Record<SignAtlas, string> = {
  neon: 'sign_neon',
  posters: 'sign_posters',
  screens: 'sign_screens',
};

// effect codes in the instance data
export const SIGN_EFFECTS: Record<SignEffect, number> = { none: 0, video: 1, flicker: 2 };
// how long a screen takes to wipe from one ad to the next, seconds
export const SWITCH_TIME = 0.9;

// A sign instance's data (InstancePool INSTANCE_DATA): its art rectangle, the
// rectangle it is switching from, then effect, phase (0..1), world time the
// switch started (-1: none) and the old art's brightness.
export function signData(
  art: AdArt,
  effect: SignEffect,
  phase: number,
  from: AdArt | null = null,
  switchedAt = -1,
  fromGain = 0,
): number[] {
  return [...art.uv, ...(from ?? art).uv, SIGN_EFFECTS[effect], phase, switchedAt, fromGain];
}

// Makes a material with an emissive map sample each instance's art rectangle,
// scaled by the instance's brightness (the art's gain, InstancePool
// brightness), and animates it on the world clock: the sign's effect and the
// glitch wipe when a screen switches its art.
export function useInstanceArt(material: Material, time: { value: number }): void {
  const [data, prev, anim] = INSTANCE_DATA;
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uTime = time;
    shader.vertexShader =
      `attribute vec4 ${data};\nattribute vec4 ${prev};\nattribute vec4 ${anim};\n${VARYINGS}` +
      shader.vertexShader.replace(
        '#include <uv_vertex>',
        `#include <uv_vertex>
        vQuadUv = uv;
        vRect = ${data};
        vPrev = ${prev};
        vAnim = ${anim};`,
      );
    shader.fragmentShader =
      `uniform float uTime;\n${VARYINGS}${ART_FRAGMENT_FUNCTIONS}` +
      shader.fragmentShader.replace('#include <emissivemap_fragment>', ART_FRAGMENT);
  };
  // share one program between the sign materials
  material.customProgramCacheKey = () => 'instance-art';
}

const VARYINGS = `varying vec2 vQuadUv;
varying vec4 vRect;
varying vec4 vPrev;
varying vec4 vAnim;
`;

const ART_FRAGMENT_FUNCTIONS = `float signHash(float n) { return fract(sin(n * 12.9898) * 43758.5453); }
`;

// Effects stay low-frequency (no fine scanlines): the bloom and distance would
// turn fine patterns into shimmer.
const ART_FRAGMENT = `#ifdef USE_EMISSIVEMAP
{
  vec2 q = vQuadUv;
  float t = uTime + vAnim.y * 100.0;
  float glow = 1.0;
  if (abs(vAnim.x - 1.0) < 0.5) {
    // video: a slow zoom and pan inside the art, a soft bright band rolling down
    float zoom = 1.0 - 0.15 * (0.5 + 0.5 * sin(t * 0.45));
    q = (q - 0.5) * zoom + 0.5 + vec2(sin(t * 0.23), cos(t * 0.31)) * 0.5 * (1.0 - zoom);
    float roll = fract(vQuadUv.y + t * 0.12) - 0.5;
    glow += 0.3 * exp(-roll * roll * 120.0);
  } else if (abs(vAnim.x - 2.0) < 0.5) {
    // flicker: now and then the tube stutters for a moment
    float bad = step(0.75, signHash(floor(t * 0.4)));
    glow *= 1.0 - 0.9 * bad * step(0.4, signHash(floor(t * 15.0)));
  }
  // switching: the new art wipes down over the old one behind a glitch band
  float p = vAnim.z < 0.0 ? 1.0 : clamp((uTime - vAnim.z) / ${SWITCH_TIME.toFixed(2)}, 0.0, 1.0);
  float edge = 1.1 - 1.2 * p; // the wipe line, top (1) to bottom (0)
  bool fresh = p >= 1.0 || vQuadUv.y > edge;
  if (p < 1.0) {
    float band = 1.0 - smoothstep(0.0, 0.1, abs(vQuadUv.y - edge));
    q.x += (signHash(floor(vQuadUv.y * 30.0) + floor(uTime * 24.0)) - 0.5) * 0.25 * band;
    glow += 1.5 * band;
  }
  q = clamp(q, 0.0, 1.0);
  vec4 rect = fresh ? vRect : vPrev;
  // mip level from the unanimated mapping, so the glitch rows don't seam
  vec2 base = vRect.xy + vQuadUv * (vRect.zw - vRect.xy);
  vec4 emissiveColor = textureGrad(emissiveMap, rect.xy + q * (rect.zw - rect.xy), dFdx(base), dFdy(base));
  totalEmissiveRadiance *= emissiveColor.rgb * glow;
  #ifdef USE_COLOR
    totalEmissiveRadiance *= fresh ? vColor.r : vAnim.w;
  #endif
}
#endif`;
