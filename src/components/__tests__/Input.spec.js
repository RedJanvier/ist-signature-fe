import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import { Input } from '@/components/ui/input'

describe('Input', () => {
  it('renders properly', () => {
    const wrapper = mount(Input, { props: { class: 'Hello' } })
    expect(wrapper.find('input').exists()).toBe(true)
    expect(wrapper.find('input').classes()).toContain("Hello")
  })

  it('emits update:modelValue with the correct value', async () => {
    // Mount the component with an initial modelValue
    const wrapper = mount(Input, {
      props: {
        modelValue: 'initial value',
      },
    });

    // Find the input element
    const input = wrapper.find('input');

    // Simulate user typing a new value
    await input.setValue('new value');

    // Check if the correct event was emitted with the expected value
    expect(wrapper.emitted('update:modelValue')).toBeTruthy(); // Event was emitted
    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['new value']); // Event has the right payload
  });
})
