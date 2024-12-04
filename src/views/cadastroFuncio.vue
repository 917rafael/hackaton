<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/store/auth';
import Header from '@/components/FoHea/header.vue';
import Footer from '@/components/FoHea/Footer.vue';

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
  <Header />

  <div class="background">
    <img src="/src/assets/image/padaria.jpg" alt="Padaria" class="padaria-img" />
  </div>
  
  <div class="container">
    <div class="caixa">
      <h1 class="txt-entre">BEM-VINDO À</h1>
      <h1 class="txt-padaria">PADARIA SANTO PÃO</h1>
      <h2 class="txt-promocoes">Onde o sabor encontra a tradição</h2>

      <form class="form" @submit.prevent="insertData">
        <div class="form-group">
          <label for="nome">Nome:</label>
          <input type="text" id="nome" name="nome" v-model="nome" required placeholder="Digite seu nome" class="input-field" />
        </div>

        <div class="form-group">
          <label for="cpf">CPF:</label>
          <input type="number" id="cpf" name="cpf" v-model="cpf" required placeholder="Digite seu CPF" class="input-field" />
        </div>

        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" name="email" v-model="email" required placeholder="Digite seu email" class="input-field" />
        </div>

        <div class="form-group">
          <label for="senha">Senha:</label>
          <input type="password" id="senha" name="senha" v-model="senha" required placeholder="Digite sua senha" class="input-field" />
        </div>

        <div class="form-group">
          <label for="cargo">Cargo:</label>
          <input type="text" id="cargo" name="cargo" v-model="cargo" required placeholder="Qual o seu cargo?" class="input-field" />
        </div>

        <button type="submit" class="submit-btn">Cadastrar</button>
        <router-link to="/funcionarios" class="funcio">
          <img src="/src/assets/image/funcionarios.png" alt="Funcionários" class="funcio-icon">
        </router-link>
      </form>
      {{ message }}
    </div>
  </div>
<div class="footer">
  <Footer />
</div>

</template>

<style scoped>
.footer{
   margin-top: 8%;
}

body {
  font-family: 'Roboto', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #3E2723; 
  color: #F1E0C6; 
  overflow-x: hidden;
}

.background {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
}

.padaria-img {
  width: 100%;
  height: 100vh;
  object-fit: cover;
  filter: brightness(0.4);
}

.container {
  margin-top: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100vh - 80px); 
  position: relative;
  padding: 20px;
  box-sizing: border-box;
}


.caixa {
  width: 100%;
  max-width: 480px;
  background: #5D4037; 
  border-radius: 20px;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.3);
  padding: 40px;
  text-align: center;
  position: relative;
  z-index: 1;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.caixa:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
}


.txt-entre {
  color: #F1E0C6; 
  font-size: 26px;
  margin-bottom: 10px;
  text-transform: uppercase;
  font-weight: 500;
}

.txt-padaria {
  color: #FF6F00; 
  font-size: 38px;
  font-weight: 700;
  margin-bottom: 20px;
}

.txt-promocoes {
  color: #FFF8E1; 
  font-size: 20px;
  font-style: italic;
  margin-bottom: 30px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 18px; 
  color: white;
  margin-top: 30px;
}

.input-field {
  padding: 14px 18px;
  border: 2px solid #FF7043; 
  border-radius: 10px;
  font-size: 16px;
  width: 100%;
  background-color: #3E2723; 
  color: #f0d2d2;
  transition: all 0.3s ease, box-shadow 0.3s ease;
}

.input-field:focus {
  border-color: #FF5722; 
  background-color: #4E342E; 
  outline: none;
  box-shadow: 0 0 8px rgba(255, 112, 67, 0.6);
}

.submit-btn {
  padding: 16px 20px;
  background-color: #FF6F00; 
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-size: 18px;
  width: 100%;
  margin-top: 20px;
  transition: background-color 0.3s, transform 0.3s ease-in-out, box-shadow 0.3s ease;
  font-weight: bold;
}

.submit-btn:hover {
  background-color: #FF5722;
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
}

.submit-btn:active {
  background-color: #E64A19;
  transform: translateY(0);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
}

/* Ícone de funcionário */
.funcio-icon {
  width: 30px;
  height: 30px;
  cursor: pointer;
  transition: transform 0.3s ease, filter 0.3s ease;
  margin-top: 15px;
}

.funcio-icon:hover {
  transform: scale(1.2);
  filter: brightness(1.2);
}

/* Responsividade */
@media (max-width: 1024px) {
  .container {
    padding: 30px;
  }

  .caixa {
    padding: 35px;
    max-width: 90%;
  }

  .txt-entre {
    font-size: 24px;
  }

  .txt-padaria {
    font-size: 32px;
  }

  .submit-btn {
    width: 100%;
  }

  .funcio-icon {
    width: 28px;
    height: 28px;
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
    font-size: 22px;
  }

  .txt-padaria {
    font-size: 28px;
  }

  .submit-btn {
    width: 100%;
  }

  .funcio-icon {
    width: 26px;
    height: 26px;
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
    font-size: 24px;
  }

  .submit-btn {
    font-size: 16px;
    width: 100%;
  }

  .funcio-icon {
    width: 22px;
    height: 22px;
  }
}
</style>



