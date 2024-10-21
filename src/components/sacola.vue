
<script setup>
import { ref } from 'vue';

// Controle de estado do carrinho (aberto/fechado)
const isCartOpen = ref(false);

// abertura/fechamento
const toggleCart = () => {
  isCartOpen.value = !isCartOpen.value;
};

// Dados do carrinho 
const cart = ref([]);

// Funções para gerenciar os itens no carrinho
const addItem = (item) => {
  item.quantity++;
};



function teste (){
  console.log(sacola.value)
};

const removeItem = (item) => {
  if (item.quantity > 1) {
    item.quantity--;
  }
};

const deleteItem = (index) => {
  cart.value.splice(index, 1);
};

// Calcular o total da compra
const calculateTotal = () => {
  return cart.value.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
};
</script>

<template>
  <!-- Botão da sacola flutuante -->
  <div class="cart-toggle-container">
    <button @click="toggleCart" class="cart-btn">
      <i class="fas fa-shopping-bag"></i>
      <span v-if="cart.length" class="cart-count">{{ cart.length }}</span>
    </button>
  </div>

  <!-- Caixa do carrinho, animada com transição suave -->
  <div class="cart-box" :class="{ open: isCartOpen }">
    <div class="cart-header">
      <i class="fas fa-shopping-bag"></i>
      <span>Minha sacola</span>
      <button class="close-btn" @click="toggleCart">&times;</button>
    </div>

    <!-- Separador criativo -->
    <div class="cart-divider"></div>

    <!-- Lista de itens no carrinho -->
    <div v-if="cart.length" class="cart-items">
      <div class="cart-item" v-for="(item, index) in cart" :key="item.id">
        <div class="item-info">
          <span class="item-name">{{ item.name }}</span>
          <span class="item-price">R$ {{ item.price.toFixed(2) }}</span>
        </div>
        <div class="item-controls">
          <button @click="removeItem(item)" class="btn-remove"><i class="fas fa-minus"></i></button>
          <span>{{ item.quantity }}</span>
          <button @click="addItem(item)" class="btn-add"><i class="fas fa-plus"></i></button>
          <button @click="deleteItem(index)" class="btn-delete"><i class="fas fa-trash"></i></button>
        </div>
      </div>
    </div>

    <!-- Mensagem caso o carrinho esteja vazio -->
    <div v-else class="empty-cart">
      <p>Sua sacola está vazia!</p>

      <button @click="teste">teste</button>
    </div> 

    <!-- Separador criativo -->

    <div v-if="cart.length" class="cart-divider"></div>

    <!-- Total da compra -->
    <div v-if="cart.length" class="cart-total">
      <span>Valor total desta compra</span>
      <span>R$ {{ calculateTotal() }}</span>
    </div>

    <!-- Botão de fechar pedido -->
    <div v-if="cart.length" class="checkout">
      <button class="btn-finalize">FECHAR PEDIDO</button>
    </div>
  </div>
</template>

<style scoped>
/* Botão da sacola flutuante */
.cart-btn {
  background-color: #009688; /* Cor diferenciada */
  color: white;
  border: none;
  padding: 12px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 18px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  transition: background-color 0.3s ease;
}

.cart-btn:hover {
  background-color: #00796b;
}

/* Animação de pulsação no número da sacola */
@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

.cart-count {
  background-color: #ff5722;
  color: white;
  border-radius: 50%;
  padding: 4px 8px;
  position: absolute;
  top: -10px;
  right: -10px;
  font-size: 12px;
  animation: pulse 1s infinite;
}

/* Estilo da caixa do carrinho */
.cart-box {
  background-color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  padding: 20px;
  width: 320px;
  position: fixed;
  bottom: 80px;
  right: -400px;
  transition: right 0.5s ease-in-out;
  z-index: 999;
}

.cart-box.open {
  right: 20px;
}

/* Cabeçalho do carrinho */
.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  font-size: 18px;
  color: #009688;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #333;
}

/* Estilo das divisões criativas */
.cart-divider {
  background-color: #e0e0e0;
  height: 1px;
  margin: 20px 0;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #f0f0f0; /* Separador mais leve entre os itens */
}

.item-info {
  flex: 1;
}

.item-name {
  font-size: 15px;
  font-weight: bold;
  color: #333;
}

.item-price {
  color: #666;
  margin-top: 5px;
}

.item-controls {
  display: flex;
  align-items: center;
  gap: 5px;
}

.btn-remove, .btn-add {
  background-color: #009688;
  color: white;
  border: none;
  border-radius: 50%;
  padding: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.btn-remove:hover, .btn-add:hover {
  background-color: #00796b;
}

.btn-delete {
  background-color: #ff5722;
  color: white;
  border: none;
  border-radius: 50%;
  padding: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.btn-delete:hover {
  background-color: #e64a19;
}

/* Carrinho vazio */
.empty-cart {
  text-align: center;
  color: #666;
}

/* Total da compra */
.cart-total {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  margin-top: 10px;
}

/* Botão de finalizar */
.checkout {
  margin-top: 15px;
}

.btn-finalize {
  background-color: #009688;
  color: white;
  border: none;
  padding: 10px;
  width: 100%;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
}

.btn-finalize:hover {
  background-color: #00796b;
}
</style>