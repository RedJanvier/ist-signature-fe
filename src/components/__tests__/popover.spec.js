import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import { Popover } from '../ui/popover'

describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(Popover, { slots: { default: 'Hello Vitest1' } })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})
