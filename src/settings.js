// Launch settings chosen in the terminal UI, optionally preset from the URL.
//
// Query params (all optional):
//   seed=<int>              world seed
//   mode=drive|freeroam
//   music=0|1  sfx=0|1
//   scale=<float>           render scaling
//   windshield=simple|advanced

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
  return userSettings;
}
