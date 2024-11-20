<script setup>
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/toast'
import { cn } from '@/lib/utils'
import { useStore } from '@/stores/counter'
import { userService } from '@/stores/services'

import { toTypedSchema } from '@vee-validate/zod'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import * as z from 'zod'

const isLoading = ref(false)
const store = useStore()
const router = useRouter()
const { userId } = defineProps(['userId'])
const { company, user: storeuser } = store.global
const users = computed(() => store.global.users)
const user = users.value.find((usr) => usr.id === userId)

const isAdmin = storeuser.role !== 'ADMIN'
const accountFormSchema = toTypedSchema(
  z.object({
    position: z
      .string({
        required_error: 'Required.',
      })
      .min(2, {
        message: 'Position must be at least 2 characters.',
      })
      .max(100, {
        message: 'Position must not be longer than 100 characters.',
      })
      .default(user ? user.position : ''),
  }),
)

const adminFormSchema = toTypedSchema(
  z.object({
    name: z
      .string({
        required_error: 'Required.',
      })
      .regex(/^[a-zA-Z]+[-'s]?[a-zA-Z ]+$/, {
        message: 'Name should contain only alphabets',
      })
      .min(2, {
        message: 'Name must be at least 2 characters.',
      })
      .max(30, {
        message: 'Name must not be longer than 30 characters.',
      })
      .default(!company ? '' : company.name),
    address: z
      .string()
      .min(2, {
        message: 'Address must be at least 2 characters.',
      })
      .max(50, {
        message: 'Address must not be longer than 50 characters.',
      })
      .default(!company ? '' : company.address),
    mission: z
      .string()
      .min(2, {
        message: 'Mission must be at least 2 characters.',
      })
      .max(300, {
        message: 'Mission must not be longer than 300 characters.',
      })
      .default(!company ? '' : company.mission),
    website: z
      .string()
      .min(10, {
        message: 'Website must be at least 10 characters.',
      })
      .max(30, {
        message: 'Website must not be longer than 30 characters.',
      })
      .regex(/^(www.)[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/, {
        message: 'Website should be a valid site (starting with www.*****)',
      })
      .default(!company ? '' : company.website),
  }),
)

async function onSubmit(values) {
  isLoading.value = true
  handlePhone(values)
}
async function handlePhone(values) {
  let res = null
  try {
    res = await userService.updatePosition(userId, values)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.response.data.error ||
      error.toString()
    toast({ title: message, variant: 'destructive' })
    isLoading.value = false
    return
  }

  if (res.status === 200) {
    store.setUsers(users.value.map((usr) => (usr.id === userId ? { ...usr, ...values } : usr)))
    router.push('/')
    toast({ title: 'Updated the user successfully!' })
  }
  isLoading.value = false
}
</script>

<template>
  <div :class="cn('grid gap-6 bg-white relative rounded-lg p-4', $attrs.class ?? '')">
    <p class="font-bold">
      {{ user && user.firstname }} {{ user && user.lastname }}
      <span class="font-normal italic text-gray-600">({{ user && user.email }})</span>
    </p>
    <span
      :class="
        cn(
          'h-[15px] w-[15px] rounded-full absolute z-10 top-4 right-4',
          user && user.enabled ? 'bg-green-600' : 'bg-red-600',
        )
      "
    ></span>
    <Form
      :validation-schema="isAdmin ? adminFormSchema : accountFormSchema"
      class="space-y-8"
      @submit="onSubmit"
    >
      <FormField v-if="!isAdmin" v-slot="{ componentField }" name="position">
        <FormItem>
          <FormLabel>Position</FormLabel>
          <FormControl class="bg-white">
            <Input
              type="tel"
              placeholder="General Employee"
              :defaultValue="user && user.position"
              v-bind="componentField"
            />
          </FormControl>
          <FormDescription>
            This is the position that will be included in his email signature.
          </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>

      <div class="flex justify-start">
        <Button type="submit"> Update </Button>
      </div>
    </Form>
  </div>
</template>
