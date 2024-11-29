import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSacolaStore = defineStore('sacola', () => {
  const sacola_cart = ref([])

  function addProduct(product) {
    const existingProduct = sacola_cart.value.find(p => p.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1; // Incrementa a quantidade se já existir
    } else {
      sacola_cart.value.push({ ...product, quantity: 1 }); // Adiciona como novo
    }
  }
  return { addProduct, sacola_cart }
})
