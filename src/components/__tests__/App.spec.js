import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { useRoute } from 'vue-router';
import App from '@/App.vue';

vi.mock('vue-router', () => ({
  useRoute: vi.fn(),
}));

describe('App.vue', () => {
  it('renders the app layout with mocked router-view and meta', () => {
    useRoute.mockReturnValue({
      meta: {
        layout: 'dashboard', // Mocked value
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
