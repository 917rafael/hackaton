// src/middleware/auth.js
import { supabase } from '../lib/supabaseClient';
import { ref } from "vue";

const senha = ref('');

export const UseAuthGuard = async (to, from, next) => {
  // Verificar se a rota exige autenticação
  if (to.meta.requiresAuth) {
    // Obter o usuário autenticado
    const { data: user, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      // Se o usuário não estiver autenticado, redirecionar para login
      next({ name: 'login' });
    } else {
      // Verificar o tipo do usuário nos metadados
      const tipo = user?.user_metadata?.tipo;

      // Verificar se o tipo do usuário é "funcionario" ou "cliente"
      if (tipo === 'funcionario' || tipo === 'cliente') {
        // Se o tipo for permitido, continuar
        next();
      } else {
        // Se o tipo não for permitido, redirecionar para login
        next({ name: 'login' });
      }
    }
  } 
  else if (to.meta.allowedCodes) {
    // Se a rota tiver códigos permitidos
    const { data: funcionario, error } = await supabase
      .from('funcionario')
      .select('*')
      .eq('senha', senha.value)
      .single();

    if (error || !to.meta.allowedCodes.includes(funcionario.senha)) {
      next({ name: 'login' });
    } else {
      next();
    }
  } else {
    next(); // Caso a rota não precise de autenticação, seguir normalmente
  }
};

