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
import { useStore } from '@/stores/counter'
import { companyService, userService } from '@/stores/services'

import { toTypedSchema } from '@vee-validate/zod'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import * as z from 'zod'

const isLoading = ref(false)
const store = useStore()
const router = useRouter()
const { user, company } = store.global
const isAdmin = user.role === 'ADMIN'
const accountFormSchema = toTypedSchema(
  z.object({
    phone: z
      .string({
        required_error: 'Required.',
      })
      .min(10, {
        message: 'Phone must be at least 10 characters.',
      })
      .max(13, {
        message: 'Phone must not be longer than 13 characters.',
      }),
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
  if (!isAdmin) handlePhone(values)
  else handleCompany(values)
}
async function handlePhone(values) {
  let res = null
  try {
    res = await userService.updatePhone(values)
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
    router.push('/')
    const newUser = { ...user, ...values }
    store.setUser(newUser)
    localStorage.setItem('user', JSON.stringify(newUser))
    toast({ title: 'Updated your phone successfully!' })
  }
  isLoading.value = false
}
async function handleCompany(values) {
  let res = null
  try {
    res = await companyService.update(values)
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
    router.push('/')
    const newCompany = { ...company, ...values }
    store.setCompany(newCompany)
    localStorage.setItem('company', JSON.stringify(newCompany))
    toast({ title: 'Updated company info successfully!' })
  }
  isLoading.value = false
}
</script>

<template>
  <Form
    :validation-schema="isAdmin ? adminFormSchema : accountFormSchema"
    class="space-y-8"
    @submit="onSubmit"
  >
    <FormField v-if="!isAdmin" v-slot="{ componentField }" name="phone">
      <FormItem>
        <FormLabel>Phone Number</FormLabel>
        <FormControl class="bg-white">
          <Input
            type="tel"
            placeholder="+25078*******"
            :defaultValue="user && user.phone"
            v-bind="componentField"
          />
        </FormControl>
        <FormDescription>
          This is the phone number that will be included in your email signature.
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-if="isAdmin" v-slot="{ componentField }" name="name">
      <FormItem>
        <FormLabel>Company Name</FormLabel>
        <FormControl class="bg-white">
          <Input
            type="text"
            placeholder="IST Africa"
            :defaultValue="company && company.name"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-if="isAdmin" v-slot="{ componentField }" name="address">
      <FormItem>
        <FormLabel>Company Address</FormLabel>
        <FormControl class="bg-white">
          <Input
            type="text"
            :defaultValue="company && company.address"
            placeholder="Kigali - KG 28 Ave, 57 - Rwanda"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-if="isAdmin" v-slot="{ componentField }" name="mission">
      <FormItem>
        <FormLabel>Mission statement</FormLabel>
        <FormControl class="bg-white">
          <Input
            type="text"
            :defaultValue="company && company.mission"
            placeholder="Empowering learning, every day and everywhere"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-if="isAdmin" v-slot="{ componentField }" name="website">
      <FormItem>
        <FormLabel>Company website</FormLabel>
        <FormControl class="bg-white">
          <Input
            type="text"
            placeholder="www.ist.com"
            :defaultValue="company && company.website"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <div class="flex justify-start">
      <Button type="submit"> Update </Button>
    </div>
  </Form>
</template>
