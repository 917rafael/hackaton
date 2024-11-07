import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSacolaStore = defineStore('sacola', () => {
  const sacola_cart = ref([])

  function addProduct(sacola) {
    sacola_cart.value.push(sacola[0])
  }

  return { addProduct, sacola_cart }
})
