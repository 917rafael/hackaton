<script setup>
import Header from '@/components/FoHea/header.vue';
import { ref } from 'vue';

// Lista de produtos gerenciada localmente
const products = ref([
  { id: 1, name: 'Produto 1', category: 'Categoria 1', stock: 10, price: 99.99, catalog: true, image: null },
  { id: 2, name: 'Produto 2', category: 'Categoria 2', stock: 5, price: 49.99, catalog: false, image: null },
]);

const showModal = ref(false);

const newProduct = ref({
  id: '',
  name: '',
  category: '',
  stock: 0,
  price: 0.00,
  catalog: false,
  image: null,
});

// Função para abrir o modal
const openModal = () => {
  showModal.value = true;
  newProduct.value = { id: Date.now(), name: '', category: '', stock: 0, price: 0.00, catalog: false, image: null };
};

// Função para adicionar um novo produto
const saveProduct = () => {
  products.value.push({ ...newProduct.value, canEdit: false });
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

// Função para lidar com upload de imagem
const handleFileUpload = (event) => {
  const file = event.target.files[0];
  newProduct.value.image = URL.createObjectURL(file);
};
</script>

<template>
  <Header />

  <section class="stock-manager">
    <div class="header">
      <h1>Gerenciamento de Produtos</h1>
      <button class="add-product-btn" @click="openModal">+ Adicionar Produto</button>
    </div>

    <table>
      <thead>
        <tr>
          <th>Imagem</th>
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
          <td>
            <img v-if="product.image" :src="product.image" alt="Imagem do Produto" class="table-product-image" />
            <span v-else>Sem imagem</span>
          </td>
          <td><input v-model="product.name" placeholder="Nome do Produto" /></td>
          <td><input v-model="product.category" placeholder="Categoria" /></td>
          <td><input v-model="product.stock" type="number" placeholder="Estoque" /></td>
          <td><input v-model="product.price" type="number" step="0.01" placeholder="Preço" /></td>
          <td>
            <!-- Switch moderno -->
            <label class="switch">
              <input type="checkbox" @change="toggleCatalog(product)" />
              <span class="slider"></span>
            </label>
          
          </td>
          <td>
            <button class="delete-btn" @click="deleteProduct(product.id)">Excluir</button>
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

        <label class="catalog-label">
          <label class="switch">
            <input type="checkbox" v-model="newProduct.catalog" />
            <span class="slider"></span>
          </label> Exibir no Catálogo
        </label>
        
        <!-- Campo para upload de imagem -->
        <input type="file" @change="handleFileUpload" class="file-input"/>
        <img v-if="newProduct.image" :src="newProduct.image" alt="Imagem do Produto" class="product-image-preview" />
        <div class="modal-actions">
          <button class="save-btn" @click="saveProduct">Salvar</button>
          <button class="close-btn" @click="showModal = false">Fechar</button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Reset de estilos básicos */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f3f4f6;
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
  font-size: 28px;
  font-weight: 600;
  color: #333;
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

th, td {
  padding: 16px;
  text-align: left;
  border-bottom: 1px solid #eaeaea;
}

th {
  background-color: #f9fafb;
  font-weight: 600;
  color: #333;
}

td input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

td button {
  background-color: #ff4b4b;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

td button:hover {
  background-color: #ff1a1a;
}

.add-product-btn {
  background-color: #007bff;
  color: white;
  padding: 12px 24px;
  border: none;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.add-product-btn:hover {
  background-color: #0056b3;
}

/* Switch moderno estilo slider */
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
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 4px;
  bottom: 3px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #007bff;
}

input:checked + .slider:before {
  transform: translateX(26px);
}

/* Modal */
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
  padding: 30px;
  border-radius: 10px;
  width: 450px;
  max-width: 90%;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.modal-actions {
  display: flex;
  gap: 10px;
}

.save-btn, .close-btn {
  flex: 1;
  padding: 12px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.save-btn {
  background-color: #007bff;
  color: white;
  border: none;
}

.save-btn:hover {
  background-color: #0056b3;
}

.close-btn {
  background-color: #dc3545;
  color: white;
  border: none;
}

.close-btn:hover {
  background-color: #c82333;
}

/* Preview de imagem */
.product-image-preview {
  width: 100px;
  height: 100px;
  margin-top: 15px;
  object-fit: cover;
  border-radius: 8px;
}

.file-input {
  margin-top: 10px;
}

.catalog-label {
  display: flex;
  align-items: center;
  margin: 10px 0;
  font-size: 14px;
  color: #555;
}

/* Imagem na tabela de produtos */
.table-product-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 5px;
  border: 1px solid #ddd;
}
</style>
