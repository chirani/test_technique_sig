import { api } from '.'
import type { Candidature } from '../components/Candidature'

export const fetchCandidatures = async () => await api.get<Candidature[]>(`/candidatures`)
export const fetchCandidaturesPaginated = async (limit: number = 1, page: number = 1) =>
  await api.get<Candidature[]>(`/candidatures?_page=${page}&_limit=${limit}`)
export const fetchCandidaturesById = async (id: number) =>
  await api.get<Candidature>(`/candidatures/${id}`)
export const fetchCandidaturesPaginatedFiltered = async (
  limit: number = 1,
  page: number = 1,
  statut: string = '',
  ordre: 'asc' | 'desc' = 'desc'
) => {
  return await api.get<Candidature[]>(
    `/candidatures?_page=${page}}&_limit=${limit}&statut=${statut}&ordre=${ordre}`
  )
}
