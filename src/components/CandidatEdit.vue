<script setup lang="ts">
import { useForm, useFieldArray } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { candidatureSchema } from './candidatureSchema'
import type { Candidature } from './Candidature'

// Setup form using VeeValidate + Zod schema
const { handleSubmit, errors, values } = useForm<Candidature>({
  validationSchema: toTypedSchema(candidatureSchema),
  initialValues: {
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

// Use field array for competences
const { fields: competences, remove, push } = useFieldArray('competences')

const onSubmit = handleSubmit((values) => {
  console.log('Form submitted', values)
})
</script>

<template>
  <form @submit.prevent="onSubmit" class="space-y-4 max-w-lg mx-auto">
    <input placeholder="Nom" class="input" v-model="values.nom" type="text" />
    <p class="text-error">{{ errors.nom }}</p>

    <input placeholder="Poste" class="input" v-model="values.poste" type="text" />
    <p class="text-error text-sm">{{ errors.poste }}</p>

    <input placeholder="Statut" class="input" v-model="values.statut" type="text" />
    <p class="text-error">{{ errors.statut }}</p>

    <label>Compétences</label>
    <div v-for="(field, index) in competences" :key="field.key" class="flex gap-2">
      <input class="input" v-model="values.competences[index]" type="text" />
      <button type="button" @click="remove(index)">Remove</button>
    </div>
    <button type="button" @click="push('')">Add competence</button>
    <p class="text-error">{{ errors.competences }}</p>

    <label>Experience</label>
    <textarea class="textarea" v-model="values.experience" rows="3" />
    <p class="text-error">{{ errors.experience }}</p>

    <label>Date Candidature</label>
    <input class="input" v-model="values.dateCandidature" type="date" />
    <p class="text-error">{{ errors.dateCandidature }}</p>

    <label>Email</label>
    <input class="input" v-model="values.email" type="email" />
    <p class="text-error">{{ errors.email }}</p>

    <label>Téléphone</label>
    <input class="input" v-model="values.telephone" type="tel" />
    <p class="text-error">{{ errors.telephone }}</p>

    <label>Lettre de motivation</label>
    <textarea class="textarea" v-model="values.lettreMotivation" rows="3" />
    <p class="text-error">{{ errors.lettreMotivation }}</p>

    <label>Salaire souhaité</label>
    <input class="input" v-model.number="values.salaireSouhaite" type="number" min="0" />
    <p class="text-error">{{ errors.salaireSouhaite }}</p>

    <label>Disponibilité</label>
    <input class="input" v-model="values.disponibilite" type="text" />
    <p class="text-error">{{ errors.disponibilite }}</p>

    <input placeholder="localisation" class="input" v-model="values.localisation" type="text" />
    <p class="text-error">{{ errors.localisation }}</p>

    <button type="submit" class="btn btn-primary w-full">Submit</button>
  </form>
</template>
