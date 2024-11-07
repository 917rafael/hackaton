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
/* Corpo */
body {
  font-family: 'Roboto', sans-serif;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  background-color: #2C3E50; /* Fundo escuro para o corpo */
  color: #ECEFF1;
}

/* Global */
h1 {
  font-weight: 600;
}

.txt-entre {
  color: #B0BEC5; /* Cor suave para o texto */
  text-align: center;
  font-size: 28px;
  margin-bottom: 10px;
}

.txt-padaria {
  color: #FF7043; /* Laranja para o título */
  text-align: center;
  font-size: 36px;
  font-weight: 700;
  letter-spacing: 1px;
  margin-bottom: 20px;
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
  background: #34495E; /* Cor mais escura para o fundo */
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

/* Imagem de fundo */
.padaria-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.3);
  z-index: -1;
}

/* Estilo do formulário */
.form {
  display: flex;
  flex-direction: column;
  margin-top: 30px;
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
.funcionario {
  margin-top: 25px;
}

.funcio {
  width: 35px;
  height: 35px;
  cursor: pointer;
  transition: transform 0.3s ease, filter 0.3s ease;
}

.funcio:hover {
  transform: scale(1.2);
  filter: brightness(1.2);
}

/* Animação para fade-in */
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

/* Responsividade para telas menores */
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

/* Efeitos de transição mais suaves para o botão e ícones */
button, .funcio {
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

/* Hover e animação do ícone de funcionário */
.funcio:hover {
  transform: scale(1.2);
  filter: brightness(1.2);
}

.submit-btn:hover {
  background-color: #FF5722;
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

/* Modo noturno */
body {
  background-color: #2C3E50;
}

.container {
  animation: fadeIn 1.2s ease-in-out;
}
</style>
