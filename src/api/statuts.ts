import { api } from '.'

export const fetchStatuts = () => api.get<Statut[]>('/statuts')

export interface Statut {
  id: string
  nom: string
  couleur: string
  ordre: number
}
