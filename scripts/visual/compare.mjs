// Pixel-compares captured frames against the baseline and writes diff images.

import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';

// Returns [{ name, mismatch (fraction of pixels), missing }]
export function compareDirs({ baseline, current, diff, threshold = 0.1 }) {
  mkdirSync(diff, { recursive: true });
  const results = [];
  for (const name of readdirSync(baseline).filter((f) => f.endsWith('.png')).sort()) {
    const curPath = join(current, name);
    if (!existsSync(curPath)) {
      results.push({ name, mismatch: 1, missing: true });
      continue;
    }
    const a = PNG.sync.read(readFileSync(join(baseline, name)));
    const b = PNG.sync.read(readFileSync(curPath));
    if (a.width !== b.width || a.height !== b.height) {
      results.push({ name, mismatch: 1, missing: false });
      continue;
    }
    const out = new PNG({ width: a.width, height: a.height });
    const bad = pixelmatch(a.data, b.data, out.data, a.width, a.height, { threshold });
    if (bad > 0) writeFileSync(join(diff, name), PNG.sync.write(out));
    results.push({ name, mismatch: bad / (a.width * a.height), missing: false });
  }
  return results;
}
