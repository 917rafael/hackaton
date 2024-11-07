<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/store/auth';

const authStore = useAuthStore()
const nome = ref('')
const senha = ref('')
const tipoFuncionario = ref('')
const cpf = ref('')
const email = ref('')
const message = ref('')

const insertData = async () => {
  try {
    if (!nome.value || !email.value || !cpf.value || !senha.value) {
      message.value = 'Por favor, preencha todos os campos.'
      return
    }
    await authStore.signUp(email.value, senha.value, nome.value, cpf.value, 'funcionario', tipoFuncionario.value)
    message.value = 'Funcionário inserido com sucesso!'
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

    <form class="form" @submit.prevent="insertData">
      <div class="form-group">
        <label for="nome">Nome:</label>
        <input
          type="text"
          id="nome"
          name="nome"
          v-model="nome"
          required
          placeholder="Insira seu nome:"
        />
      </div>

      <div class="form-group">
        <label for="CPF">CPF:</label>
        <input
          type="number"
          id="cpf"
          name="cpf"
          v-model="cpf"
          required
          placeholder="Insira o seu cpf: "
        />
      </div>

      <div class="form-group">
        <label for="CPF">EMAIL:</label>
        <input
          type="text"
          id="email"
          name="email"
          v-model="email"
          required
          placeholder="Insira o seu email: "
        />
      </div>

      <div class="form-group">
        <label for="codigoFunc">Código Funcio:</label>
        <input
          type="text"
          id="codigo"
          name="senha"
          v-model="senha"
          required
          placeholder="Insira o seu código: "
        />
      </div>

      <div class="form-group">
        <label for="cargo">Cargo:</label>
        <input
          type="text"
          id="Cargo"
          name="cargo"
          v-model="tipoFuncionario"
          required
          placeholder="Insira o seu cargo"
        />
      </div>

      <router-link to="/homeFuncio"></router-link
      ><button type="submit" router-link="/homeFuncio" @click="entrar">Cadastrar</button>
    </form>
    <p>{{ message }}</p>
    <!--</router-link>-->
    <router-link to="/logClient" class="cliente">Cliente</router-link>
  </div>
</template>

<style scoped>
.form {
  margin-top: 30px;
}

.cliente {
  text-align: center;
  text-decoration: none;
  margin-top: 10px;
  padding: 12px;
  background-color: #e24f4a;
  color: #fff;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 18px;
  width: 42%;
  transition: background-color 0.3s ease;
}

body {
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
}
h2 {
  color: #333;
}
.entre {
  color: #d9534f;
  text-align: center;
}

.santo {
  color: #c9302c;
}

.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.padaria-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.container {
  display: flex;
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: 40%;
  background-color: #f4e1d2;
  padding: 20px;
  flex-direction: column;
  align-items: center;
}

.form-group {
  margin-bottom: 20px;
  width: 100%;
}

label {
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

input {
  padding: 12px;
  border: 1px solid #838282;
  border-radius: 8px;
  font-size: 16px;
  width: 100%;
  background-color: #f8d3d3;
}

button {
  text-align: center;
  text-decoration: none;
  margin-top: 10px;
  padding: 12px 100px;
  background-color: #e24f4a;
  color: #fff;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 18px;
  width: 100%;
  transition: background-color 0.3s ease;
}

.cliente:hover {
  background-color: #c9302c;
}

button:hover {
  background-color: #c9302c;
}
</style>
