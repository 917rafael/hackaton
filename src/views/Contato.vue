<script setup>
import inputs from '@/components/input.vue';
import headers from '@/components/header.vue';
</script>

<template>
  <headers />

  <div class="container">
    <div class="contato">
      <div class="info"></div>
      <div class="contate">
        <inputs  />
      </div>
    </div>
  </div>
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
  background-color: rgb(25, 0, 255);
  
}
</style>