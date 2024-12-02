import { ref } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '../lib/supabaseClient'
import {useSacolaStore} from './sacola'
export const useAuthStore = defineStore('auth', () => {
  const access_token = ref(null)
  const refresh_token = ref(null)
  const user = ref({})
  const store = useSacolaStore();

  const salvarToken = (access_token) => {
    localStorage.setItem('access_token', access_token);
  };
  const carregarToken = () => {
    return localStorage.getItem('access_token');
  };
  const limparToken = () => {
    localStorage.removeItem('access_token');
  };

  const verificarSessao = async () => {
    const token = carregarToken();
    if (token) {
      // Se o token estiver armazenado, autentica o usuário
      const { data: userData, error } = await supabase.auth.setAuth(token);
      if (error) {
        console.error('Erro ao verificar a sessão:', error.message);
        limparToken();
      } else {
        user.value = userData.user;
        access_token.value = token;
      }
    }
  };

  const login = async (senha, email) => {
    try {
      console.log(senha)
      console.log(email)
      const { data } = await supabase.auth.signInWithPassword({
        email: email,
        password: senha
      })
     
    
      access_token.value = data.session.access_token
      console.log(access_token.value)
      refresh_token.value = data.session.refresh_token
      user.value = data.user
      salvarToken(access_token.value);
    } catch (e) {
      console.log(e)
      return e
    
    }
  }



  const signUp = async (email, senha, nome, cpf, tipo, tipoFuncionario = null) => {
    try {
      console.log(email, senha, nome, cpf, tipo, tipoFuncionario)
      await supabase.auth.signUp({
        email: email,
        password: senha,
        options: {
          data: {
            nome: nome,
            cpf: cpf,
            tipo: tipo,
            tipoFuncionario: tipoFuncionario,
          }
        }
      })
      console.log(nome, cpf,tipo,tipoFuncionario)
    } catch (e) {
      console.log(e)
      return e
    }
  }

  const sincronizarSacola = async () => {
    const sacolaLocal = JSON.parse(localStorage.getItem('sacola')) || [];
    
    for (const item of sacolaLocal) {
      await store.adicionarProduto({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      });
    }
    
    localStorage.removeItem('sacola');
  };



  return {
    verificarSessao,
    sincronizarSacola,
    access_token,
    refresh_token,
    login,
    user,
    signUp
  }
})
