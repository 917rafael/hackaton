<template>
  <headers />

  <section class="hero">
    <!-- Carrossel com transição de fade -->
    <div class="carousel-container">
      <transition name="slide-fade" mode="out-in">
        <img :src="images[currentIndex]" alt="Imagem do Carrossel" class="carousel-image" />
      </transition>
    </div>

    <div class="hero-text">
      <button class="cta-button">Aprender Mais</button>
    </div>

    <div class="products">
      <product-card v-for="produto in produtos" :key="produto.id" :produto="produto" />
    </div>
  </section>

  <div class="search-section">
    <hr class="divider" />
    <div class="search-bar">
        <input type="text" v-model="searchQuery" placeholder="Pesquisar produtos..." />
    </div>
  </div>

  <div class="product-main">
    <div class="product-list">
      <Product v-for="product in filteredProducts" :key="product.id" :product="product" />
    </div>
  </div>

  <div>
    <sacola />
  </div>

  <Fotter />
</template>

<script setup>
import headers from '@/components/FoHea/header.vue'
import ProductCard from '@/components/home/ProductCard.vue'
import { produtos } from '@/data/produtos'
import Product from '@/components/Product/Product.vue'
import sacola from '@/components/sacola.vue'
import Fotter from '@/components/FoHea/Footer.vue'
import { useProductStore } from '@/store/productStore'
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

import fundoHome from '../assets/image/fundohome.jpg'
import padaria from '../assets/image/padaria.jpg'
import desenhoFunco from '@/assets/image/imagem.jpg'

const images = ref([padaria, fundoHome, desenhoFunco])
const currentIndex = ref(0)

const nextImage = () => {
  currentIndex.value = (currentIndex.value + 1) % images.value.length
}

let interval = null
onMounted(() => {
  interval = setInterval(nextImage, 3000)
})

onBeforeUnmount(() => {
  if (interval) {
    clearInterval(interval)
  }
})

const productStore = useProductStore()
const searchQuery = ref('')

const filteredProducts = computed(() => {
  if (!searchQuery.value) return productStore.catalogProducts
  return productStore.catalogProducts.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})
</script>

<style scoped>
/* Fundo geral */
body {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

/* Hero Section */
.hero {
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0;
  overflow: hidden;
}

/* Carrossel e transição suave */
.carousel-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transform: translateX(-100%); /* Começa fora da tela à esquerda */
  animation: slideIn 3s ease-in-out forwards;
}

@keyframes slideIn {
  0% {
    opacity: 0;
    transform: translateX(-100%); /* Entrada da imagem da esquerda */
  }
  50% {
    opacity: 0.7;
    transform: translateX(10%); /* Aproxima da posição final */
  }
  100% {
    opacity: 1;
    transform: translateX(0); /* A imagem fica no lugar final */
  }
}

/* Transições de Slide e Fade */
.slide-fade-enter-active, .slide-fade-leave-active {
  transition: opacity 1s ease-in-out, transform 1s ease-in-out;
}

.slide-fade-enter, .slide-fade-leave-to {
  opacity: 0;
  transform: translateX(100%); /* A imagem sai da tela à direita */
}

/* Texto de chamada para ação */
.hero-text {
  position: relative;
  z-index: 1;
}

.cta-button {
  padding: 12px 25px;
  font-size: 18px;
  background-color: #ff5722;
  border: none;
  color: #fff;
  cursor: pointer;
  border-radius: 25px;
  transition: 0.3s;
}

.cta-button:hover {
  padding: 14px 28px;
}

/* Cards de produtos */
.products {
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
  flex-wrap: wrap;
  gap: 20px;
}

.product-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 20px;
}

@media (max-width: 768px) {
  .product-list {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .product-list {
    grid-template-columns: 1fr;
  }

  .cta-button {
    font-size: 16px;
    padding: 10px 20px;
  }
}

/* Seção de Pesquisa */
.search-section {
  text-align: center;
  margin: 60px 0;
  position: relative;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
}

.search-section:hover {
  background-color: #5f4d2b;
}

.divider {
  width: 100%;
  height: 4px;
  background: #ff9900;
  margin-bottom: 20px;
  border: none;
}

.search-bar {
  display: inline-block;
  background-color: #ffffff;
  padding: 10px;
  border-radius: 30px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.search-bar input {
  padding: 10px 20px;
  width: 300px;
  border: 2px solid #00796b;
  border-radius: 30px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s;
}

.search-bar input::placeholder {
  color: #aaa;
}

.search-bar input:focus {
  border-color: #ff5722;
  box-shadow: 0 0 5px rgba(255, 87, 34, 0.5);
}

/* Melhorias gerais */
.product-main {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
}
</style>
