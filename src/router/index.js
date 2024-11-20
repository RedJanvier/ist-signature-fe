import { createRouter, createWebHistory } from 'vue-router'
import SignupView from '@/views/SignupView.vue'
import DashboardView from '@/views/DashboardView.vue'
import SettingsView from '@/views/SettingsView.vue'
import SignatureView from '@/views/SignatureView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'signup',
      component: SignupView,
      meta: { layout: 'general' },
    },
    {
      path: '/signup',
      component: SignupView,
      meta: { layout: 'general' },
    },
    {
      path: '/signin',
      component: () => import('../views/SigninView.vue'),
      meta: { layout: 'general' },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { layout: 'dashboard' },
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsView,
      meta: { layout: 'dashboard' },
    },
    {
      path: '/signature',
      name: 'signature',
      component: SignatureView,
      meta: { layout: 'dashboard' },
    },
    {
      path: '/users',
      name: 'users',
      component: SignatureView,
      meta: { layout: 'dashboard' },
    },
  ],
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/signin', '/signup', '/'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    next('/signin');
  }
  else if (loggedIn && publicPages.includes(to.path)) {
    const user = JSON.parse(loggedIn);
    if (user.role === 'ADMIN') router.push('/users')
    if (user.role === 'USER') router.push('/signature')
  }
  else {
    next();
  }
});

export default router
