<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import Footer from '@/components/FoHea/Footer.vue';
import Header from '@/components/FoHea/header.vue';
import { ref } from 'vue'
import { useAuthStore } from '@/store/auth';
import router from '@/router';
const authStore =  useAuthStore()
const senha = ref('');
const email = ref('');

const login = async() => {
  try {
    await authStore.login(senha.value, email.value) && authStore.sincronizarSacola(authStore.user.id);
    console.log(authStore.user.user_metadata.tipo)
    if (authStore.user.user_metadata.tipo == 'cliente') router.push(`/`)
    else if (authStore.user.user_metadata.tipo == 'funcionario') router.push({ name: 'homeFuncio' })
  console.log(authStore.user.user_metadata.tipo)
  } catch(e) {
    console.log(e)
  }

}

/* funcao para logout
  const logout = async () => {
    await supabase.auth.signOut();
    router.push('/Login'); // Redireciona para a página de login
  };*/
</script>

<template>
<Header />

  <div class="background">
    <img src="/src/assets/image/Fundocontato.jpg" alt="Padaria" class="padaria-img" />
  </div>
  <div class="container">
    <div class="caixa">
      <h1 class="txt-entre">LOGIN</h1>

      <form class="form" @submit.prevent="login">
        <div class="form-group">
          <label for="email" class="input-label">EMAIL:</label>
          <input
            type="text"
            id="email"
            name="email"
            class="input-field"
            v-model="email"
            required
            placeholder="Insira seu email:"
          />
        </div>

        <div class="form-group">
          <label for="senha" class="input-label">Senha:</label>
          <input
            type="password"
            id="senha"
            name="senha"
            class="input-field"
            v-model="senha"
            required
            placeholder="Informe a sua senha: "
          />
        </div>
        <button type="submit"  class="submit-btn">Entrar</button>
      </form>
      <p>{{ message }}</p>
      <button type="button" class="register-btn" @click="$router.push(`/cadastro`)">cadastre-se</button>
    </div>
  </div>
<Footer />
</template>

<style scoped>
body {
  font-family: 'Roboto', sans-serif;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  background-color: #2C3E50;   color: #ECEFF1;
}

h1 {
  font-weight: 600;
}

.txt-entre {
  color: #B0BEC5; 
  text-align: center;
  font-size: 28px;
  margin-bottom: 10px;
}

.txt-padaria {
  color: #FF7043; 
  text-align: center;
  font-size: 36px;
  font-weight: 700;
  letter-spacing: 1px;
  margin-bottom: 20px;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  position: relative;
  padding: 20px;
  animation: fadeIn 1s ease-in-out;
}

.caixa {
  width: 100%;
  max-width: 480px;
  background: #34495E; 
  border-radius: 20px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  padding: 40px;
  text-align: center;
  position: relative;
  z-index: 1;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.caixa:hover {
  transform: translateY(-15px);
  box-shadow: 0 24px 50px rgba(0, 0, 0, 0.3);
}

.padaria-img {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.3);
  z-index: -1;
}

.form {
  display: flex;
  flex-direction: column;
  margin-top: 30px;
}

.form-group {
  margin-bottom: 35px;
  position: relative;
}

.input-label {
  font-size: 16px;
  color: #B0BEC5;
  font-weight: 500;
  margin-bottom: 8px;
  display: block;
  transition: all 0.3s ease-in-out;
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}

.input-field {
  padding: 18px 20px;
  border: 2px solid #607D8B;
  border-radius: 12px;
  font-size: 16px;
  width: 100%;
  background-color: #263238;
  color: #ECEFF1;
  transition: all 0.3s ease, box-shadow 0.3s ease;
  margin-top: 10px;
  position: relative;
}

.input-field:focus {
  border-color: #FF7043;
  background-color: #37474F;
  outline: none;
  box-shadow: 0 0 8px rgba(255, 112, 67, 0.5);
}

.input-field:focus + .input-label,
.input-field:not(:placeholder-shown) + .input-label {
  transform: translateY(-25px);
  font-size: 14px;
  color: #FF7043;
}

.submit-btn {
  padding: 18px 20px;
  background-color: #FF7043;
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-size: 18px;
  width: 100%;
  margin-top: 20px;
  transition: background-color 0.3s, transform 0.3s ease-in-out, box-shadow 0.3s ease;
}

.submit-btn:hover && .register-btn:hover {
  background-color: #FF5722;
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
}

.submit-btn:active && .register-btn:active {
  transform: translateY(1px);
}

.register-btn{
  place-items: center;
  padding: 11px 2px ;
  background-color: #FF7043;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 12px;
  width: 20%;
  margin: 10px auto;  
  transition: background-color 0.3s, transform 0.3s ease-in-out, box-shadow 0.3s ease;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 1024px) {
  .container {
    padding: 30px;
  }

  .caixa {
    padding: 45px;
    max-width: 100%;
  }

  .txt-entre {
    font-size: 26px;
  }

  .txt-padaria {
    font-size: 32px;
  }

  .submit-btn {
    width: 100%;
  }

  .funcio {
    width: 30px;
    height: 30px;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 20px;
  }

  .caixa {
    padding: 35px;
  }

  .txt-entre {
    font-size: 24px;
  }

  .txt-padaria {
    font-size: 28px;
  }

  .submit-btn {
    width: 100%;
  }

  .funcio {
    width: 30px;
    height: 30px;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 15px;
  }

  .caixa {
    padding: 25px;
    max-width: 100%;
  }

  .txt-entre {
    font-size: 22px;
  }

  .txt-padaria {
    font-size: 24px;
  }

  .submit-btn {
    font-size: 16px;
    width: 100%;
  }

  .funcio {
    width: 28px;
    height: 28px;
  }
}

button, .funcio {
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.funcio:hover {
  transform: scale(1.2);
  filter: brightness(1.2);
}

.submit-btn:hover {
  background-color: #FF5722;
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

body {
  background-color: #2C3E50;
}

.container {
  animation: fadeIn 1.2s ease-in-out;
}
</style>


