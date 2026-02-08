// candidatureSchema.ts
import { z } from 'zod'

export const candidatureSchema = z.object({
  id: z.number(),
  nom: z.string().min(1, 'Nom is required'),
  poste: z.string().min(1, 'Poste is required'),
  statut: z.string().min(1, 'Statut is required'),
  competences: z.array(z.string()).nonempty('At least one competence required'),
  experience: z.string().min(1, 'Experience is required'),
  dateCandidature: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Invalid date format',
  }),
  email: z.string().email('Invalid email'),
  telephone: z.string().min(1, 'Telephone is required'),
  cv: z.string().url('CV must be a valid URL'),
  lettreMotivation: z.string().min(1, 'Lettre de motivation required'),
  salaireSouhaite: z.number().min(0, 'Salary must be positive'),
  disponibilite: z.string().min(1, 'Disponibilité is required'),
  localisation: z.string().min(1, 'Localisation is required'),
})
