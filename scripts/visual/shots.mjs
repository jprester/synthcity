// Shot list for visual regression. Frames are counted in fixed 1/60 s steps
// after pressing Launch. Keep the list small: software rendering is slow.
export const VIEWPORT = { width: 960, height: 540 };

export const SHOTS = [
  { name: 'drive-9746', mode: 'drive', seed: 9746, frames: [1, 120, 360] },
  { name: 'drive-6362', mode: 'drive', seed: 6362, frames: [1, 240] },
  { name: 'freeroam-4217', mode: 'freeroam', seed: 4217, frames: [1, 120] },
];
