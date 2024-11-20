import { defineStore } from 'pinia'

export const useStore = defineStore('store', {
  state: () => ({
    global: { loggedIn: false, user: null, company: null, users: [] }
  }),
  actions: {
    setUser(newUser) {
      this.global.loggedIn = true;
      this.global.user = newUser;
    },
    setUsers(newUsers) {
      this.global.users = newUsers;
    },
    setCompany(data) {
      this.global.company = data;
    }
  }
})
