import { defineStore } from 'pinia'
import { computed, ref } from 'vue'


import pão from '@/assets/image/comidas/pao-frances.jpg'
import coxinha from '@/assets/image/comidas/coxinha.jpg'
import bolo from '@/assets/image/comidas/bolo-vulcão.jpg'
import café from '@/assets/image/comidas/café.jpg'
import orelha from '@/assets/image/comidas/orelha-de-gato.jpg'
import sonho from '@/assets/image/comidas/sonho.jpg'
import salgadinhos from '@/assets/image/comidas/salgadinhos.jpg'
import paoQ from '@/assets/image/comidas/pao-queijo.jpg'

export const useProductStore = defineStore('product', () => {
  const products = ref([
    {
      id: 1,
      name: 'Compre pão caraio',
      image: pão,
      rating: 5,
      reviews: 150,
      //oldPrice: 229.99,
      currentPrice: 179.99,
      //discount: 21,
      catalog: true,
      text: 'Deseja Adicionar',
      count: 0,
      price: 1.0
    },
    {
      id: 2,
      name: 'Compre sonho',
      image: sonho,
      rating: 5,
      reviews: 273,
      //oldPrice: 229.99,
      currentPrice: 179.99,
      //discount: 21,
      catalog: true,
      //text: 'Deseja Adicionar 1 kit de Sachês com Molhos? Kit Sachês (1 Catchup, 1 Maionese, 1 Mostarda) (R$ 1,00)',
      count: 0,
      price: 1.0
    },
    {
      id: 3,
      name: 'Compre Coxinha',
      image: coxinha,
      rating: 4,
      reviews: 60,
      //oldPrice: 229.99,
      currentPrice: 179.99,
      //discount: 21,
      catalog: true,
      text: 'Deseja Adicionar 1 kit de Sachês com Molhos? Kit Sachês (1 Catchup, 1 Maionese, 1 Mostarda) (R$ 1,00)',
      count: 0,
      price: 1.0
    },
    {
      id: 4,
      name: 'Compre Bolo',
      image: bolo,
      rating: 3,
      reviews: 25,
      //oldPrice: 229.99,
      currentPrice: 179.99,
      //discount: 21,
      catalog: true,
      text: 'Deseja Adicionar 1 kit de Sachês com Molhos? Kit Sachês (1 Catchup, 1 Maionese, 1 Mostarda) (R$ 1,00)',
      count: 0,
      price: 1.0
    },
    {
      id: 5,
      name: 'Compre café',
      image: café,
      rating: 4,
      reviews: 55,
      //oldPrice: 229.99,
      currentPrice: 179.99,
      //discount: 21,
      catalog: true,
      text: 'Deseja Adicionar 1 kit de Sachês com Molhos? Kit Sachês (1 Catchup, 1 Maionese, 1 Mostarda) (R$ 1,00)',
      count: 0,
      price: 1.0
    },
    {
      id: 6,
      name: 'Compre orelha de gato',
      image: orelha,
      rating: 90,
      reviews: 4,
      //oldPrice: 229.99,
      currentPrice: 179.99,
      //discount: 21,
      catalog: true,
      text: 'Deseja Adicionar 1 kit de Sachês com Molhos? Kit Sachês (1 Catchup, 1 Maionese, 1 Mostarda) (R$ 1,00)',
      count: 0,
      price: 1.0
    },
    {
      id: 7,
      name: 'Compre salgadinhos de festa',
      image: salgadinhos,
      rating: 78,
      reviews: 4,
      //oldPrice: 229.99,
      currentPrice: 179.99,
      //discount: 21,
      catalog: true
    },
    {
      id: 8,
      name: 'Compre pão de queijo',
      image: paoQ,
      rating: 1,
      reviews: 15,
      //oldPrice: 229.99,
      currentPrice: 179.99,
      //discount: 21,
      catalog: true
    },
    {
      id: 9,
      name: 'Compre pão caraio',
      image: pão,
      rating: 2,
      reviews: 23,
      //oldPrice: 229.99,
      currentPrice: 179.99,
      //discount: 21,
      catalog: true,
      text: 'Deseja Adicionar',
      count: 0,
      price: 1.0
    },
    {
      id: 10,
      name: 'Compre sonho',
      image: sonho,
      rating: 2,
      reviews: 24,
      //oldPrice: 229.99,
      currentPrice: 179.99,
      //discount: 21,
      catalog: true,
      text: 'Deseja Adicionar 1 kit de Sachês com Molhos? Kit Sachês (1 Catchup, 1 Maionese, 1 Mostarda) (R$ 1,00)',
      count: 0,
      price: 1.0
    },
    {
      id: 11,
      name: 'Compre Coxinha',
      image: coxinha,
      rating: 5,
      reviews: 440,
      //oldPrice: 229.99,
      currentPrice: 179.99,
      //discount: 21,
      catalog: true,
      text: 'Deseja Adicionar 1 kit de Sachês com Molhos? Kit Sachês (1 Catchup, 1 Maionese, 1 Mostarda) (R$ 1,00)',
      count: 0,
      price: 1.0
    },
    {
      id: 12,
      name: 'Compre Bolo',
      image: bolo,
      rating: 5,
      reviews: 300,
      //oldPrice: 229.99,
      currentPrice: 179.99,
      //discount: 21,
      catalog: true,
      text: 'Deseja Adicionar 1 kit de Sachês com Molhos? Kit Sachês (1 Catchup, 1 Maionese, 1 Mostarda) (R$ 1,00)',
      count: 0,
      price: 1.0
    },
    {
      id: 13,
      name: 'Compre café',
      image: café,
      rating: 5,
      reviews: 426,
      //oldPrice: 229.99,
      currentPrice: 179.99,
      //discount: 21,
      catalog: true,
      text: 'Deseja Adicionar 1 kit de Sachês com Molhos? Kit Sachês (1 Catchup, 1 Maionese, 1 Mostarda) (R$ 1,00)',
      count: 0,
      price: 1.0
    },
    {
      id: 14,
      name: 'Compre orelha de gato',
      image: orelha,
      rating: 4,
      reviews: 112,
      //oldPrice: 229.99,
      currentPrice: 179.99,
      //discount: 21,
      catalog: true,
      text: 'Deseja Adicionar 1 kit de Sachês com Molhos? Kit Sachês (1 Catchup, 1 Maionese, 1 Mostarda) (R$ 1,00)',
      count: 0,
      price: 1.0
    },
    {
      id: 15,
      name: 'Compre salgadinhos de festa',
      image: salgadinhos,
      rating: 5,
      reviews: 25,
      //oldPrice: 229.99,
      currentPrice: 179.99,
      //discount: 21,
      catalog: true
    },
    {
      id: 16,
      name: 'Compre pão de queijo',
      image: paoQ,
      rating: 2,
      reviews: 1,
      //oldPrice: 229.99,
      currentPrice: 179.99,
      //discount: 21,
      catalog: true
    }
  ])

  const catalogProducts = computed(() => {
    return products.value.filter((product) => product.catalog)
  })

  function changeCatologVisibility(id) {
    const product = products.value.find((product) => product.id === id)
    product.catalog = !product.catalog
  }

  return { products, catalogProducts, changeCatologVisibility }
})
