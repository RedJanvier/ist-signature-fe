import { createContext } from 'radix-vue'
import { ref, computed } from 'vue';

export const SIDEBAR_COOKIE_NAME = 'sidebar:state'
export const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
export const SIDEBAR_WIDTH = '16rem'
export const SIDEBAR_WIDTH_MOBILE = '18rem'
export const SIDEBAR_WIDTH_ICON = '3rem'
export const SIDEBAR_KEYBOARD_SHORTCUT = 'b'


export const [useSidebar, provideSidebarContext] = createContext('Sidebar');

// Example of how to provide the context
export function setupSidebarContext() {
  const open = ref(false);
  const isMobile = ref(false);
  const openMobile = ref(false);

  const state = computed(() => (open.value ? 'expanded' : 'collapsed'));

  const setOpen = (value) => {
    open.value = value;
  };

  const setOpenMobile = (value) => {
    openMobile.value = value;
  };

  const toggleSidebar = () => {
    open.value = !open.value;
  };

  provideSidebarContext({
    state,
    open,
    setOpen,
    isMobile,
    openMobile,
    setOpenMobile,
    toggleSidebar,
  });
}
