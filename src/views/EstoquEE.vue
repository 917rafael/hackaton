<script setup>
import { ref, onMounted } from 'vue';
import { supabase } from '../lib/supabaseClient';
import Header from '@/components/FoHea/header.vue';
import Footer from '@/components/FoHea/Footer.vue';


// Estado da aplicação
const products = ref([]);
const showModal = ref(false);
const newProduct = ref({
  nome: '',
  category: '',
  stock: '',
  price: '',
  catalog: '',
  image_url: '',
});


// Carregar produtos
const fetchProducts = async () => {
  const { data, error } = await supabase.from('products').select('*');
  if (error) {
    console.error('Erro ao buscar produtos:', error.message);
  } else {
    products.value = data;
  }
};


const handleFileUpload = async (event) => {
  const file = event.target.files[0];


  if (!file) {
    alert('Por favor, selecione um arquivo.');
    return;
  }


  if (file.size > 2 * 1024 * 1024) { // Limite de 2MB
    alert('A imagem deve ser menor que 2MB.');
    return;
  }


  const fileName = `${Date.now()}_${file.name}`; // Nome único para evitar conflitos


  // eslint-disable-next-line no-unused-vars
  const { data, error } = await supabase.storage.from('product-images').upload(fileName, file);


  if (error) {
    console.error('Erro ao fazer upload da imagem:', error.message);
    alert('Erro ao fazer upload da imagem.');
    return;
  }


  // Recuperar URL pública da imagem
  const { data: publicUrlData } = supabase.storage
    .from('product-images')
    .getPublicUrl(fileName);


  if (publicUrlData) {
    newProduct.value.image = publicUrlData.publicUrl; // Salvar URL pública no produto
  } else {
    console.error('Erro ao obter URL pública.');
    alert('Erro ao obter URL pública da imagem.');
  }
};




// Salvar produto no Supabase
const insertData = async () => {
  const { nome, category, stock, price, image_url, catalog } = newProduct.value;


  if (!nome || !category || !stock || !price) {
    alert('Por favor, preencha todos os campos obrigatórios e adicione uma imagem.');
    console.log(nome, category, stock, price, image_url)
    return;
  }


  const { data, error } = await supabase.from('products').insert([
    { name: nome, category, stock, price, image_url, catalog },
  ]);


  if (error) {
    console.error('Erro ao inserir produto:', error.message);
    alert('Erro ao inserir produto.');
  } else {
    alert('Produto adicionado com sucesso!');
    products.value.push(data[0]);
    closeModal();
  }
};


// Excluir produto
const deleteProduct = async (id) => {
  const { error } = await supabase.from('products').delete().eq('id', id);


  if (error) {
    console.error('Erro ao excluir produto:', error.message);
  } else {
    products.value = products.value.filter((product) => product.id !== id);
    alert('Produto excluído com sucesso!');
  }
};


// Controle do modal
const openModal = () => (showModal.value = true);
const closeModal = () => {
  showModal.value = false;
  newProduct.value = { nome: '', category: '', stock: '', price: '', catalog: '', image_url: '' };
};


// Carregar produtos ao montar o componente
onMounted(fetchProducts);
</script>


<template>
  <Header />
  <div class="stock-manager">

    <header>
      <h1>Gerenciamento de Produtos</h1>
      <button class="add-product-btn" @click="openModal">+ Adicionar Produto</button>
    </header>


    <div class="table-container">
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
              <img :src="product.image_url" :alt="product.name" class="table-product-image" />
            </td>
            <td>{{ product.name }}</td>
            <td>{{ product.category }}</td>
            <td>{{ product.stock }}</td>
            <td>{{ product.price }}</td>

            <td>
              <span class="toggle-button static" :class="{ active: product.catalog }">
                {{ product.catalog ? "Sim" : "Não" }}
              </span>
            </td>
            <td>
              <button class="delete-btn" @click="deleteProduct(product.id)">
                <i class="fa fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>


    <div v-if="showModal" class="modal" @click.self="closeModal">
      <div class="modal-content">
        <h2>Adicionar Produto</h2>
        <input v-model="newProduct.nome" placeholder="Nome do Produto" />
        <select v-model="newProduct.category">
          <option value="salgado">Salgado</option>
          <option value="bebida">Bebida</option>
          <option value="doce">Doce</option>


        </select>
        <input v-model="newProduct.stock" type="number" placeholder="Estoque" />
        <input v-model="newProduct.price" type="number" step="0.01" placeholder="Preço" />


        <label class="catalog-label">
          <input type="checkbox" v-model="newProduct.catalog" class="hidden-checkbox" />
          <span class="toggle-button" :class="{ active: newProduct.catalog }">
            {{ newProduct.catalog ? "Exibir" : "Ocultar" }}
          </span>
        </label>



        <input type="file" @change="handleFileUpload" />
        <!-- <img :src="newProduct.image_url" :alt="newProduct.name" class="table-product-image" /> -->


        <button @click="insertData">Salvar</button>
        <button @click="closeModal">Fechar</button>
      </div>
    </div>
  </div>
  <Footer />
</template>




<style scoped>
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


.table-container {
  overflow-x: auto;
  margin-bottom: 20px;
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


th {
  background-color: #ffe5d4;
  font-weight: 600;
  color: #c45d4c;
}


td input,
td select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
}


td button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 20px;
  color: #c45d4c;
  transition: color 0.3s ease;
}


td button:hover {
  color: #a04b3a;
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


input:checked+.slider {
  background-color: #c45d4c;
}


input:checked+.slider:before {
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


input,
select {
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


.product-image-preview {
  max-width: 100%;
  max-height: 250px;
  object-fit: contain;
  border-radius: 8px;
  margin-top: 20px;
}


.file-input {
  margin-top: 10px;
  padding: 10px;
  font-size: 14px;
  color: #555;
}


/* Responsividade para telas menores */
@media (max-width: 768px) {
  .stock-manager {
    padding: 20px;
  }


  table {
    display: block;
    /* Permite rolagem horizontal */
    width: 100%;
    overflow-x: auto;
  }


  .table-container {
    overflow-x: auto;
  }


  .modal-content {
    width: 90%;
    padding: 20px;
  }


  .add-product-btn {
    padding: 8px 16px;
  }


  .save-btn,
  .close-btn {
    font-size: 14px;
    padding: 10px;
  }


  .table-product-image {
    width: 80px;
    height: 80px;
  }

  .hidden-checkbox {
    display: none;
  }

  .toggle-button {
    display: inline-block;
    padding: 8px 20px;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 600;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
    color: white;
    background-color: #ffe5d4;
    border: 2px solid #c45d4c;
  }

  .toggle-button:hover {
    background-color: #ffcbba;
    color: #a04b3a;
  }

  .toggle-button.active {
    background-color: #c45d4c;
    color: white;
  }

  .toggle-button.static {
    pointer-events: none;
    opacity: 0.8;
  }

  .hidden-checkbox {
  display: none;
}

.toggle-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 24px;
  border-radius: 30px;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: white;
  background-color: #ffe5d4;
  border: 2px solid transparent;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.toggle-button:hover {
  background-color: #ffcbba;
  border-color: #c45d4c;
  color: #c45d4c;
}

.toggle-button.active {
  background-color: #c45d4c;
  color: white;
  border-color: #a04b3a;
  box-shadow: 0px 4px 12px rgba(196, 93, 76, 0.4);
}

.toggle-button:active {
  transform: scale(0.95);
}


}
</style>
