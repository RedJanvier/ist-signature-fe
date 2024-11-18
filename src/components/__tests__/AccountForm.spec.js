import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import AccountForm from '../AccountForm.vue'

describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(AccountForm)
    expect(wrapper.text()).toContain('This is the phone number that will be included in your email signature.')
  })
  it('shows errors', async () => {
    const wrapper = mount(AccountForm)
    expect(wrapper.text()).not.toContain('Required.')
    const btn = wrapper.find('input[name="name"]')
    const btn2 = wrapper.find('input[name="address"]')
    await btn.trigger('click')
    await btn2.trigger('click')
    console.log(wrapper.text());

    expect(btn.exists()).toBe(true)
  })
})
