import { createRouter, createWebHistory } from 'vue-router'
import { authGuard } from '@/middleware/auth' // Importa o middleware

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:  '/pedidosclient',
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
    //login esta certo

    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/product/:id',
      name: 'product',
      component: () => import('../components/Product/Card.vue'),
      props: true, // Passa o ID do produto como prop
    }
  ]
})

// Aplica o middleware em cada rota
// router.beforeEach(authGuard)

export default router

