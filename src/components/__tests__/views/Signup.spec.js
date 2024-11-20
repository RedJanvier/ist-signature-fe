import { describe, it, expect, beforeEach, vi } from 'vitest'

import { mount } from '@vue/test-utils'
import SignupView from '@/views/SignupView.vue'
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

describe('Signup.vue', () => {
  beforeEach(() => {
    // Set up a fresh Pinia instance for each test
    setActivePinia(createPinia());
    useStore(pinia);
  });
  it('renders properly', () => {
    const wrapper = mount(SignupView, { props: { msg: 'Hello Vitest1' } })
    expect(wrapper.text()).toContain('Create an account')
  })
})
