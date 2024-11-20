<script setup>
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/toast'
import { useStore } from '@/stores/counter'
import { computed } from 'vue'

const store = useStore()

const { value: user } = computed(() => store.global.user)
const { value: company } = computed(() => store.global.company)

const textToCopy = `
<table style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #333">
  <tr>
    <td>
      <strong style="font-size: 16px; color: #000">${user && user.firstname} ${user && user.lastname}</strong><br />
      <em style="color: #555">${user && user.position}</em><br />
    </td>
  </tr>
  <tr style="${user && user.phone ? '' : 'display: none'}">
    <td style="padding-top: 8px">
      <img
        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImJsYWNrIiBkPSJNNi42MiAxMC43OWMxLjQ0IDIuODMgMy43NiA1LjE1IDYuNTkgNi41OWwyLjItMi4yYy4yOC0uMjguNjctLjM2IDEuMDItLjI1YzEuMTIuMzcgMi4zMi41NyAzLjU3LjU3YTEgMSAwIDAgMSAxIDFWMjBhMSAxIDAgMCAxLTEgMUExNyAxNyAwIDAgMSAzIDRhMSAxIDAgMCAxIDEtMWgzLjVhMSAxIDAgMCAxIDEgMWMwIDEuMjUuMiAyLjQ1LjU3IDMuNTdjLjExLjM1LjAzLjc0LS4yNSAxLjAyeiIvPjwvc3ZnPg=="
        alt="Phone Icon"
        style="height: 16px; width: 16px; display: inline-block"
      />
      M:
      <a
        :href="['tel:', user.phone].join('')"
        style="color: rgb(85, 85, 85); text-decoration: none"
        >${user && user.phone}</a
      >
    </td>
  </tr>
  <tr>
    <td style="padding-top: 10px">
      <strong>${company && company.name}</strong
      ><br />
      ${company && company.address}
    </td>
  </tr>
  <tr>
    <td style="padding-top: 8px">
      <img
        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9IiMyYjgyOWYiIGQ9Ik0xNi4zNiAxNGMuMDgtLjY2LjE0LTEuMzIuMTQtMnMtLjA2LTEuMzQtLjE0LTJoMy4zOGMuMTYuNjQuMjYgMS4zMS4yNiAycy0uMSAxLjM2LS4yNiAybS01LjE1IDUuNTZjLjYtMS4xMSAxLjA2LTIuMzEgMS4zOC0zLjU2aDIuOTVhOC4wMyA4LjAzIDAgMCAxLTQuMzMgMy41Nk0xNC4zNCAxNEg5LjY2Yy0uMS0uNjYtLjE2LTEuMzItLjE2LTJzLjA2LTEuMzUuMTYtMmg0LjY4Yy4wOS42NS4xNiAxLjMyLjE2IDJzLS4wNyAxLjM0LS4xNiAyTTEyIDE5Ljk2Yy0uODMtMS4yLTEuNS0yLjUzLTEuOTEtMy45NmgzLjgyYy0uNDEgMS40My0xLjA4IDIuNzYtMS45MSAzLjk2TTggOEg1LjA4QTcuOTIgNy45MiAwIDAgMSA5LjQgNC40NEM4LjggNS41NSA4LjM1IDYuNzUgOCA4bS0yLjkyIDhIOGMuMzUgMS4yNS44IDIuNDUgMS40IDMuNTZBOCA4IDAgMCAxIDUuMDggMTZtLS44Mi0yQzQuMSAxMy4zNiA0IDEyLjY5IDQgMTJzLjEtMS4zNi4yNi0yaDMuMzhjLS4wOC42Ni0uMTQgMS4zMi0uMTQgMnMuMDYgMS4zNC4xNCAyTTEyIDQuMDNjLjgzIDEuMiAxLjUgMi41NCAxLjkxIDMuOTdoLTMuODJjLjQxLTEuNDMgMS4wOC0yLjc3IDEuOTEtMy45N00xOC45MiA4aC0yLjk1YTE1LjcgMTUuNyAwIDAgMC0xLjM4LTMuNTZjMS44NC42MyAzLjM3IDEuOSA0LjMzIDMuNTZNMTIgMkM2LjQ3IDIgMiA2LjUgMiAxMmExMCAxMCAwIDAgMCAxMCAxMGExMCAxMCAwIDAgMCAxMC0xMEExMCAxMCAwIDAgMCAxMiAyIi8+PC9zdmc+"
        alt="Globe Icon"
        style="height: 16px; width: 16px; display: inline-block"
      />
      <a
        :href="['https://', company.website].join('')"
        style="color: #0056b3; text-decoration: none"
        >${company && company.website}</a
      >
    </td>
  </tr>
  <tr>
    <td style="padding-top: 10px; font-style: italic; color: #555">
      &quot;${company && company.mission}&quot;
    </td>
  </tr>
</table>`

const handleCopy = () => {
  const type = 'text/html'
  const blob = new Blob([textToCopy], { type })
  const data = [new ClipboardItem({ [type]: blob })]
  navigator.clipboard
    .write(data)
    .then(() => {
      toast({ title: 'Signature copied!' })
      setTimeout(() => {
        window.open(
          'https://outlook.office.com/mail/options/accounts-category/signatures-subcategory',
          '_blank',
        )
      }, 1000)
    })
    .catch((err) => {
      toast({ title: 'Failed to copy signature! Try again...' })
      console.log(err)
    })
}
</script>

<template>
  <div class="space-y-6 p-4 md:p-10 md:pb-16">
    <div class="space-y-0.5">
      <h2 class="text-2xl font-bold tracking-tight">Signature</h2>
      <p class="text-muted-foreground">
        See the preview of your signature and copy it to
        <a
          href="https://outlook.office.com/mail/options/accounts-category/signatures-subcategory"
          target="_blank"
          rel="noopener noreferrer"
        >
          your email settings
        </a>
      </p>
    </div>
    <div class="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
      <div class="flex-1 lg:max-w-2xl">
        <div class="space-y-6">
          <div class="preview p-4 rounded bg-white">
            <div v-html="textToCopy"></div>
            <Button type="button" class="mt-6" @click.prevent="handleCopy">Copy signature</Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
