<script setup>
import Input from '@/components/input.vue';
import headers from '@/components/header.vue';
import fundo from '@/assets/image/fundopadaria.avif'

import {perguntas} from '@/data/perguntas.js'

</script>

<template>
  <headers />
  <section class="hero" :style="{ backgroundImage: `url(${fundo})` }">
  <div class="container">
    <div class="contato">
      <div class="info"></div>
      <div class="contate">
        <Input v-for="pergunta in perguntas" :key="pergunta.id" :pergunta="pergunta" />
      </div>
    </div>
  </div>
  </section>
</template>

<style scoped>
.nome{
  margin-left: 50px;
}
.custom-input {
  padding: 10px 15px;
  font-size: 16px;
  border-radius: 5px;
  outline: none;
  transition: border-color 0.3s ease;
  color: aliceblue;
  background-color: rgb(0, 0, 0);
}

.custom-input::placeholder {
  color: #504e4e;
  font-style: italic; 
}
.container { 
  display: flex;
  align-items: center;
  justify-content: center;
  height: 75vh;
  width: 100%;
}

.contato {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50vh;
  width: 95vh;
  background-color: rgb(230, 176, 176);
  border-radius: 2.567%;
}

.info { 
  margin-left: 15px;
  height: 90%;
  width: 50%;
  background-color: rgb(87, 79, 155);
}

.contate {
  margin-right: 15px;
  height: 90%;
  width: 50%;
  background-color: rgb(221, 187, 149);
 
}
.hero {
  position: relative;
  height: 100vh;
  
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
}
</style>