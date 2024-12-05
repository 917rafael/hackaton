<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref } from 'vue';
import Header from '@/components/FoHea/header.vue';

const cliente = ref({
  nome: '',
  username: '',
  email: '',
  membroDesde: '',
  foto: 'https://via.placeholder.com/150',
  atividades: [
    { data: '12 de Novembro de 2024', descricao: 'Compra de pães artesanais' },
    { data: '30 de Outubro de 2024', descricao: 'Pedido de torta de maçã' },
  ],
});

const fileInputRef = ref(null);
const mostrarMensagem = ref(null);
const mensagemTipo = ref('');
const senha = ref('');
const confirmaSenha = ref('');
const temaEscuro = ref(false);

const abrirSeletorDeArquivos = () => {
  fileInputRef.value.click();
};

const carregarFoto = (event) => {
  const arquivo = event.target.files[0];
  if (arquivo) {
    const leitor = new FileReader();
    leitor.onload = () => {
      cliente.value.foto = leitor.result;
      mostrarMensagem.value = 'Foto alterada com sucesso!';
      mensagemTipo.value = 'success';
    };
    leitor.readAsDataURL(arquivo);
  } else {
    mostrarMensagem.value = 'Erro ao carregar a foto. Tente novamente.';
    mensagemTipo.value = 'error';
  }
};

const salvarAlteracoes = () => {
  if (senha.value !== confirmaSenha.value) {
    mostrarMensagem.value = 'As senhas não coincidem!';
    mensagemTipo.value = 'error';
  } else {
    cliente.value.nome = cliente.value.nome.trim();
    cliente.value.email = cliente.value.email.trim();
    mostrarMensagem.value = 'Alterações salvas com sucesso!';
    mensagemTipo.value = 'success';
  }
};

const toggleModoEscuro = () => {
  temaEscuro.value = !temaEscuro.value;
};
</script>

<template>
  <Header />
  <div :class="['container', { 'modo-escuro': temaEscuro }]">
    <div class="perfil">
      <div class="foto">
        <img class="perfil-img" :src="cliente.foto" alt="Foto do Cliente" />
        <button class="upload-btn" @click="abrirSeletorDeArquivos">
          Alterar Foto
        </button>
        <input
          type="file"
          ref="fileInputRef"
          accept="image/*"
          style="display: none"
          @change="carregarFoto"
        />
      </div>
      <div class="informacoes">
        <h2 class="cliente-nome">{{ cliente.nome }}</h2>
        <p class="cliente-username">{{ cliente.username }}</p>
        <p class="info-text">Membro desde: {{ cliente.membroDesde }}</p>
      </div>
    </div>

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
            required
          />
        </div>
        <div class="campo">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="cliente.email"
            placeholder="joao@email.com"
            required
          />
        </div>
        <div class="campo">
          <label for="senha">Senha</label>
          <input
            type="password"
            id="senha"
            v-model="senha"
            placeholder="••••••••"
            required
          />
        </div>
        <div class="campo">
          <label for="confirmaSenha">Confirmar Senha</label>
          <input
            type="password"
            id="confirmaSenha"
            v-model="confirmaSenha"
            placeholder="••••••••"
            required
          />
        </div>
        <button type="submit" class="salvar-btn">Salvar Alterações</button>
      </form>
      <div v-if="mostrarMensagem" :class="['mensagem', mensagemTipo]">
        <span>{{ mostrarMensagem }}</span>
      </div>
    </div>

    <div class="historico">
      <h3>Histórico de Atividades</h3>
      <ul>
        <li v-for="atividade in cliente.atividades" :key="atividade.data">
          <span class="icone">
            <i class="fas fa-bread-slice"></i>
          </span>
          <span class="data">{{ atividade.data }}</span>
          <span class="descricao">{{ atividade.descricao }}</span>
        </li>
      </ul>
    </div>

    <button class="modo-escuro-btn" @click="toggleModoEscuro">
      <span v-if="temaEscuro">Modo Claro</span>
      <span v-else>Modo Escuro</span>
    </button>
  </div>
</template>

<style scoped>

.modo-escuro {
  background-color: #121212;
  color: white;
}

.modo-escuro .perfil, .modo-escuro .infor, .modo-escuro .historico {
  background-color: #1e1e1e;
}

.modo-escuro .perfil-img {
  border-color: white;
}

.modo-escuro .campo input {
  background-color: #333;
  border-color: #444;
  color: white;
}

.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  padding: 2rem;
  background: linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%);
  min-height: 100vh;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.perfil {
  background-color: white;
  width: 100%;
  max-width: 380px;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.perfil:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
}

.foto {
  position: relative;
}

.perfil-img {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #6c757d;
}

.upload-btn {
  background-color: #6c757d;
  color: white;
  border: none;
  padding: 1rem 2rem;
  margin-top: 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.upload-btn:hover {
  background-color: #495057;
}

.informacoes {
  margin-top: 1rem;
}

.cliente-nome {
  font-size: 1.8rem;
  font-weight: 600;
  color: #333;
}

.cliente-username {
  font-size: 1.2rem;
  color: #6c757d;
}

.info-text {
  color: #888;
}

.infor {
  background-color: white;
  padding: 2.5rem;
  border-radius: 12px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.infor h3 {
  font-size: 1.6rem;
  margin-bottom: 1.5rem;
  color: #333;
  text-align: center;
}

.formulario .campo {
  margin-bottom: 1.5rem;
}

.campo input {
  width: 100%;
  padding: 1rem;
  border: 1px solid #ced4da;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.campo input:focus {
  border-color: #007bff;
  box-shadow: 0 0 10px rgba(0, 123, 255, 0.25);
}

.salvar-btn {
  background-color: #007bff;
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.salvar-btn:hover {
  background-color: #0056b3;
}

.mensagem {
  padding: 1rem;
  margin-top: 1rem;
  border-radius: 8px;
  text-align: center;
}

.mensagem.success {
  background-color: #28a745;
  color: white;
}

.mensagem.error {
  background-color: #dc3545;
  color: white;
}

.historico {
  background-color: #ffffff;
  width: 100%;
  max-width: 550px;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  margin-bottom: 2rem;
}

.historico:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
}

.historico h3 {
  font-size: 1.6rem;
  margin-bottom: 1.5rem;
  color: #333;
  text-align: center;
  font-weight: 600;
}

.historico ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.historico li {
  font-size: 1.1rem;
  color: #444;
  padding: 1rem;
  border-bottom: 1px solid #ddd;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: background-color 0.3s ease;
}

.historico li:last-child {
  border-bottom: none;
}

.historico li:hover {
  background-color: #f8f9fa;
  cursor: pointer;
}

.historico li span {
  flex: 1;
}

.historico li .data {
  font-weight: 500;
  color: #007bff;
}

.historico li .descricao {
  font-weight: 400;
  color: #555;
  margin-left: 1rem;
}

.historico li .icone {
  font-size: 1.5rem;
  color: #007bff;
  display: flex;
  align-items: center;
}

.modo-escuro-btn {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  margin-top: 2rem;
  cursor: pointer;
}

.modo-escuro-btn:hover {
  background-color: #0056b3;
}
</style>
