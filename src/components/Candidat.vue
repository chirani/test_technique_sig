<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { Candidature } from './Candidature'
import { formatterDate } from '../utils'
import type { Statut } from '../api/statuts'
import { updateCandidature } from '../api/candidatures'
import axios from 'axios'

/* Interfaces EXACTES */

/* Props */
const props = defineProps<{
  candidature: Candidature
  statuts: Statut[]
}>()

/* Computed */
const dateFormatee = computed(() =>
  new Date(props.candidature.dateCandidature).toLocaleDateString('fr-FR')
)

const selectedStatus = ref<string>(props.candidature.statut)
const statusErrorMessage = ref<string | null>(null)

const updateStatut = async (): Promise<void> => {
  try {
    await updateCandidature(props.candidature.id, {
      ...props.candidature,
      statut: selectedStatus.value,
    })
  } catch (err) {
    statusErrorMessage.value = axios.isAxiosError(err) ? err.message : 'Unknown error'
  }
}

const salaireFormate = computed(() =>
  new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(props.candidature.salaireSouhaite)
)
watch(selectedStatus, () => {
  updateStatut()
})
/* Utils */
</script>
<template>
  <article class="max-w-full rounded-lg border-gray-200 p-6">
    <!-- En-tête -->
    <header class="mb-4">
      <h2 class="text-xl font-semibold text-gray-900">
        {{ candidature.nom }}
      </h2>
      <p class="text-gray-600">{{ candidature.poste }}</p>

      <select v-model="selectedStatus" class="select select-sm select-outline mt-2">
        <option
          v-for="status in statuts"
          :key="status.id"
          :style="{
            color: status.couleur,
          }"
        >
          {{ status.nom }}
        </option>
      </select>
    </header>

    <!-- Informations principales -->
    <section class="mb-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
      <p>
        <strong>Email :</strong>
        <a
          class="text-accent underline hover:no-underline"
          :href="`mailto:${candidature.email}`"
          target="_blank"
          rel="noopener noreferrer"
          >{{ ' ' }} {{ candidature.email }}</a
        >
      </p>
      <p>
        <strong>Téléphone :</strong>
        <a
          class="text-accent underline hover:no-underline"
          :href="`tel:${candidature.telephone}`"
          target="_blank"
          rel="noopener noreferrer"
          >{{ ' ' }} {{ candidature.telephone }}</a
        >
      </p>
      <p><strong>Localisation :</strong> {{ candidature.localisation }}</p>
      <p><strong>Disponibilité :</strong> {{ candidature.disponibilite }}</p>
      <p><strong>Expérience :</strong> {{ candidature.experience }}</p>

      <p>
        <strong>Date de candidature :</strong>
        {{ dateFormatee }}
      </p>

      <p>
        <strong>Salaire souhaité :</strong>
        {{ salaireFormate }}
      </p>
    </section>

    <!-- Compétences -->
    <section class="mb-4">
      <strong>Compétences :</strong>
      <ul class="mt-2 flex flex-wrap gap-2">
        <li
          v-for="competence in candidature.competences"
          :key="competence"
          class="rounded bg-gray-100 px-2 py-1 text-sm text-gray-700"
        >
          {{ competence }}
        </li>
      </ul>
    </section>

    <!-- Documents -->
    <section class="mb-4">
      <a
        :href="candidature.cv"
        target="_blank"
        rel="noopener"
        class="text-blue-600 hover:underline"
      >
        📄 Voir le CV
      </a>

      <p class="mt-2">
        <strong>Lettre de motivation :</strong><br />
        <span class="text-gray-700">
          {{ candidature.lettreMotivation }}
        </span>
      </p>
    </section>

    <!-- Commentaires -->
    <section v-if="candidature.commentaires.length" class="border-t border-gray-200 pt-4">
      <strong>Commentaires :</strong>
      <ul class="mt-2 space-y-3">
        <li
          v-for="commentaire in candidature.commentaires"
          :key="commentaire.id"
          class="rounded bg-gray-50 p-3"
        >
          <p class="text-gray-800">
            {{ commentaire.contenu }}
          </p>
          <p class="mt-1 text-sm text-gray-500">
            — {{ commentaire.auteur }},
            {{ formatterDate(commentaire.date) }}
          </p>
        </li>
      </ul>
    </section>
  </article>
</template>
