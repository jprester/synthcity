// Deterministic screenshot capture for visual regression.
//
// Freezes time, seeds Math.random, drives requestAnimationFrame manually and
// disables audio, so the same build + shot list yields the same frames.
// Works against any server that serves the app (dev, preview or a static
// server over an older checkout), which is how baselines are recorded.
//
// Normally run through `npm run visual:*` (see run.mjs). Direct use, e.g. to
// record frames from an older checkout served by any static server:
//   node scripts/visual/capture.mjs --url http://localhost:8080/ --out /tmp/frames [--only drive-9746] [--jquery path/to/jquery.min.js]

import { mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { chromium } from 'playwright';
import { SHOTS, VIEWPORT } from './shots.mjs';

// Runs in the page before any app script.
export function determinismShim(seed) {
  // seeded PRNG replacing Math.random (mulberry32)
  let s = 0;
  const rand = () => {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  window.__randCalls = 0;
  window.__reseed = (seed) => {
    s = seed >>> 0;
    window.__randCalls = 0;
  };
  window.__reseed(seed);
  Math.random = () => {
    window.__randCalls++;
    return rand();
  };

  // Reseed again when the game requests its first asset. Building materials
  // draw random emissive hues while loading, and how many random calls happen
  // before that (UI, bundler-dependent three.js module init) is incidental.
  const imgSrc = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'src');
  let loadSeen = false;
  Object.defineProperty(HTMLImageElement.prototype, 'src', {
    ...imgSrc,
    set(v) {
      if (!loadSeen && String(v).includes('assets/')) {
        loadSeen = true;
        window.__reseed(seed + 1);
      }
      imgSrc.set.call(this, v);
    },
  });

  // fixed wall clock (Alea() without a seed uses +new Date)
  const FIXED = Date.UTC(2026, 0, 1);
  const RealDate = Date;
  class FakeDate extends RealDate {
    constructor(...a) {
      if (a.length === 0) super(FIXED);
      else super(...a);
    }
    static now() {
      return FIXED;
    }
  }
  window.Date = FakeDate;

  // manual frame clock
  let now = 0;
  const FRAME = 1000 / 60;
  performance.now = () => now;
  let queue = [];
  let id = 0;
  window.requestAnimationFrame = (cb) => {
    queue.push(cb);
    return ++id;
  };
  window.cancelAnimationFrame = () => {};
  // Intermediate frames run all game logic but skip GPU draws; only the
  // captured frame is rasterised. Nothing in the pipeline accumulates across
  // frames, so the captured image is unaffected.
  let skipDraw = false;
  for (const proto of [window.WebGLRenderingContext, window.WebGL2RenderingContext]) {
    if (!proto) continue;
    for (const fn of [
      'drawArrays',
      'drawElements',
      'drawArraysInstanced',
      'drawElementsInstanced',
      'clear',
    ]) {
      const orig = proto.prototype[fn];
      if (!orig) continue;
      proto.prototype[fn] = function (...a) {
        if (!skipDraw) return orig.apply(this, a);
      };
    }
  }
  window.__step = (n) => {
    for (let i = 0; i < n; i++) {
      skipDraw = i < n - 1;
      now += FRAME;
      const q = queue;
      queue = [];
      for (const cb of q) cb(now);
    }
    skipDraw = false;
  };
}

const HIDE_OVERLAYS = `
  #canvas { opacity: 1 !important; }
  #blocker, #crashMessage { display: none !important; }
`;

// Opens the app for a shot and waits until assets have loaded (Launch button
// shown). A load occasionally stalls; then it reports the requests still
// pending and tries once more on a fresh page.
async function openShot(browser, url, shot, jquery, attempts = 2) {
  for (let attempt = 1; ; attempt++) {
    const page = await browser.newPage({ viewport: VIEWPORT, deviceScaleFactor: 1 });
    const errors = [];
    const pending = new Set();
    page.on('pageerror', (e) => errors.push(e.message));
    page.on('request', (r) => pending.add(r.url()));
    page.on('requestfinished', (r) => pending.delete(r.url()));
    page.on('requestfailed', (r) => pending.delete(r.url()));
    await page.addInitScript(determinismShim, shot.seed);
    // legacy builds pull jQuery from a CDN; serve a local copy when given
    if (jquery) {
      await page.route('https://code.jquery.com/**', (r) =>
        r.fulfill({ path: jquery, contentType: 'text/javascript' }),
      );
    }
    await page.route('https://fonts.*/**', (r) => r.abort());

    const q = new URLSearchParams({ seed: shot.seed, mode: shot.mode, music: '0', sfx: '0' });
    await page.goto(`${url}?${q}`);
    try {
      await page.waitForSelector('#enterBtn', { state: 'visible', timeout: 90_000 });
      return { page, errors };
    } catch (e) {
      console.log(`  ${shot.name}: assets did not finish loading (attempt ${attempt})`);
      console.log(`  pending requests: ${[...pending].join(', ') || 'none'}`);
      if (errors.length) console.log(`  page errors: ${errors.join('; ')}`);
      await page.close();
      if (attempt >= attempts) throw e;
    }
  }
}

export async function captureShots({ url, out, only = null, jquery = null }) {
  mkdirSync(out, { recursive: true });
  const files = [];
  const browser = await chromium.launch({
    args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--mute-audio'],
  });

  for (const shot of SHOTS) {
    if (only && !only.includes(shot.name)) continue;
    const t0 = Date.now();
    const { page, errors } = await openShot(browser, url, shot, jquery);

    // legacy builds read settings from window.userSettings
    await page.evaluate((shot) => {
      if (window.userSettings) {
        Object.assign(window.userSettings, {
          mode: shot.mode,
          worldSeed: shot.seed,
          music: false,
          soundFx: false,
        });
      }
      window.__reseed(shot.seed);
    }, shot);

    await page.click('#enterBtn');
    await page.addStyleTag({ content: HIDE_OVERLAYS });

    let frame = 0;
    for (const f of shot.frames) {
      await page.evaluate((n) => window.__step(n), f - frame);
      frame = f;
      const file = join(out, `${shot.name}-f${String(f).padStart(4, '0')}.png`);
      await page.screenshot({ path: file, timeout: 120_000 });
      files.push(file);
      console.log(file);
    }
    if (errors.length) console.log(`  page errors in ${shot.name}:\n  ` + errors.join('\n  '));
    console.log(`  ${shot.name} done in ${((Date.now() - t0) / 1000).toFixed(1)}s`);
    await page.close();
  }

  await browser.close();
  return files;
}

// CLI
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = {};
  const argv = process.argv.slice(2);
  for (let i = 0; i < argv.length; i++) if (argv[i].startsWith('--')) args[argv[i].slice(2)] = argv[++i];
  await captureShots({
    url: args.url || 'http://localhost:4173/',
    out: args.out || 'screenshots/visual/current',
    only: args.only ? args.only.split(',') : null,
    jquery: args.jquery,
  });
}
