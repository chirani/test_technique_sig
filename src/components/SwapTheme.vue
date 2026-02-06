<script setup lang="ts">
import { MoonIcon, SunIcon } from 'lucide-vue-next'
import { toggleThem } from '../golabalState'
import { ref, watch } from 'vue'

const light = ref<boolean>(true)

watch(
  light,
  () => {
    let newTheme = light.value ? 'light' : 'dark'
    document.documentElement.setAttribute('data-theme', newTheme)
    toggleThem()
  },
  { immediate: true }
)
</script>

<template>
  <label class="swap swap-rotate">
    <input type="checkbox" class="theme-controller" v-model="light" />
    <SunIcon class="swap-off size-8" />

    <MoonIcon class="swap-on size-8" />
  </label>
</template>
