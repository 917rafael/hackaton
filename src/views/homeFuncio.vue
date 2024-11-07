<!--essa pagina é dedicada para os funcionarios somente-->

<script setup>
import { ref } from 'vue'
import Heade from '@/components/FoHea/header.vue'
import Formulario from '@/components/formulario.vue'
import Resultado from '@/components/resultado.vue'
import { useAuthStore } from '@/store/auth'
import { RouterLink } from 'vue-router'

const usuarios = ref({})
const authStore = useAuthStore()
const mostrarResultado = ref(false)

function clone(usuario) {
  usuarios.value = usuario
  mostrarResultado.value = true
}
</script>

<template>
  <div class="background">
    <img src="/src/assets/image/padaria-transformed.jpeg" alt="Padaria" class="padaria-img" />
  </div>
  <heade />
  <div class="nav">
    <button class="button" @click="salvar">Produtos vendidos</button>
    <router-link to="/estoque">
      <button class="button" @click="salvar">Manipulação de produtos/estoque</button>
    </router-link>

    <router-link to="/pedidosclient">
      <button class="button" @click="salvar">Pedidos dos Clientes</button>
    </router-link>

    <button class="button" @click="salvar">Fornecedores</button>

    <button class="button" @click="salvar">Pedidos de Clientes</button>
  </div>

  <div class="head"></div>
  <div class="container"></div>
  <formulario @adicionar="clone" />
  <resultado v-if="mostrarResultado" :usuarios="usuarios" />
</template>

<style scoped>
.nav {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
  margin: 20px 0;
  margin-top: 30px;
  margin-bottom: 30px;
}

.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.padaria-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.7);
}

.button {
  background-color: rgba(59, 24, 3, 0.808);
  color: #fff;
  border: none;
  padding: 12px 24px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition:
    background-color 0.3s,
    transform 0.2s;
}

.button:hover {
  background-color: #ff4800;
  transform: scale(1.05);
}

.button:active {
  transform: scale(0.98);
}

/* Responsividade */
@media (max-width: 768px) {
  .nav {
    flex-direction: column;
    align-items: center;
  }

  .button {
    width: 100%;
    max-width: 300px;
  }
}
/**/

.head {
  background-color: #f4e1d2;
}

.container {
  background-color: #f4e1d2;
}
</style>
