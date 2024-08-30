<template>
    <div class="product-list">
      <ProductCard v-for="product in products" :key="product.id" :product="product"/>
    </div>
  </template>
  
  <script setup>
  import back from '@/assets/image/back.jpg'
  import ProductCard from '@/components/Produtos.vue';

  
  const products = [
    {
      id: 1,
      name: 'pega o pao caraio',
      image: back,
      rating: 2,
      reviews: 1,
      oldPrice: 229.99, 
      currentPrice: 179.99,
      discount: 21,
      discountText: 'Mais barato no app!',
      installments: '3x de R$ 59,99 sem juros no cartão de crédito',  
    },
    {
      id: 1,
      name: 'pega o pao caraio',
      image: back,
      rating: 2,
      reviews: 1,
      oldPrice: 229.99, 
      currentPrice: 179.99,
      discount: 21,
      discountText: 'Mais barato no app!',
      installments: '3x de R$ 59,99 sem juros no cartão de crédito',  
    },
    {
      id: 1,
      name: 'pega o pao caraio',
      image: back,
      rating: 2,
      reviews: 1,
      oldPrice: 229.99, 
      currentPrice: 179.99,
      discount: 21,
      discountText: 'Mais barato no app!',
      installments: '3x de R$ 59,99 sem juros no cartão de crédito',  
    },
    {
      id: 1,
      name: 'pega o pao caraio',
      image: back,
      rating: 5,
      reviews: 1,
      oldPrice: 229.99, 
      currentPrice: 179.99,
      discount: 21,
      discountText: 'Mais barato no app!',
      installments: '3x de R$ 59,99 sem juros no cartão de crédito',  
    },
    {
      id: 1,
      name: 'pega o pao caraio',
      image: back,
      rating: 2,
      reviews: 1,
      oldPrice: 229.99, 
      currentPrice: 179.99,
      discount: 21,
      discountText: 'Mais barato no app!',
      installments: '3x de R$ 59,99 sem juros no cartão de crédito',  
    },
    
    

   
  ];
  </script>
  
  <style scoped>
.product-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  padding: 20px;
}
</style>


  