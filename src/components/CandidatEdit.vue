<script setup lang="ts">
import { useForm, useFieldArray } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { candidatureSchema } from './candidatureSchema'
import type { Candidature } from '../components/Candidature'
import { type Statut } from '../api/statuts'
import { ref } from 'vue'
import { updateCandidature } from '../api/candidatures'
import axios from 'axios'
import { useRouter } from 'vue-router'

const props = defineProps<{
  candidature?: Partial<Candidature>
  statuts?: Statut[]
}>()
const router = useRouter()
const isUpdateLoading = ref<boolean>(false)
const updateErrorMessage = ref<string | null>()

const { errors, values, resetForm, defineField } = useForm<Candidature>({
  validationSchema: toTypedSchema(candidatureSchema),
  initialValues: props.candidature
    ? props.candidature
    : {
        id: 0,
        nom: '',
        poste: '',
        statut: '',
        competences: [''],
        experience: '',
        dateCandidature: '',
        email: '',
        telephone: '',
        cv: '',
        lettreMotivation: '',
        salaireSouhaite: 0,
        disponibilite: '',
        localisation: '',
      },
})
const [nom, nomAttrs] = defineField('nom')
const [poste, posteAttrs] = defineField('poste')
const [statut, statutAttrs] = defineField('statut')
const [experience, experienceAttrs] = defineField('experience')
const [dateCandidature, dateAttrs] = defineField('dateCandidature')
const [email, emailAttrs] = defineField('email')
const [telephone, telephoneAttrs] = defineField('telephone')
const [cv, cvAttrs] = defineField('cv')
const [salaireSouhaite, salaireAttrs] = defineField('salaireSouhaite')
const [disponibilite, dispoAttrs] = defineField('disponibilite')
const [localisation, localisationAttrs] = defineField('localisation')
const { fields: competences, remove, push } = useFieldArray<string[]>('competences')

const handlecandidatureUpdate = async () => {
  if (props.candidature === null) return
  try {
    isUpdateLoading.value = true
    const id = props.candidature?.id ?? -1
    await updateCandidature(id, {
      ...values,
      competences: values.competences.map((competence) => competence),
    })
    router.push('/')
  } catch (err) {
    updateErrorMessage.value = axios.isAxiosError(err) ? err.message : 'Unknown error'
  } finally {
    isUpdateLoading.value = false
  }
}

