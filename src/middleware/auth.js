// src/middleware/auth.js
import { supabase } from '../lib/supabaseClient'
import { ref } from "vue";

const senha = ref('');
export const authGuard = async (to, from, next) => {
  if (to.meta.requiresAuth ) {
    // Se a rota requer autenticação e o usuário não está autenticado
    next({ name: 'Login' })
  } else if (to.meta.allowedCodes) {
    // Verifica se o código do funcionário está permitido
    const { data: funcionario, error } = await supabase
      .from('funcionario')
      .select('*')
      .eq('senha', senha.value) // Supondo que você armazene o id do usuário
      .single()

    if (error || !to.meta.allowedCodes.includes(funcionario.codigo)) {
      // Se ocorrer um erro ou o código não estiver na lista permitida
      next({ name: 'Login' })
    } else {
      next()
    }
  } else {
    next() // Permite a navegação
  }
}
