import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { supabase } from '@/lib/supabaseClient';
import router from '@/router/index';

export const useSacolaStore = defineStore('sacola', () => {
  const sacola_cart = ref([]);

  // Função auxiliar para obter o usuário
  const getUser = async () => {
    try {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        console.error('Erro ao obter usuário:', error?.message);
        return null;
      }
      return data.user;
    } catch (err) {
      console.error('Erro inesperado ao obter usuário:', err.message);
      return null;
    }
  };

  const carregarSacola = async () => {
    try {
      const user = await getUser();
      if (!user) {
        const sacolaLocal = JSON.parse(localStorage.getItem('sacola')) || [];
        sacola_cart.value = sacolaLocal;
        return;
      }

      const { data, error } = await supabase
        .from('sacola')
        .select('*, products(*)')
        .eq('user_id', user.id);

      if (error) {
        console.error('Erro ao carregar a sacola:', error.message);
        return;
      }

      sacola_cart.value = data.map((item) => ({
        id: item.products.id,
        name: item.products.name,
        price: item.products.price,
        quantity: item.quantidade,
      }));
    } catch (err) {
      console.error('Erro inesperado ao carregar sacola:', err.message);
    }
  };

  const adicionarProduto = async (product) => {
    const user = await getUser();
    if (!user) {
      const sacolaLocal = JSON.parse(localStorage.getItem('sacola')) || [];
      const existente = sacolaLocal.find((p) => p.id === product.id);
      if (existente) {
        existente.quantity += 1;
      } else {
        sacolaLocal.push({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
        });
      }
      localStorage.setItem('sacola', JSON.stringify(sacolaLocal));
      return;
    }

    try {
      const existente = sacola_cart.value.find((p) => p.id === product.id);
      if (existente) {
        const novaQuantidade = existente.quantity + 1;
        const { error } = await supabase
          .from('sacola')
          .update({ quantidade: novaQuantidade })
          .eq('product_id', product.id);
        if (error) {
          console.error('Erro ao atualizar quantidade:', error.message);
          return;
        }
        existente.quantity = novaQuantidade;
      } else {
        const { error } = await supabase.from('sacola').insert({
          product_id: product.id,
          user_id: user.id,
          quantidade: 1,
        });
        if (error) {
          console.error('Erro ao adicionar produto:', error.message);
          return;
        }
        sacola_cart.value.push({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
        });
      }
    } catch (err) {
      console.error('Erro inesperado ao adicionar produto:', err.message);
    }
  };

  const removerProduto = async (product) => {
    const existente = sacola_cart.value.find((p) => p.id === product.id);
    if (!existente) return;

    try {
      if (existente.quantity > 1) {
        const novaQuantidade = existente.quantity - 1;
        const { error } = await supabase
          .from('sacola')
          .update({ quantidade: novaQuantidade })
          .eq('product_id', product.id);
        if (error) {
          console.error('Erro ao diminuir quantidade:', error.message);
          return;
        }
        existente.quantity = novaQuantidade;
      } else {
        const { error } = await supabase
          .from('sacola')
          .delete()
          .eq('product_id', product.id);
        if (error) {
          console.error('Erro ao remover produto:', error.message);
          return;
        }
        sacola_cart.value = sacola_cart.value.filter((p) => p.id !== product.id);
      }
    } catch (err) {
      console.error('Erro inesperado ao remover produto:', err.message);
    }
  };

  const excluirProduto = async (index) => {
    const produto = sacola_cart.value[index];
    if (!produto) return;

    try {
      const { error } = await supabase
        .from('sacola')
        .delete()
        .eq('product_id', produto.id);
      if (error) {
        console.error('Erro ao excluir produto:', error.message);
        return;
      }
      sacola_cart.value.splice(index, 1);
    } catch (err) {
      console.error('Erro inesperado ao excluir produto:', err.message);
    }
  };

  const totalSacola = computed(() =>
    sacola_cart.value.reduce((total, item) => total + item.price * item.quantity, 0)
  );

  const fecharPedido = async () => {
    try {
      const user = await getUser();
      if (!user) {
        localStorage.setItem('sacola', JSON.stringify(sacola_cart.value));
        router.push({ name: 'login' });
        return;
      }

      const sacolaLocal = JSON.parse(localStorage.getItem('sacola')) || [];
      const updates = sacolaLocal.map((item) => ({
        product_id: item.id,
        user_id: user.id,
        quantidade: item.quantity,
      }));

      const { error } = await supabase.from('sacola').upsert(updates);
      if (error) {
        console.error('Erro ao sincronizar sacola:', error.message);
        return;
      }

      localStorage.removeItem('sacola');
      router.push({ name: 'endereco' });
    } catch (err) {
      console.error('Erro ao fechar pedido:', err.message);
    }
  };

 

  

  

  return {
    getUser,
    fecharPedido,
    sacola_cart,
    carregarSacola,
    adicionarProduto,
    removerProduto,
    excluirProduto,
    totalSacola,
  };
});
