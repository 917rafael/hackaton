<script setup>
defineProps(['produto'])
</script>

<template>
  <div class="promo-container">
    <div class="product-card">
      <div class="price-circle">R$ {{ produto.price }}</div>
      <img :src="produto.img" alt="Promoção" class="product-image" />
      <div class="product-info">
        <h3 class="product-title">{{ produto.title }}</h3>
        <p class="product-description">{{ produto.description }}</p>
        <button class="buy-button">Comprar Agora</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.promo-container {
  left: 100%;
  display: flex;
  flex-wrap: wrap; 
  align-items: flex-start;
  justify-content: flex-start; 
  gap: 15px; 
  padding: 20px 0;
  margin: 0; 
  padding-left: 5px; 
}

.product-card {
  left: 115%;
  position: relative;
  background: #fff8e7; 
  border: 3px solid #d9a35b; 
  border-radius: 15px;
  overflow: hidden;
  text-align: center;
  width: 100%;
  max-width: 300px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.3);
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-bottom: 2px solid #f2c98a;
}

.price-circle {
  position: absolute;
  top: 15px;
  right: 15px;
  background-color: #f4a261; 
  color: #ffffff;
  border-radius: 50%;
  padding: 10px 15px;
  font-size: 1.2rem;
  font-weight: bold;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.product-info {
  padding: 20px 15px;
}

.product-title {
  font-size: 1.4rem;
  font-weight: bold;
  color: #a66127; 
  margin-bottom: 10px;
}

.product-description {
  font-size: 1rem;
  color: #6b4f2b; 
  margin-bottom: 20px;
}

.buy-button {
  padding: 10px 20px;
  background-color: #d97706; 
  color: #ffffff;
  border: none;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 25px;
  cursor: pointer;
  transition: transform 0.3s ease, background-color 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.buy-button:hover {
  background-color: #b35c04;
  transform: translateY(-2px);
}

.buy-button:active {
  transform: translateY(0);
}

@media (max-width: 768px) {
  .promo-container {
    gap: 10px;
    padding-left: 5px; 
  }

  .product-card {
    max-width: 45%; 
  }

  .price-circle {
    font-size: 1rem;
    padding: 8px 12px;
  }

  .product-title {
    font-size: 1.2rem;
  }

  .product-description {
    font-size: 0.9rem;
  }

  .buy-button {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .promo-container {
    flex-direction: column; 
    gap: 15px;
  }

  .product-card {
    max-width: 100%;
  }

  .price-circle {
    font-size: 0.9rem;
    padding: 6px 10px;
  }

  .product-title {
    font-size: 1rem;
  }

  .product-description {
    font-size: 0.8rem;
  }

  .buy-button {
    font-size: 0.8rem;
    padding: 8px 16px;
  }
}
</style>
