import { createTestingPinia } from '@pinia/testing';
import { createPinia, setActivePinia } from 'pinia';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { useRoute } from 'vue-router';
import App from '@/App.vue';
import { useStore } from '@/stores/counter';

vi.mock('vue-router', () => ({
  useRoute: vi.fn(),
}));

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
  },
  stubActions: false, // Allow real action implementations to run
});

// Use the mocked store

describe('App.vue', () => {
  beforeEach(() => {
    // Set up a fresh Pinia instance for each test
    setActivePinia(createPinia());
    useStore(pinia);
  });

  // it('renders the app with dashboard layout with mocked router-view and meta', () => {
  //   useRoute.mockReturnValue({
  //     meta: {
  //       layout: 'dashboard', // Mocked value
  //     },
  //   });

  //   // Mount the App component
  //   const wrapper = mount(App, {
  //     global: {
  //       stubs: {
  //         'router-view': {
  //           template: '<div>Mocked Router View Content</div>',
  //         },
  //       },
  //     },
  //   });

  //   // Check if the mocked layout is applied correctly
  //   expect(wrapper.html()).toContain('Mocked Router View Content');
  // });

  it('renders the app with general layout with mocked router-view and meta', () => {
    useRoute.mockReturnValue({
      meta: {
        layout: 'general', // Mocked value
      },
    });

    // Mount the App component
    const wrapper = mount(App, {
      global: {
        stubs: {
          'router-view': {
            template: '<div>Mocked Router View Content</div>',
          },
        },
      },
    });

    // Check if the mocked layout is applied correctly
    expect(wrapper.html()).toContain('Mocked Router View Content');
  });
});
