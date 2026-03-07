import { act, renderHook } from '@testing-library/react'
import { useCounter } from './useCounter'

describe('useCounter', () => {
  it('starts with default value of 0', () => {
    const { result } = renderHook(() => useCounter())
    expect(result.current.count).toBe(0)
  })

  it('starts with provided initial value', () => {
    const { result } = renderHook(() => useCounter({ initialValue: 10 }))
    expect(result.current.count).toBe(10)
  })

  it('increments by 1 by default', () => {
    const { result } = renderHook(() => useCounter())

    act(() => result.current.increment())
    expect(result.current.count).toBe(1)

    act(() => result.current.increment())
    expect(result.current.count).toBe(2)
  })

  it('decrements by 1 by default', () => {
    const { result } = renderHook(() => useCounter({ initialValue: 5 }))

    act(() => result.current.decrement())
    expect(result.current.count).toBe(4)
  })

  it('increments/decrements by custom step', () => {
    const { result } = renderHook(() => useCounter({ initialValue: 0, step: 5 }))

    act(() => result.current.increment())
    expect(result.current.count).toBe(5)

    act(() => result.current.decrement())
    expect(result.current.count).toBe(0)
  })

  it('respects max boundary', () => {
    const { result } = renderHook(() => useCounter({ initialValue: 9, max: 10 }))

    act(() => result.current.increment())
    expect(result.current.count).toBe(10)

    act(() => result.current.increment())
    expect(result.current.count).toBe(10) // clamped
  })

  it('respects min boundary', () => {
    const { result } = renderHook(() => useCounter({ initialValue: 1, min: 0 }))

    act(() => result.current.decrement())
    expect(result.current.count).toBe(0)

    act(() => result.current.decrement())
    expect(result.current.count).toBe(0) // clamped
  })

  it('clamps initial value to bounds', () => {
    const { result } = renderHook(() => useCounter({ initialValue: 100, max: 10 }))
    expect(result.current.count).toBe(10)
  })

  it('resets to initial value', () => {
    const { result } = renderHook(() => useCounter({ initialValue: 5 }))

    act(() => result.current.increment())
    act(() => result.current.increment())
    expect(result.current.count).toBe(7)

    act(() => result.current.reset())
    expect(result.current.count).toBe(5)
  })

  it('sets to an arbitrary value', () => {
    const { result } = renderHook(() => useCounter())

    act(() => result.current.set(42))
    expect(result.current.count).toBe(42)
  })

  it('clamps set value to bounds', () => {
    const { result } = renderHook(() => useCounter({ min: 0, max: 10 }))

    act(() => result.current.set(999))
    expect(result.current.count).toBe(10)

    act(() => result.current.set(-999))
    expect(result.current.count).toBe(0)
  })
})
