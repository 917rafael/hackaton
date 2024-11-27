import { createRouter, createWebHistory } from 'vue-router'
// import { authGuard } from '@/middleware/auth' // Importa o middleware

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/Perfil',
      name: 'perfil',
      component: () => import('../views/perfil.cleint/Perfil.vue')
    },
    {
      path: '/configurações',
      name: 'configuracoes ',
      component: () => import('../views/Navbar-perfil/configuracoe.vue')
    },
    {
      path: '/notificações',
      name: 'notificacoes ',
      component: () => import('../views/Navbar-perfil/notificacoes.vue')
    },
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
      path: '/rendimento',
      name: 'rendimento',
      component: () => import('../views/Navbar-perfil/Rendimento.vue')
    },
    {
      path: '/Estoque',
      name: 'estoque',
      component: () => import('../views/EstoquEE.vue')
    },
    {
      path: '/homeFuncio',
      name: 'homeFuncio',
      component: () => import('../views/homeFuncio.vue')
      //meta: { requiresAuth: true }  Rota protegida
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
      path: '/contato',
      name: 'contato',
      component: () => import('../views/Contato.vue')
    }
  ]
})

// Aplica o middleware em cada rota
// router.beforeEach(authGuard)

export default router
