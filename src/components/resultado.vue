<!-- eslint-disable vue/multi-word-component-names -->
<script setup>

const props = defineProps({
  usuarios: Array
});
</script>

<template>
  <div class="container">
    <h1 class="h1">Resultado</h1>
    <p class="resultado">
      <p v-for="(usuario, index) in props.usuarios" :key="index">
        {{ usuario }} 
      </p>
    </p>
  </div>
</template>

<style scoped>
.container {
    color: #f8cb98;
    background-color: rgb(102, 65, 16);
    border-radius: 6px;
    height: 375px;
    width: 450px;
    margin-left: 20px;
    border: solid 7px;
  }
.resultado{
  margin-top: 40px;
  margin-left: 20px;
  color: black;
  text-decoration: none;
}

.h1 {
  color: black;
  margin-top: 20px;
  margin-left: 37%
}

</style>