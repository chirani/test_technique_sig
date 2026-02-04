<script setup lang="ts">
import { ref, watch } from 'vue'
import axios from 'axios'
import type { Candidature } from '../components/Candidature'
import { api } from '../api'
import Candidat from '../components/Candidat.vue'

const users = ref<Candidature[]>([])
const userId = ref<string>('')
const loading = ref<boolean>(false)
const error = ref<string | null>(null)

const fetchUsers = async (id: string = '3'): Promise<void> => {
  loading.value = true
  error.value = null

  try {
    const { data } = await api.get<Candidature>(`/candidatures/${id}`)

    users.value = [data]
  } catch (err) {
    error.value = axios.isAxiosError(err) ? err.message : 'Unknown error'
  } finally {
    loading.value = false
  }
}

/**
 * Watch input and refetch when ID changes
 */
watch(userId, (value) => {
  const parsedId = Number(value)

  if (!value) {
    fetchUsers() // fetch all
  } else if (!Number.isNaN(parsedId)) {
    fetchUsers(value) // fetch ?id=33
  }
})

// initial fetch
fetchUsers()
</script>

<template>
  <input v-model="userId" type="number" placeholder="Filter by user ID" />

  <p v-if="loading">Loading…</p>
  <p v-else-if="error" class="text-error">Error: {{ error }}</p>

  <ul v-else>
    <li v-for="candidature in users" :key="candidature.id">
      <Candidat :candidature="candidature" />
    </li>
  </ul>
</template>
