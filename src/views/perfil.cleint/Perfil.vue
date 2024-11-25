<script setup>
import { ref } from 'vue';
import Header from '@/components/FoHea/header.vue';

// Dados do cliente
const cliente = ref({
  nome: 'João da Silva',
  username: '@joaodapadaria',
  email: 'joao@email.com',
  membroDesde: '10 de Janeiro de 2022',
  foto: 'https://via.placeholder.com/150', // Foto inicial do cliente
});

// Referência ao input de upload de arquivos
const fileInputRef = ref(null);

// Função para abrir o seletor de arquivos
const abrirSeletorDeArquivos = () => {
  fileInputRef.value.click(); // Simula o clique no input de arquivo
};

// Função para lidar com o upload da foto
const carregarFoto = (event) => {
  const arquivo = event.target.files[0]; // Obtém o arquivo selecionado
  if (arquivo) {
    const leitor = new FileReader();
    leitor.onload = () => {
      cliente.value.foto = leitor.result; // Atualiza a foto do cliente com a URL da imagem carregada
    };
    leitor.readAsDataURL(arquivo); // Lê o arquivo como uma URL base64
  }
};
</script>

<template>
  <Header />

  <div class="container">
    <!-- Perfil do Cliente -->
    <div class="perfil">
      <img
        class="perfil-img"
        :src="cliente.foto"
        alt="Foto do Cliente"
      />
      <h2 class="cliente-nome">{{ cliente.nome }}</h2>
      <p class="cliente-username">{{ cliente.username }}</p>
      <button class="upload-btn" @click="abrirSeletorDeArquivos">Alterar Foto</button>
      <p class="info-text">Membro desde: {{ cliente.membroDesde }}</p>
      <!-- Input de arquivo oculto -->
      <input
        type="file"
        ref="fileInputRef"
        accept="image/*"
        style="display: none;"
        @change="carregarFoto"
      />
    </div>

    <!-- Formulário de Edição -->
    <div class="infor">
      <h3>Editar Perfil</h3>
      <form class="formulario" @submit.prevent="salvarAlteracoes">
        <div class="campo">
          <label for="nome">Nome Completo</label>
          <input
            type="text"
            id="nome"
            v-model="cliente.nome"
            placeholder="João da Silva"
          />
        </div>
        <div class="campo">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="cliente.email"
            placeholder="joao@email.com"
          />
        </div>
        <div class="campo">
          <label for="senha">Senha</label>
          <input
            type="password"
            id="senha"
            placeholder="••••••••"
          />
        </div>
        <div class="campo">
          <label for="confirmaSenha">Confirmar Senha</label>
          <input
            type="password"
            id="confirmaSenha"
            placeholder="••••••••"
          />
        </div>
        <button type="submit" class="salvar-btn">Salvar Alterações</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* Container principal */
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  gap: 2rem;
  padding: 2rem;
  background: linear-gradient(135deg, #ffe4c4 0%, #fffaf0 100%);
  min-height: 100vh;
  animation: fadeIn 1s ease-in-out;
}

/* Estilo do card de perfil */
.perfil {
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  width: 100%;
  max-width: 350px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.perfil:hover {
  transform: translateY(-10px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.2);
}

/* Foto de perfil */
.perfil-img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
  border: 3px solid #d2691e;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.perfil-img:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Nome do cliente */
.cliente-nome {
  font-size: 1.8rem;
  font-weight: bold;
  color: #5a3921;
  margin-bottom: 0.5rem;
}

/* Nome de usuário */
.cliente-username {
  color: #a0522d;
  font-style: italic;
  font-size: 1rem;
}

/* Botão de upload */
.upload-btn {
  background-color: #d2691e;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  margin-top: 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  font-size: 1rem;
}

.upload-btn:hover {
  background-color: #8b4513;
  transform: scale(1.05);
}

/* Informações adicionais */
.info-text {
  color: #5a3921;
  font-size: 0.9rem;
  margin-top: 1rem;
}

/* Formulário */
.infor {
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 12px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.infor:hover {
  transform: translateY(-10px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.2);
}

.infor h3 {
  margin-bottom: 1.5rem;
  color: #5a3921;
  font-size: 1.8rem;
  text-align: center;
  font-weight: bold;
}

/* Campos do formulário */
.formulario .campo {
  margin-bottom: 1.5rem;
}

.campo label {
  display: block;
  font-weight: bold;
  color: #5a3921;
  margin-bottom: 0.5rem;
}

.campo input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d2b48c;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.campo input:focus {
  outline: none;
  border-color: #d2691e;
  box-shadow: 0 0 5px rgba(210, 105, 30, 0.5);
}

.salvar-btn {
  background-color: #d2691e;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  margin-top: 1rem;
  font-size: 1.2rem;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.salvar-btn:hover {
  background-color: #8b4513;
  transform: scale(1.05);
}


@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
    align-items: center;
  }

  .perfil,
  .infor {
    width: 100%;
  }

  .upload-btn,
  .salvar-btn {
    font-size: 0.9rem;
    padding: 0.5rem 1rem;
  }
}

@media (max-width: 480px) {
  .perfil-img {
    width: 100px;
    height: 100px;
  }

  .cliente-nome {
    font-size: 1.5rem;
  }

  .infor h3 {
    font-size: 1.5rem;
  }
}
</style>

