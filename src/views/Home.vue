<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import axios from 'axios'
import type { Candidature } from '../components/Candidature'
import CandidatSimple from '../components/CandidatSimple.vue'
import { fetchCandidaturesPaginated } from '../api/candidatures'

const limit = ref<number>(5)
const users = ref<Candidature[]>([])
const loading = ref<boolean>(false)
const error = ref<string | null>(null)

const fetchUsers = async (limit: number = 5): Promise<void> => {
  loading.value = true
  error.value = null

  try {
    const { data } = await fetchCandidaturesPaginated(limit, 1)

    users.value = data
  } catch (err) {
    error.value = axios.isAxiosError(err) ? err.message : 'Unknown error'
  } finally {
    loading.value = false
  }
}

watch(limit, (value) => {
  const parsedPage = Number(value)

  fetchUsers(parsedPage)
})
fetchUsers()
const togglePage = () => {
  limit.value = limit.value === 5 ? 100 : 5
}
const buttonLabel = computed(() => (limit.value === 5 ? 'View All' : 'View Less'))
</script>

<template>
  <main class="main">
    <div class="size-12"></div>
    <p v-if="loading" className=" mx-auto my-16 loading loading-spinner loading-xl"></p>
    <p v-else-if="error">Error: {{ error }}</p>

    <ul class="w-full flex flex-col gap-3" v-else>
      <li v-for="candidature in users" :key="candidature.id">
        <CandidatSimple :candidature="candidature" />
      </li>
    </ul>

    <button
      v-if="!loading && error === null"
      class="btn btn-primary my-3 mx-auto block"
      @click="togglePage"
    >
      {{ buttonLabel }}
    </button>

    <div class="size-12"></div>
  </main>
</template>
