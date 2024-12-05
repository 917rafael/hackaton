<!--esse componente é responsavel pela area de -->

<script setup>
import InputForm from '@/components/input.vue'
import { reactive } from 'vue';


const emit = defineEmits(['adicinar'])

function salvar() {
  if (usuario.nome === '' || usuario.data === '' || usuario.hora === '' || usuario.produto === '' || usuario.quantidade === '' || usuario.valor === '' || usuario.desconto === '')
    { alert('Por favor preencha todos os campos!!!')
    return;
  }
  else if (usuario.senha !== usuario.confirmacao) {
    alert('Crendencias Inválidas')
  }
  else {
    emit('adicionar', { ...usuario })
  }
}

const usuario = reactive({
  nome: '',
  data: '',
  hora: '',
  produto: '',
  quantidade: '',
  valor: '',
  desconto: '',
  obs: '',
})

</script>

<template>
  <div class="container">
    <main class="main">
      <h1 class="h2">Registro de vendas - Padaria Santo Pão</h1>

      <div class="nome">
        <label for="nome" class="form-label">Nome do Cliente:</label>
        <input type="text" class="form-control" id="nome" v-model="usuario.nome"
          placeholder="Digite o nome do cliente" />
      </div>

      <div class="data">
        <label for="data" class="form-label">Data:</label>
        <input type="date" class="form-control" id="data" v-model="usuario.data" />
      </div>

      <div class="hora">
        <label for="hora" class="form-label">Hora:</label>
        <input type="time" class="form-control" id="hora" v-model="usuario.hora" />
      </div>

      <div class="produto">
        <label for="produto" class="form-label">Produto:</label>
        <input type="text" class="form-control" id="produto" v-model="usuario.produto"
          placeholder="Digite o nome do produto" />
      </div>

      <div class="quantidade">
        <label for="quantidade" class="form-label">Quantidade:</label>
        <input type="number" class="form-control" id="quantidade" v-model="usuario.quantidade"
          placeholder="Digite a quantidade de produtos " />
      </div>

      <div class="valor">
        <label for="valor" class="form-label">Valor Unitário:</label>
        <input type="number" class="form-control" id="valor" v-model="usuario.valor"
          placeholder="Insira o valor do produto" />
      </div>

      <div class="desconto">
        <label for="desconto" class="form-label">Desconto:</label>
        <input type="text" class="form-control" id="desconto" v-model="usuario.desconto"
          placeholder="Coloque o seu desconto " />
      </div>

      <div class="obs">
        <label for="obs" class="form-label">Obesrvações:</label>
        <input type="text" class="form-control" v-model="usuario.obs" placeholder="Digite sua obs " />
      </div>
      <button class="button" @click="salvar">Enviar dados</button>
    </main>

  </div>


</template>

<style scoped>
/* Geral */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Container Principal */
.container {
  background-color: #f4f4f4;
  color: #333;
  border-radius: 8px;
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

/* Título */
.h2 {
  color: #333;
  text-align: center;
  margin: 0;
  padding-bottom: 20px;
}

/* Main */
.main {
  display: flex;
  flex-direction: column;
}

/* Layout dos Campos */
.field-group {
  margin-bottom: 15px;
}

.form-label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}


input[type="text"],
input[type="number"],
input[type="date"],
input[type="time"] {
  width: calc(100% - 22px); /* Ajuste para compensar o padding e border */
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

/* Botão */
.button {
  display: inline-block;
  background-color: rgba(59, 24, 3, 0.85);
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  text-align: center;
  transition: background-color 0.3s;
  margin: 20px auto 0;
}

.button:hover {
  background-color: rgba(117, 52, 12, 0.85);
}

/* Responsividade */
@media (max-width: 768px) {
  .form-control {
    font-size: 14px;
  }
  
  .button {
    width: 100%;
    padding: 15px;
    font-size: 18px;
  }
}
</style>