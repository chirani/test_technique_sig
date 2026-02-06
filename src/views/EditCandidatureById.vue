<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { fetchCandidaturesById } from '../api/candidatures'
import axios from 'axios'
import type { Candidature } from '../components/Candidature'
import { ref } from 'vue'
import CandidatEdit from '../components/CandidatEdit.vue'
import { fetchStatuts, type Statut } from '../api/statuts'
import { ArrowLeft } from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()

const id = route.params.id
if (Number.isNaN(id)) {
  router.push('/')
}
const loading = ref<boolean>(false)
const error = ref<string | null>(null)
const candidature = ref<Candidature | null>(null)
const mesStatuts = ref<Statut[]>([])
const statutsError = ref<string | null>(null)

const preparerMesStatuts = async () => {
  try {
    const res = await fetchStatuts()
    mesStatuts.value = res.data
  } catch (err) {
    statutsError.value = axios.isAxiosError(err) ? err.message : 'Unknown error'
  }
}

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
const goBack = () => {
  router.back()
}
preparerMesStatuts()
fetchCandidateData(id)
</script>
<template>
  <nav class="navbar bg-base-100 shadow-sm sticky top-0 z-20">
    <div class="navbar-start">
      <button @click="goBack" class="btn btn-square btn-ghost"><ArrowLeft /></button>
    </div>
  </nav>
  <CandidatEdit v-if="candidature !== null" :candidature="candidature" :statuts="mesStatuts" />
</template>
