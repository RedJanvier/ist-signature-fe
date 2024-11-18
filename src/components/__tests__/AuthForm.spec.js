import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import AuthForm from '../AuthForm.vue'

describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(AuthForm, { props: { isLogin: false } })
    wrapper.find('input[id="firstname"]').setValue('John')
    wrapper.find('input[id="lastname"]').setValue('Doe')
    wrapper.find('input[id="email"]').setValue('jdoe@gmail.com')
    wrapper.find('input[id="password"]').setValue('password')
    // wrapper.find('button').trigger('click')
    expect(wrapper.text()).toContain('First name')
  })
})
