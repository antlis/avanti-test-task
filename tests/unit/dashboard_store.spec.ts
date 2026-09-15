import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { flushPromises } from '@vue/test-utils'

import { fetchDashboard } from '@/services/dashboard_service'
import { useDashboardStore } from '@/stores/dashboard'
import type { DashboardData } from '@/types/dashboard'

vi.mock('@/services/dashboard_service', () => ({ fetchDashboard: vi.fn() }))

const payload: DashboardData = {
  balance: {
    label: 'Il tuo saldo',
    sublabel: 'Importo approvato',
    status: 'Pronto al prelievo',
    amount: 12000,
    currency: '€',
    product: 'Prestito personale',
    tan: 3.8,
    footnote: 'note'
  },
  process: [],
  checklist: [],
  assistant: { name: 'Deborah', message: 'ciao', avatar: '', unread: 2 }
}

describe('useDashboardStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.mocked(fetchDashboard).mockReset()
  })

  it('loads the payload and composes the balance caption', async () => {
    vi.mocked(fetchDashboard).mockResolvedValue(payload)
    const store = useDashboardStore()

    await store.load()

    expect(store.balance?.amount).toBe(12000)
    expect(store.balanceCaption).toBe('Prestito personale • TAN 3,8%')
    expect(store.assistant?.unread).toBe(2)
  })

  it('fetches only once across repeated load() calls', async () => {
    vi.mocked(fetchDashboard).mockResolvedValue(payload)
    const store = useDashboardStore()

    await store.load()
    await store.load()

    expect(fetchDashboard).toHaveBeenCalledTimes(1)
  })

  it('flags an error when the request fails', async () => {
    vi.mocked(fetchDashboard).mockRejectedValue(new Error('boom'))
    const store = useDashboardStore()

    await store.load()
    await flushPromises()

    expect(store.isError).toBe(true)
    expect(store.balance).toBeNull()
  })
})
