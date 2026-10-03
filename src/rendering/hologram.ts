// Hologram projections (src/generation/holograms.ts): a picture ad floating in
// a projector's light beam, with scanlines, a rising bright band, flicker and
// now and then a glitch.
//
// All holograms share one figure material per atlas and one beam material; what
// differs per hologram (art rectangle, tint, phase, size) is vertex data on its
// own small geometry. Everything animates on the world clock (AssetManager.time).

import {
  AdditiveBlending,
  BufferAttribute,
  Color,
  CylinderGeometry,
  DoubleSide,
  PlaneGeometry,
  ShaderMaterial,
} from 'three';
import type { BufferGeometry, Material, Texture } from 'three';

export const HOLOGRAM_INTENSITY = 0.32; // figure brightness (signs use 0.3)
export const BEAM_INTENSITY = 0.1;

// low-frequency effects only; the scanlines fade out where they would get finer
// than a few pixels, so distant holograms don't shimmer
const HASH = `float holoHash(float n) { return fract(sin(n * 12.9898) * 43758.5453); }
`;

const FIGURE_VERTEX = `attribute vec4 rect;
attribute vec4 holo; // tint hue (unused here), phase, height in world units, brightness
attribute vec3 tint;
varying vec2 vUv;
varying vec4 vRect;
varying vec4 vHolo;
varying vec3 vTint;
void main() {
  vUv = uv;
  vRect = rect;
  vHolo = holo;
  vTint = tint;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const FIGURE_FRAGMENT = `uniform sampler2D map;
