import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import { Label } from '@/components/ui/label'

describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(Label, { slots: { default: 'Hello Vitest1' } })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})
