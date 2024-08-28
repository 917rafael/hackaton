<script setup>
import { ref } from 'vue';
const isMenuOpen = ref(false);
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

</script>

<template>
  <aside>
    <button class="hamburger" @click="toggleMenu">&#9776; </button>    
    <div class="nav-bar" :class="{ open: isMenuOpen }">
      <div class="nav-item">Doces</div>
      <div class="nav-item">Salgados</div>
      <div class="nav-item">Pães</div>
    </div>
  </aside>
</template>

<style scoped>
/* Estilos para o botão hamburger */
.hamburger {
  font-size: 30px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
}

.nav-bar {
  background-color: white;
  display: flex;
  flex-direction: column; 
  padding: 20px;
  display: none; 
}

.nav-bar.open {
  display: flex;
}

.nav-item {
  margin-bottom: 10px;
  cursor: pointer;
  padding: 10px;
  border-radius: 5px;
  transition: background-color 0.3s;
  width: 90px;
}

.nav-item:hover {
  background-color: #ff3333;
}
</style>
