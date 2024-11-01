<script setup>
import headers from '@/components/FoHea/header.vue'
import ProductCard from '@/components/home/ProductCard.vue'
import back from '@/assets/image/fundohome.jpg'
//import { products } from '@/data/cardapio';
import { produtos } from '@/data/produtos';
import Product from '@/components/Product/Produtc.vue';
import sacola from '@/components/sacola.vue';
import Fotter from '@/components/FoHea/Footer.vue'
import { useProductStore } from '@/store/productStore';
import { ref, computed } from 'vue';

const productStore = useProductStore();
const searchQuery = ref('');

const filteredProducts = computed(() => {
  if (!searchQuery.value) return productStore.catalogProducts;
  return productStore.catalogProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
</script>

<template>
  <headers />

  <section class="hero" :style="{ backgroundImage: `url(${back})` }">
    <div class="hero-text">
      <h1>Whole Grain Goodness in Every Slice of Wheat Bread</h1>
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

<style scoped>
.div-product {
  max-width: 800px; /* largura desejada */
  margin: 0 auto; /* centralizar a div */
  padding: 10px; /* separar a lista de produtos da borda */
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

.hero-text h1 {
  font-size: 48px;
  margin-bottom: 20px;
  font-weight: bold;
  color: white;
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
  margin-top: 40px; /* Espaçamento superior aumentado */
}

.search-section {
  text-align: center;
  margin: 60px 0; /* Aumentar a margem superior e inferior */
  position: relative;
  background-color: #e0f7fa; /* Fundo da seção de pesquisa */
  padding: 20px; /* Espaçamento interno */
  border-radius: 10px; /* Borda arredondada */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); /* Sombra */
}

.divider {
  width: 100%;
  height: 2px;
  background: #00796b; /* Cor da divisória */
  margin-bottom: 20px;
  border: none;
}

.search-bar {
  display: inline-block;
  background-color: #ffffff; /* Fundo da barra de pesquisa */
  padding: 10px; /* Espaçamento interno */
  border-radius: 30px; /* Borda arredondada */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Sombra */
}

.search-bar input {
  padding: 10px 20px; /* Espaçamento interno ajustado */
  width: 300px; /* Largura da barra de pesquisa */
  border: 2px solid #00796b; /* Borda da barra de pesquisa */
  border-radius: 30px; /* Borda arredondada */
  font-size: 16px; /* Tamanho da fonte */
  outline: none; /* Remover contorno ao focar */
  transition: border-color 0.3s; /* Transição suave para a borda */
}

.search-bar input::placeholder {
  color: #aaa; /* Cor do texto do placeholder */
}

.search-bar input:focus {
  border-color: #ff5722; /* Cor da borda ao focar */
  box-shadow: 0 0 5px rgba(255, 87, 34, 0.5); /* Sombra ao focar */
}
</style>

