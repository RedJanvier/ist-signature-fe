import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import AppNav from '../AppNav.vue'

describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(AppNav)
    wrapper.find('.user-image').trigger('click')
    expect(wrapper.text()).toContain('Signatures')
  })
})
