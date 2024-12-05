<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref, onMounted } from 'vue';
import { useSacolaStore } from '@/store/sacola.js';

const store = useSacolaStore();

const isCartOpen = ref(false);

const toggleCart = () => {
  isCartOpen.value = !isCartOpen.value;
};

// Carregar sacola ao montar o componente
onMounted(async () => {
  await store.carregarSacola();
});

// Calcular o total da compra
const calculateTotal = () => {
  return store.sacola_cart
    .reduce((total, productselected) => total + productselected.price * productselected.quantity, 0)
    .toFixed(2);
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

    <div v-if="store.sacola_cart.length > 0" class="cart-items">
      <div class="cart-item" v-for="(productselected, index) in store.sacola_cart" :key="productselected.id">
        <div class="item-info">
          <span class="item-name">{{ productselected.name }}</span>
          <span class="item-price">R$ {{ productselected.price.toFixed(2) }}</span>
        </div>
        <div class="item-controls">
          <button @click="store.removerProduto(productselected)" class="btn-remove" aria-label="Remover item">
            <i class="fas fa-minus"></i>
          </button>
          <span>{{ productselected.quantity }}</span>
          <button @click="store.adicionarProduto(productselected)" class="btn-add" aria-label="Adicionar item">
            <i class="fas fa-plus"></i>
          </button>
          <button @click="store.excluirProduto(index)" class="btn-delete" aria-label="Deletar item">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Separador criativo -->

    <div v-if="cart.length" class="cart-divider"></div>

    <!-- Total da compra -->
    <div v-if="cart.length" class="cart-total">
      <span>Valor total desta compra</span>
      <span>R$ {{ calculateTotal() }}</span>
    </div>

    <div v-if="store.sacola_cart.length > 0" class="checkout">
      <button class="btn-finalize" @click="store.fecharPedido">FECHAR PEDIDO</button>
    </div>

    <div v-else class="empty-cart">
      <p>Sua sacola está vazia!</p>
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
  width: 80px;
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
  font-size: 22px;
  color: #6d4c41;
  gap: 10px;
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
  background-color: #e64a19;
}

/* Responsividade */
@media (max-width: 768px) {
  .cart-box {
    width: 100%;
    bottom: 0;
    right: 0;
    height: 100%;
    padding: 15px;
    border-radius: 0;
  }

  .cart-header {
    font-size: 18px;
    
  }

  .cart-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .item-info,
  .item-controls {
    width: 100%;
    text-align: left;
  }

  .btn-remove,
  .btn-add,
  .btn-delete {
    font-size: 24px;
  }
}
</style>