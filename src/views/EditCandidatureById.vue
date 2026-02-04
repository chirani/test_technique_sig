<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { fetchCandidaturesById } from '../api/candidatures'
import axios from 'axios'
import type { Candidature } from '../components/Candidature'
import { ref } from 'vue'
import CandidatEdit from '../components/CandidatEdit.vue'

const route = useRoute()
const router = useRouter()

const id = route.params.id
if (Number.isNaN(id)) {
  router.push('/')
}
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
  <CandidatEdit />
</template>
