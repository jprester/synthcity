// Launch settings chosen in the terminal UI, optionally preset from the URL.
//
// Query params (all optional):
//   seed=<int>              world seed
//   mode=drive|freeroam
//   music=0|1  sfx=0|1
//   scale=<float>           render scaling
//   windshield=simple|advanced
//   stats=1                 performance overlay
//   skip=1                  skip the boot terminal and launch as soon as assets load
//   gui=0|1                 dev tweak panel (default: on under `npm run dev`)
//   env=night|day           environment (day is the original's unused alternative)

export const curatedWorldSeeds = [9746, 6362, 4217, 5794];

export const userSettings = {
  worldSeed: curatedWorldSeeds[Math.floor(Math.random() * curatedWorldSeeds.length)],
};

export function applyQueryParams(search = window.location.search) {
  const q = new URLSearchParams(search);
  if (q.has('seed') && q.get('seed') !== '') userSettings.worldSeed = Number(q.get('seed'));
  if (q.has('mode')) userSettings.mode = q.get('mode');
  if (q.has('music')) userSettings.music = q.get('music') == '1';
  if (q.has('sfx')) userSettings.soundFx = q.get('sfx') == '1';
  if (q.has('scale')) userSettings.renderScaling = q.get('scale');
  if (q.has('windshield')) userSettings.windshieldShader = q.get('windshield');
  if (q.has('stats')) userSettings.stats = q.get('stats') == '1';
  if (q.has('skip')) userSettings.skip = q.get('skip') == '1';
  if (q.has('env')) userSettings.environment = q.get('env');
  return userSettings;
}
