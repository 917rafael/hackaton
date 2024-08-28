<script setup>
import { ref } from 'vue';
const isMenuOpen = ref(false);
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<template>
  <aside>
    <button class="hamburger" @click="toggleMenu">
      &#9776;
    </button>
    <div class="nav-bar" :class="{ open: isMenuOpen }">
      <div class="nav-item">Doces</div>
      <div class="nav-item">Salgados</div>
      <div class="nav-item">Pães</div>
    </div>
  </aside>
</template>

<style scoped>
/* Estilo para telas grandes */
@media (min-width: 768px) {
  .hamburger {
    display: none; /* Oculta o botão de hambúrguer em telas grandes */
  }

  .nav-bar {
    display: flex; /* Mostra a barra de navegação em telas grandes */
    flex-direction: row; /* Alinha os itens horizontalmente */
    position: static; /* Posiciona a barra de navegação no fluxo normal do documento */
  }
}

/* Estilo para telas pequenas */
@media (max-width: 767px) {
  .nav-bar {
    display: none; /* Oculta a navegação por padrão em telas pequenas */
    flex-direction: column; /* Organiza os itens em coluna */
    padding: 20px;
    background-color: white; /* Cor de fundo para a navegação */
    position: absolute; /* Posiciona a navegação em relação ao pai */
    top: 50px; /* Ajusta a posição em relação ao topo do pai */
    left: 0; /* Alinha a navegação ao lado esquerdo */
    width: 100%; /* Ocupa toda a largura disponível */
    z-index: 1000; /* Garante que a navegação fique sobre outros elementos */
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); /* Adiciona sombra para destaque */
    transition: opacity 0.3s, visibility 0.3s; /* Transição suave para visibilidade */
    opacity: 0; /* Inicialmente invisível */
    visibility: hidden; /* Inicialmente invisível */
  }

  .nav-bar.open {
    display: flex; /* Exibe a navegação quando o menu está aberto */
    opacity: 1; /* Torna a navegação visível */
    visibility: visible; /* Torna a navegação visível */
  }

  .hamburger {
    font-size: 30px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 10px;
    position: relative; /* Garante que o botão seja posicionado corretamente em relação ao pai */
    z-index: 1100; /* Garante que o botão fique sobre outros elementos */
  }
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
