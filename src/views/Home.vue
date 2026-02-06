<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import axios from 'axios'
import type { Candidature } from '../components/Candidature'
import {
  fetchCandidatures,
  fetchCandidaturesByStatus,
  fetchCandidaturesOrdered,
} from '../api/candidatures'
import { formatterDate } from '../utils'
import { ArrowDown } from 'lucide-vue-next'
import { fetchStatuts, type Statut } from '../api/statuts'
import { Home as HomeIcon } from 'lucide-vue-next'

const candidatures = ref<Candidature[]>([])
const loading = ref<boolean>(false)
const candidaturesError = ref<string | null>(null)
const isOrderedBydate = ref<boolean>(false)
const mesStatuts = ref<Statut[]>([])
const statutsError = ref<string | null>(null)
const selectedStatus = ref<string | null>(null)

const preparerCandidatures = async (): Promise<void> => {
  loading.value = true
  candidaturesError.value = null

  try {
    let data: Candidature[] = []
    // Toggling between ordering by date and searching by status
    if (selectedStatus.value !== null) {
      const response = await fetchCandidaturesByStatus(selectedStatus.value)
      isOrderedBydate.value = false
      data = response.data
    } else if (isOrderedBydate.value) {
      const response = await fetchCandidaturesOrdered()
      data = response.data
    } else {
      const response = await fetchCandidatures()
      data = response.data
    }

    candidatures.value = data
  } catch (err) {
    candidaturesError.value = axios.isAxiosError(err) ? err.message : 'Unknown error'
  } finally {
    loading.value = false
  }
}

const preparerMesStatuts = async () => {
  try {
    const res = await fetchStatuts()
    mesStatuts.value = res.data
  } catch (err) {
    statutsError.value = axios.isAxiosError(err) ? err.message : 'Unknown error'
  }
}

const statusColors = computed<Record<string, string>>(() => {
  return Object.fromEntries(mesStatuts.value.map((statut) => [statut.nom, statut.couleur]))
})

watch([isOrderedBydate, selectedStatus], (_value) => {
  preparerCandidatures()
})

function toggleOrder() {
  isOrderedBydate.value = !isOrderedBydate.value
  selectedStatus.value = null
}
watch(selectedStatus, () => {
  console.log(selectedStatus.value)
})

preparerMesStatuts()
preparerCandidatures()
</script>

<template>
  <nav class="navbar bg-base-100 shadow-sm sticky top-0 z-20">
    <div class="navbar-start">
      <RouterLink to="/" class="btn btn-square btn-ghost"> <HomeIcon /></RouterLink>
    </div>
    <div class="navbar-end">
      <RouterLink to="/postes" class="btn btn-neutral"> Open Positions </RouterLink>
    </div>
  </nav>

  <main class="main">
    <div class="flex flex-row-reverse gap-3 p-3">
      <select v-model="selectedStatus" class="select select-sm select-outline max-w-36">
        <option selected :value="null">Status</option>
        <option
          v-for="status in mesStatuts"
          :key="status.id"
          :style="{
            color: status.couleur,
          }"
        >
          {{ status.nom }}
        </option>
      </select>
      <button
        @click="toggleOrder"
        :class="`btn btn-sm ${isOrderedBydate ? 'btn-outline' : 'btn-ghost'}`"
      >
        Order By Date <ArrowDown class="size-4" />
      </button>
    </div>
    <p v-if="loading" className="mx-auto my-16 loading loading-spinner loading-xl"></p>
    <p v-else-if="candidaturesError">Error: {{ candidaturesError }}</p>
    <div class="overflow-x-auto">
      <table class="table">
        <!-- head -->
        <thead>
          <tr>
            <th>Id</th>
            <th>Nom</th>
            <th>Date de Candidature</th>
            <th>Statut</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="candidature in candidatures">
            <th>{{ candidature.id }}</th>
            <th>{{ candidature.nom }}</th>
            <th>{{ formatterDate(candidature.dateCandidature) }}</th>
            <th>
              <span
                :class="`badge badge-ghost sm:badge-outline font-normal`"
                :style="{ backgroundColor: statusColors[candidature.nom] }"
              >
                {{ candidature.statut }}</span
              >
            </th>
            <th>
              <RouterLink :to="`/candidatures/${candidature.id}`" class="btn btn-sm btn-link">
                Plus de Details
              </RouterLink>
            </th>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="size-12"></div>
  </main>
</template>
