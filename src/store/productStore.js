import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { supabase } from '@/lib/supabaseClient'


export const useProductStore = defineStore('product', () => {
  
  const products = ref([])

  const getProductById = (id) => products.value.find(p => p.id == id)

  const Product = async () => {
    const { data, error } = await supabase.from('products').select('*');
    if (error) {
      console.error('Erro ao buscar produtos:', error.message);
    } else {
      products.value = data;
      
    }
  };

  

const fetchProducts = async () => {
  const { data, error } = await supabase.from('products').select('*').eq('catalog', true);
  if (error) {
    console.error('Erro ao carregar produtos do catálogo:', error);
  } else {
    products.value = data;
    console.log(products)
  }}


  const catalogProducts = computed(() => {
    return products.value.filter((product) => product.catalog)
  })

  // // Função para adicionar um novo produto
  // function addProduct(product) {
  //   products.value.push(product)
  // }

  // // Função para atualizar um produto existente
  // function updateProduct(updatedProduct) {
  //   const index = products.value.findIndex((product) => product.id === updatedProduct.id)
  //   if (index !== -1) {
  //     products.value[index] = updatedProduct
  //   }
  // }

  // // Função para excluir um produto
  // function deleteProduct(productId) {
  //   products.value = products.value.filter((product) => product.id !== productId)
  // }

  // // Função para alternar a visibilidade do produto no catálogo
  // function changeCatologVisibility(id) {
  //   const product = products.value.find((product) => product.id === id)
  //   product.catalog = !product.catalog
  // }

  return { 
    products,
    getProductById,
    fetchProducts,
    Product, 
    catalogProducts, 
    // addProduct, 
    // updateProduct, 
    // deleteProduct, 
    // changeCatologVisibility 
  }
})