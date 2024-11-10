<script setup>
import { computed, ref, defineEmits } from 'vue'
import { products } from '@/data/cardapio'
import { useSacolaStore } from '@/store/sacola.js'

const emit = defineEmits()
const store = useSacolaStore()
const props = defineProps(['productselected'])
const options = ref([{ count: 0, price: 1.0 }])
const observation = ref('')
const acompanhamentos = ref([
  { name: 'Batata Frita', price: 5.0, count: 0, isRemovable: true },
])

const totalPrice = computed(() => {
  let total = options.value.reduce((total, option) => total + option.count * option.price, 0)
  acompanhamentos.value.forEach(item => {
    total += item.count * item.price
  })
  return total
})

// Funções de controle de quantidade
const increaseCount = (index) => {
  options.value[index].count++
}

const decreaseCount = (index) => {
  if (options.value[index].count > 0) {
    options.value[index].count--
  }
}

const increaseAcaiCount = (index) => {
  if (acompanhamentos.value[index].isRemovable === false) return;
  acompanhamentos.value[index].count++
}

const decreaseAcaiCount = (index) => {
  if (acompanhamentos.value[index].count > 0 && acompanhamentos.value[index].isRemovable === false) return;
  if (acompanhamentos.value[index].count > 0) {
    acompanhamentos.value[index].count--
  }
}

const closeModal = () => {
  emit('close')
}
</script>

<template>
  <div class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h2>{{ productselected[0].name }}</h2>
        <button class="close-button" @click="closeModal">&times;</button>
      </div>
      <div class="modal-body">
        <div class="modal-body-content">
          <div class="modal-image">
            <img src="/src/assets/image/comidas/coxinha.jpg" alt="Descrição da imagem" />
            <p class="image-description">Experimente o nosso Combo de 10 Mini Coxinhas...</p>
          </div>
          <div class="modal-options-content">
            <div class="modal-options">
              <div v-for="(item, index) in products" :key="item.id" class="option">
                <label class="option-label">{{ item.text }}</label>
              </div>
            </div>
            <textarea
              class="observation-input"
              placeholder="Alguma observação? (máx. 200 caracteres)"
              v-model="observation"
              maxlength="200"
            ></textarea>

            <!-- Acompanhamentos -->
            <div class="acompanhamentos">
              <div v-for="(item, index) in acompanhamentos" :key="index" class="acompanhamento-option">
                <label class="option-label">{{ item.name }} (R$ {{ item.price.toFixed(2) }})</label>
                <div class="option-controls">
                  <button 
                    v-if="item.isRemovable !== false"
                    @click="decreaseAcaiCount(index)" 
                    class="control-button decrement">−</button>
                  <span class="option-count">{{ item.count }}</span>
                  <button 
                    v-if="item.isRemovable !== false"
                    @click="increaseAcaiCount(index)" 
                    class="control-button increment">+</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <div class="footer-controls">
          <!-- Quantidade de Kits -->
          <div class="option-controls">
            <span class="control-text">Quantidade de kits:</span>
            <button @click="decreaseCount(0)" class="control-button remove">−</button>
            <span class="option-count">{{ options[0].count }}</span>
            <button @click="increaseCount(0)" class="control-button add">+</button>
          </div>
          <!-- Botão Adicionar ao Pedido -->
          <button class="add-button" @click="store.addProduct(props.productselected)">
            Adicionar ao Pedido R$ {{ totalPrice.toFixed(2) }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* --------------  Modal Overlay -------------- */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7); /* Fundo mais escuro para dar mais contraste */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
}

/* --------------  Modal Content -------------- */
.modal-content {
  background-color: #f2e1c6; /* Tom de bege amarelado para dar aconchego */
  padding: 35px 45px;
  border-radius: 15px;
  width: 90%;
  max-width: 850px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  gap: 25px;
  animation: slideIn 0.4s ease-out;
  font-family: 'Nunito', sans-serif;
  position: relative;
  overflow: hidden;
}

