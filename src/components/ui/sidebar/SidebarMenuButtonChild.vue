<script setup>
import { cn } from '@/lib/utils'
import { Primitive } from 'radix-vue'
import { sidebarMenuButtonVariants } from '.'

const props = defineProps(['class', 'isActive', 'size', 'variant'])
</script>

<template>
  <Primitive
    data-sidebar="menu-button"
    :data-size="size"
    :data-active="isActive"
    :class="cn(sidebarMenuButtonVariants({ variant, size }), props.class)"
    :as="as"
    :as-child="asChild"
    v-bind="$attrs"
  >
    <slot />
  </Primitive>
</template>
