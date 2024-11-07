// src/middleware/auth.js
import { supabase } from '../lib/supabaseClient'
import { ref } from "vue";

const senha = ref('');
export const authGuard = async (to, from, next) => {
  if (to.meta.requiresAuth) {
    next({ name: 'login' })
  } else if (to.meta.allowedCodes) {
    const { data: funcionario, error } = await supabase
      .from('funcionario')
      .select('*')
      .eq('senha', senha.value) 
      .single()

    if (error || !to.meta.allowedCodes.includes(funcionario.senha)) {
      next({ name: 'login' })
    } else {
      next()
    }
  } else {
    next() 
  }
}
