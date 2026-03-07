import { useCallback, useState } from 'react'

export interface UseCounterOptions {
  /** Initial counter value (default: 0) */
  initialValue?: number
  /** Minimum allowed value */
  min?: number
  /** Maximum allowed value */
  max?: number
  /** Step size for increment/decrement (default: 1) */
  step?: number
}

export interface UseCounterReturn {
  count: number
  increment: () => void
  decrement: () => void
  reset: () => void
  set: (value: number) => void
}

/**
 * A custom hook for managing a counter with optional min/max bounds and step size.
 *
 * @example
 * ```tsx
 * const { count, increment, decrement, reset } = useCounter({
 *   initialValue: 0,
 *   min: 0,
 *   max: 100,
 *   step: 5,
 * })
 * ```
 */
export function useCounter(options: UseCounterOptions = {}): UseCounterReturn {
  const { initialValue = 0, min, max, step = 1 } = options

  const clamp = useCallback(
    (value: number): number => {
      let clamped = value
      if (min !== undefined) clamped = Math.max(min, clamped)
      if (max !== undefined) clamped = Math.min(max, clamped)
      return clamped
    },
    [min, max],
  )

  const [count, setCount] = useState(() => clamp(initialValue))

  const increment = useCallback(() => {
    setCount((prev) => clamp(prev + step))
  }, [clamp, step])

  const decrement = useCallback(() => {
    setCount((prev) => clamp(prev - step))
  }, [clamp, step])

  const reset = useCallback(() => {
    setCount(clamp(initialValue))
  }, [clamp, initialValue])

  const set = useCallback(
    (value: number) => {
      setCount(clamp(value))
    },
    [clamp],
  )

  return { count, increment, decrement, reset, set }
}
