import { createRouter, createWebHistory } from 'vue-router'
import { authGuard } from '@/middleware/auth' // Importa o middleware

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/Rendimento',
      name: 'rendimento',
      component: () => import('../views/Rendimento.vue')
    },
    {
      path: '/Estoque',
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
      component: () => import('../views/homeFuncio.vue'),
      meta: { requiresAuth: true } // Rota protegida
    },
    {
      path: '/',
      name: 'home',
      component: () => import('../views/home.vue')
    },

    {
      path: '/CadastroFuncio',
      name: 'CadastroFuncio',
      component: () => import('../views/cadastroFuncio.vue'),
      meta: { requiresAuth: true, allowedCodes: [9876, 4576] } // Rota protegida
    },
    {
      path: '/Cadastro',
      name: 'Cadastro',
      component: () => import('../views/CadastroClient.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/logFuncio.vue')
    }
  ]
})

// Aplica o middleware em cada rota
// router.beforeEach(authGuard)

export default router
