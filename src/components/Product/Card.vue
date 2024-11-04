<script setup>
import { computed, ref } from 'vue'
import { products } from '@/data/cardapio'
import { useSacolaStore } from '@/store/sacola.js'
const store = useSacolaStore()
const props = defineProps(['productselected'])
const options = ref([
  {
    text: 'Deseja Adicionar 1 kit de Sachês com Molhos? Kit Sachês (1 Catchup, 1 Maionese, 1 Mostarda) (R$ 1,00)',
    count: 0,
    price: 1.0
  }
])
const totalPrice = computed(() =>
  options.value.reduce((total, option) => total + option.count * option.price, 0)
)
const increaseCount = (index) => {
  options.value[index].count++
}
const decreaseCount = (index) => {
  if (options.value[index].count > 0) {
    options.value[index].count--
  }
}
</script>
<template>
  <div class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h2>{{ productselected[0].name }}</h2>
        <button class="close-button" @click="$emit('close')">&times;</button>
      </div>
      <div class="modal-body">
        <div class="modal-body-content">
          <div class="modal-image">
            <img src="/src/assets/image/comidas/coxinha.jpg" alt="Descrição da imagem" />
            <p class="image-description">Experimente o nosso Combo de 10 Mini Coxinhas...</p>
          </div>
          <div class="modal-options-content">
            <div class="modal-options">
              <div v-for="item in products" :key="item.id" :item="item" class="option">
                <label class="option-label">{{ item.text }}</label>
              </div>
            </div>
            <textarea
              class="observation-input"
              placeholder="Alguma observação?"
              v-model="observation"
            ></textarea>
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
          <button class="add-button" @click="store.addProduct(props.productselected)">
            Adicionar ao Pedido R$ {{ totalPrice.toFixed(2) }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
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
</style>
