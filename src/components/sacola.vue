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

const calculateTotal = () => {
  return store.sacola_cart
    .reduce((total, productselected) => total + productselected.price * productselected.quantity, 0)
    .toFixed(2);
};


</script>

<template>
  <div class="cart-toggle-container">
    <button @click="toggleCart" class="cart-btn" aria-label="Abrir Sacola">
      <i class="fas fa-shopping-bag"></i>
      <span v-if="store.sacola_cart.length" class="cart-count">{{ store.sacola_cart.length }}</span>
    </button>
  </div>

  <div class="cart-box" :class="{ open: isCartOpen }">
    <div class="cart-header">
      <i class="fas fa-shopping-bag"></i>
      <span>Minha Sacola</span>
      <button class="close-btn" @click="toggleCart" aria-label="Fechar Sacola">&times;</button>
    </div>

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

    <div v-if="store.sacola_cart.length > 0" class="cart-divider"></div>

    <div v-if="store.sacola_cart.length > 0" class="cart-total">
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
/* Botão da sacola */
.cart-btn {
  background-color: #ff7043; /* Laranja suave */
  color: white;
  border: none;
  padding: 20px;
  border-radius: 50%; /* Deixa o botão redondo */
  cursor: pointer;
  font-size: 28px; /* Aumenta o ícone */
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  transition: background-color 0.3s ease;
}

.cart-btn:hover {
  background-color: #e64a19;
}

.cart-count {
  background-color: #ffcc80;
  color: #333;
  border-radius: 50%;
  padding: 6px 12px;
  position: absolute;
  top: -8px;
  right: -8px;
  font-size: 16px;
}

/* Caixa do carrinho */
.cart-box {
  background-color: #fff3e0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  padding: 20px;
  width: 380px;
  position: fixed;
  bottom: 80px;
  right: -380px;
  transition: right 0.5s ease-in-out;
  z-index: 999;
  max-height: 60vh;
  overflow: hidden;
}

.cart-box.open {
  right: 20px;
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  font-size: 22px;
  color: #6d4c41;
}

.close-btn {
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  color: #6d4c41;
}

.cart-divider {
  background-color: #f5e1a4;
  height: 1px;
  margin: 20px 0;
}

.cart-items {
  max-height: 300px;
  overflow-y: auto; /* Barra de rolagem se necessário */
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding-bottom: 10px;
  border-bottom: 1px solid #f3e5ab;
}

.item-info {
  flex: 1;
}

.item-name {
  font-size: 16px;
  font-weight: bold;
  color: #6d4c41;
}

.item-price {
  color: #8d6e63;
  margin-top: 5px;
}

.item-controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.btn-remove,
.btn-add,
.btn-delete {
  background-color: #6d4c41;
  color: white;
  border: none;
  border-radius: 50%;
  padding: 16px; /* Aumenta o tamanho dos botões */
  cursor: pointer;
  font-size: 20px; /* Aumenta o tamanho dos ícones */
  transition: background-color 0.3s ease;
}

.btn-remove:hover,
.btn-add:hover,
.btn-delete:hover {
  background-color: #5d4037;
}

.empty-cart {
  text-align: center;
  color: #8d6e63;
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
  background-color: #ff7043;
  color: white;
  border: none;
  padding: 14px;
  width: 100%;
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
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
