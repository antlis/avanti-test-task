import { describe, it, expect, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { createRouter, createMemoryHistory } from 'vue-router'

vi.mock('@/services/profile_service', () => ({
  loadProfile: vi.fn().mockResolvedValue({
    profile: { name: 'Marco Rossi', email: 'm@r.it', avatar: '' },
    notifications: { assistenza: 4, bell: 4 }
  })
}))
vi.mock('@/services/dashboard_service', () => ({
  loadDashboard: vi.fn().mockResolvedValue({
    balance: {
      label: 'Il tuo saldo',
      sublabel: '',
      status: '',
      amount: 12000,
      currency: '€',
      product: 'Prestito personale',
      tan: 3.8,
      footnote: ''
    },
    process: [],
    checklist: [],
    assistant: { name: 'Deborah', message: '', avatar: '', unread: 2 }
  })
}))

import AvantiDashboardView from '@/views/avanti_dashboard_view.vue'

const stub = { template: '<div />' }
const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/', component: stub },
    { path: '/documenti', component: stub },
    { path: '/profilo', component: stub }
  ]
})

describe('AvantiDashboardView', () => {
  it('renders the balance and profile once the stores resolve', async () => {
    await router.push('/')
    await router.isReady()

    const wrapper = mount(AvantiDashboardView, {
      global: { plugins: [createPinia(), router] }
    })

    await flushPromises()

    const text = wrapper.text()
    expect(text).toContain('Avanti')
    expect(text).toContain('Marco Rossi')
    expect(text.replace(/\s/g, ' ')).toContain('€ 12 000')
  })
})
