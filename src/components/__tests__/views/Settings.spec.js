import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import SettingsView from '@/views/SettingsView.vue'

describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(SettingsView)
    expect(wrapper.text()).toContain('Settings')
  })
})
