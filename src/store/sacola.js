import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSacolaStore = defineStore('sacola', () => {
  const sacola_cart = ref([])

  function addProduct(productselected) {
      console.log('Produto recebido:', productselected);
    const existingProduct = sacola_cart.value.find(p => p.id === productselected.id);
    if (existingProduct) {
      existingProduct.quantity += 1; // Incrementa a quantidade se já existir
    } else {
      sacola_cart.value.push({ ...productselected, quantity: 1 }); // Adiciona como novo
    }
  }
  return { addProduct, sacola_cart }
})
