import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import AvantiAvatar from '@/components/ui/avanti_avatar.vue'

describe('AvantiAvatar', () => {
  it('renders the image when src is provided', () => {
    const wrapper = mount(AvantiAvatar, { props: { src: '/a.png', alt: 'Marco Rossi' } })
    expect(wrapper.find('img').exists()).toBe(true)
  })

  it('falls back to initials when no src is given', () => {
    const wrapper = mount(AvantiAvatar, { props: { alt: 'Marco Rossi' } })
    expect(wrapper.find('img').exists()).toBe(false)
    expect(wrapper.text()).toBe('MR')
  })

  it('falls back to initials when the image fails to load', async () => {
    const wrapper = mount(AvantiAvatar, { props: { src: '/broken.png', alt: 'Marco Rossi' } })
    await wrapper.find('img').trigger('error')
    expect(wrapper.find('img').exists()).toBe(false)
    expect(wrapper.text()).toBe('MR')
  })
})
