<script setup lang="ts">
import { Home as HomeIcon } from 'lucide-vue-next'
</script>

<template>
  <nav class="navbar bg-base-100 shadow-sm sticky top-0 z-20">
    <div class="navbar-start">
      <RouterLink to="/" class="btn btn-square btn-ghost"> <HomeIcon /></RouterLink>
    </div>
  </nav>
</template>
