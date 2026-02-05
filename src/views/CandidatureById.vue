<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import type { Candidature } from '../components/Candidature'
import { ref } from 'vue'
import Candidat from '../components/Candidat.vue'
import { fetchCandidaturesById } from '../api/candidatures'
import axios from 'axios'
import { ArrowLeft } from 'lucide-vue-next'

//Params
const route = useRoute()
const router = useRouter()
const id = route.params.id
if (Number.isNaN(id)) {
  router.back()
}
//Props
const loading = ref<boolean>(false)
const error = ref<string | null>(null)
const candidature = ref<Candidature | null>(null)

const fetchCandidateData = async (id: typeof route.params.id) => {
  let parsedId = !Number.isNaN(id)
  if (!parsedId) {
    router.push('/')
  }
  loading.value = true
  error.value = null

  try {
    const res = await fetchCandidaturesById(Number(id))
    candidature.value = res.data
  } catch (err) {
    error.value = axios.isAxiosError(err) ? err.message : 'Unknown error'
  } finally {
    loading.value = false
  }
}

fetchCandidateData(id)
</script>
<template>
  <nav class="navbar bg-base-100 shadow-sm sticky top-0">
    <div class="navbar-start">
      <RouterLink to="/" class="btn btn-square btn-ghost"> <ArrowLeft /></RouterLink>
    </div>

    <div class="navbar-end">
      <RouterLink
        v-if="candidature !== null"
        :to="`/candidatures/${candidature.id}/edit`"
        class="btn btn-info"
        >Mettre a jour</RouterLink
      >
      <div v-else class="hidden"></div>
    </div>
  </nav>
  <main class="main">
    <p v-if="loading" class="text-center">Loading…</p>
    <p v-else-if="error" class="text-error">Error: {{ error }}</p>
    <Candidat v-else v-if="candidature !== null" :candidature="candidature" />
  </main>
</template>
