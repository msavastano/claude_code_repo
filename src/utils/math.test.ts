import { clamp, lerp, percentage, roundTo } from './math'

describe('clamp', () => {
  it('returns value when within range', () => {
    expect(clamp(5, 0, 10)).toBe(5)
  })

  it('returns min when value is below range', () => {
    expect(clamp(-5, 0, 10)).toBe(0)
  })

  it('returns max when value is above range', () => {
    expect(clamp(15, 0, 10)).toBe(10)
  })

  it('handles equal min and max', () => {
    expect(clamp(5, 3, 3)).toBe(3)
  })

  it('throws when min > max', () => {
    expect(() => clamp(5, 10, 0)).toThrow(RangeError)
  })
})

describe('lerp', () => {
  it('returns start when t=0', () => {
    expect(lerp(0, 100, 0)).toBe(0)
  })

  it('returns end when t=1', () => {
    expect(lerp(0, 100, 1)).toBe(100)
  })

  it('returns midpoint when t=0.5', () => {
    expect(lerp(0, 100, 0.5)).toBe(50)
  })

  it('clamps t to 0-1 range', () => {
    expect(lerp(0, 100, -1)).toBe(0)
    expect(lerp(0, 100, 2)).toBe(100)
  })
})

describe('roundTo', () => {
  it('rounds to specified decimal places', () => {
    expect(roundTo(3.14159, 2)).toBe(3.14)
    expect(roundTo(3.14159, 4)).toBe(3.1416)
  })

  it('rounds to zero decimal places', () => {
    expect(roundTo(3.7, 0)).toBe(4)
  })
})

describe('percentage', () => {
  it('calculates percentage within range', () => {
    expect(percentage(5, 0, 10)).toBe(50)
    expect(percentage(0, 0, 100)).toBe(0)
    expect(percentage(100, 0, 100)).toBe(100)
  })

  it('clamps to 0-100', () => {
    expect(percentage(-10, 0, 100)).toBe(0)
    expect(percentage(200, 0, 100)).toBe(100)
  })

  it('returns 0 when min equals max', () => {
    expect(percentage(5, 5, 5)).toBe(0)
  })
})
