import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import AvantiButton from '@/components/ui/avanti_button.vue'

describe('AvantiButton', () => {
  it('renders the default slot and solid/md variant classes', () => {
    const wrapper = mount(AvantiButton, { slots: { default: 'Conferma pagamento' } })
    expect(wrapper.text()).toContain('Conferma pagamento')
    expect(wrapper.classes()).toContain('btn--solid')
    expect(wrapper.classes()).toContain('btn--md')
  })

  it('applies variant, size and modifier classes from props', () => {
    const wrapper = mount(AvantiButton, {
      props: { variant: 'gradient', size: 'compact', block: true, uppercase: true }
    })
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(['btn--gradient', 'btn--compact', 'btn--block', 'btn--uppercase'])
    )
  })

  it('reflects the disabled prop on the native button', () => {
    const wrapper = mount(AvantiButton, { props: { disabled: true } })
    expect(wrapper.find('button').element.disabled).toBe(true)
  })

  it('renders leading and trailing slots', () => {
    const wrapper = mount(AvantiButton, {
      slots: { leading: '<i class="lead" />', default: 'Label', trailing: '<i class="trail" />' }
    })
    expect(wrapper.find('.lead').exists()).toBe(true)
    expect(wrapper.find('.trail').exists()).toBe(true)
  })
})
