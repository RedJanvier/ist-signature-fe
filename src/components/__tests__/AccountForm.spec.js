import { describe, it, expect, beforeEach, vi } from 'vitest'

import { mount } from '@vue/test-utils'
import AccountForm from '../AccountForm.vue'
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
          firstname: 'Denis',
          lastname: 'Niwemugisha',
          phone: '+25078********',
          position: 'General Employee',
        },
        company: {
          name: 'IST Africa',
          address: 'Kigali · KG 28 Ave, 57 · Kigali',
          mission: 'Empowering learning, every day and everywhere.',
          website: 'www.ist.com',
        },
      },
    },
  }, // Allow real action implementations to run
});

// Use the mocked store

describe('AccountForm.vue', () => {
  beforeEach(() => {
    // Set up a fresh Pinia instance for each test
    setActivePinia(createPinia());
    useStore(pinia);
  });
  it('renders properly', () => {
    const wrapper = mount(AccountForm)
    expect(wrapper.text()).toContain('This is the phone number that will be included in your email signature.')
  })
  // it('shows errors', async () => {
  //   const wrapper = mount(AccountForm)
  //   expect(wrapper.text()).not.toContain('Required.')
  //   const btn = wrapper.find('input[name="name"]')
  //   const btn2 = wrapper.find('input[name="address"]')
  //   await btn.trigger('click')
  //   await btn2.trigger('click')

  //   expect(btn.exists()).toBe(true)
  // })
})
