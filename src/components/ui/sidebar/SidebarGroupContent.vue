<script setup>
import { cn } from '@/lib/utils'

const props = defineProps(['class'])
</script>

<template>
  <div data-sidebar="group-content" :class="cn('w-full text-sm', props.class)">
    <slot />
  </div>
</template>
