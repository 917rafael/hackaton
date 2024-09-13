<script setup>
import InputForm from '@/components/input.vue'
import { reactive } from 'vue';


const emit = defineEmits(['adicinar'])

function salvar() {
  if (usuario.nome === '' || usuario.senha === '') {
    alert('Por favor preencha todos os campos!!!!!!!!!!!')
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
  obs: ''
})

</script>

<template>
  <div class="container">
    <main class="main">
      <h1 class="h2">Registro de vendas - Padaria Santo Pão</h1>

      <div class="nome">
        <label for="Nome" class="form-label">Nome do Cliente:</label>
        <input type="text" class="form-control" id="nome" v-model="usuario.nome"
          placeholder="Digite o nome do cliente" />
      </div>

      <div class="data">
        <label for="data" class="form-label">Data:</label>
        <input type="date" class="form-control" id="data" v-model="usuario.data" />
      </div>

      <div class="hora">
        <label for="hora" class="formn-label">Hora:</label>
        <input type="hour" class="form-control" id="hora" v-model="usuario.hora" />
      </div>

      <div class="produto">
        <label for="produto" class="form-label">Produto:</label>
        <input type="text" class="form-control" id="produto" v-model="usuario.produto"
          placeholder="Digite o produto do cliente" />
      </div>

      <div class="quantidade">
        <label for="quantidade" class="form-label">Quantidade:</label>
        <input type="number" class="form-control" id="quantidade" v-model="usuario.quantidade"
          placeholder="Digite a quantidade do cliente " />
      </div>

      <div class="valor">
        <label for="valor" class="form-label">Valor Unitário:</label>
        <input type="number" class="form-control" id="valor" v-model="usuario.valor"
          placeholder="Insira o valor do produto" />
      </div>

      <div class="desconto">
        <label for="desconto" class="form-label">Desconto:</label>
        <input type="number" class="form-control" id="desconto" v-model="usuario.desconto"
          placeholder="Coloque o seu desconto " />
      </div>

      <div class="obs">
        <label for="obs">Obesrvações:</label>
        <input type="text" v-model="usuario.obs" placeholder="Digite sua obs " />
      </div>
      <button class="button" @click="salvar">Restringir Venda</button>
    </main>

  </div>


</template>

<style scoped>
.h2 {
  color: black;
  text-align: center;
  margin-top: 20px;
}

.main {
  margin-left: 10px;
}

.container {
  color: #f4e1d2;
  background-color: blue;
  border-radius: 6px;
  height: 100%;
  width: 100%;
  border: solid 1px;
}

.button {
  color: white;
  background-color: rgb(53, 53, 53);
  margin-left: 24%;
  margin-top: 10px;
  padding: 8px 80px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
  border-radius: 25px;
  font-size: 16px;
  transition: background-color 1s ease;
  border: solid 1px rgb(53, 53, 53);
}

.form-label {
  display: flex;
  color: rgb(0, 0, 0)te;
  width: 100%;
  height: 100%;
}

.form-control {
  display: flex;
  border: 1px solid black;
  align-items: center;
  width: 93%;
  margin-left: 2%;
  margin-top: 10px;
  padding: 8px;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  border-radius: 25px;
  font-size: 16px;
}
input {
  display: flex;
  border: 1px solid black;
  border-radius: 5px;
  align-items: center;
  margin-left: 30px;
  width: 30%;
}
</style>