import { describe, it, expect } from 'vitest'
import { useCounter } from './useCounter'

describe('useCounter', () => {
  it('increment should increase count', () => {
    const { count, incremenet } = useCounter()
    incremenet()
    expect(count.value).toBe(1)
  })
})