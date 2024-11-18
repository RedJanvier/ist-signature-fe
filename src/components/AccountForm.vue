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

import { toTypedSchema } from '@vee-validate/zod'
import { h } from 'vue'
import * as z from 'zod'

// const accountFormSchema = toTypedSchema(
//   z.object({
//     phone: z
//       .string({
//         required_error: 'Required.',
//       })
//       .min(10, {
//         message: 'Phone must be at least 10 characters.',
//       })
//       .max(13, {
//         message: 'Phone must not be longer than 13 characters.',
//       }),
//   }),
// )

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
      }),
    address: z
      .string({
        required_error: 'Required.',
      })
      .min(2, {
        message: 'Address must be at least 2 characters.',
      })
      .max(30, {
        message: 'Address must not be longer than 30 characters.',
      }),
    mission: z
      .string({
        required_error: 'Required.',
      })
      .regex(/^[a-zA-Z]+[-'s]?[a-zA-Z ]+$/, {
        message: 'Mission should contain only alphabets',
      })
      .min(2, {
        message: 'Mission must be at least 2 characters.',
      })
      .max(300, {
        message: 'Mission must not be longer than 300 characters.',
      }),
    website: z
      .string({
        required_error: 'Required.',
      })
      .regex(/^(www.)[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/, {
        message: 'Website should be a valid site (starting with www.*****)',
      })
      .min(10, {
        message: 'Website must be at least 10 characters.',
      })
      .max(30, {
        message: 'Website must not be longer than 30 characters.',
      }),
  }),
)

// https://github.com/logaretm/vee-validate/issues/3521
// https://github.com/logaretm/vee-validate/discussions/3571
async function onSubmit(values) {
  toast({
    title: 'You submitted the following values:',
    description: h(
      'pre',
      { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' },
      h('code', { class: 'text-white' }, JSON.stringify(values, null, 2)),
    ),
  })
}
</script>

<template>
  <Form :validation-schema="adminFormSchema" class="space-y-8" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="phone">
      <FormItem>
        <FormLabel>Phone Number</FormLabel>
        <FormControl class="bg-white">
          <Input type="tel" placeholder="+25078*******" v-bind="componentField" />
        </FormControl>
        <FormDescription>
          This is the phone number that will be included in your email signature.
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="name">
      <FormItem>
        <FormLabel>Company Name</FormLabel>
        <FormControl class="bg-white">
          <Input type="text" placeholder="IST Africa" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="address">
      <FormItem>
        <FormLabel>Company Address</FormLabel>
        <FormControl class="bg-white">
          <Input
            type="text"
            placeholder="Kigali - KG 28 Ave, 57 - Rwanda"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="mission">
      <FormItem>
        <FormLabel>Mission statement</FormLabel>
        <FormControl class="bg-white">
          <Input
            type="text"
            placeholder="Empowering learning, every day and everywhere"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="website">
      <FormItem>
        <FormLabel>Company website</FormLabel>
        <FormControl class="bg-white">
          <Input type="text" placeholder="www.ist.com" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <div class="flex justify-start">
      <Button type="submit"> Update </Button>
    </div>
  </Form>
</template>
