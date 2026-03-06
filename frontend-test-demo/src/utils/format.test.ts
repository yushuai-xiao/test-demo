import { describe, it, expect } from 'vitest'
import { formatPrice } from './format'

describe('formatPrice', () => {

  it('should format price correctly', () => {
    const result = formatPrice(10)

    expect(result).toBe('¥10.00')
  })

})