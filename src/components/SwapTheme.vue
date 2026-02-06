<script setup lang="ts">
import { MoonIcon, SunIcon } from 'lucide-vue-next'
import { store, toggleThem } from '../golabalState'
import { ref, watch } from 'vue'

const light = ref<boolean>(store.Theme === 'light')

watch(light, () => {
  toggleThem()
  document.documentElement.setAttribute('data-theme', store.Theme)
})
</script>

<template>
  <label class="swap swap-rotate">
    <input type="checkbox" v-model="light" />
    <SunIcon class="swap-on size-8 fill-amber-300" />
    <MoonIcon class="swap-off size-8" />
  </label>
</template>
