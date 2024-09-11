<template>
  <div class="product-card" role="button" tabindex="0" @click="toggleModal">

    <div class="discount-tag" v-if="product.discount">
      <span>{{ product.discountText }}</span>
    </div>

    <img :src="product.image" :alt="product.name" class="product-image" />

    <div class="product-info">
      <h2 class="product-name">{{ product.name }}</h2>

      <div class="product-rating">
        <span v-for="n in 5" :key="n" class="star" :class="{ 'filled': n <= product.rating }">★</span>
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

  <!-----------------------------aqui começa o card -------------------------------------------->
  <div v-if="isModalVisible" class="modal-overlay" @click="closeModal">
 
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h2>{{ title }}</h2>
        <button class="close-button" @click="closeModal">&times;</button>
      </div>

      <div class="modal-body">
        <div class="modal-body-content">
          <div class="modal-image">
            <img src="../assets/image/desenhofundo.avif" alt="Descrição da imagem" />
            <p class="image-description">
              Experimente o nosso Combo de 10 Mini Coxinhas...
            </p>
          </div>

          <div class="modal-options-content">
            <div class="modal-options">
              <div v-for="(option, index) in options" :key="index" class="option">
                <label class="option-label">{{ option.text }}</label>
              </div>
            </div>
            <textarea class="observation-input" placeholder="Alguma observação?" v-model="observation"></textarea>
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <div class="footer-controls">

          <div class="option-controls">

            <span class="control-text">Quantidade de kits:</span>
            <button @click="decreaseCount(0)" class="control-button decrement">− Remover</button>
            <span class="option-count">{{ options[0].count }}</span>
            <button @click="increaseCount(0)" class="control-button increment">+ Adicionar</button>
          
          </div>
          <button class="add-button" @click="addToCart" >Adicionar ao Pedido R$ {{ totalPrice.toFixed(2) }}</button>
        </div>
      
      </div>
    </div>
  </div>

  <div class="product-list">
      <products v-for="product in products" :key="product.id" :product="product"/>
    </div> 

</template>


<script setup>
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

import { ref, computed } from 'vue';
 import back from '@/assets/image/back.jpg'

// Estado reativo para o título e visibilidade do modal
const title = ref('Mini Coxinha de Frango - Combo de 10 unidades');
const isModalVisible = ref(false);

const options = ref([
  {
    text: 'Deseja Adicionar 1 kit de Sachês com Molhos? Kit Sachês (1 Catchup, 1 Maionese, 1 Mostarda) (R$ 1,00)',
    count: 0,
    price: 1.00,
  },
]);

const observation = ref('');

// Computed para calcular o preço total
const totalPrice = computed(() =>
  options.value.reduce((total, option) => total + option.count * option.price, 0)
);

// Função para alternar a visibilidade do modal
const toggleModal = () => {
  isModalVisible.value = !isModalVisible.value;
};

// Função para fechar o modal
const closeModal = () => {
  isModalVisible.value = false;
};

// Funções para manipular a contagem de opções
const increaseCount = (index) => {
  options.value[index].count++;
};

const decreaseCount = (index) => {
  if (options.value[index].count > 0) {
    options.value[index].count--;
  }
};
const addToCart = () => {
  addToCart(product, options.value[0].count);
  closeModal();
};

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
  ];
</script>


<style scoped>
.product-card {
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  max-width: 200px;
  margin: 0 auto;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  padding: 10px;
  cursor: pointer; /* Add cursor pointer to indicate it is clickable */
}

.product-card:focus {
  outline: 2px solid #007bff; /* Add a focus outline for accessibility */
}

.discount-tag {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: red;
  color: white;
  font-size: 0.8em;
  padding: 5px;
  border-radius: 5px;
}

.product-image {
  width: 100%;
  height: auto;
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




/*------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------*/



.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 800px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  position: relative;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 3px solid #d32f2f;
  padding-bottom: 15px;
}

.modal-header h2 {
  color: #d32f2f;
  font-size: 1.6rem;
  font-weight: bold;
}

.close-button {
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  color: #d32f2f;
}

.modal-body {
  margin-top: 20px;
}

.modal-body-content {
  display: flex;
  gap: 20px;
}

.modal-options-content {
  flex: 2;
  background-color: #f7f7f7;
  padding: 15px;
  border-radius: 8px;
}

.modal-image {
  flex: 1;
  text-align: center;
  background-color: #f1f1f1;
  padding: 15px;
  border-radius: 8px;
}

.modal-image img {
  width: 100%;
  border-radius: 8px;
}

.image-description {
  font-size: 0.95rem;
  color: #333;
  margin-top: 10px;
  line-height: 1.5;
}

.option {
  margin-bottom: 15px;
}

.option-label {
  font-size: 1rem;
  color: #444;
}

.observation-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: none;
  margin-top: 10px;
}

.modal-footer {
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-controls {
  display: flex;
  align-items: center;
  gap: 20px;
}

.option-controls {
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: #f3f3f3;
  padding: 10px;
  border-radius: 8px;
}

.control-text {
  font-size: 1rem;
  color: #666;
  margin-right: 10px;
}

.control-button {
  width: 120px;
  height: 40px;
  background-color: #eee;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  color: #555;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  transition: background-color 0.3s;
}

.control-button:hover {
  background-color: #ddd;
}

.increment {
  background-color: #4caf50;
  color: white;
}

.increment:hover {
  background-color: #45a047;
}

.decrement {
  background-color: #f44336;
  color: white;
}

.decrement:hover {
  background-color: #e53935;
}

.option-count {
  font-size: 1.2rem;
  margin: 0 15px;
}

.add-button {
  background-color: #d32f2f;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: background-color 0.3s;
}

.add-button:hover {
  background-color: #c62828;
}

/*------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------*/

</style>
