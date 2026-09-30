import { describe, it, expect } from 'vitest';
import { hash, hashFloat, hashRandom, hashString } from '../src/hash.ts';

describe('hash', () => {
  it('is deterministic', () => {
    expect(hash(9746, 152, -304, 'smoke')).toBe(hash(9746, 152, -304, 'smoke'));
    expect(hashFloat(9746, 1, 2)).toBe(hashFloat(9746, 1, 2));
  });

  it('treats numeric and string seeds alike', () => {
    expect(hash('9746', 3, 4, 'ad')).toBe(hash(9746, 3, 4, 'ad'));
  });

  it('depends on seed, every key, key order and salt', () => {
    const base = hash(9746, 1, 2, 'a');
    expect(hash(6362, 1, 2, 'a')).not.toBe(base);
    expect(hash(9746, 0, 2, 'a')).not.toBe(base);
    expect(hash(9746, 1, 3, 'a')).not.toBe(base);
    expect(hash(9746, 2, 1, 'a')).not.toBe(base);
    expect(hash(9746, 1, 2, 'b')).not.toBe(base);
  });

  it('floors fractional coordinates', () => {
    expect(hash(1, 10.7, -3.2)).toBe(hash(1, 10, -4));
  });

  it('gives roughly uniform floats in [0, 1) over a lattice', () => {
    const buckets = new Array(10).fill(0);
    let n = 0;
    for (let x = -100; x < 100; x++) {
      for (let z = -100; z < 100; z++) {
        const v = hashFloat(9746, x * 152, z * 152, 'lot');
        expect(v).toBeGreaterThanOrEqual(0);
        expect(v).toBeLessThan(1);
        buckets[Math.floor(v * 10)]++;
        n++;
      }
    }
    for (const b of buckets) expect(Math.abs(b / n - 0.1)).toBeLessThan(0.01);
  });

  it('gives uncorrelated values for different salts at the same position', () => {
    let sum = 0;
    const n = 20000;
    for (let i = 0; i < n; i++) {
      sum += (hashFloat(1, i, 0, 'a') - 0.5) * (hashFloat(1, i, 0, 'b') - 0.5);
    }
    // covariance of independent U(0,1) is 0; its std error here is ~0.0006
    expect(Math.abs(sum / n)).toBeLessThan(0.004);
  });

  it('hashString is FNV-1a', () => {
    expect(hashString('')).toBe(0x811c9dc5);
    expect(hashString('a')).toBe(0xe40c292c);
  });
});

describe('hashRandom', () => {
  it('replays the same stream for the same keys', () => {
    const a = hashRandom(9746, 5, 6, 'advert');
    const b = hashRandom(9746, 5, 6, 'advert');
    for (let i = 0; i < 10; i++) expect(a()).toBe(b());
  });

  it('gives different streams for different keys', () => {
    const a = hashRandom(9746, 5, 6, 'advert');
    const b = hashRandom(9746, 5, 7, 'advert');
    expect([a(), a(), a()]).not.toEqual([b(), b(), b()]);
  });
});
