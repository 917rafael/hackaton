<script setup>
import Header from '@/components/FoHea/header.vue';
import { ref } from 'vue';

// Lista de produtos gerenciada localmente
const products = ref([
  { id: 1, name: 'Arroz do chef', category: 'Arroz', stock: 0, price: 15.00, catalog: true },
  { id: 2, name: 'Asinhas de frango', category: 'Frango', stock: 49, price: 18.00, catalog: true },
]);

// Controle do modal
const showModal = ref(false);

// Novo produto vazio
const newProduct = ref({
  id: '',
  name: '',
  category: '',
  stock: 0,
  price: 0.00,
  catalog: false
});

// Função para abrir o modal
const openModal = () => {
  showModal.value = true;
  newProduct.value = { id: Date.now(), name: '', category: '', stock: 0, price: 0.00, catalog: false };
};

// Função para adicionar um novo produto
const saveProduct = () => {
  products.value.push({ ...newProduct.value });
  showModal.value = false;
};

// Função para excluir um produto
const deleteProduct = (productId) => {
  products.value = products.value.filter(p => p.id !== productId);
};

// Função para alternar o status de exibição no catálogo
const toggleCatalog = (product) => {
  product.catalog = !product.catalog;
};
</script>
<template>
    <Header />
  
    <section class="stock-manager">
      <div class="header">
        <h1>Produtos</h1>
        <button class="add-product" @click="openModal">+ Produto</button>
      </div>
  
      <table>
        <thead>
          <tr>
            <th>Produto</th>
            <th>Categoria</th>
            <th>Estoque</th>
            <th>Preço</th>
            <th>Catálogo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td><input v-model="product.name" placeholder="Nome do Produto" /></td>
            <td><input v-model="product.category" placeholder="Categoria" /></td>
            <td><input v-model="product.stock" type="number" placeholder="Estoque" /></td>
            <td><input v-model="product.price" type="number" step="0.01" placeholder="Preço" /></td>
            <td>
              <input type="checkbox" v-model="product.catalog" @change="toggleCatalog(product)" />
            </td>
            <td>
              <button @click="deleteProduct(product.id)">Excluir</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Modal para adicionar um novo produto -->
      <div v-if="showModal" class="modal">
        <div class="modal-content">
          <h2>Adicionar Produto</h2>
          <input v-model="newProduct.name" placeholder="Nome do Produto" />
          <input v-model="newProduct.category" placeholder="Categoria" />
          <input v-model="newProduct.stock" type="number" placeholder="Estoque" />
          <input v-model="newProduct.price" type="number" step="0.01" placeholder="Preço" />
          <label>
            <input type="checkbox" v-model="newProduct.catalog" /> Exibir no Catálogo
          </label>
          <button class="save-btn" @click="saveProduct">Salvar</button>
          <button class="close-btn" @click="showModal = false">Fechar</button>
        </div>
      </div>
    </section>
  </template>
  
  <style scoped>
.stock-manager {
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

input {
  width: 100%;
  padding: 5px;
  box-sizing: border-box;
}

button {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
}

button:hover {
  background-color: #218838;
}

/* Botão para adicionar produto */
.add-product {
  background-color: #28a745;
  color: white;
  padding: 10px 20px;
  border: none;
  font-size: 16px;
  cursor: pointer;
}

.add-product:hover {
  background-color: #218838;
}

/* Estilo do Modal */
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
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  max-width: 90%;
}

.save-btn {
  background-color: #28a745;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
  width: 100%;
}

.close-btn {
  background-color: #d9534f;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
  width: 100%;
  margin-top: 10px;
}

.save-btn:hover {
  background-color: #218838;
}

.close-btn:hover {
  background-color: #c9302c;
}
</style>
