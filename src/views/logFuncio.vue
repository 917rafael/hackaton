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
            <h1 class="txt-entre">LOGIN FUNCIONÁRIO</h1>

            <form class="form" @submit.prevent="handleSignin">
                <div class="form-group">
                    <label for="CPF" class="input-label">CPF:</label>
                    <input type="number" id="cpf" name="cpf" v-model="cpf" required placeholder="Insira seu CPF" class="input-field" />
                </div>

                <div class="form-group">
                    <label for="codigofunc" class="input-label">Código Funcionário:</label>
                    <input type="text" id="codigo" name="codigofunc" v-model="codigofunc" required placeholder="Informe seu código" class="input-field" />
                </div>

                <button type="submit" class="submit-btn">Entrar</button>

                <p v-if="message" class="message">{{ message }}</p>
            </form>

            <router-link to="/logClient" class="cliente">Cliente</router-link>
        </div>
    </div>
</template>

<style scoped>
body {
    font-family: 'Roboto', sans-serif;
    margin: 0;
    padding: 0;
    background-color: #2C3E50;
    color: #ECEFF1;
}

/* Global */
h1 {
    font-weight: 600;
}

.txt-entre {
    color: #B0BEC5;
    text-align: center;
    font-size: 28px;
    margin-bottom: 10px;
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
    background: #34495E;
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
.cliente {
    margin-top: 25px;
    display: block;
    text-align: center;
    font-size: 16px;
    color: #B0BEC5;
    text-decoration: none;
}

.cliente:hover {
    color: #FF7043;
    text-decoration: underline;
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

    .submit-btn {
        width: 100%;
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

    .submit-btn {
        width: 100%;
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

    .submit-btn {
        font-size: 16px;
        width: 100%;
    }
}
</style>
