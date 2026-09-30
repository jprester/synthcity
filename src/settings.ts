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

import type { Seed } from './hash.ts';

export type Mode = 'drive' | 'freeroam';
export type WindshieldShader = 'simple' | 'advanced';
export type EnvironmentName = 'night' | 'day';

export interface UserSettings {
  worldSeed: Seed;
  mode?: Mode;
  music?: boolean;
  soundFx?: boolean;
  renderScaling?: number;
  windshieldShader?: WindshieldShader;
  stats?: boolean;
  skip?: boolean;
  environment?: EnvironmentName;
}

export const curatedWorldSeeds = [9746, 6362, 4217, 5794];

export const userSettings: UserSettings = {
  worldSeed: curatedWorldSeeds[Math.floor(Math.random() * curatedWorldSeeds.length)],
};

// the value if it is one of the allowed ones
const oneOf = <T extends string>(value: string | null, allowed: readonly T[]): T | undefined =>
  allowed.find((a) => a === value);

export function applyQueryParams(search = window.location.search): UserSettings {
  const q = new URLSearchParams(search);
  if (q.has('seed') && q.get('seed') !== '') userSettings.worldSeed = Number(q.get('seed'));
  const mode = oneOf(q.get('mode'), ['drive', 'freeroam'] as const);
  if (mode) userSettings.mode = mode;
  if (q.has('music')) userSettings.music = q.get('music') == '1';
  if (q.has('sfx')) userSettings.soundFx = q.get('sfx') == '1';
  if (q.has('scale')) userSettings.renderScaling = Number(q.get('scale'));
  const windshield = oneOf(q.get('windshield'), ['simple', 'advanced'] as const);
  if (windshield) userSettings.windshieldShader = windshield;
  if (q.has('stats')) userSettings.stats = q.get('stats') == '1';
  if (q.has('skip')) userSettings.skip = q.get('skip') == '1';
  const environment = oneOf(q.get('env'), ['night', 'day'] as const);
  if (environment) userSettings.environment = environment;
  return userSettings;
}
