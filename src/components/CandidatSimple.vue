<template>
  <RouterLink
    :to="`/candidatures/${candidature.id}`"
    class="max-w-full card bg-base-100 card-md rounded-none shadow-sm hover:opacity-40 cursor-pointer"
  >
    <div class="card-body">
      <h2 class="card-title">
        {{ candidature.nom }}
        <span class="ml-auto badge badge-neutral badge-outline badge-sm">{{
          candidature.statut
        }}</span>
      </h2>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import type { Candidature } from './Candidature'

const props = defineProps<{
  candidature: Partial<Candidature>
}>()
</script>
