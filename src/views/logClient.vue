<script setup>
import { ref } from 'vue'
import { supabase } from '../lib/supabaseClient'

const nome = ref([])
const email = ref([])
const cpf = ref([])
const senha = ref([])
const message = ref('')

const insertData = async () => {
  if (!nome.value || !email.value || !cpf.value || !senha.value) {
    message.value = 'Por favor, preencha todos os campos.'
    return
  }
  const { data: pessoaData, pessoaError } = await supabase.from('cliente').insert([
    {
      cpf: cpf.value,
      nome: nome.value,
      email: email.value,
      senha: senha.value
    }
  ])

  if (pessoaError) {
    console.error('Erro ao inserir pessoa:', pessoaError.message)
    message.value = `Erro ao inserir pessoa: ${pessoaError.message}`
    return
  }

  message.value = 'Pessoa inserida com sucesso!'
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
        <label for="cpf">CPF:</label>
        <input
          type="text"
          id="cpf"
          name="cpf"
          v-model="cpf"
          required
          placeholder="Insira o seu CPF: "
        />
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <input
          type="text"
          id="email"
          v-model="email"
          name="email"
          required
          placeholder="Insira o seu email:"
        />
      </div>

      <div class="form-group">
        <label for="senha">senha:</label>
        <input
          type="password"
          id="senha"
          v-model="senha"
          name="senha"
          required
          placeholder="Insira uma senha:"
        />
      </div>

      <button type="submit">Cadastrar</button>
      <p>{{ message }}</p>
    </form>
    <router-link to="/logFuncio" class="funcio">Funcionarios</router-link>
  </div>
</template>

<style scoped>
h2 {
  color: #333;
}
.form {
  margin-top: 35px;
}

.funcio {
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
  width: 57%;
  transition: background-color 0.3s ease;
}

body {
  font-family: 'Poppins', sans-serif;
  margin: 0;
  padding: 0;
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
  padding: 12px 20px;
  background-color: #e24f4a;
  color: #fff;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 18px;
  width: 100%;
  transition: background-color 0.3s ease;
}

.funcio:hover {
  background-color: #c9302c;
}
button:hover {
  background-color: #c9302c;
}
</style>
