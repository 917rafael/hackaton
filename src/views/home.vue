<script setup>
import back from '@/assets/image/back.jpg'
import bread1 from '@/assets/image/backg.avif'
import bread2 from '@/assets/image/back.jpg'
import bread3 from '@/assets/image/backg.avif'
</script>

<template>
  
  <div class="container">
    <header class="header">
      <div class="logo">Take a Deep Bread</div>
      <nav>
        <ul class="nav-links">
          <li><router-link to="/contato">sla descido depoiso </router-link></li>
          <li><router-link to="/contato">produtos</router-link></li>
          <li><router-link to="/contato"></router-link></li>
          <li><router-link to="/contato">Contato</router-link></li>
        </ul>
      </nav>
    </header>

    <section class="hero" :style="{ backgroundImage: `url(${back})` }">
      <div class="hero-text">
        <h1>Whole Grain Goodness in Every Slice of Wheat Bread</h1>
        <p>One bite and you'll switch to whole wheat bread</p>
        <button class="cta-button">Learn More</button>
      </div>
      
      <div class="products">
        <div class="product-card">
          <div class="price-circle">$3</div>
          <img :src="bread1" alt="Bread 1">
          <div class="product-info">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <button class="buy-button">Buy Now</button>
          </div>
        </div>

        <div class="product-card">
          <div class="price-circle">$3</div>
          <img :src="bread2" alt="Bread 2">
          <div class="product-info">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <button class="buy-button">Buy Now</button>
          </div>
        </div>

        <div class="product-card">
          <div class="price-circle">$3</div>
          <img :src="bread3" alt="Bread 3">
          <div class="product-info">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <button class="buy-button">Buy Now</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>

.container {
  font-family: 'Arial', sans-serif;
  color: #fff;
}


.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.85);
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.logo {
  font-size: 24px;
  font-weight: bold;
  color: #ff5722;
}

.nav-links {
  display: flex;
  list-style: none;
}

.nav-links li {
  margin-right: 20px;
}

.nav-links a {
  text-decoration: none;
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  padding: 8px 16px;
  transition: background-color 0.3s ease;
}

.nav-links a:hover {
  background-color: #ff5722;
  border-radius: 4px;
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
}

.products {
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
}

.product-card {
  position: relative;
  background: rgba(255, 255, 255, 0.9);
  border: solid 5px rgb(110, 58, 27);
  border-radius: 10px;
  overflow: hidden;
  text-align: center;
  color: #333;
  width: 30%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.product-card img {
  width: 100%;
  height: auto;
  display: block;
}

.price-circle {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #ff5722;
  color: #fff;
  border-radius: 50%;
  padding: 10px;
  font-size: 18px;
  font-weight: bold;
}

.product-info {
  padding: 15px;
}

.product-info p {
  font-size: 14px;
  margin-bottom: 20px;
}

.buy-button {
  padding: 10px 20px;
  background-color: #ff5722;
  border: none;
  color: #fff;
  cursor: pointer;
  border-radius: 25px;
  transition: background-color 0.3s ease;
}

.buy-button:hover {
  background-color: #e64a19;
}
</style>
