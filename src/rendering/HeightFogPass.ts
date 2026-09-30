import {
  Color,
  DataTexture,
  LinearFilter,
  RGBAFormat,
  ShaderMaterial,
  Vector2,
  UnsignedByteType,
  WebGLRenderTarget,
  HalfFloatType,
} from 'three';
import type { PerspectiveCamera, WebGLRenderer } from 'three';
import { Pass, FullScreenQuad } from 'three/addons/postprocessing/Pass.js';
import { hazeWeather, HAZE_CELL_SIZE } from '../generation/atmosphere.ts';
import { districtKindAt } from '../generation/districts.ts';
import type { Perlin } from '../lib/perlin.js';
import type { Seed } from '../hash.ts';

const GRID_SIZE = 16;

// Integrate two height bands along the view ray, stopping at scene depth.
// A small, world-aligned weather texture supplies seeded cloud banks. This
// Calculate haze at half resolution, then upsample against full scene depth
// to preserve sharp silhouettes. No alpha-sorted meshes or new point lights.
export class HeightFogPass extends Pass {
  density = 1;
  readonly data = new Uint8Array(GRID_SIZE * GRID_SIZE * 4);
  readonly weather = new DataTexture(this.data, GRID_SIZE, GRID_SIZE, RGBAFormat, UnsignedByteType);
  readonly material: ShaderMaterial;
  readonly composite: ShaderMaterial;
  readonly target = new WebGLRenderTarget(1, 1, { type: HalfFloatType, depthBuffer: false });
  readonly quad: FullScreenQuad;
  originX = Infinity;
  originZ = Infinity;

  constructor(
    readonly camera: PerspectiveCamera,
    readonly seed: Seed,
    readonly noise: Perlin,
  ) {
    super();
    this.weather.minFilter = this.weather.magFilter = LinearFilter;
    this.material = new ShaderMaterial({
      depthTest: false,
      depthWrite: false,
      uniforms: {
        tDepth: { value: null },
        tWeather: { value: this.weather },
        inverseProjection: { value: camera.projectionMatrixInverse },
        cameraWorld: { value: camera.matrixWorld },
        weatherOrigin: { value: new Vector2() },
        weatherSize: { value: GRID_SIZE * HAZE_CELL_SIZE },
        density: { value: this.density },
      },
      vertexShader: `varying vec2 vUv;
        void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`,
      fragmentShader: `
        varying vec2 vUv;
        uniform sampler2D tDepth, tWeather;
        uniform mat4 inverseProjection, cameraWorld;
        uniform vec2 weatherOrigin;
        uniform float weatherSize, density;
        float erfApprox(float x) {
          float t = 1.0 / (1.0 + 0.3275911 * abs(x));
          float p = (((((1.061405429 * t - 1.453152027) * t)
            + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t;
          return sign(x) * (1.0 - p * exp(-x * x));
        }
        float band(vec3 start, vec3 ray, float height, float thickness, bool upper) {
          float distanceToSurface = length(ray);
          float integral;
          float center = 0.5;
          float spread = 0.4;
          if (abs(ray.y) < 0.01) {
            float y = (start.y - height) / thickness;
            integral = distanceToSurface * exp(-y * y);
          } else {
            float a = (start.y - height) / thickness;
            float b = (start.y + ray.y - height) / thickness;
            integral = max(0.0, thickness * 0.886226925 * distanceToSurface
              / ray.y * (erfApprox(b) - erfApprox(a)));
            center = clamp((height - start.y) / ray.y, 0.0, 1.0);
            spread = min(0.5, thickness / abs(ray.y));
          }
          vec2 uv = (start.xz + ray.xz * center - weatherOrigin) / weatherSize;
          vec2 uvA = (start.xz + ray.xz * max(0.0, center - spread) - weatherOrigin) / weatherSize;
          vec2 uvB = (start.xz + ray.xz * min(1.0, center + spread) - weatherOrigin) / weatherSize;
          vec2 banks = texture2D(tWeather, uv).rg * 0.6
            + (texture2D(tWeather, uvA).rg + texture2D(tWeather, uvB).rg) * 0.2;
          return integral * (upper ? banks.g * 0.0005 : banks.r * 0.00065);
        }
        void main() {
          float depth = texture2D(tDepth, vUv).r;
          vec4 view = inverseProjection * vec4(vUv * 2.0 - 1.0, depth * 2.0 - 1.0, 1.0);
          vec3 end = (cameraWorld * vec4(view.xyz / view.w, 1.0)).xyz;
          vec3 start = cameraWorld[3].xyz;
          vec3 ray = end - start;
          // Analytic height integration avoids thin layers being skipped by
          // large ray-march steps in aerial views. No temporal history/noise.
          float opticalDepth = band(start, ray, 45.0, 38.0, false)
            + band(start, ray, 185.0, 65.0, true);
          float alpha = 1.0 - exp(-opticalDepth * density);
          gl_FragColor = vec4(alpha, length(ray) / 2800.0, 0.0, 1.0);
        }`,
    });
    this.composite = new ShaderMaterial({
      depthTest: false,
      depthWrite: false,
      uniforms: {
        tDiffuse: { value: null },
        tDepth: { value: null },
        tFog: { value: this.target.texture },
        inverseProjection: { value: camera.projectionMatrixInverse },
        fogSize: { value: new Vector2(1, 1) },
        hazeColor: { value: new Color(0x494360) },
      },
      vertexShader: this.material.vertexShader,
      fragmentShader: `
        varying vec2 vUv;
        uniform sampler2D tDiffuse, tDepth, tFog;
        uniform mat4 inverseProjection;
        uniform vec2 fogSize;
        uniform vec3 hazeColor;
        void main() {
          vec4 scene = texture2D(tDiffuse, vUv);
          float depth = texture2D(tDepth, vUv).r;
          vec4 view = inverseProjection * vec4(vUv * 2.0 - 1.0, depth * 2.0 - 1.0, 1.0);
          float distanceToSurface = length(view.xyz / view.w) / 2800.0;
          vec2 pixel = vUv * fogSize - 0.5;
          vec2 f = fract(pixel);
          vec2 uv = (floor(pixel) + 0.5) / fogSize;
          vec2 stepUv = 1.0 / fogSize;
          vec2 a = texture2D(tFog, uv).rg;
          vec2 b = texture2D(tFog, uv + vec2(stepUv.x, 0.0)).rg;
          vec2 c = texture2D(tFog, uv + vec2(0.0, stepUv.y)).rg;
          vec2 d = texture2D(tFog, uv + stepUv).rg;
          vec4 weights = vec4((1.0-f.x)*(1.0-f.y), f.x*(1.0-f.y), (1.0-f.x)*f.y, f.x*f.y);
          // Reject haze from a different surface at depth discontinuities.
          weights /= 1.0 + abs(vec4(a.y, b.y, c.y, d.y) - distanceToSurface) * 1200.0;
          float alpha = dot(vec4(a.x, b.x, c.x, d.x), weights) / dot(weights, vec4(1.0));
          gl_FragColor = vec4(mix(scene.rgb, hazeColor, alpha), scene.a);
        }`,
    });
    this.quad = new FullScreenQuad(this.material);
  }

