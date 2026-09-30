// Types for the vendored Alea PRNG (alea.js). Callable with or without `new`.
export interface AleaRandom {
  (): number;
  uint32(): number;
  fract53(): number;
  version: string;
  args: unknown[];
}
export const Alea: {
  new (...seeds: unknown[]): AleaRandom;
  (...seeds: unknown[]): AleaRandom;
};
export function Mash(): (data: unknown) => number;
