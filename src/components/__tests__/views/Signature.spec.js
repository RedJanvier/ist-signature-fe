import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import SignatureView from '@/views/SignatureView.vue'

describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(SignatureView, { props: { msg: 'Hello Vitest1' } })
    // wrapper.find('button[type="button"]').trigger('click')
    expect(wrapper.text()).toContain('See the preview of your signature and copy it to')
  })
})
