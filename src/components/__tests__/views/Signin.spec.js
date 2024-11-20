import { describe, it, expect, vi, beforeEach } from 'vitest'

import { mount } from '@vue/test-utils'
import SigninView from '@/views/SigninView.vue'
import { createPinia, setActivePinia } from 'pinia';
import { useStore } from '@/stores/counter';
import { createTestingPinia } from '@pinia/testing';
const pinia = createTestingPinia({
  createSpy: vi.fn,
  initialState: {
    store: {
      global: {
        loggedIn: false,
        user: null,
        company: null,
      },
    },
  }, // Allow real action implementations to run
});

// Use the mocked store

describe('Signin.vue', () => {
  beforeEach(() => {
    // Set up a fresh Pinia instance for each test
    setActivePinia(createPinia());
    useStore(pinia);
  });
  it('renders properly', () => {
    const wrapper = mount(SigninView, { props: { msg: 'Hello Vitest1' } })
    expect(wrapper.text()).toContain('Log into your account')
  })
})
