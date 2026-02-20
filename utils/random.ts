/**
 * Return a random floating-point number in [min, max).
 */
export function randomInRange(min: number, max: number): number {
  "worklet";
  return min + Math.random() * (max - min);
}

/**
 * Return a random integer in [0, max).
 */
export function randomInt(max: number): number {
  "worklet";
  return Math.floor(Math.random() * max);
}
