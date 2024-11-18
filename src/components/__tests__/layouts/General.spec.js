import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import GeneralLayout from '@/layouts/GeneralLayout.vue'

describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(GeneralLayout, { slots: { default: 'Hello Vitest1' } })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})
