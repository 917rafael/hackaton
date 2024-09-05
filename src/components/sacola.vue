<!--esse componente é para registras todos os pedidos do cliente e finalizar a compra-->

<script setup>
const isModalVisible = ref(false);
</script>

<template>

    <div class="container">        
            <button class="cart-btn" @click="toggleModal">
                <i class="fas fa-shopping-bag"></i>
            </button>
        </div>

        <div v-if="isModalVisible" class="container">
            <div class="caixa">
                <header>
                    <h1>Minha sacola</h1>
                </header>
            </div>
        </div>

</template>

<style scoped>
.cart-btn {
  background-color: #ff6347; 
  color: white;
  border: none;
  padding: 15px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 18px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease;
}
.container{
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
}

</style>