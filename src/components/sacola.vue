<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref } from 'vue'
import { useSacolaStore } from '@/store/sacola.js'

const store = useSacolaStore()

const isCartOpen = ref(false)

const toggleCart = () => {
  isCartOpen.value = !isCartOpen.value
}

const addItem = (item) => {
  const product = store.sacola_cart.find((p) => p.id === item.id)
  if (product) {
    product.quantity += 1 
    } else {
    store.sacola_cart.push({ ...item, quantity: 1 })
  }
}

const removeItem = (item) => {
  const product = store.sacola_cart.find((p) => p.id === item.id)
  if (product) {
    if (product.quantity > 1) {
      product.quantity -= 1 
    } else {
      const index = store.sacola_cart.indexOf(product)
      if (index !== -1) {
        store.sacola_cart.splice(index, 1) 
      }
    }
  }
}

const deleteItem = (index) => {
  store.sacola_cart.splice(index, 1)
}

const calculateTotal = () => {
  return store.sacola_cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)
}
</script>

<template>
  <div class="cart-toggle-container">
    <button @click="toggleCart" class="cart-btn">
      <i class="fas fa-shopping-bag"></i>
      <span v-if="store.sacola_cart.length" class="cart-count">{{ store.sacola_cart.length }}</span>
    </button>
  </div>


  <div class="cart-box" :class="{ open: isCartOpen }">
    <div class="cart-header">
      <i class="fas fa-shopping-bag"></i>
      <span>Minha sacola</span>
      <button class="close-btn" @click="toggleCart">&times;</button>
    </div>

    <div class="cart-divider"></div>

    <div v-if="store.sacola_cart.length > 0" class="cart-items">
      <div class="cart-item" v-for="(item, index) in store.sacola_cart" :key="item.id">
        <div class="item-info">
          <span class="item-name">{{ item.name }}</span>
          <span class="item-price">R$ {{ item.price.toFixed(2) }}</span>
        </div>

        <div class="item-controls">
          <button @click="removeItem(item)" class="btn-remove"><i class="fas fa-minus"></i></button>
          <span>{{ item.quantity }}</span>
          <button @click="addItem(item)" class="btn-add"><i class="fas fa-plus"></i></button
          ><button @click="deleteItem(index)" class="btn-delete">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
    </div>

    <div v-else class="empty-cart">
      <p>Sua sacola está vazia!</p>
    </div>

    <div v-if="store.sacola_cart.length > 0" class="cart-divider"></div>

    <div v-if="store.sacola_cart.length > 0" class="cart-total">
      <span>Valor total desta compra</span>
      <span>R$ {{ calculateTotal() }}</span>
    </div>


    <div v-if="store.sacola_cart.length > 0" class="checkout">
      <router-link to="/endereco">  
        <button class="btn-finalize">FECHAR PEDIDO</button>
      </router-link>
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

.btn-remove,
.btn-add,
.btn-delete {
  background-color: #009688;
  color: white;
  border: none;
  border-radius: 50%;
  padding: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.btn-remove:hover,
.btn-add:hover,
.btn-delete:hover {
  background-color: #00796b;
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
    font-size: 16px;
  }

  .cart-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .item-info,
  .item-controls {
    width: 100%;
    text-align: left;
    gap: 10px;
  }

  .item-controls {
    justify-content: space-between;
  }

  .btn-remove,
  .btn-add,
  .btn-delete,
  .btn-finalize {
    padding: 10px;
    font-size: 14px;
  }

  .cart-total,
  .checkout {
    flex-direction: column;
    align-items: center;
  }

  .cart-total span,
  .checkout .btn-finalize {
    width: 100%;
    text-align: center;
  }
}
</style>
