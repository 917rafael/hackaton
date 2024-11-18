<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import headers from '@/components/FoHea/header.vue'
import ProductCard from '@/components/home/ProductCard.vue'
import back from '@/assets/image/fundohome.jpg'
import { produtos } from '@/data/produtos'
import Product from '@/components/Product/Produtc.vue'
import sacola from '@/components/sacola.vue'
import Fotter from '@/components/FoHea/Footer.vue'
import { useProductStore } from '@/store/productStore'
import Slogan from "@/assets/image/tadica-removebg-preview.png";

import { ref, onMounted } from 'vue';
import { supabase } from '@/lib/supabaseClient';

const productStore = useProductStore();

// Carregar produtos no Supabase
const fetchProducts = async () => {
  const { data, error } = await supabase.from('products').select('*');
  if (error) {
    console.error('Erro ao buscar produtos:', error.message);
  } else {
    productStore.products = data;
  }
};

onMounted(fetchProducts);
</script>

<template>
  <headers />

  <section class="hero" :style="{ backgroundImage: `url(${back})` }">
    <div class="hero-text">
      <img :src="Slogan" alt="Slogan" class="slogan-image" />
      <p class="hero-p"></p>
      <button class="cta-button">Aprender Mais</button>
    </div>

    <div class="products">
      <product-card v-for="produto in produtos" :key="produto.id" :produto="produto" />
    </div>
  </section>

  <!-- Barra de Pesquisa com Estilo Aprimorado -->
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

<style>
body {
  background-image: url('../src/assets/image/FundoSite.png'); /* Use a imagem de fundo */
}
</style>

<style scoped>
body {
  background-image: url('@/assets/image/FundoSite.png'); /* Use a imagem de fundo */
  background-size: cover; /* Faz a imagem cobrir toda a tela */
  background-position: center; /* Centraliza a imagem */
  background-repeat: no-repeat; /* Não repete a imagem */
}

.div-product {
  max-width: 800px;
  margin: 0 auto;
  padding: 10px;
}

.product-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 10px;
  gap: 10px;
}

.hero-p {
  color: white;
}

.hero {
  position: relative;
  height: 100vh;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
}

.slogan-image {
  width: 100%;
  max-width: 5000px; 
  height: auto; 
}

.hero-text p {
  font-size: 18px;
  margin-bottom: 20px;
}

.cta-button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #ff5722;
  border: none;
  color: #fff;
  cursor: pointer;
  border-radius: 25px;
  transition: 0.3s;
}

.cta-button:hover {
  padding: 15px 30px;
}

.products {
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
}

.product-list {
  gap: 16px;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 60%;
  flex-wrap: wrap;
}

.product-main {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px; 
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
</style>
