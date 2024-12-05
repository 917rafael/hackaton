<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})


import Card from './Card.vue'
// import { fetchProducts } from '@/data/produtos';
import { products } from '@/data/cardapio'
import { ref, reactive, onMounted } from 'vue'
// import { supabase } from '@/lib/supabaseClient';
import { useProductStore } from '@/store/productStore.js'
const isModalVisible = ref(false)
const productselected = ref({})


const toggleModal = (id) => {
  const findproduct = products.find((product) => product.id === id)
  productselected.value = findproduct
  isModalVisible.value = !isModalVisible.value
}
console.log('Produto recebido:', props.product.id);


onMounted(() => {
  useProductStore();
});

</script>


<template>
  <div class="product-card" role="button" tabindex="0"  @click="$router.push(`/product/${product.id}`) && toggleModal">
    <div class="product-info">
      <img :src="product.image_url" :alt="product.name" class="product-image" />
      <h2 class="product-name">{{ product.name }}</h2>


      <div class="product-rating">
        <span v-for="n in 5" :key="n" class="star" :class="{ filled: n <= 4.5 }">★</span>
        <span class="reviews"> {{ product.reviews }} avaliações</span>
      </div>


      <div class="product-price">
        <!-- <span v-if="product.oldPrice" class="old-price">R$ {{ product.oldPrice }}</span> -->
        <!-- <span v-if="product.discount" class="discount">{{ product.discount }}%</span> -->
      </div>


      <div class="current-price">
        <strong>R$ {{ product.price }}</strong>
      </div>


      <div class="installments" v-if="product.installments">
        {{ product.installments }}
      </div>

    </div>
  </div>


  <Card v-if="isModalVisible" :productselected="product" @close=false />

</template>


<style scoped>
.product-card {
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0.5, 0.5, 0.6);
  overflow: hidden;
  width: 250px;
  /* Largura fixa para o cartão */
  margin: 1rem auto;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 400px;
  /* Altura fixa para o cartão */
}

.product-card:focus {
  outline: 2px solid #007bff;
}

.product-image {
  width: 100%;
  height: 180px;
  /* Tamanho fixo para a altura da imagem */
  object-fit: cover;
  /* A imagem se ajusta sem distorcer */
  border-radius: 8px;
  margin-bottom: 15px;
}

.product-info {
  text-align: center;
  padding: 0 10px;
  width: 100%;
  flex-grow: 1;
  /* Garante que a info ocupe o restante do espaço */
}

.product-name {
  font-size: 1em;
  margin-bottom: 8px;
  color: #333;
}

.product-rating {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.star {
  color: #e0e0e0;
}

.star.filled {
  color: gold;
}

.reviews {
  margin-left: 8px;
  font-size: 0.8em;
  color: #777;
}

.product-price {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.old-price {
  font-size: 0.8em;
  color: #999;
  text-decoration: line-through;
  margin-right: 5px;
}

.discount {
  color: green;
  font-size: 0.8em;
}

.current-price {
  font-size: 1.2em;
  color: #007bff;
  font-weight: bold;
  margin-bottom: 5px;
}

.installments {
  font-size: 0.8em;
  color: #777;
}


.product-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
}


@media (max-width: 768px) {
  .product-card {
    width: 90%;
    /* O cartão ocupará 90% da largura da tela */
  }
}


@media (max-width: 480px) {
  .product-card {
    width: 100%;
    /* O cartão ocupará 100% da largura em telas muito pequenas */
  }

  .product-name {
    font-size: 1em;
  }

  .current-price {
    font-size: 1.2em;
  }

  .product-rating {
    font-size: 0.8em;
  }
}
</style>