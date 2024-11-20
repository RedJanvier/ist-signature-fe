import { describe, it, expect, vi, beforeEach } from 'vitest'

import { mount } from '@vue/test-utils'
import SettingsView from '@/views/SettingsView.vue'
import { createPinia, setActivePinia } from 'pinia';
import { useStore } from '@/stores/counter';
import { createTestingPinia } from '@pinia/testing';
const pinia = createTestingPinia({
  createSpy: vi.fn,
  initialState: {
    store: {
      global: {
        loggedIn: false,
        user: {
          role: "ADMIM"
        },
        company: null,
      },
    },
  }, // Allow real action implementations to run
});

describe('Settings.vue', () => {
  beforeEach(() => {
    // Set up a fresh Pinia instance for each test
    setActivePinia(createPinia());
    useStore(pinia);
  });
  it('renders properly', () => {
    const wrapper = mount(SettingsView)
    expect(wrapper.text()).toContain('Settings')
  })
})
