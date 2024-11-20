<script setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { useStore } from '@/stores/counter'
import { authService } from '@/stores/services'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()
const { user } = store.global

const open = ref(false)
const settingsLinks = ref([
  {
    id: 1,
    text: 'Logout',
    link: '/',
    icon: 'mdi:logout',
    danger: true,
  },
])

function handleLogout() {
  authService.logout()
  store.setUser(null)
  store.setCompany(null)
  router.push('/signin')
}
</script>

<template>
  <div class="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2">
    <nav
      class="flex justify-around items-center gap-4 px-6 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2"
    >
      <router-link to="/" class="text-xl flex gap-4 items-center md:hidden">
        <img src="@/assets/logo-blue.jpeg" alt="" width="50px" />
        <h1>Signatures</h1>
      </router-link>

      <div class="user flex flex-1 justify-end relative">
        <Popover v-model:open="open">
          <PopoverTrigger as-child>
            <button class="user flex gap-3">
              <div class="user-image rounded-full overflow-hidden w-[36px] h-[36px]">
                <img
                  :src="`https://api.dicebear.com/9.x/open-peeps/svg?clothingColor=8fa7df,9ddadb,78e185&backgroundColor=b6e3f4,c0aede,d1d4f9&seed=${user.firstName}`"
                  alt="profile"
                />
              </div>
              <b class="text-nowrap self-center hidden md:block"
                >{{ user.firstname }} {{ user.lastname }}</b
              >
            </button>
          </PopoverTrigger>
          <PopoverContent class="w-[150px] p-0">
            <ul class="grid gap-4">
              <li :key="item.id" v-for="item in settingsLinks" class="py-2 px-1">
                <button
                  @click="handleLogout"
                  class="flex gap-2 items-center"
                  :style="item.danger ? 'color: red;' : ''"
                >
                  <Icon :icon="item.icon" width="15" height="15" />
                  <span class="">{{ item.text }}</span>
                </button>
              </li>
            </ul>
          </PopoverContent>
        </Popover>
      </div>
    </nav>
  </div>
</template>

<!-- <FormField v-slot="{ value }" name="language">
      <FormItem class="flex flex-col">
        <FormLabel>Language</FormLabel>

        <Popover v-model:open="open">
          <PopoverTrigger as-child>
            <FormControl>
              <Button
                variant="outline"
                role="combobox"
                :aria-expanded="open"
                :class="cn('w-[200px] justify-between', !value && 'text-muted-foreground')"
              >
                {{
                  value
                    ? languages.find((language) => language.value === value)?.label
                    : 'Select language...'
                }}

                <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent class="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search language..." />
              <CommandEmpty>No language found.</CommandEmpty>
              <CommandList>
                <CommandGroup>
                  <CommandItem
                    v-for="language in languages"
                    :key="language.value"
                    :value="language.label"
                    @select="
                      () => {
                        setFieldValue('language', language.value)
                        open = false
                      }
                    "
                  >
                    <Check
                      :class="
                        cn('mr-2 h-4 w-4', value === language.value ? 'opacity-100' : 'opacity-0')
                      "
                    />
                    {{ language.label }}
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <FormDescription>
          This is the language that will be used in the dashboard.
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField> -->
