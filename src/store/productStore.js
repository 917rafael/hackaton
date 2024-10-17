import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useProductStore = defineStore('productStore', () => {
  // Estado reativo de produtos
  const products = ref([
    { id: 1, name: 'Arroz do chef', category: 'Arroz', stock: 0, price: 15.00, catalog: true },
    { id: 2, name: 'Asinhas de frango', category: 'Frango', stock: 49, price: 18.00, catalog: true },
  ]);

  // Função para adicionar um novo produto
  const addProduct = (product) => {
    products.value.push(product);
  };

  // Função para excluir um produto
  const deleteProduct = (productId) => {
    products.value = products.value.filter(p => p.id !== productId);
  };

  // Função para alternar o status de exibição no catálogo
  const toggleCatalog = (product) => {
    product.catalog = !product.catalog;
  };

  return {
    products,
    addProduct,
    deleteProduct,
    toggleCatalog
  };
});
