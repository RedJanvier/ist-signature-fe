import { defineStore } from 'pinia'

export const useStore = defineStore('store', {
  state: () => ({
    global: { loggedIn: false, user: null, company: null }
  }),
  actions: {
    setUser(newUser) {
      this.global.loggedIn = true;
      this.global.user = newUser;
    },
    setCompany(data) {
      this.global.company = data;
    }
  }
})
