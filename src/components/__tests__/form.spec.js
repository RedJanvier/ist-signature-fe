import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import { Form } from '../ui/form'

describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(Form, { slots: { default: 'Hello Vitest1' } })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})
