<script setup>
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'

import { cn } from '../lib/utils'
import { ref } from 'vue'

const { isLogin } = defineProps(['isLogin'])
const isLoading = ref(false)
async function onSubmit(event) {
  event.preventDefault()
  isLoading.value = true

  setTimeout(() => {
    isLoading.value = false
  }, 3000)
}
</script>

<template>
  <div :class="cn('grid gap-6', $attrs.class ?? '')">
    <form @submit="onSubmit">
      <div class="grid gap-2">
        <div v-if="!isLogin" class="grid gap-1">
          <Label class="sr-only" for="firstname"> First name </Label>
          <Input
            id="firstname"
            placeholder="John"
            type="text"
            auto-capitalize="none"
            auto-complete="firstname"
            auto-correct="off"
            :disabled="isLoading"
          />
        </div>
        <div v-if="!isLogin" class="grid gap-1">
          <Label class="sr-only" for="lastname"> Last name </Label>
          <Input
            id="lastname"
            placeholder="Doe"
            type="text"
            auto-capitalize="none"
            auto-complete="lastname"
            auto-correct="off"
            :disabled="isLoading"
          />
        </div>
        <div class="grid gap-1">
          <Label class="sr-only" for="email"> Email </Label>
          <Input
            id="email"
            placeholder="name@example.com"
            type="email"
            auto-capitalize="none"
            auto-complete="email"
            auto-correct="off"
            :disabled="isLoading"
          />
        </div>
        <div class="grid gap-1">
          <Label class="sr-only" for="password"> Password </Label>
          <Input
            id="password"
            placeholder="********"
            type="password"
            auto-capitalize="none"
            auto-complete="password"
            auto-correct="off"
            :disabled="isLoading"
          />
        </div>
        <Button :disabled="isLoading">
          <!-- <LucideSpinner v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" /> -->
          Register Now
        </Button>
      </div>
    </form>
  </div>
</template>
