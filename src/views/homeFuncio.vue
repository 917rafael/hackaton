<script setup>
import { ref } from 'vue';
import Heade from '@/components/header.vue';
import Input from '@/components/input.vue';
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
    <div class="head">
        <h1>Registro de vendas - Padaria Santo Pão</h1>
    </div>
    <div class="container">
    </div>
    <formulario @adicionar="clone" />
    <resultado v-if="mostrarResultado" :usuarios="usuarios" />


</template>

<style scoped>
.head {
    background-color: #f4e1d2;
}

.container {
    background-color: #f4e1d2;
}
</style>