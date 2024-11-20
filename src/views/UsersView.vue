<template>
  <div class="space-y-6 p-4 md:p-10 md:pb-16">
    <div class="space-y-0.5">
      <h2 class="text-2xl font-bold tracking-tight">Users List</h2>
      <p class="text-muted-foreground">Manage your users job positions from one place</p>
    </div>
    <div class="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
      <div class="flex-1 lg:max-w-2xl">
        <div class="space-y-6">
          <DataTable :data="tasks" :columns="columns" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
