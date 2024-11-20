<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import Toaster from '@/components/ui/toast/Toaster.vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import GeneralLayout from '@/layouts/GeneralLayout.vue'
import { useStore } from '@/stores/counter'

const route = useRoute()
const store = useStore()

const layout = computed(() => (route.meta.layout === 'dashboard' ? DashboardLayout : GeneralLayout))

const user = localStorage.getItem('user')
if (user) store.setUser(JSON.parse(user))

// const company = localStorage.getItem('company')
// if (company) store.setCompany(JSON.parse(company))
</script>

<template>
  <component :is="layout">
    <Toaster />
    <router-view />
  </component>
</template>
