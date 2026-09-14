import { describe, it, expect } from 'vitest'
import { mount, RouterLinkStub } from '@vue/test-utils'

import AvantiDashboardView from '@/views/avanti_dashboard_view.vue'

// Smoke test demonstrating the component unit-test pattern (Vue Test Utils).
describe('AvantiDashboardView', () => {
  it('mounts and renders the shell', () => {
    const wrapper = mount(AvantiDashboardView, {
      global: { stubs: { RouterLink: RouterLinkStub } }
    })
    expect(wrapper.text()).toContain('Avanti')
  })
})
