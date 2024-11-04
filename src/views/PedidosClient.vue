<script setup>
import { ref } from 'vue'
import { useProductStore } from '@/store/productStore'
import Header from '@/components/FoHea/header.vue'

const productStore = useProductStore()

const showModal = ref(false)

const newProduct = ref({
  id: '',
  name: '',
  category: '',
  stock: 0,
  price: 0.0,
  catalog: false,
  image: null
})

// Função para abrir o modal
const openModal = () => {
  showModal.value = true
  newProduct.value = {
    id: Date.now(),
    name: '',
    category: '',
    stock: 0,
    price: 0.0,
    catalog: false,
    image: null
  }
}

// Função para adicionar um novo produto
const saveProduct = () => {
  products.value.push({ ...newProduct.value, canEdit: false })
  showModal.value = false
}

// Função para excluir um produto
const deleteProduct = (productId) => {
  products.value = products.value.filter((p) => p.id !== productId)
}

// Função para alternar o status de exibição no catálogo
const toggleCatalog = (product) => {
  productStore.changeCatologVisibility(product.id)
  // product.catalog = !product.catalog;
}

// Função para lidar com upload de imagem, limitando a 2MB
const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file.size > 2 * 1024 * 1024) {
    alert('A imagem deve ser menor que 2MB.')
    return
  }
  newProduct.value.image = URL.createObjectURL(file)
}

// Função para fechar o modal ao clicar fora dele
const closeModal = (event) => {
  if (event.target.classList.contains('modal')) {
    showModal.value = false
  }
}
</script>

<template>
  <Header />

  <section class="stock-manager">
    <div class="header">
      <h1>Pedidos a cerem entregues</h1>
      <button class="add-product-btn" @click="openModal">Marcar como estregue</button>
    </div>

    <tbody>
      <tr v-for="product in productStore.products" :key="product.id">
        <td>
          <img
            v-if="product.image"
            :src="product.image"
            alt="Imagem do Produto"
            class="table-product-image"
          />
          <span v-else>Sem imagem</span>
        </td>
        <td><input v-model="product.name" placeholder="Nome do Produto" /></td>
        <td>
          <select v-model="newProduct.category" name="categoria">
            <option value="categoria">sagado</option>
            <option value="ac">sagado</option>
            <option value="al">Alagoas</option>
            <option value="am">Amazonas</option>
            <option value="ap">Amapá</option>
          </select>
        </td>

        <td><input v-model="product.stock" type="number" placeholder="Estoque" /></td>
        <td><input v-model="product.price" type="number" step="0.01" placeholder="Preço" /></td>
        <td>
          <label class="switch"
            >''
            <input type="checkbox" v-model="product.catalog" />
            <span class="slider"></span>
          </label>
        </td>
        <td>
          <button class="delete-btn" @click="deleteProduct(product.id)">Excluir</button>
        </td>
      </tr>
    </tbody>

    <!-- Modal para adicionar um novo produto -->
    <div v-if="showModal" class="modal" @click="closeModal">
      <div class="modal-content">
        <h2>Adicionar Produto</h2>
        <input v-model="newProduct.name" placeholder="Nome do Produto" />

        <input v-model="newProduct.stock" type="number" placeholder="Estoque" />
        <input v-model="newProduct.price" type="number" step="0.01" placeholder="Preço" />

        <label class="catalog-label">
          <label class="switch">
            <input type="checkbox" v-model="newProduct.catalog" />
            <span class="slider"></span>
          </label>
          Exibir no Catálogo
        </label>

        <!-- Campo para upload de imagem -->
        <input type="file" @change="handleFileUpload" class="file-input" />
        <img
          v-if="newProduct.image"
          :src="newProduct.image"
          alt="Imagem do Produto"
          class="product-image-preview"
        />

        <div class="modal-actions">
          <button class="save-btn" @click="saveProduct">Salvar</button>
          <button class="close-btn" @click="showModal = false">Fechar</button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Reset e fonte personalizada */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Poppins', sans-serif;
  background-color: #faf3e0;
  color: #333;
}

.stock-manager {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}

h1 {
  font-size: 32px;
  font-weight: 700;
  color: #c45d4c;
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

th,
td {
  padding: 16px;
  text-align: left;
  border-bottom: 1px solid #eaeaea;
}
select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  background-color: #ffffff;
  color: #000000;
  margin-bottom: 16px;
}

th {
  background-color: #ffe5d4;
  font-weight: 600;
  color: #c45d4c;
}

td input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
}

td button {
  background-color: #c45d4c;
  color: white;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

td button:hover {
  background-color: #a04b3a;
}

.add-product-btn {
  background-color: #c45d4c;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.add-product-btn:hover {
  background-color: #a04b3a;
}

.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ddd;
  transition: 0.4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: '';
  height: 18px;
  width: 18px;
  left: 4px;
  bottom: 3px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #c45d4c;
}

input:checked + .slider:before {
  transform: translateX(26px);
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(6px);
  z-index: 1000;
}

.modal-content {
  background-color: #fff;
  padding: 40px;
  border-radius: 12px;
  width: 480px;
  max-width: 90%;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  animation: slideIn 0.3s ease-out;
  position: relative;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

h2 {
  font-size: 24px;
  color: #c45d4c;
  margin-bottom: 20px;
  text-align: center;
}

input {
  width: 100%;
  padding: 10px;
  margin-bottom: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
}

input:focus {
  border-color: #c45d4c;
}

.catalog-label {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  color: #555;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.save-btn,
.close-btn {
  flex: 1;
  padding: 12px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.save-btn {
  background-color: #c45d4c;
  color: white;
}

.save-btn:hover {
  background-color: #a04b3a;
}

.close-btn {
  background-color: #ff6f61;
  color: white;
}

.close-btn:hover {
  background-color: #d96055;
}

.table-product-image {
  width: 100px;
  height: 100px;
  margin-top: 10px;
  object-fit: cover;
  border-radius: 10px;
  border: 1px solid #ddd;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.file-input {
  margin-top: 10px;
  padding: 10px;
  font-size: 14px;
  color: #555;
}
</style>
