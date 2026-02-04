// src/router/index.js
import { createWebHistory, createRouter } from 'vue-router'
import Home from '../views/Home.vue' // Example home component
import About from '../views/About.vue' // Example about component
import CandidaturesId from '../views/CandidatureById.vue'
import EditCandidatureById from '../views/EditCandidatureById.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/candidatures/:id',
    name: 'CandidatureById',
    component: CandidaturesId,
    beforeEnter: ({ params }: any) => {
      const id = Number(params.id)

      if (Number.isNaN(id)) {
        return { path: '/' }
      }
    },
  },
  {
    path: '/candidatures/:id/edit',
    name: 'EditCandidatureById',
    component: EditCandidatureById,
    beforeEnter: ({ params }: any) => {
      const id = Number(params.id)

      if (Number.isNaN(id)) {
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
