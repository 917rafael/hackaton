<script setup>
import Input from '@/components/input.vue';
import headers from '@/components/FoHea/header.vue';
import Footer from '@/components/FoHea/Footer.vue';
</script>

<template>
  <headers />
  <div class="background">
    <img src="/src/assets/image/padaria.jpg" alt="Padaria" class="padaria-img">
  </div>
  <div class="container">
    <div class="caixa">
    <h1 class="txt-entre">
      ENTRE OU CADASTRE-SE NA PADARIA TRADIÇÃO NO FORNO E APROVEITE TODAS AS NOSSSAS PROMOÇÕES
    </h1>

    <form class="form">
      <div class="form-group">
        <label for="nome">Nome:</label>
        <input type="text" id="nome" name="nome" required placeholder="Insira seu nome:">
      </div>

      <div class="form-group">
        <label for="cpf">CPF:</label>
        <input type="text" id="cpf" name="cpf" required placeholder="Insira o seu CPF: ">
      </div>

      <div class="form-group">
        <label for="data-nascimento">Data de Nasc:</label>
        <input type="date" id="data-nascimento" name="data-nascimento" required>
      </div>

      <button type="submit">Cadastrar</button>
    </form>

    <router-link to="/logFuncio" class="funcio">Funcionarios</router-link>

  </div>
  </div>

</template>

<style scoped>

body {
  font-family: 'Poppins', sans-serif;
  margin: 0;
  padding: 0;
}

.container {
  display: flex;
  border-radius: 10px;
  margin-left: 30%;
  margin-right: 30%;
  background-color: #f4e1d2;
  padding: 20px;
  margin-top: 30px;
  width: 700px;
  height: 750px;
  flex-direction: column;
  
}

.padaria-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
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

.txt-entre {
  color: #d9534f;
  text-align: center;
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
