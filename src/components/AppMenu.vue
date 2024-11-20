<script setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/stores/counter'
import { authService } from '@/stores/services'

let settingsLinks = ref([
  {
    id: 1,
    text: 'Logout',
    link: '/',
    icon: 'mdi:logout',
    danger: true,
  },
])

let overviewLinks = [
  // {
  //   id: 1,
  //   text: 'Dashboard',
  //   link: '/dashboard',
  //   icon: 'mdi:view-dashboard',
  // },
  {
    id: 2,
    text: 'Signature',
    link: '/signature',
    icon: 'mdi:signature-freehand',
    role: 'USER',
  },
  {
    id: 5,
    text: 'Users',
    link: '/users',
    icon: 'mdi:account-group-outline',
    role: 'ADMIN',
  },
  {
    id: 3,
    text: 'Settings',
    link: '/settings',
    icon: 'mdi:settings-outline',
  },
]
const router = useRouter()
const store = useStore()
const user = store.global.user
overviewLinks = overviewLinks.filter((link) => !link.role || (link.role && link.role === user.role))

function handleLogout() {
  authService.logout()
  store.setUser(null)
  store.setCompany(null)
  router.push('/signin')
}
</script>
<template>
  <aside
    class="flex flex-col bg-white p-6 box-border md:static md:w-auto md:h-screen w-full fixed bottom-0 z-10 left-0"
  >
    <router-link to="/" class="text-4xl md:flex gap-4 items-center mb-6 hidden">
      <img src="@/assets/logo-blue.jpeg" alt="" width="100px" />
      <h1>Signatures</h1>
    </router-link>
    <div class="md:mt-10 flex-1">
      <p class="text-xs text-gray-600 pb-2 min-w-60 uppercase hidden md:block">Overview</p>
      <ul class="flex justify-around md:justify-start md:grid gap-6">
        <li :key="item.id" v-for="item in overviewLinks">
          <router-link :to="item.link" class="flex gap-2 items-center">
            <Icon :icon="item.icon" width="28" height="28" />
            <span :class="`text-black text-lg md:block`">{{ item.text }}</span>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="hidden md:block">
      <p class="text-xs text-gray-600 pb-2 min-w-40 uppercase">Danger</p>
      <ul class="grid gap-4">
        <li :key="item.id" v-for="item in settingsLinks">
          <button
            @click="handleLogout"
            class="flex gap-2 items-center"
            :style="item.danger ? 'color: red;' : ''"
          >
            <Icon :icon="item.icon" width="28" height="28" />
            <span class="text-lg">{{ item.text }}</span>
          </button>
        </li>
      </ul>
    </div>
  </aside>
</template>

<style scoped>
.router-link-active svg {
  color: var(--main-color);
}
@media screen and (max-width: 768px) {
  :not(.router-link-active) > span {
    display: none;
  }
}
</style>
