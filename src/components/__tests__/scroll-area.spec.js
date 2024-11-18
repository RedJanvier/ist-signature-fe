import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import { ScrollArea } from '../ui/scroll-area'

describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(ScrollArea, { slots: { default: 'Hello Vitest1' } })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})
