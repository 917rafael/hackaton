<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { computed, ref, onMounted } from 'vue'
import { useSacolaStore } from '@/store/sacola.js'
import { useProductStore } from '@/store/productStore.js'

const store = useSacolaStore()
const props = defineProps(['id'])
const options = ref([{ count: 0, price: 1.0 }])
const observation = ref('')
// const products = ref([]);
// const emit = defineEmits();


// Ação para adicionar o produto à sacola
const adicionarProduto = async (produto) => {
  await store.adicionarProduto(produto);
};



const produto =  ref({})

const productStore = useProductStore()

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
  options.value[index].count++;
};
const decreaseCount = (index) => {
  if (options.value[index].count > 0) {
    options.value[index].count--;
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


console.log(props.id)


onMounted(() => {
    produto.value = productStore.getProductById(props.id)
    totalPrice()
});
</script>
<template>
  <div class="modal-overlay" @click="$router.push('/')">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h2>{{produto.name}}</h2>
        <button class="close-button" @click="$router.push('/')">&times;</button>
      </div>
      <div class="modal-body">
        <div class="modal-body-content">
          <div class="modal-image">
            <img src="/src/assets/image/comidas/coxinha.jpg" alt="Descrição da imagem" />
            <p class="image-description">Experimente o nosso Combo de 10 Mini Coxinhas...</p>
          </div>
          <div class="modal-options-content">
            <div class="modal-options">
              <div class="option">
                <label class="option-label">Deseja Adicionar 1 kit de Sachês com Molhos? Kit Sachês (1 Catchup, 1 Maionese, 1 Mostarda) (R$ 1,00)</label>
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
          <button class="add-button"  @click="adicionarProduto(produto)" >
            Adicionar ao Pedido R$ {{ produto.price }}
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