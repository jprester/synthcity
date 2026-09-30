import { describe, it, expect } from 'vitest';
import { Perlin } from '../src/lib/perlin.js';
import { Alea } from '../src/lib/alea.js';

describe('Alea', () => {
  it('is deterministic for a seed', () => {
    const a = new Alea(9746);
    const b = new Alea(9746);
    for (let i = 0; i < 100; i++) expect(a()).toBe(b());
  });

  it('treats numeric and string seeds the same (custom seeds arrive as strings)', () => {
    expect(new Alea(9746)()).toBe(new Alea('9746')());
  });
});

describe('Perlin', () => {
  const sample = (seed) => {
    const p = new Perlin(seed);
    p.noiseDetail(8, 0.5);
    const out = [];
    for (let i = -3; i <= 3; i++)
      out.push(p.noise(i * 152 * 0.0017, i * 97 * 0.0017), p.noise(i * 760, 32 * 5));
    return out;
  };

  it('is deterministic for a seed', () => {
    expect(sample(9746)).toEqual(sample(9746));
  });

  it('differs between seeds', () => {
    expect(sample(9746)).not.toEqual(sample(6362));
  });

  it('matches recorded values', () => {
    expect(sample(9746)).toMatchSnapshot();
  });
});
