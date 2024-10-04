<script setup>
import Heade from '@/components/header.vue';
import Input from '@/components/pergunta.vue';
import Formulario from '@/components/formulario.vue';
import Resultado from '@/components/resultado.vue';

const usuarios = ref({})
const mostrarResultado = ref(false)

function clone(usuario) {
    usuarios.value = usuario;
    mostrarResultado.value = true



</script>

<template>
    <heade />

    <div>
        <h1>Registro de vendas</h1>
    </div>

    <div class="container">
      
    </div>

</template>

<style scoped></style>