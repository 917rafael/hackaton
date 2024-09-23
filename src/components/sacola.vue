<!--ESSE COMPONENTE É A SACOLA DO LADO DIREITO DA PAGINA-->

<script setup>
import { onMounted, ref } from 'vue';
import { sacola } from '@/data/sacola';
// Controle do carrinho
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

const addItemToCart = (item) => {
  const existingItem = cart.value.find(i => i.id === item.id);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.value.push({ ...item, quantity: 1 });
  }
};

function teste(){
  console.log(sacola.value)
}

const removeItem = (item) => {
  if (item.quantity > 1) {
    item.quantity--;
  }
};

const deleteItem = (index) => {
  cart.value.splice(index, 1);
};

onMounted(() =>{
  console.log(sacola.value)
})

// Calcular o total da compra
const calculateTotal = () => {
  return cart.value.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
};
</script>

<template>
  <!-- Botão da sacola.vue?t=1727121181780:58 
sacola flutuante -->
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

    <div class="cart-divider"></div>

    <div class="cart-items">
      <div class="cart-item" v-for="(item) in sacola" :key="item.item.id">
        <div class="item-info">
          <span class="item-name">{{ item.item.name }}</span>
          <span class="item-price">R$ {{ item.item.price }}</span>
        </div>
        <div class="item-controls">
          <button @click="removeItem(item)" class="btn-remove"><i class="fas fa-minus"></i></button>
          <span>{{ item.item.quantity }}</span>
          <button @click="addItem(item)" class="btn-add"><i class="fas fa-plus"></i></button>
          <button @click="deleteItem(index)" class="btn-delete"><i class="fas fa-trash"></i></button>
        </div>
      </div>
    </div>


    <div  class="empty-cart">
      <p>Sua sacola está vazia!</p>
      <button @click="teste">teste</button>
    </div> 
  
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

.cart-btn {
  background-color: #009688; 
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
  border-bottom: 1px solid #f0f0f0; 
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

.empty-cart {
  text-align: center;
  color: #666;
}


.cart-total {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  margin-top: 10px;
}

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
