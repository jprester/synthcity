// Visual regression runner.
//
//   npm run visual:capture   build, serve, capture to screenshots/visual/current
//   npm run visual:compare   capture, then diff against screenshots/visual/baseline
//   npm run visual:baseline  capture straight into the baseline (intentional look changes only)
//
// Extra args: --only drive-9746,freeroam-4217   --tolerance 0.001 (max fraction of differing pixels)

import { spawn, execSync } from 'node:child_process';
import { rmSync } from 'node:fs';
import { captureShots } from './capture.mjs';
import { compareDirs } from './compare.mjs';

const BASELINE = 'screenshots/visual/baseline';
const CURRENT = 'screenshots/visual/current';
const DIFF = 'screenshots/visual/diff';
const PORT = 4179;

const [cmd, ...rest] = process.argv.slice(2);
const args = {};
for (let i = 0; i < rest.length; i++) if (rest[i].startsWith('--')) args[rest[i].slice(2)] = rest[++i];
const only = args.only ? args.only.split(',') : null;
const tolerance = args.tolerance !== undefined ? Number(args.tolerance) : 0.001;

if (!['capture', 'compare', 'baseline'].includes(cmd)) {
  console.error('usage: run.mjs capture|compare|baseline [--only a,b] [--tolerance 0.001]');
  process.exit(2);
}

execSync('npx vite build --logLevel warn', { stdio: 'inherit' });

const server = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort'], {
  stdio: ['ignore', 'pipe', 'inherit'],
  detached: true,
});
await new Promise((resolve, reject) => {
  server.stdout.on('data', (d) => d.toString().includes(String(PORT)) && resolve());
  server.on('exit', (code) => reject(new Error(`vite preview exited (${code})`)));
});
const stopServer = () => {
  try {
    process.kill(-server.pid);
  } catch {
    // already gone
  }
};

let failed = false;
try {
  const out = cmd === 'baseline' ? BASELINE : CURRENT;
  if (!only) rmSync(out, { recursive: true, force: true });
  await captureShots({ url: `http://localhost:${PORT}/`, out, only });

  if (cmd === 'compare') {
    rmSync(DIFF, { recursive: true, force: true });
    const results = compareDirs({ baseline: BASELINE, current: CURRENT, diff: DIFF }).filter(
      (r) => !only || only.some((o) => r.name.startsWith(o + '-')),
    );
    for (const r of results) {
      const ok = r.mismatch <= tolerance;
      if (!ok) failed = true;
      const what = r.missing ? 'missing' : `${(r.mismatch * 100).toFixed(3)}% pixels differ`;
      console.log(`${ok ? 'ok  ' : 'FAIL'} ${r.name}: ${what}`);
    }
    if (failed) console.log(`\ndiff images: ${DIFF}/  (baseline: ${BASELINE}/, current: ${CURRENT}/)`);
  }
} finally {
  stopServer();
}
process.exit(failed ? 1 : 0);
