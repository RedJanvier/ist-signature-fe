<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import Toaster from '@/components/ui/toast/Toaster.vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import GeneralLayout from '@/layouts/GeneralLayout.vue'

const route = useRoute()

const layout = computed(() => (route.meta.layout === 'dashboard' ? DashboardLayout : GeneralLayout))
</script>

<template>
  <component :is="layout">
    <Toaster />
    <router-view />
  </component>
</template>
