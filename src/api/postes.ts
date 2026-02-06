import { api } from '.'

export const fetchPostes = () => api.get<Poste[]>('/postes')

export interface Poste {
  id: string
  titre: string
  description: string
}
