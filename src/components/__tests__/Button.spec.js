import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import { Button } from '@/components/ui/button'

describe('Button', () => {
  it('renders properly', () => {
    const wrapper = mount(Button, {
      slots: {
        default: ['Hello']
      }
    })
    expect(wrapper.text()).toContain('Hello')
  })
})
