// Shot list for visual regression. Frames are counted in fixed 1/60 s steps
// after pressing Launch. Keep the list small: software rendering is slow.
export const VIEWPORT = { width: 960, height: 540 };

export const SHOTS = [
  { name: 'drive-9746', mode: 'drive', seed: 9746, frames: [1, 120, 360] },
  { name: 'drive-6362', mode: 'drive', seed: 6362, frames: [1, 240] },
  { name: 'freeroam-4217', mode: 'freeroam', seed: 4217, frames: [1, 120] },
  {
    name: 'aerial-9746',
    mode: 'freeroam',
    seed: 9746,
    view: { at: '0,0', alt: '650', yaw: '20', pitch: '-32' },
    frames: [1],
  },
  {
    name: 'skyline-9746',
    mode: 'freeroam',
    seed: 9746,
    view: { at: '0,0', alt: '1400', yaw: '20', pitch: '-48' },
    frames: [1],
  },
  {
    name: 'day-9746',
    mode: 'freeroam',
    seed: 9746,
    view: { env: 'day', at: '0,0', alt: '650', yaw: '20', pitch: '-32' },
    frames: [1],
  },
  {
    name: 'drive-advanced-9746',
    mode: 'drive',
    seed: 9746,
    view: { windshield: 'advanced' },
    resize: { width: 800, height: 450 },
    frames: [120],
  },
];
