<script setup>
import AccountForm from '@/components/AccountForm.vue'
</script>

<template>
  <div class="space-y-6 p-10 pb-16">
    <div class="space-y-0.5">
      <h2 class="text-2xl font-bold tracking-tight">Settings</h2>
      <p class="text-muted-foreground">
        Manage your account settings and set phone of preferences.
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
