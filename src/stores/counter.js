import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('auth', () => {
  const user = ref({
    firstname: '',
    lastname: '',
    email: '',
    role: '',
    phone: '',
    position: '',
  })

  const company = ref({
    name: '',
    address: '',
    mission: '',
    website: '',
  })

  return { user, company }
})
