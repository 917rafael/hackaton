<script setup>
import Footer from "@/components/FoHea/Footer.vue"

</script>

<template>
  <div class="background">
    <img src="/src/assets/image/Fundocontato.jpg" alt="Padaria" class="padaria-img">
  </div>
  <div class="container">
    <div class="caixa">
      <h1 class="txt-entre"> ENTRE OU CADASTRE-SE NA</h1>
      <h1 class="txt-entre">PADARIA TRADIÇÃO NO FORNO </h1>

      <form class="form">
        <div class="form-group">
          <label for="nome">Nome:</label>
          <input type="text" id="nome" name="nome" required placeholder="Insira seu nome:">
        </div>

        <div class="form-group">
          <label for="telefone">Contato:</label>
          <input type="text" id="telefone" name="telefone" required placeholder="Insira o seu número de contato:">
        </div>

        <div class="form-group">
          <label for="data-nascimento">Data de Nasc:</label>
          <input type="date" id="data-nascimento" name="data-nascimento" required>
        </div>

        <button type="submit">Cadastrar</button>

        <div class="funcionario">
          <router-link to="/logFuncio"><img src="/src/assets/image/funcionarios.png" alt="Icone"
              class="funcio"></router-link>

        </div>
      </form>

    </div>
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
