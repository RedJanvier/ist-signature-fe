<template>
  <h2 class="text-lg">Welcome, {{ user.firstName }}</h2>
  <p class="text-sm text-gray-500">help you reach your full potential</p>
  <div class="bg-white border border-gray-200 rounded flex mt-4">
    <div class="p-4">
      <h2 class="text-2xl mb-4 max-w-[400px]">{{ course.title }}</h2>
      <ul class="grid gap-3">
        <li
          v-for="course in course.videos"
          :key="course.id"
          class="border border-gray-200 text-black rounded p-4 flex gap-5"
        >
          <div class="cnt flex-1 flex flex-col justify-around gap-2">
            <p class="">{{ course.title }}</p>
            <p class="text-sm text-gray-500 flex items-center">
              <Icon icon="mdi:clock-time-eight-outline" /><span>{{ course.duration }}</span>
            </p>
          </div>
          <button v-if="course.completed" class="text-[var(--main-light-color)]">
            <Icon icon="mdi:check-circle" height="25" width="25" />
          </button>
          <button v-if="!course.completed" class="text-gray-400">
            <Icon icon="mdi:lock" height="25" width="25" />
          </button>
        </li>
      </ul>
    </div>
    <div v-if="selectedVideo != null" class="flex-1 min-w-[360px]">
      <CoursePlayer :video="selectedVideo" :mentor="course.mentor" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

defineProps([])

const selectedVideo = ref({
  id: 1,
  title: 'Intro to Advanced Branding',
  duration: '12min',
  completed: true,
  summary:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  tasks: [
    {
      id: 1,
      title: 'Task 1',
      descrption:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
    },
    {
      id: 2,
      title: 'Task 2',
      descrption:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
    },
    {
      id: 3,
      title: 'Task 3',
      descrption:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
    },
    {
      id: 4,
      title: 'Task 4',
      descrption:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
    },
  ],
})
</script>

<style lang="scss" scoped></style>
