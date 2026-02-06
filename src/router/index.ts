// src/router/index.js
import { createWebHistory, createRouter } from 'vue-router'
import Home from '../views/Home.vue' // Example home component
import CandidaturesId from '../views/CandidatureById.vue'
import EditCandidatureById from '../views/EditCandidatureById.vue'
import Postes from '../views/Postes.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/postes',
    name: 'Postes',
    component: Postes,
  },
  {
    path: '/candidatures/:id',
    name: 'CandidatureById',
    component: CandidaturesId,
    beforeEnter: ({ params }: any) => {
      if (Number.isNaN(params.id)) {
        return { path: '/' }
      }
    },
  },
  {
    path: '/candidatures/:id/edit',
    name: 'EditCandidatureById',
    component: EditCandidatureById,
    beforeEnter: ({ params }: any) => {
      if (Number.isNaN(params.id)) {
        return { path: '/' }
      }
    },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
