import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import SignupView from '@/views/SignupView.vue'

describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(SignupView, { props: { msg: 'Hello Vitest1' } })
    expect(wrapper.text()).toContain('Create an account')
  })
})
