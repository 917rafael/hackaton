<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import headers from '@/components/FoHea/header.vue'
import ProductCard from '@/components/home/ProductCard.vue'
import { produtos } from '@/data/produtos.js'
import Product from '@/components/Product/Product.vue'
import sacola from '@/components/sacola.vue'
import Fotter from '@/components/FoHea/Footer.vue'
import { useProductStore } from '@/store/productStore'
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import fundoHome from '../assets/image/fundohome.jpg'
import padaria from '../assets/image/padaria.jpg'
import Card from '@/components/Product/Card.vue'
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
const isModalVisible = ref(false);

const toggleModal = () => {
  isModalVisible.value = !isModalVisible.value;
};


const filteredProducts = computed(() => {
  if (!searchQuery.value) return productStore.products;
  return productStore.products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

onMounted(async () => {
  await productStore.fetchProducts()
});
</script>


<template>
  

  <section class="hero">
    
    <div class="carousel-container">
      <headers />
      <div class="carousel-slider" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
        <img v-for="(image, index) in images" :key="index" :src="image" alt="Imagem do Carrossel" class="carousel-image" />
      </div>
    </div>

    <div class="tradicao">
      <!-- <img src="../assets/image/tradicao2.png" alt=""> -->
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

  <div class="product-main" >
    <div class="product-list" @click.self="toggleModal" >
      <Product v-for="product in filteredProducts" :key="product.id" :product="product" />
    </div>
  </div>
<div v-if="isModalVisible" >
  <Card />
</div>
  <div>
    <sacola />
  </div>

  <Fotter />
</template>

<style scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10; 
  background-color: transparent;
  padding: 10px 20px;
  box-sizing: border-box; 
  height: 100px; 
  transition: 0.5s;
}
 body {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
} 

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

.carousel-container {
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.carousel-slider {
  display: flex;
  width: 100%;
  height: 100%;
  transition: transform 1s ease-in-out; 
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  flex-shrink: 0;
}


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

.product-main {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
}
</style>