const submitChanges = () => {
  handlecandidatureUpdate()
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <form class="card w-full max-w-3xl bg-base-100">
      <div class="card-body space-y-6">
        <h1 class="card-title text-4xl">Candidature</h1>

        <!-- Nom -->
        <div class="form-control">
          <label class="label">
            <span class="label-text">Nom</span>
          </label>
          <input
            v-model="nom"
            v-bind="nomAttrs"
            type="text"
            class="input input-bordered"
            :class="{ 'input-error': errors.nom }"
          />
          <span class="text-error text-sm">{{ errors.nom }}</span>
        </div>

        <!-- Poste -->
        <div class="form-control">
          <label class="label">
            <span class="label-text">Poste</span>
          </label>
          <input
            v-model="poste"
            v-bind="posteAttrs"
            type="text"
            class="input input-bordered"
            :class="{ 'input-error': errors.poste }"
          />
          <span class="text-error text-sm">{{ errors.poste }}</span>
        </div>

        <!-- Statut -->
        <div class="form-control">
          <label class="label">
            <span class="label-text">Statut</span>
          </label>
          <select
            v-model="statut"
            v-bind="statutAttrs"
            class="select select-bordered"
            :class="{ 'select-error': errors.statut }"
          >
            <option disabled value="" class="bg-base-200">Select status</option>
            <option
              v-for="option in statuts"
              :key="option.id"
              :value="option.nom"
              :style="{
                color: option.couleur,
              }"
            >
              {{ option.nom }}
            </option>
          </select>
          <span class="text-error text-sm">{{ errors.statut }}</span>
        </div>

        <!-- Competences -->
        <div class="form-control">
          <label class="label">
            <span class="label-text">Compétences</span>
          </label>

          <div v-for="(field, index) in competences" :key="field.key" class="flex gap-2 mb-2">
            <input v-model="field.value" type="text" class="input input-bordered flex-1" />
            <button type="button" class="btn btn-error btn-outline" @click="remove(index)">
              ✕
            </button>
          </div>

          <button type="button" class="btn btn-sm btn-outline" @click="push([''])">
            + Add competence
          </button>

          <span class="text-error text-sm">{{ errors.competences }}</span>
        </div>

        <!-- Experience -->
        <div class="form-control">
          <label class="label">
            <span class="label-text">Experience</span>
          </label>
          <textarea
            v-model="experience"
            v-bind="experienceAttrs"
            class="textarea textarea-bordered"
            :class="{ 'textarea-error': errors.experience }"
          ></textarea>
          <span class="text-error text-sm">{{ errors.experience }}</span>
        </div>

        <!-- Date -->
        <div class="form-control">
          <label class="label">
            <span class="label-text">Date de candidature</span>
          </label>
          <input
            v-model="dateCandidature"
            v-bind="dateAttrs"
            type="date"
            class="input input-bordered"
            :class="{ 'input-error': errors.dateCandidature }"
          />
          <span class="text-error text-sm">{{ errors.dateCandidature }}</span>
        </div>

        <!-- Email -->
        <div class="form-control">
          <label class="label">
            <span class="label-text">Email</span>
          </label>
          <input
            v-model="email"
            v-bind="emailAttrs"
            type="email"
            class="input input-bordered"
            :class="{ 'input-error': errors.email }"
          />
          <span class="text-error text-sm">{{ errors.email }}</span>
        </div>

        <!-- Telephone -->
        <div class="form-control">
          <label class="label">
            <span class="label-text">Téléphone</span>
          </label>
          <input
            v-model="telephone"
            v-bind="telephoneAttrs"
            type="tel"
            class="input input-bordered"
            :class="{ 'input-error': errors.telephone }"
          />
          <span class="text-error text-sm">{{ errors.telephone }}</span>
        </div>

        <!-- CV -->
        <div class="form-control">
          <label class="label">
            <span class="label-text">CV (URL)</span>
          </label>
          <input
            v-model="cv"
            v-bind="cvAttrs"
            type="url"
            class="input input-bordered"
            :class="{ 'input-error': errors.salaireSouhaite }"
          />
          <span class="text-error text-sm">{{ errors.cv }}</span>
        </div>

        <!-- Salary -->
        <div class="form-control">
          <label class="label">
            <span class="label-text">Salaire souhaité</span>
          </label>
          <input
            v-model.number="salaireSouhaite"
            v-bind="salaireAttrs"
            type="number"
            min="0"
            class="input input-bordered"
            :class="{ 'input-error': errors.salaireSouhaite }"
          />
          <span class="text-error text-sm">{{ errors.salaireSouhaite }}</span>
        </div>

        <!-- Disponibilite -->
        <div class="form-control">
          <label class="label">
            <span class="label-text">Disponibilité</span>
          </label>
          <input
            v-model="disponibilite"
            v-bind="dispoAttrs"
            type="text"
            class="input input-bordered"
            :class="{ 'input-error': errors.disponibilite }"
          />
          <span class="text-error text-sm">{{ errors.disponibilite }}</span>
        </div>

        <!-- Localisation -->
        <div class="form-control">
          <label class="label">
            <span class="label-text">Localisation</span>
          </label>
          <input
            v-model="localisation"
            v-bind="localisationAttrs"
            type="text"
            class="input input-bordered"
            :class="{ 'input-error': errors.localisation }"
          />
          <span class="text-error text-sm">{{ errors.localisation }}</span>
        </div>

        <!-- Submit -->
        <div class="card-actions justify-end gap-3">
          <button v-on:click="() => resetForm()" type="button" class="btn btn-outline">
            Reset
          </button>
          <button @click="submitChanges" type="button" class="btn btn-primary">
            Submit Updates
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
