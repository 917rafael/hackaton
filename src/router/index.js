import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

//import logClient from '@/views/logClient.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/logFuncio',
      name: 'logFuncio',
      component: () => import('../views/logFuncio.vue')
    },
    {
      path: '/logClient',
      name: 'logClient',
      component: () => import('../views/logClient.vue')
    },

  ]
})

export default router

