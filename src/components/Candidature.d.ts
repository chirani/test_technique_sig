export interface Commentaire {
  id: number
  auteur: string
  date: string // ISO 8601
  contenu: string
}

export interface Candidature {
  id: number
  nom: string
  poste: string
  statut: string
  competences: string[]
  experience: string
  dateCandidature: string // ISO 8601
  email: string
  telephone: string
  cv: string // URL
  lettreMotivation: string
  salaireSouhaite: number
  disponibilite: string
  localisation: string
  commentaires: Commentaire[]
}
