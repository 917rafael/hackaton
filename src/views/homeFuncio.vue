<!--essa pagina é dedicada para os funcionarios somente-->

<script setup>
import { ref } from 'vue';
import Heade from '@/components/header.vue';
import Formulario from '@/components/formulario.vue';
import Resultado from '@/components/resultado.vue';

const usuarios = ref({})
const mostrarResultado = ref(false)

function clone(usuario) {
    usuarios.value = usuario;
    mostrarResultado.value = true
}

</script>

<template>
    <heade />

    <div class="nav">
        <button class="button" @click="salvar">Produtos vendidos</button>
        <button class="button" @click="salvar">Estoque de Produtos</button>
        <button class="button" @click="salvar">Consumo de Produtos</button>
        <button class="button" @click="salvar">Clientes Contribuintes</button>
        <button class="button" @click="salvar">Fornecedores</button>
        <button class="button" @click="salvar">Pedidos de Clientes</button>
    </div>
    <div class="head">
    
    </div>
    <div class="container">
    </div>
    
    <formulario @adicionar="clone" />
    <resultado v-if="mostrarResultado" :usuarios="usuarios" />

</template>

<style scoped>
/*essa partte é dedicada a div nav*/
/* Navegação */
.nav {
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* Centraliza os botões horizontalmente */
  gap: 15px; /* Espaçamento entre os botões */
  margin: 20px 0;
}

.button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 12px 24px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.button:hover {
  background-color: #0056b3;
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