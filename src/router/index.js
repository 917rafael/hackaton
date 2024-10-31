import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/Pagamento',
      name: 'pagamento',
      component: () => import('../views/CadEndereco.vue')
    },  
    {
      path:'/Rendimento',
      name: 'rendimento',
      component: () => import('../views/Rendimento.vue')
    },  
    {
      path:'/Estoque',
      name: 'estoque',
      component: () => import('../views/Estoque.vue')
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