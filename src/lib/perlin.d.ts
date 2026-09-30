// Types for the vendored Processing-style Perlin noise (perlin.js).
export class Perlin {
  // seed: any value; the same seed gives the same noise (unseeded uses the clock)
  constructor(seed?: unknown);
  noiseReseed(): void;
  noiseSeed(seed: unknown): void;
  noiseDetail(lod: number, falloff: number): void;
  // value in [0, 1)
  noise(x: number, y?: number, z?: number): number;
}
