<script setup>
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import UserAuthForm from '@/components/AuthForm.vue'
</script>

<template>
  <div
    class="container relative h-[100vh] flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0"
  >
    <router-link
      to="/signin"
      :class="
        cn(buttonVariants({ variant: 'ghost' }), 'absolute right-4 top-4 md:right-8 md:top-8')
      "
    >
      Login
    </router-link>
    <div class="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
      <div class="absolute inset-0 bg-zinc-900" />
      <div class="relative z-20 flex items-center text-lg font-medium">
        <img src="@/assets/logo-white.png" alt="company-logo" width="100px" />
      </div>
    </div>
    <div class="lg:p-8">
      <div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div class="flex flex-col space-y-2 text-center">
          <h1 class="text-2xl font-semibold tracking-tight">Create an account</h1>
          <p class="text-sm text-muted-foreground">Enter your email below to create your account</p>
        </div>
        <UserAuthForm />
      </div>
    </div>
  </div>
</template>
