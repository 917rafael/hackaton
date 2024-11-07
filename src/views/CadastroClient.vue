<script setup>
import Footer from '@/components/FoHea/Footer.vue'
import { ref } from 'vue'
import { useAuthStore } from '@/store/auth';

const nome = ref([])
const email = ref([])
const cpf = ref([])
const senha = ref([])
const message = ref('')
const authStore = useAuthStore();

const insertData = async () => {
  try {
    if (!nome.value || !email.value || !cpf.value || !senha.value) {
      message.value = 'Por favor, preencha todos os campos.'
      return
    }
    await authStore.signUp(email.value, senha.value, nome.value, cpf.value, 'cliente', null)
    message.value = 'Cliente inserido com sucesso!'
  } catch (e) {
    console.error(e)
    return e
  }
}
</script>

<template>
  <div class="background">
    <img src="/src/assets/image/padaria.jpg" alt="Padaria" class="padaria-img" />
  </div>
  <div class="container">
    <h1 class="entre">
      ENTRE OU CADASTRE-SE NA
      <h1 class="santo">PADARIA SANTO PÃO</h1>
    </h1>
    <h2>E APROVEITE TODAS AS NOSSAS PROMOÇÕES</h2>

    <form @submit.prevent="insertData" class="form">
      <div class="form-group">
        <label for="nome">Nome:</label>
        <input type="text" id="nome" name="nome" v-model="nome" required placeholder="Insira seu nome:" />
      </div>

      <div class="form-group">
        <label for="cpf">CPF:</label>
        <input type="number" id="cpf" name="cpf" v-model="cpf" required placeholder="Insira o seu CPF: " />
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <input type="text" id="email" v-model="email" name="email" required placeholder="Insira o seu email:" />
      </div>

      <div class="form-group">
        <label for="senha">senha:</label>
        <input type="text" id="senha" v-model="senha" name="senha" required placeholder="Insira uma senha:" />
      </div>

      <button type="submit">Cadastrar</button>
      <p>{{ message }}</p>
    </form>
  </div>

  <div class="footer">
    <Footer />
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

body {
  font-family: 'Poppins', sans-serif;
  margin: 0;
  padding: 0;
}

h2 {
  color: #333;
}

.txt-entre {
  color: #1b1b1b;
  text-align: center;
  font-size: 30px;
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

.padaria-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.7);
}

.caixa {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
}

.form {
  margin-top: 35px;
}

.form-group {
  margin-bottom: 20px;
  width: 100%;
}

.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

label {
  margin-bottom: 5px;
  font-weight: bold;
  color: #3a3a3a;
}

input {
  padding: 12px;
  border: 1px solid #838282;
  border-radius: 8px;
  font-size: 16px;
  width: 100%;
  background-color: #f8d3d3;
}

.funcio {
  width: 35px;
  height: 35px;
  margin-left: 10px;
  transition: background-color 0.3s ease;
  transition: transform 0.3s ease-in-out;
  /* Transição suave para o efeito de pulsação */
  cursor: pointer;
  border: none;
}

button {
  padding: 12px;
  background-color: #ff6600;
  color: #fff;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 18px;
  margin-left: 29%;
  width: 40%;
  transition: background-color 0.3s ease;
}

.funcio:hover {
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
