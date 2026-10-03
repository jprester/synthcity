// Frame-rate independence. Motion, damping and easing were tuned per frame at
// 60 Hz, so updates take k: the elapsed time measured in 60 Hz frames.
//   increments:  x += v * k
//   damping:     v *= decay(0.965, k)
//   easing:      x += (to - x) * ease(0.1, k)
// At exactly k = 1 all of these reduce to the original per-frame maths, bit
// for bit, which keeps the 60 Hz visual harness pixel-identical.

const FRAME = 1 / 60; // seconds
const MAX_K = 4; // below 15 fps the simulation slows down instead of taking huge steps

// k for a frame that took delta seconds (null: no previous frame to measure)
export function frameScale(delta: number | null): number {
  if (delta === null) return 1;
  const k = delta / FRAME;
  if (Math.abs(k - 1) < 1e-6) return 1; // float noise around exactly 60 Hz
  return Math.min(Math.max(k, 0), MAX_K);
}

// per-frame multiplier f applied k times
export function decay(f: number, k: number): number {
  return Math.pow(f, k); // pow(f, 1) === f
}

// per-frame easing factor a applied k times
export function ease(a: number, k: number): number {
  return k === 1 ? a : 1 - Math.pow(1 - a, k);
}

// Frame rate cap: given a display frame at time now (ms) and the pacing clock
// (the due time of the last rendered frame, or null), whether to render it,
// and the new clock. The clock keeps the remainder, so the average rate stays
// at the cap whatever the display's refresh rate. maxFps 0: no cap.
export function paceFrame(
  now: number,
  clock: number | null,
  maxFps: number,
): { render: boolean; clock: number } {
  if (maxFps <= 0 || clock === null) return { render: true, clock: now };
  const interval = 1000 / maxFps;
  const elapsed = now - clock;
  if (elapsed < interval - 1) return { render: false, clock }; // (1 ms: timestamps jitter)
  const late = elapsed % interval;
  return { render: true, clock: now - (late > interval - 1 ? 0 : late) }; // a hair early counts as on time
}