uniform float uTime;
uniform float intensity;
varying vec2 vUv;
varying vec4 vRect;
varying vec4 vHolo;
varying vec3 vTint;
${HASH}
vec3 art(vec2 q) {
  return texture2D(map, vRect.xy + clamp(q, 0.0, 1.0) * (vRect.zw - vRect.xy)).rgb;
}
void main() {
  float t = uTime + vHolo.y * 100.0;
  // glitch: now and then rows jump sideways and the colours split for a moment
  float burst = step(0.88, holoHash(floor(t * 1.7)));
  vec2 q = vUv;
  q.x += burst * (holoHash(floor(vUv.y * 20.0) + floor(t * 30.0)) - 0.5) * 0.12;
  float split = 0.004 + burst * 0.02;
  vec3 c = vec3(art(q + vec2(split, 0.0)).r, art(q).g, art(q - vec2(split, 0.0)).b);
  // the dark background is see-through; the art takes on the projector's tint
  float lum = dot(c, vec3(0.2126, 0.7152, 0.0722));
  c *= smoothstep(0.008, 0.06, lum);
  c = mix(c, vTint * lum * 2.0, 0.35);
  // scanlines, one every 1.6 world units, running upwards
  float lines = vUv.y * vHolo.z / 1.6;
  float scan = 0.7 + 0.3 * sin((lines - t * 1.5) * 6.2832);
  scan = mix(scan, 0.85, smoothstep(0.2, 0.45, fwidth(lines)));
  // a bright band rising through the figure
  float band = fract(vUv.y - t * 0.18) - 0.5;
  float glow = 1.0 + 0.8 * exp(-band * band * 160.0);
  // flicker, with the odd dropout
  float flicker = 0.88 + 0.12 * holoHash(floor(t * 18.0));
  flicker *= 1.0 - 0.7 * step(0.94, holoHash(floor(t * 4.0) + 7.0));
  // fade in from the beam at the bottom, out at the top
  float fade = smoothstep(0.0, 0.12, vUv.y) * smoothstep(1.0, 0.94, vUv.y);
  gl_FragColor = vec4(c * vHolo.w * intensity * scan * glow * flicker * fade, 1.0);
}
`;

const BEAM_VERTEX = `attribute vec4 holo; // hue (unused), phase, height in world units, brightness
attribute vec3 tint;
varying vec2 vUv;
varying float vEdge;
varying vec4 vHolo;
varying vec3 vTint;
void main() {
  vUv = uv;
  vHolo = holo;
  vTint = tint;
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  // brighter where the cone's surface is seen edge-on: reads as a volume of light
  vec3 n = normalize(normalMatrix * normal);
  vEdge = 1.0 - abs(dot(n, normalize(-mvPosition.xyz)));
  gl_Position = projectionMatrix * mvPosition;
}
`;

const BEAM_FRAGMENT = `uniform float uTime;
uniform float intensity;
varying vec2 vUv;
varying float vEdge;
varying vec4 vHolo;
varying vec3 vTint;
${HASH}
void main() {
  float t = uTime + vHolo.y * 100.0;
  // strongest at the projector, fading up into the figure
  float rise = pow(1.0 - vUv.y, 1.5);
  // soft streaks of light running up the beam
  float streaks = 0.75 + 0.25 * sin(vUv.x * 6.2832 * 7.0 + sin(vUv.x * 19.0)) * sin(vUv.y * 9.0 - t * 2.0);
  float flicker = 0.9 + 0.1 * holoHash(floor(t * 18.0));
  float edge = 0.35 + 0.65 * vEdge * vEdge;
  gl_FragColor = vec4(vTint * intensity * rise * streaks * flicker * edge, 1.0);
}
`;

function additive(material: ShaderMaterial): ShaderMaterial {
  material.blending = AdditiveBlending;
  material.transparent = true;
  material.depthWrite = false;
  material.side = DoubleSide;
  material.fog = false;
  return material;
}

export function hologramMaterial(map: Texture, time: { value: number }): ShaderMaterial {
  return additive(
    new ShaderMaterial({
      uniforms: { map: { value: map }, uTime: time, intensity: { value: HOLOGRAM_INTENSITY } },
      vertexShader: FIGURE_VERTEX,
      fragmentShader: FIGURE_FRAGMENT,
    }),
  );
}

export function beamMaterial(time: { value: number }): ShaderMaterial {
  return additive(
    new ShaderMaterial({
      uniforms: { uTime: time, intensity: { value: BEAM_INTENSITY } },
      vertexShader: BEAM_VERTEX,
      fragmentShader: BEAM_FRAGMENT,
    }),
  );
}

// per-hologram vertex data: holo = (hue, phase, height, brightness), tint
function setHologramData(
  geometry: BufferGeometry,
  hue: number,
  phase: number,
  height: number,
  brightness: number,
): BufferGeometry {
  const n = geometry.getAttribute('position').count;
  const tint = new Color().setHSL(hue, 1, 0.6);
  geometry.setAttribute('holo', new BufferAttribute(fill(n, [hue, phase, height, brightness]), 4));
  geometry.setAttribute('tint', new BufferAttribute(fill(n, [tint.r, tint.g, tint.b]), 3));
  return geometry;
}

function fill(n: number, values: number[]): Float32Array {
  const out = new Float32Array(n * values.length);
  for (let i = 0; i < n; i++) out.set(values, i * values.length);
  return out;
}

// the figure: a unit quad standing on its bottom edge (scale it to the art's size)
export function figureGeometry(
  rect: [number, number, number, number],
  hue: number,
  phase: number,
  height: number,
  brightness: number,
): BufferGeometry {
  const geometry = new PlaneGeometry(1, 1).translate(0, 0.5, 0);
  geometry.setAttribute('rect', new BufferAttribute(fill(4, rect), 4));
  return setHologramData(geometry, hue, phase, height, brightness);
}

// the beam: an open cone from the projector (radius 0.05) up to radius 0.5 at
// height 1 (scale it to the figure)
export function beamGeometry(hue: number, phase: number, height: number): BufferGeometry {
  const geometry = new CylinderGeometry(0.5, 0.05, 1, 32, 1, true).translate(0, 0.5, 0);
  return setHologramData(geometry, hue, phase, height, 1);
}

// Makes a textured emissive material (the rooftop toppers) read as a hologram:
// scanlines running up in world space and a flicker, out of step per object.
export function useHologramShading(material: Material, time: { value: number }): void {
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uTime = time;
    shader.vertexShader =
      'varying vec3 vHoloPos;\nvarying vec2 vHoloSeed;\n' +
      shader.vertexShader.replace(
        '#include <project_vertex>',
        `#include <project_vertex>
        vHoloPos = (modelMatrix * vec4(transformed, 1.0)).xyz;
        vHoloSeed = modelMatrix[3].xz;`,
      );
    shader.fragmentShader =
      `uniform float uTime;\nvarying vec3 vHoloPos;\nvarying vec2 vHoloSeed;\n${HASH}` +
      shader.fragmentShader.replace(
        '#include <emissivemap_fragment>',
        `#include <emissivemap_fragment>
        {
          float t = uTime + holoHash(vHoloSeed.x * 0.013 + vHoloSeed.y * 0.071) * 100.0;
          float lines = vHoloPos.y / 1.4;
          float scan = 0.65 + 0.35 * sin((lines - t * 1.5) * 6.2832);
          scan = mix(scan, 0.82, smoothstep(0.2, 0.45, fwidth(lines)));
          float flicker = 0.9 + 0.1 * holoHash(floor(t * 18.0));
          flicker *= 1.0 - 0.7 * step(0.95, holoHash(floor(t * 4.0) + 3.0));
          totalEmissiveRadiance *= scan * flicker * 1.2;
        }`,
      );
  };
  material.customProgramCacheKey = () => 'hologram-shading';
}