  override setSize(width: number, height: number): void {
    this.target.setSize(Math.max(1, Math.ceil(width / 2)), Math.max(1, Math.ceil(height / 2)));
    this.composite.uniforms.fogSize.value.set(this.target.width, this.target.height);
  }

  updateWeather(): void {
    const cx = Math.floor(this.camera.position.x / HAZE_CELL_SIZE) - GRID_SIZE / 2;
    const cz = Math.floor(this.camera.position.z / HAZE_CELL_SIZE) - GRID_SIZE / 2;
    if (cx === this.originX && cz === this.originZ) return;
    this.originX = cx;
    this.originZ = cz;
    for (let z = 0; z < GRID_SIZE; z++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        const wx = (cx + x) * HAZE_CELL_SIZE,
          wz = (cz + z) * HAZE_CELL_SIZE;
        const [low, high] = hazeWeather(this.seed, wx, wz, districtKindAt(this.noise, wx, wz));
        const i = (z * GRID_SIZE + x) * 4;
        this.data[i] = Math.round(low * 255);
        this.data[i + 1] = Math.round(high * 255);
        this.data[i + 3] = 255;
      }
    }
    this.material.uniforms.weatherOrigin.value.set(cx * HAZE_CELL_SIZE, cz * HAZE_CELL_SIZE);
    this.weather.needsUpdate = true;
  }

  override render(
    renderer: WebGLRenderer,
    writeBuffer: WebGLRenderTarget,
    readBuffer: WebGLRenderTarget,
  ): void {
    this.updateWeather();
    this.material.uniforms.tDepth.value = readBuffer.depthTexture;
    this.material.uniforms.density.value = this.density;
    this.quad.material = this.material;
    renderer.setRenderTarget(this.target);
    this.quad.render(renderer);
    this.composite.uniforms.tDiffuse.value = readBuffer.texture;
    this.composite.uniforms.tDepth.value = readBuffer.depthTexture;
    this.quad.material = this.composite;
    renderer.setRenderTarget(this.renderToScreen ? null : writeBuffer);
    this.quad.render(renderer);
  }

  override dispose(): void {
    this.weather.dispose();
    this.material.dispose();
    this.composite.dispose();
    this.target.dispose();
    this.quad.dispose();
  }
}
