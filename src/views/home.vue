<script setup>
import headers from '@/components/FoHea/header.vue'
import ProductCard from '@/components/home/ProductCard.vue'
import back from '@/assets/image/fundohome.jpg'
import { products } from '@/data/cardapio';
import { produtos } from '@/data/produtos';
import Product from '@/components/Product/Produtc.vue';
import sacola from '@/components/sacola.vue';


import { useProductStore } from '@/store/productStore'
const productStore = useProductStore()

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
    <div class="product-main">
    <div class="product-list">
      <Product v-for="product in productStore.catalogProducts" :key="product.id" :product="product"/>
    </div> 
  </div>
    
    <div>
      <sacola />
    </div>
    
</template>

<style scoped>
.div-product {
  max-width: 800px; /*a largura desejada */
  margin: 0 auto; /*centralizar a div */
  padding: 10px; /*separar a lista de produtos da borda */
}

.product-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 10px;
  gap: 10px;
}

.hero-p{
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
}
</style>