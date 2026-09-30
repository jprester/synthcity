// Deterministic hashing for world content.
//
// Everything placed in the world must come from the world seed and its
// position, never from Math.random(). Key each value by position and a purpose
// salt, e.g. hashFloat(seed, x, z, 'smoke'), so values for different purposes
// are independent and adding a new purpose doesn't shift the existing ones.
//
// Keys are integers (world coordinates are floored) or strings. The seed is
// hashed as a string, so 9746 and '9746' (from the settings form) are the same.

const GOLDEN = 0x9e3779b9;

// murmur3 32-bit finaliser
function fmix32(h) {
  h ^= h >>> 16;
  h = Math.imul(h, 0x85ebca6b);
  h ^= h >>> 13;
  h = Math.imul(h, 0xc2b2ae35);
  h ^= h >>> 16;
  return h >>> 0;
}

// FNV-1a
export function hashString(str) {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

function keyToInt(key) {
  return typeof key === 'string' ? hashString(key) : Math.floor(key) | 0;
}

// 32-bit unsigned hash of (seed, ...keys).
export function hash(seed, ...keys) {
  let h = fmix32(hashString(String(seed)));
  for (const key of keys) {
    h = fmix32(h ^ fmix32((keyToInt(key) + GOLDEN) | 0));
  }
  return h;
}

// Float in [0, 1) from (seed, ...keys).
export function hashFloat(seed, ...keys) {
  return hash(seed, ...keys) / 4294967296;
}

// Stream of floats in [0, 1) (mulberry32) seeded by (seed, ...keys). Use it
// where one object needs several values, e.g. a decoration's material, scale
// and phase.
export function hashRandom(seed, ...keys) {
  let s = hash(seed, ...keys);
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
