import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { flushPromises } from '@vue/test-utils'

import { loadDashboard } from '@/services/dashboard_service'
import { useDashboardStore } from '@/stores/dashboard'
import type { DashboardData } from '@/types/dashboard'

vi.mock('@/services/dashboard_service', () => ({ loadDashboard: vi.fn() }))

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
  checklist: {
    activeStep: 3,
    steps: [
      { icon: 'chart', title: 'Simulazione completata' },
      { icon: 'shield', title: 'Credito approvato' },
      { icon: 'profile', title: 'Account creato' },
      { icon: 'upload', title: 'Documenti caricati' },
      { icon: 'edit', title: 'Contratto firmato' }
    ]
  },
  assistant: { name: 'Deborah', message: 'ciao', avatar: '', unread: 2 }
}

describe('useDashboardStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.mocked(loadDashboard).mockReset()
  })

  it('loads the payload and exposes balance fields', async () => {
    vi.mocked(loadDashboard).mockResolvedValue(payload)
    const store = useDashboardStore()

    await store.load()

    expect(store.balance?.amount).toBe(12000)
    expect(store.balance?.product).toBe('Prestito personale')
    expect(store.balance?.tan).toBe(3.8)
    expect(store.assistant?.unread).toBe(2)
  })

  it('derives checklist states from the active step', async () => {
    vi.mocked(loadDashboard).mockResolvedValue(payload)
    const store = useDashboardStore()

    await store.load()
    await flushPromises()

    expect(store.activeStep).toBe(3)
    expect(store.checklist.map((i) => i.state)).toEqual([
      'done',
      'done',
      'done',
      'active',
      'pending'
    ])
    // Subtitle follows the derived state.
    expect(store.checklist[3].subtitle).toBe('Step attuale • Azione richiesta')
  })

  it('setActiveStep re-derives states and clamps to range', async () => {
    vi.mocked(loadDashboard).mockResolvedValue(payload)
    const store = useDashboardStore()
    await store.load()
    await flushPromises()

    store.setActiveStep(1)
    expect(store.checklist.map((i) => i.state)).toEqual([
      'done',
      'active',
      'pending',
      'pending',
      'pending'
    ])

    store.setActiveStep(99)
    expect(store.activeStep).toBe(4)
    store.setActiveStep(-5)
    expect(store.activeStep).toBe(0)
  })

  it('fetches only once across repeated load() calls', async () => {
    vi.mocked(loadDashboard).mockResolvedValue(payload)
    const store = useDashboardStore()

    await store.load()
    await store.load()

    expect(loadDashboard).toHaveBeenCalledTimes(1)
  })

  it('flags an error when the request fails', async () => {
    vi.mocked(loadDashboard).mockRejectedValue(new Error('boom'))
    const store = useDashboardStore()

    await store.load()
    await flushPromises()

    expect(store.isError).toBe(true)
    expect(store.balance).toBeNull()
  })
})
