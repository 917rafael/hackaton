<!--esse componente são os dados da nav do home -->

<script setup>
import { ref } from 'vue'
const isMenuOpen = ref(false)
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <aside>
    <button class="hamburger" @click="toggleMenu">&#9776;</button>
    <div class="nav-bar" :class="{ open: isMenuOpen }">
      <div class="nav-item">Doces</div>
      <div class="nav-item">Salgados</div>
      <div class="nav-item">Pães</div>
    </div>
  </aside>
</template>

<style scoped>
@media (min-width: 768px) {
  .hamburger {
    display: none;
  }

  .nav-bar {
    display: flex;
    flex-direction: row;
    position: static;
  }
}

@media (max-width: 767px) {
  .nav-bar {
    display: none;
    flex-direction: column;
    padding: 20px;
    background-color: white;
    position: absolute;
    top: 50px;
    left: 0;
    width: 100%;
    z-index: 1000;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    transition:
      opacity 0.3s,
      visibility 0.3s;
    opacity: 0;
    visibility: hidden;

    .nav-bar.open {
      display: flex;
      opacity: 1;
      visibility: visible;
    }

    .hamburger {
      font-size: 30px;
      background: none;
      border: none;
      cursor: pointer;
      padding: 10px;
      position: relative;
      z-index: 1100;
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
  }
}
</style>
