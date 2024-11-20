<script setup>
import AccountForm from '@/components/AccountForm.vue'
import { useStore } from '@/stores/counter'

const store = useStore()
const { user } = store.global
const isAdmin = user.role === 'ADMIN'
</script>

<template>
  <div class="space-y-6 p-10 pb-16">
    <div class="space-y-0.5">
      <h2 class="text-2xl font-bold tracking-tight">Settings</h2>
      <p class="text-muted-foreground">
        {{
          !isAdmin
            ? 'Manage your account settings and set phone of preferences.'
            : 'Manage your company info which will be used on all signatures.'
        }}
      </p>
    </div>
    <div class="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
      <div class="flex-1 lg:max-w-2xl">
        <div class="space-y-6">
          <AccountForm />
        </div>
      </div>
    </div>
  </div>
</template>
