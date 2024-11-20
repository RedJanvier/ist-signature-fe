<script setup>
import { useRouter } from 'vue-router'
import { toTypedSchema } from '@vee-validate/zod'
import { authService } from '@/stores/services/index.js'
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import * as z from 'zod'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/toast'
import { cn } from '@/lib/utils'
import { useStore } from '@/stores/counter'

const store = useStore()
const { isLogin } = defineProps(['isLogin'])
const isLoading = ref(false)
const router = useRouter()

const schema = toTypedSchema(
  z
    .object({
      firstname: z
        .string({
          required_error: 'Required.',
        })
        .regex(/^[a-zA-Z]+[-'s]?[a-zA-Z ]+$/, {
          message: 'First name should contain only alphabets',
        })
        .min(2, {
          message: 'First name must be at least 2 characters.',
        })
        .max(30, {
          message: 'First name must not be longer than 30 characters.',
        }),
      lastname: z
        .string({
          required_error: 'Required.',
        })
        .regex(/^[a-zA-Z]+[-'s]?[a-zA-Z ]+$/, {
          message: 'Last name should contain only alphabets',
        })
        .min(2, {
          message: 'Last name must be at least 2 characters.',
        })
        .max(30, {
          message: 'Last name must not be longer than 30 characters.',
        }),
      email: z
        .string({
          required_error: 'Required.',
        })
        .min(10, {
          message: 'Email must be at least 10 characters.',
        })
        .max(30, {
          message: 'Email must not be longer than 30 characters.',
        }),
      password: z
        .string({
          required_error: 'Required.',
        })
        .min(8, {
          message: 'Password must be at least 8 characters.',
        })
        .max(30, {
          message: 'Password must not be longer than 30 characters.',
        }),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Passwords must match',
      path: ['confirmPassword'],
    }),
)

const loginSchema = toTypedSchema(
  z.object({
    email: z
      .string({
        required_error: 'Email Required',
      })
      .min(10, {
        message: 'Email must be at least 10 characters.',
      })
      .max(30, {
        message: 'Email must not be longer than 30 characters.',
      }),
    password: z.string({
      required_error: 'Password is Required',
    }),
  }),
)

async function onSubmit(values) {
  isLoading.value = true

  if (isLogin) await handleLogin(values)
  else await handleRegister(values)
}

async function handleLogin(values) {
  let res = null
  try {
    res = await authService.login(values)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.response.data.error ||
      error.toString()
    toast({ title: message, variant: 'destructive' })
    isLoading.value = false
    return
  }

  if (res.success) {
    toast({ title: res.message })
    localStorage.setItem('access_token', JSON.stringify(res.access_token))
    localStorage.setItem('refresh_token', JSON.stringify(res.refresh_token))
    localStorage.setItem('user', JSON.stringify(res.user))
    const company = localStorage.getItem('company')

    store.setUser(res.user)
    if (company) store.setCompany(JSON.parse(company))

    if (res.user.role === 'ADMIN') router.push('/users')
    if (res.user.role === 'USER') router.push('/signature')
  }
  isLoading.value = false
}

async function handleRegister(values) {
  let res = null
  try {
    res = (await authService.register(values)).data
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.response.data.error ||
      error.toString()
    toast({ title: message, variant: 'destructive' })
    isLoading.value = false
    return
  }

  if (res && res.success) {
    toast({ title: res.message })
    router.push('/signin')
  }
  isLoading.value = false
}
</script>

<template>
  <div :class="cn('grid gap-6', $attrs.class ?? '')">
    <Form :validation-schema="isLogin ? loginSchema : schema" class="space-y-8" @submit="onSubmit">
      <FormField v-if="!isLogin" v-slot="{ componentField }" name="firstname">
        <FormItem>
          <FormLabel>First name</FormLabel>
          <FormControl class="bg-white">
            <Input type="text" placeholder="John" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-if="!isLogin" v-slot="{ componentField }" name="lastname">
        <FormItem>
          <FormLabel>Last name</FormLabel>
          <FormControl class="bg-white">
            <Input type="text" placeholder="Doe" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="email">
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl class="bg-white">
            <Input type="email" placeholder="john.doe@ist.com" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="password">
        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl class="bg-white">
            <Input type="password" placeholder="********" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-if="!isLogin" v-slot="{ componentField }" name="confirmPassword">
        <FormItem>
          <FormLabel>Confirm Password</FormLabel>
          <FormControl class="bg-white">
            <Input type="password" placeholder="********" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <Button
        class="flex justify-center hover:bg-[var(--main-light-color)] bg-[var(--main-color)] py-2 px-4 rounded text-white w-full text-center"
        :disabled="isLoading"
        :isLoading="isLoading"
      >
        <Icon
          v-show="isLoading"
          icon="mdi:circle-half"
          class="mr-4 animate-spin"
          width="20"
          height="20"
        />
        {{ isLogin ? 'Login' : 'Register Now' }}
      </Button>
    </Form>
  </div>
</template>
