import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import DashboardLayout from '@/layouts/DashboardLayout.vue'

describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(DashboardLayout, { slots: { default: 'Hello Vitest1' } })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})
