<template>
    <div class="product-list">
      <ProductCard v-for="product in products":key="product.id":product="product"/>
    </div>
  </template>
  
  <script setup>
  import back from '@/assets/image/back.jpg'
  import ProductCard from '@/components/Produtos.vue';
  import produto2 from '@/components/produto2.vue';
  
  const products = [
    {
      id: 1,
      name: 'pega o pao caraio',
      image: back, // Substitua pelo link da imagem real
      rating: 2,
      reviews: 1,
      oldPrice: 229.99, //desconto
      currentPrice: 179.99,
      discount: 21, //desconto porcentagem de desconto
      discountText: 'Mais barato no app!',
      installments: '3x de R$ 59,99 sem juros no cartão de crédito', //escrita em baixo do preço 
    },
    

    // Adicione mais produtos conforme necessário
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


  