/* --------------  Modal Header -------------- */
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #b69b5c; /* Dourado mais suave */
  padding-bottom: 12px;
  margin-bottom: 18px;
}

.modal-header h2 {
  color: #3c2c1f; /* Marrom escuro */
  font-size: 2rem;
  font-weight: 700;
}

.close-button {
  background: none;
  border: none;
  font-size: 34px;
  cursor: pointer;
  color: #d95c5c;
  transition: transform 0.2s ease-in-out;
}

.close-button:hover {
  transform: scale(1.1);
}

/* --------------  Modal Body -------------- */
.modal-body {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
}

.modal-body-content {
  display: flex;
  gap: 25px;
  flex: 1;
  justify-content: space-between;
}

.modal-image {
  flex-basis: 45%;
  text-align: center;
  background-color: #f9e4c5; /* Beige suave */
  padding: 18px;
  border-radius: 12px;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.1);
}

.modal-image img {
  width: 100%;
  border-radius: 8px;
  object-fit: cover;
  transition: transform 0.2s ease;
}

.modal-image:hover {
  transform: scale(1.05);
}

.image-description {
  font-size: 1rem;
  color: #7e5e3e;
  margin-top: 12px;
  font-style: italic;
}

/* --------------  Modal Options -------------- */
.modal-options-content {
  flex-basis: 50%;
  background-color: #fce2b2; /* Amarelo suave com toque dourado */
  padding: 22px;
  border-radius: 10px;
  box-shadow: 0 2px 18px rgba(0, 0, 0, 0.1);
}

.option {
  margin-bottom: 18px;
}

.option-label {
  font-size: 1.3rem;
  color: #3c2c1f; /* Cor marrom escuro */
  font-weight: 600;
}

/* --------------  Observation Input -------------- */
.observation-input {
  width: 100%;
  padding: 14px;
  border: 1px solid #b69b5c;
  border-radius: 8px;
  resize: none;
  margin-top: 18px;
  font-size: 1.1rem;
  color: #3c2c1f;
  transition: border-color 0.3s ease;
}

.observation-input:focus {
  border-color: #e6a800;
  outline: none;
}

/* --------------  Acompanhamentos -------------- */
.acompanhamentos {
  margin-top: 20px;
}

.acompanhamento-option {
  margin-bottom: 18px;
}

.acompanhamento-option .option-label {
  font-size: 1.2rem;
  color: #3c2c1f;
}

/* --------------  Botões de Contagem e Acompanhamento -------------- */
.option-controls {
  display: flex;
  align-items: center;
  gap: 12px;
}

.control-button {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 1px solid #b69b5c;
  font-size: 1.2rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.increment {
  background-color: #76b041;
  color: white;
}

.increment:hover {
  background-color: #6a9e39;
}

.decrement {
  background-color: #d36e6e;
  color: white;
}

.decrement:hover {
  background-color: #e74c3c;
}

/* --------------  Modal Footer -------------- */
.modal-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 18px;
  border-top: 1px solid #b69b5c;
}

.footer-controls {
  display: flex;
  align-items: center;
  gap: 22px;
}

.add-button {
  background: linear-gradient(135deg, #f0a500 0%, #f39c12 100%);
  color: white;
  padding: 12px 35px;
  font-size: 1.4rem;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
}

.add-button:hover {
  background: linear-gradient(135deg, #f39c12 0%, #e67e22 100%);
  transform: translateY(-2px);
}

.add-button:active {
  transform: translateY(0);
}

/* --------------  Responsividade -------------- */
@media (max-width: 768px) {
  .modal-body-content {
    flex-direction: column;
    align-items: center;
  }

  .modal-image {
    width: 100%;
  }

  .modal-options-content {
    width: 100%;
  }

  .footer-controls {
    flex-direction: column;
    gap: 15px;
  }

  .add-button {
    width: 100%;
    margin-left: 0;
  }
}

/* --------------  Animações -------------- */
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes slideIn {
  0% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
