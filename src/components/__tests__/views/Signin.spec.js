import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import SigninView from '@/views/SigninView.vue'

describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(SigninView, { props: { msg: 'Hello Vitest1' } })
    expect(wrapper.text()).toContain('Log into your account')
  })
})
