<script setup>
// import Footer from '@/components/FoHea/Footer.vue'
import { ref } from 'vue'
import { useAuthStore } from '@/store/auth';
import Header from '@/components/FoHea/header.vue';


const nome = ref('')
const email = ref('')
const cpf = ref('')
const senha = ref('')
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
  <Header />

<div class="background">
  <img src="/src/assets/image/padaria.jpg" alt="Padaria" class="padaria-img" />
</div>
<div class="container">
  <div class="caixa">
    <h1 class="txt-entre">ENTRE OU CADASTRE-SE NA</h1>
    <h1 class="txt-padaria">PADARIA SANTO PÃO</h1>
    <h2 class="txt-promocoes">E APROVEITE TODAS AS NOSSAS PROMOÇÕES</h2>

    <form @submit.prevent="insertData" class="form">
      <div class="form-group">
        <label for="nome">Nome:</label>
        <input type="text" id="nome" name="nome" v-model="nome" class="input-field" required placeholder="Insira seu nome:" />
      </div>

      <div class="form-group">
        <label for="cpf">CPF:</label>
        <input type="number" id="cpf" name="cpf" v-model="cpf" class="input-field" required placeholder="Insira o seu CPF: " />
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <input type="text" id="email" v-model="email" name="email" class="input-field" required placeholder="Insira o seu email:" />
      </div>

      <div class="form-group">
        <label for="senha">senha:</label>
        <input type="password" id="senha" v-model="senha" name="senha" class="input-field" required placeholder="Insira uma senha:" />
      </div>

      <button type="submit" class="submit-btn">Cadastrar</button>
     
      <p>{{ message }}</p>
    </form>
        <router-link to="/cadastroFuncio" class="cliente">
          <img src="/src/assets/image/funcionarios.png" alt="Ícone de Funcionário" class="funcio">
        </router-link>
  </div>
  </div>


</template>

<style scoped>

/* Corpo */
body {
  font-family: 'Roboto', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #2C3E50;
  color: #ECEFF1;
  overflow-x: hidden;
}

/* Container */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100vh - 80px); /* Ajuste para o header */
  position: relative;
  padding: 20px;
  margin-top: 2%;
}

/* Caixa de Formulário */
.caixa {
  width: 100%;
  max-width: 480px;
  background: #34495E;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  padding: 40px;
  text-align: center;
  position: relative;
  z-index: 1;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.caixa:hover {
  transform: translateY(-12px);
  box-shadow: 0 24px 50px rgba(0, 0, 0, 0.3);
}

/* Títulos */
.txt-entre {
  color: #B0BEC5;
  font-size: 24px;
  margin-bottom: 12px;
  letter-spacing: 1px;
}

.txt-padaria {
  color: #FF7043;
  font-size: 36px;
  font-weight: 700;
  letter-spacing: 1px;
  margin-bottom: 20px;
}

.txt-promocoes {
  color: #ECEFF1;
  font-size: 18px;
  margin-bottom: 30px;
}

/* Imagem de fundo */
.padaria-img {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.4);
  z-index: -1;
}

/* Estilo do formulário */
.form {
  display: flex;
  flex-direction: column;
  margin-top: 30px;
}

.form-group {
  margin-bottom: 18px;
}

/* Labels */
label {
  font-size: 16px;
  color: #B0BEC5;
  font-weight: 500;
  margin-bottom: 8px;
  display: block;
}

/* Inputs */
.input-field {
  padding: 14px 18px;
  border: 2px solid #607D8B;
  border-radius: 10px;
  font-size: 16px;
  width: 100%;
  background-color: #263238;
  color: #ECEFF1;
  transition: all 0.3s ease, box-shadow 0.3s ease;
}

.input-field:focus {
  border-color: #FF7043;
  background-color: #37474F;
  outline: none;
  box-shadow: 0 0 8px rgba(255, 112, 67, 0.5);
}

/* Botão de submit */
.submit-btn {
  padding: 16px 20px;
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

/* Ícone de funcionário */
.funcio {
  width: 35px;
  height: 35px;
  cursor: pointer;
  transition: transform 0.3s ease, filter 0.3s ease;
  margin-top: 15px;
}

.funcio:hover {
  transform: scale(1.2);
  filter: brightness(1.2);
}

/* Responsividade para telas menores */
@media (max-width: 1024px) {
  .container {
    padding: 30px;
  }

  .caixa {
    padding: 35px;
    max-width: 90%;
  }

  .txt-entre {
    font-size: 22px;
  }

  .txt-padaria {
    font-size: 30px;
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
    padding: 30px;
  }

  .txt-entre {
    font-size: 20px;
  }

  .txt-padaria {
    font-size: 26px;
  }

  .submit-btn {
    width: 100%;
  }

  .funcio {
    width: 28px;
    height: 28px;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 15px;
  }

  .caixa {
    padding: 20px;
    max-width: 100%;
  }

  .txt-entre {
    font-size: 18px;
  }

  .txt-padaria {
    font-size: 22px;
  }

  .submit-btn {
    font-size: 16px;
    width: 100%;
  }

  .funcio {
    width: 24px;
    height: 24px;
  }
}
</style>
