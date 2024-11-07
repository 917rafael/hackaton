<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/store/auth';
import router from '@/router';

const authStore =  useAuthStore()

const senha = ref('');
const email = ref('')

const login = async() => {
  try {
    await authStore.login(senha.value, email.value)
    if (authStore.user.user_metadata.tipo == 'cliente') router.push({ name: 'home' })
    else if (authStore.user.user_metadata.tipo == 'funcionario') router.push({ name: 'homeFuncio' })
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
  <div class="background">
    <img src="/src/assets/image/Fundocontato.jpg" alt="Padaria" class="padaria-img" />
  </div>
  <div class="container">
    <div class="caixa">
      <h1 class="txt-entre">LOGIN</h1>

      <form class="form" @submit.prevent="login">
        <div class="form-group">
          <label for="CPF">EMAIL:</label>
          <input
            type="text"
            id="email"
            name="email"
            v-model="email"
            required
            placeholder="Insira seu email:"
          />
        </div>

        <div class="form-group">
          <label for="cpf">Senha:</label>
          <input
            type="text"
            id="senha"
            name="senha"
            v-model="senha"
            required
            placeholder="Informe o seu código: "
          />
        </div>
        <button type="submit">Entrar</button>
      </form>
      <p>{{ message }}</p>
      <router-link to="/Login" class="cliente">Cliente</router-link>
    </div>
  </div>
</template>

<style scoped>
.funcionario {
  margin-left: 290px;
  margin-top: -42px;
}

.footer {
  background-color: #f3d7b6;
}

.caixa {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
}

.cliente {
  width: 35px;
  height: 35px;
  margin-right: 50px;
  transition: background-color 0.3s ease;
  transition: transform 0.3s ease-in-out;
  /* Transição suave para o efeito de pulsação */
  cursor: pointer;
  border: none;
}

body {
  font-family: 'Poppins', sans-serif;
  margin: 0;
  padding: 0;
}

.txt-entre {
  margin-top: 10px;
  color: #1b1b1b;
  text-align: center;
  font-size: 34px;
}

/* Container */
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
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.7);
}

.container {
  display: flex;
  border-radius: 10px;
  margin-left: 33%;
  margin-top: 140px;
  margin-bottom: 200px;
  background-color: #f8cb98;
  padding: 20px;
  width: 540px;
  height: 670px;
  flex-direction: column;
}

.form {
  margin-top: 75px;
}

.form-group {
    margin-bottom: 35px;
    position: relative;
}

/* Labels */
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

/* Inputs */
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

/* Efeito ao focar nos inputs */
.input-field:focus {
    border-color: #FF7043;
    background-color: #37474F;
    outline: none;
    box-shadow: 0 0 8px rgba(255, 112, 67, 0.5);
}

/* Efeito flutuante no label */
.input-field:focus + .input-label,
.input-field:not(:placeholder-shown) + .input-label {
    transform: translateY(-25px);
    font-size: 14px;
    color: #FF7043;
}

/* Botão de submit */
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

.submit-btn:hover {
    background-color: #FF5722;
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
}

.submit-btn:active {
    transform: translateY(1px);
}

/* Ícone de funcionário */
.cliente {
    margin-top: 25px;
    display: block;
    text-align: center;
    font-size: 16px;
    color: #B0BEC5;
    text-decoration: none;
}

.cliente:hover {
  animation: pulsate 1.5s infinite;
  /* Ativa a animação de pulsação ao passar o mouse */
}

button:hover {
  background-color: #ca4e1db9;
}

/* Animação de pulsação */
@keyframes pulsate {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
  }
}
</style>

