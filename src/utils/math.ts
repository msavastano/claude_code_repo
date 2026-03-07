/**
 * Clamps a number between a minimum and maximum value.
 */
export function clamp(value: number, min: number, max: number): number {
  if (min > max) {
    throw new RangeError(`min (${min}) must be less than or equal to max (${max})`)
  }
  return Math.min(Math.max(value, min), max)
}

/**
 * Linearly interpolates between two values.
 * @param start - The start value
 * @param end - The end value
 * @param t - The interpolation factor (0-1)
 */
export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * clamp(t, 0, 1)
}

/**
 * Rounds a number to a specified number of decimal places.
 */
export function roundTo(value: number, decimals: number): number {
  const factor = Math.pow(10, decimals)
  return Math.round(value * factor) / factor
}

/**
 * Returns the percentage of a value within a range.
 */
export function percentage(value: number, min: number, max: number): number {
  if (max === min) return 0
  return clamp(((value - min) / (max - min)) * 100, 0, 100)
}
