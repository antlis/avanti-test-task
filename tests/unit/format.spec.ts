import { describe, it, expect } from 'vitest'

import { formatMoney, formatPercent } from '@/utils/format'

describe('formatMoney', () => {
  it('groups thousands with a space and prefixes the currency', () => {
    // Normalise the grouping separator (fr-FR uses a narrow no-break space).
    expect(formatMoney(12000).replace(/\s/g, ' ')).toBe('€ 12 000')
  })

  it('honours a custom currency symbol', () => {
    expect(formatMoney(500, '$').replace(/\s/g, ' ')).toBe('$ 500')
  })
})

describe('formatPercent', () => {
  it('formats with an Italian decimal comma and one fraction digit', () => {
    expect(formatPercent(3.8)).toBe('3,8%')
    expect(formatPercent(4)).toBe('4,0%')
  })
})
