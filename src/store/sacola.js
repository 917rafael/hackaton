import { defineStore } from 'pinia';
import { supabase } from '@/lib/supabaseClient';

export const useSacolaStore = defineStore('sacola', {
  state: () => ({
    sacola_cart: [], // Produtos locais na sacola
  }),
  actions: {
    async carregarSacola() {
      // Busca os itens da sacola do Supabase
      const { data, error } = await supabase.from('sacola').select('*, products(*)'); // Assumindo que há uma relação com a tabela Produtos
      if (error) {
        console.error('Erro ao carregar a sacola:', error);
        return;
      }

      this.sacola_cart = data.map((item) => ({
        id: item.produto_id,
        name: item.products.name,
        price: item.products.price,
        quantity: item.quantidade,
      }));
    },
    async adicionarProduto(products) {
      const existente = this.sacola_cart.find((p) => p.id === products.id);

      if (existente) {
        existente.quantity += 1;

        // Atualizar no Supabase
        const { error } = await supabase
          .from('sacola')
          .update({ quantidade: existente.quantidade })
          .eq('product_id', products.id);

        if (error) console.error('Erro ao atualizar quantidade:', error);
      } else {
        const novoProduto = { id: products.id, name: products.name, price: products.price, quantidade: 1 };
        this.sacola_cart.push(novoProduto);

        // Inserir no Supabase
        const { error } = await supabase.from('sacola').insert({
          product_id: products.id,
          quantidade: 1,
        });

        if (error) console.error('Erro ao adicionar produto:', error);
      }
    },
    async removerProduto(productselected) {
      const existente = this.sacola_cart.find((p) => p.id === productselected.id);

      if (existente) {
        if (existente.quantidade > 1) {
          existente.quantidade -= 1;

          // Atualizar no Supabase
          const { error } = await supabase
            .from('sacola')
            .update({ quantidade: existente.quantidade })
            .eq('product_id', productselected.id);

          if (error) console.error('Erro ao diminuir quantidade:', error);
        } else {
          // Remover do Supabase
          const { error } = await supabase.from('sacola').delete().eq('product_id', productselected.id);
          if (error) console.error('Erro ao remover produto:', error);

          this.sacola_cart = this.sacola_cart.filter((p) => p.id !== productselected.id);
        }
      }
    },
    async excluirProduto(index) {
      const produto = this.sacola_cart[index];

      // Remover do Supabase
      const { error } = await supabase.from('sacola').delete().eq('product_id', produto.id);
      if (error) {
        console.error('Erro ao excluir produto:', error);
        return;
      }

      this.sacola_cart.splice(index, 1);
    },
  },
});
