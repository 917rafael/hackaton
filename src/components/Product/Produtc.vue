<script setup>
const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})
import Card from './Card.vue'
import { products } from '@/data/cardapio'
import { sacola } from '@/data/sacola'
import { ref, computed, reactive } from 'vue'

const isModalVisible = ref(false)

const productselected = ref([])

const suasacola = reactive({
  qtd: 0,
  observacao: null,
  item: productselected.value
})
const observation = ref('')

const toggleModal = (id) => {
  const findproduct = products.find((product) => product.id === id)
  productselected.value = [findproduct]
  isModalVisible.value = !isModalVisible.value
}
</script>

<template>
  <div class="product-card" role="button" tabindex="0" @click="toggleModal(product.id)">
    <img :src="product.image" :alt="product.name" class="product-image" />

    <div class="product-info">
      <h2 class="product-name">{{ product.name }}</h2>

      <div class="product-rating">
        <span v-for="n in 5" :key="n" class="star" :class="{ filled: n <= product.rating }">★</span>
        <span class="reviews"> {{ product.reviews }} avaliações</span>
      </div>

      <div class="product-price">
        <span v-if="product.oldPrice" class="old-price">R$ {{ product.oldPrice }}</span>
        <span v-if="product.discount" class="discount">{{ product.discount }}%</span>
      </div>

      <div class="current-price">
        <strong>R$ {{ product.currentPrice }}</strong>
      </div>

      <div class="installments" v-if="product.installments">
        {{ product.installments }}
      </div>
    </div>
  </div>

  <Card v-if="isModalVisible" :productselected="productselected" @close="isModalVisible = false" />
  <div class="product-list">
    <products v-for="product in products" :key="product.id" :product="product" />
  </div>
</template>
<style scoped>
.product-card {
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0.5, 0.5, 0.6);
  overflow: hidden;
  max-width: 200px;
  margin: 0 auto;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  position: relative;
  padding: 10px;
  cursor: pointer;
}
.product-card:focus {
  outline: 2px solid #007bff;
}
.discount-tag {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: rgb(0, 0, 0);
  color: white;
  font-size: 0.8em;
  padding: 5px;
  border-radius: 5px;
}
.product-image {
  width: 100%;
  height: 120px;
  object-fit: cover;
  margin-bottom: 10px;
}
.product-info {
  text-align: left;
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
</style>
