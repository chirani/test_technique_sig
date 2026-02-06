<script setup lang="ts">
import axios from 'axios'
import { Home as HomeIcon } from 'lucide-vue-next'
import { ref } from 'vue'
import { fetchPostes, type Poste } from '../api/postes'

const posteError = ref<string | null>(null)
const mesPostes = ref<Poste[]>([])

const preparerPostes = async () => {
  try {
    const res = await fetchPostes()
    mesPostes.value = res.data
  } catch (err) {
    posteError.value = axios.isAxiosError(err) ? err.message : 'Unknown Error'
  }
}

preparerPostes()
</script>

<template>
  <nav class="navbar bg-base-100 shadow-sm sticky top-0 z-20">
    <div class="navbar-start">
      <RouterLink to="/" class="btn btn-square btn-ghost"> <HomeIcon /></RouterLink>
    </div>
  </nav>
  <main class="main">
    <table class="table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Titre</th>
          <th>Description</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="poste in mesPostes">
          <th>{{ poste.id }}</th>
          <th>{{ poste.titre }}</th>
          <th>{{ poste.description }}</th>
        </tr>
      </tbody>
    </table>
  </main>
</template>
