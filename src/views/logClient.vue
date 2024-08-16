<script setup>
</script>

<template>
    <router-link></router-link>
  <div class="background">
    <img src="/src/assets/image/padaria.jpg" alt="Padaria" class="padaria-img">
  </div>
  <div class="container">
    <h1 class="entre">
      ENTRE OU CADASTRE-SE NA 
      <h1 class="santo">PADARIA SANTO PÃO</h1>
    </h1> 
    <h2>E</h2>
    <h2>APROVEITE TODAS AS NOSSAS PROMOÇÕES</h2>
    
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
</template>

<style scoped>

.form{
    margin-top: 35px;
}

body {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
}

.entre {
    color: #d9534f; /* Vermelho suave */
    text-align: center;
}

.santo {
    color: #c9302c; /* Vermelho mais intenso */
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
    position: fixed;
    top: 0;
    right: 0;
    height: 100%;
    width: 40%;
    background-color: #f4e1d2; 
    color: #333;
    padding: 20px;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    box-shadow: -5px 0 10px rgba(0, 0, 0, 0.2);
    display: flex;
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
    border: 1px solid #ddd;
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

button:hover {
    background-color: #c9302c; /* Cor de fundo do botão ao passar o mouse */
}
</style>