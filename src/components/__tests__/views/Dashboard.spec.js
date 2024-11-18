import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import DashboardView from '@/views/DashboardView.vue'

describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(DashboardView)
    expect(wrapper.text()).toContain('Dashboard')
  })
})
