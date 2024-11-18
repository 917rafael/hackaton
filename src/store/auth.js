import { ref } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '../lib/supabaseClient'

export const useAuthStore = defineStore('auth', () => {
  const access_token = ref(null)
  const refresh_token = ref(null)
  const user = ref({})

  const login = async (senha, email) => {
    try {
      console.log(senha)
      console.log(email)
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: senha
      })

      access_token.value = data.session.access_token
      console.log(access_token.value)
      refresh_token.value = data.session.refresh_token
      user.value = data.user
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

  return {
    access_token,
    refresh_token,
    login,
    user,
    signUp
  }
})
