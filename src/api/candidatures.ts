import { api } from '.'
import type { Candidature } from '../components/Candidature'

export const fetchCandidatures = async () => await api.get<Candidature[]>(`/candidatures`)

export const fetchCandidaturesById = async (id: number) =>
  await api.get<Candidature>(`/candidatures/${id}`)

export const updateCandidature = async (id: number, modification: Partial<Candidature>) => {
  return await api.patch(`/candidatures/${id}`, modification)
}

export const fetchCandidaturesOrdered = async () => {
  return await api.get<Candidature[]>('/candidatures?_sort=dateCandidature')
}

export const searchCandidatures = async (q: string = '') => {
  return await api.get<Candidature[]>(`/candidatures?q=Vue.js`)
}

export const fetchCandidaturesByStatus = async (statut?: string) => {
  return await api.get<Candidature[]>(`/candidatures?statut=${statut}`)
}
