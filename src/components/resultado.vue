<script setup>

const props = defineProps({
  usuarios: Array
});
</script>

<template>
  <div class="container">
    <h1 class="h2">Resultado</h1>
    <ul class="ul">
      <li v-for="(usuario, index) in props.usuarios" :key="index">
        {{ usuario }} 
      </li>
    </ul>
  </div>
</template>

<style scoped>
.container {
    color: rgb(255, 255, 255);
    background-color: blue;
    border-radius: 6px;
    height: 375px;
    width: 450px;
    margin-left: 20px;
    border: solid 7px;
  }
.ul{
  margin-top: 40px;
  margin-left: 20px
}

.h2{
  color: black;
  margin-top: 20px;
  margin-left: 37%

}

</style>