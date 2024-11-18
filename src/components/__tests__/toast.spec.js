import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import { toast, Toaster } from '../ui/toast'

describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(Toaster)
    toast({ title: 'Hello world!' })
    expect(wrapper.find('div').exists()).toBe(true)
  })
})
