// Performance probe on the real GPU (unlike the visual harness, which uses
// SwiftShader). Builds, serves the build, flies drive mode on autopilot and
// samples the ?stats=1 overlay once a second.
//
//   npm run perf [-- --seed 9746 --mode drive --seconds 20 --width 1920 --height 1080 --device 2 --dpr 1.25 --headed 1]
//
// --device: the browser's device pixel ratio (2 is a Retina screen); --dpr: the
// game's pixel ratio cap (?dpr=, default the game's own). The frame rate cap is
// off (?fps=0), so the frame rate shows the cost.
//
// Frame rate is only comparable on the same machine; draw calls, triangles and
// object counts are hardware independent. Headless Chromium may cap or
// throttle frames differently from a focused window; use --headed 1 to check.

import { spawn, execSync } from 'node:child_process';
import { chromium } from 'playwright';

const argv = process.argv.slice(2);
const args = {};
for (let i = 0; i < argv.length; i++) if (argv[i].startsWith('--')) args[argv[i].slice(2)] = argv[++i];
const seed = args.seed || '9746';
const mode = args.mode || 'drive';
const seconds = Number(args.seconds || 20);
const viewport = { width: Number(args.width || 1920), height: Number(args.height || 1080) };
const PORT = 4180;

// GPU backend per platform
const gl = {
  darwin: ['--use-angle=metal'],
  win32: ['--use-angle=d3d11'],
  linux: ['--use-angle=vulkan', '--enable-features=Vulkan'],
}[process.platform];

execSync('npx vite build --logLevel warn', { stdio: 'inherit' });
const server = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort'], {
  stdio: ['ignore', 'pipe', 'inherit'],
  detached: true,
});
await new Promise((resolve, reject) => {
  server.stdout.on('data', (d) => d.toString().includes(String(PORT)) && resolve());
  server.on('exit', (code) => reject(new Error(`vite preview exited (${code})`)));
});

try {
  const browser = await chromium.launch({
    headless: !args.headed,
    args: [...(gl || []), '--ignore-gpu-blocklist', '--disable-frame-rate-limit', '--mute-audio'],
  });
  const page = await browser.newPage({ viewport, deviceScaleFactor: Number(args.device || 1) });
  page.on('pageerror', (e) => {
    if (!e.message.includes('pointer lock')) console.log('page error:', e.message);
  });
  await page.route('https://fonts.*/**', (r) => r.abort());
  const dpr = args.dpr ? `&dpr=${args.dpr}` : '';
  await page.goto(`http://localhost:${PORT}/?seed=${seed}&mode=${mode}&music=0&sfx=0&stats=1&fps=0${dpr}`);
  const renderer = await page.evaluate(() => {
    const c = document.createElement('canvas').getContext('webgl2');
    const ext = c.getExtension('WEBGL_debug_renderer_info');
    return ext ? c.getParameter(ext.UNMASKED_RENDERER_WEBGL) : 'unknown';
  });
  console.log(`GPU: ${renderer}  viewport ${viewport.width}x${viewport.height}  seed ${seed} ${mode}`);

  await page.waitForSelector('#enterBtn', { state: 'visible', timeout: 180_000 });
  await page.click('#enterBtn');
  await page.addStyleTag({ content: '#blocker { display: none !important; }' });

  for (let s = 1; s <= seconds; s++) {
    await page.waitForTimeout(1000);
    const text = await page.evaluate(() => document.getElementById('stats')?.textContent || '');
    console.log(`t=${String(s).padStart(3)}s  ${text.replaceAll('\n', '  |  ')}`);
  }
  await browser.close();
} finally {
  try {
    process.kill(-server.pid);
  } catch {
    // already gone
  }
}
