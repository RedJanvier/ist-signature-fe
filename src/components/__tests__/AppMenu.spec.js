import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import AppMenu from '../AppMenu.vue'

describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(AppMenu)
    expect(wrapper.text()).toContain('Overview')
    expect(wrapper.text()).toContain('Danger')
  })
})
