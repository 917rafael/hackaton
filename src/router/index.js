import { createRouter, createWebHistory } from 'vue-router'
//import { UseAuthGuard } from '@/middleware/auth' // Importa o middleware

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/pagamento',
      name: 'pagamento',
      component: () => import('../views/pagamento.vue')
    },
    {
      path: '/Perfil',
      name: 'perfil',
      component: () => import('../views/perfil.cleint/Perfil.vue')
    },
    {
      path: '/pedidosclient',
      name: 'pedidosclient',
      component: () => import('../views/PedidosClient.vue')
    },
    {
      path: '/endereco',
      name: 'endereco',
      component: () => import('../views/CadEndereco.vue'),
      meta: { requiresAuth: true } // Exige autenticação e tipo 'funcionario'
    },
    {
      path: '/rendimento',
      name: 'rendimento',
      component: () => import('../views/Navbar-perfil/Rendimento.vue'),
      meta: { requiresAuth: true, allowedTypes: ['funcionario'] } // Exige autenticação e tipo 'funcionario'

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
      component: () => import('../views/homeFuncio.vue'),
      meta: { requiresAuth: true, allowedTypes: ['funcionario'] } // Exige autenticação e tipo 'funcionario'
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
      meta: { requiresAuth: true, allowedCodes: ['funcionario'] } 
    },
    {
      path: '/Cadastro',
      name: 'Cadastro',
      component: () => import('../views/CadastroClient.vue')
    },

    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/product/:id',
      name: 'product',
      component: () => import('../components/Product/Card.vue'),
      props: true, 
    }
  ]
})

// Aplica o middleware em cada rota
// router.beforeEach(UseAuthGuard)

export default router
