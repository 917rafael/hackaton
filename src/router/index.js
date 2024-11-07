import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/pedidosclient',
      name: 'pedidosclient',
      component: () => import('../views/PedidosClient.vue')
    },
    {
      path: '/endereco',
      name: 'endereco',
      component: () => import('../views/CadEndereco.vue')
    },
    {
      path: '/Rendimento',
      name: 'rendimento',
      component: () => import('../views/Rendimento.vue')
    },
    {
      path: '/Estoque',
      name: 'estoque',
      component: () => import('../views/EstoquEE.vue')
    },
    {
      path: '/contato',
      name: 'contato',
      component: () => import('../views/Contato.vue')
    },
    {
      path: '/homeFuncio',
      name: 'homeFuncio',
      component: () => import('../views/homeFuncio.vue')
    },
    {
      path: '/',
      name: 'home',
      component: () => import('../views/home.vue')
    },

    {
      path: '/CadastroFuncio',
      name: 'CadastroFuncio',
      component: () => import('../views/cadastroFuncio.vue')
    },
    {
      path: '/logClient',
      name: 'logClient',
      component: () => import('../views/logClient.vue')
    },
    {
      path: '/logFuncio',
      name: 'logFuncio',
      component: () => import('../views/logFuncio.vue')
    }
  ]
})

export default router
