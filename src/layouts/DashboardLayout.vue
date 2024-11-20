<template>
  <div class="dashboard-layout flex box-border md:max-w-[1869px] md:mx-auto">
    <Menu></Menu>
    <main class="bg-gray-200 flex-1 mb-[76px] md:mb-0">
      <Nav :user="{}"></Nav>
      <ScrollArea
        class="flex mt-4 flex-col-reverse md:flex-row box-border px-4 h-[calc(100vh-155px)] md:h-[calc(100vh-79px)]"
      >
        <slot />
      </ScrollArea>
    </main>
  </div>
</template>

<script setup>
import Menu from '@/components/AppMenu.vue'
import Nav from '@/components/AppNav.vue'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useStore } from '@/stores/counter'
import { companyService } from '@/stores/services'

const store = useStore()

async function fetchCompany() {
  try {
    const res = await companyService.get()
    const company = res.data
    localStorage.setItem('company', JSON.stringify(company))
    store.setCompany(company)
  } catch (error) {
    console.log(error)
  }
}
fetchCompany()
</script>
