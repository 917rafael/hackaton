<script setup>
import { ref } from "vue";
import {supabase} from  '../lib/supabaseClient';
const codigofunc = ref([]);
const cpf = ref([]);
const message = ref('');

const LoginData = async () => {
  if (!cpf.value || !codigofunc.value  ) {
    message.value = "Por favor, preencha todos os campos."
    return
  }

  const handleSignin = async () => {
  try {
    // Use the Supabase method to handle the signin
    const { error } = await supabase.auth.funcionario({
      cpf: cpf.value,
      codigofunc: codigofunc.value,
    });
    if (error) throw error;
  } catch (error) {
    alert(error.error_description || error.message);
  }
};
  message.value = 'Pessoa inserida com sucesso!'}

</script>

<template>
    <div class="background">
        <img src="/src/assets/image/Fundocontato.jpg" alt="Padaria" class="padaria-img">
    </div>
    <div class="container">
        <div class="caixa">
            <h1 class="txt-entre">LOGIN FUNCIONARIO</h1>

        <form class="form" @submit.prevent="handleSignin">
            <div class="form-group">
                <label for="CPF">CPF:</label>
                <input type="number" id="cpf" name="cpf" v-model="cpf" required placeholder="Insira seu cpf:" />
            </div>

                <div class="form-group">
                    <label for="cpf">Código Funcio:</label>
                    <input type="text" id="codigo" name="codigofunc" v-model="codigofunc" required placeholder="Informe o seu código: ">
                </div>

            <router-link to="/homeFuncio"><button type="submit" router-link="/homeFuncio" @click="entrar">Cadastrar</button></router-link>

        </form>
        <p>{{ message }}</p>
        <router-link to="/logClient" class="cliente">Cliente</router-link>
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
  transition: transform 0.3s ease-in-out; /* Transição suave para o efeito de pulsação */
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
  margin-bottom: 20px;
  width: 80%;
  margin-left: 50px;
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

button {
  padding: 12px 50px;
  background-color: #ff6600;
  color: #fff;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 18px;
  width: 100%;
  transition: background-color 0.3s ease;
}

.cliente:hover {
  animation: pulsate 1.5s infinite; /* Ativa a animação de pulsação ao passar o mouse */
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