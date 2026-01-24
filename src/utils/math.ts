/**
 * Math utility functions
 * Common mathematical operations used throughout the application
 */

/**
 * Clamp a number between min and max values
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Linear interpolation between two values
 * @param a Start value
 * @param b End value
 * @param t Interpolation factor (0-1)
 */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/**
 * Map a value from one range to another
 * @param value Input value
 * @param inMin Input range minimum
 * @param inMax Input range maximum
 * @param outMin Output range minimum
 * @param outMax Output range maximum
 */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
): number {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

/**
 * Smooth step interpolation (ease in-out)
 * @param t Interpolation factor (0-1)
 */
export function smoothstep(t: number): number {
  return t * t * (3 - 2 * t);
}

/**
 * Smoother step interpolation (Ken Perlin's improved version)
 * @param t Interpolation factor (0-1)
 */
export function smootherstep(t: number): number {
  return t * t * t * (t * (t * 6 - 15) + 10);
}
