<script setup>
defineProps(['produto'])
</script>

<template>
  <div class="product-card">
    <div class="price-circle">$ {{produto.price}}</div>
    <img :src="produto.img" alt="Bread 1" />
    <div class="product-info">
      <p>{{produto.description}}</p>
      <button class="buy-button">Buy Now</button>
    </div>
  </div>
</template>

<style scoped>

.product-card {
  margin-left: 5px;
  position: relative;
  background: rgba(255, 255, 255, 0.9);
  border: solid 5px rgb(110, 58, 27);
  border-radius: 10px;
  overflow: hidden;
  text-align: center;
  color: #333;
  width: 30%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  transition: 0.5s
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

.product-card:hover {
    background-color: #beb5b5;
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
  color: #ffffff;
  cursor: pointer;
  border-radius: 25px;
  transition: background-color 0.3s ease;
}

.buy-button:hover {
  background-color: #e64a19;
}
</style>