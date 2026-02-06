<template>
  <main>
    <RouterView />
  </main>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import { store } from './golabalState'

onMounted(() => {
  document.documentElement.setAttribute('data-theme', store.Theme)
})
</script>
