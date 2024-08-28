<script setup>
import headers from '@/components/header.vue'
import ProductCard from '@/components/ProductCard.vue'
import back from '@/assets/image/fundohome.jpg'
import navbar from '@/components/NavDireita.vue'

import { produtos } from '@/data/produtos'


</script>

<template>
  <headers />
    <section class="hero" :style="{ backgroundImage: `url(${back})` }">
      <div class="hero-text">
        <h1>Whole Grain Goodness in Every Slice of Wheat Bread</h1>
        <p class="hero-p">One bite and you'll switch to whole wheat bread</p>
        <button class="cta-button">Learn More</button>
      </div>
      
      <div class="products">
        <product-card v-for="produto in produtos" :key="produto.id" :produto="produto" />
      </div>
    </section>
    <div class="container">
      <article class="produtos">

      </article>
    </div>
    <div>
    <navbar />
    </div>
</template>

<style scoped>
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

</style>

