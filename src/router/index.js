import { createRouter, createWebHistory } from 'vue-router'


//import logClient from '@/views/logClient.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

  
    {
      path: '/contato',
      name: 'contato',
      component: () => import('../views/Contato.vue')
    },
    {
      path: '/teste',
      name: 'teste',
      component: () => import('../views/teste.vue')
    },
    {
      path: '/',
      name: 'home',
      component: () => import('../views/home.vue')
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

