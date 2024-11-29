<script setup>
import Header from '@/components/FoHea/header.vue'
import Footer from '@/components/FoHea/Footer.vue'
import { ref } from 'vue'
import { supabase } from '../lib/supabaseClient'

// Corrigir os tipos de ref para strings
const cep = ref('');
const estado = ref('');
const cidade = ref('');
const rua = ref('');
const bairro = ref('');
const numero = ref('');
const tipoentrega = ref('');
const informadic = ref('');
const message = ref('');

const insertData = async () => {
  // Verifica se todos os campos obrigatórios foram preenchidos
  if (!cep.value || !estado.value || !cidade.value || !bairro.value 
      || !rua.value || !numero.value || !tipoentrega.value) {
    message.value = 'Por favor, preencha todos os campos obrigatórios.'
    return
  }

  // Faz a requisição de inserção ao Supabase
  // eslint-disable-next-line no-unused-vars
  const { data, error } = await supabase.from('endereco').insert([
    {
      cep: cep.value,
      estado: estado.value,
      cidade: cidade.value,
      bairro: bairro.value,
      rua: rua.value,
      numero: numero.value,
      tipoentrega: tipoentrega.value,
      informadic: informadic.value
    }
  ])

  // Tratamento de erro e mensagem de sucesso
  if (error) {
    console.error('Erro ao inserir endereço:', error.message)
    message.value = `Erro ao inserir endereço: ${error.message}`
    return
  }

  message.value = 'Endereço inserido com sucesso!'
}
</script>

<template>
  <Header />
  <div class="payment-page">
    <div class="payment-container">
      <div class="address-form">
        <h1>Adicionar Endereço</h1>
        <form @submit.prevent="insertData">
          <div class="form-group">
            <label for="cep">CEP</label>
            <div class="input-with-icon">
              <i class="fas fa-map"></i>
              <input type="number" id="cep" v-model="cep" placeholder="Digite seu CEP" required />
            </div>
            <a href="#" class="cep-help">Não sei o meu CEP</a>
          </div>
          <div class="form-group">
            <label for="state">Estado</label>
            <div class="input-with-icon">
              <i class="fas fa-map-marker-alt"></i>
              <input type="text" id="state" v-model="estado" placeholder="Estado" required />
            </div>
          </div>
          <div class="form-group">
            <label for="city">Cidade</label>
            <div class="input-with-icon">
              <i class="fas fa-city"></i>
              <input type="text" id="city" v-model="cidade" placeholder="Cidade" required />
            </div>
          </div>
          <div class="form-group">
            <label for="neighborhood">Bairro</label>
            <div class="input-with-icon">
              <i class="fas fa-home"></i>
              <input type="text" id="neighborhood" v-model="bairro" placeholder="Bairro" required />
            </div>
          </div>
          <div class="form-group">
            <label for="street">Rua/Avenida</label>
            <div class="input-with-icon">
              <i class="fas fa-road"></i>
              <input type="text" id="street" v-model="rua" placeholder="Rua/Avenida" required />
            </div>
          </div>
          <div class="form-group">
            <label for="number">Número</label>
            <div class="input-with-icon">
              <i class="fas fa-sort-numeric-up"></i>
              <input type="text" id="number" v-model="numero" placeholder="Número" required />
            </div>
            <label class="no-number">
              <input type="checkbox" />
              Sem número
            </label>
          </div>
          <div class="form-group">
            <label for="deliveryType">Tipo de Entrega</label>
            <select id="deliveryType" v-model="tipoentrega" required>
              <option value="" disabled selected>Selecione uma opção</option>
              <option value="casa">Entrega em Casa</option>
              <option value="trabalho">Entrega no Trabalho</option>
            </select>
          </div>
          <div class="form-group">
            <label for="additionalInfo">Informações Adicionais</label>
            <textarea id="additionalInfo" v-model="informadic" placeholder="Instruções especiais (opcional)"></textarea>
          </div>
          <button type="submit" class="btn-submit">Salvar Endereço</button>
        </form>
        {{ message }}
      </div>

      <div class="order-summary">
        <h2>Resumo da Compra</h2>
        <div class="summary-item">
          <span>Produto</span>
          <span>R$ 250,20</span>
        </div>
        <div class="summary-item">
          <span>Frete</span>
          <span>R$ --,--</span>
        </div>
        <div class="summary-total">
          <span>Você Pagará</span>
          <span>R$ 250,20</span>
        </div>
        <button type="submit" class="btn-final">Finalizar a Compra</button>
      </div>
    </div>
  </div>

  <Footer />
</template>

<style scoped>



.input-with-icon input {
  text-indent: 40px;
}
.payment-page {
  max-width: 1200px;
  margin: 20px auto;
  padding: 30px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif;
}

.payment-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.address-form,
.order-summary {
  background-color: #f9f9f9;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  flex: 1 1 300px;
  min-width: 300px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.address-form:hover,
.order-summary:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.input-with-icon {
  position: relative;
}

.input-with-icon input {
  padding-left: 40px;
}

.input-with-icon i {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #007bff;
}

.address-form h1,
.order-summary h2 {
  font-size: 2.2em;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
  border-bottom: 2px solid #007bff;
  padding-bottom: 10px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-size: 1.1em;
  font-weight: 600;
  color: #444;
  margin-bottom: 8px;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1em;
  color: #333;
  transition: border-color 0.3s, background-color 0.3s;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: #007bff;
  background-color: #f0f8ff;
  outline: none;
}

.cep-help {
  font-size: 0.9em;
  color: #007bff;
  text-decoration: underline;
  cursor: pointer;
  transition: color 0.3s;
}

.cep-help:hover {
  color: #0056b3;
}

.no-number {
  font-size: 0.9em;
  color: #666;
  margin-left: 10px;
}

.btn-submit,
.btn-final {
  background-color: #007bff;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  width: 100%; 
  margin-top: 20px;
}

.btn-submit:hover,
.btn-final:hover {
  background-color: #0056b3;
  transform: scale(1.02);
}

.order-summary {
  margin-top: 20px;
}

.order-summary h2 {
  font-size: 1.8em;
  color: #333;
  margin-bottom: 15px;
  text-align: center;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.summary-item span {
  font-size: 1em;
  color: #444;
}

.summary-total {
  font-size: 1.4em;
  font-weight: 600;
  color: #333;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #ccc;
}

.btn-final {
  margin-top: 20px; 
}

@media (max-width: 1024px) {
  .payment-page {
    padding: 20px;
  }

  .address-form h1,
  .order-summary h2 {
    font-size: 1.7em;
  }

  .btn-submit,
  .btn-final {
    padding: 10px;
    font-size: 0.9em;
  }
}

@media (max-width: 768px) {
  .payment-container {
    flex-direction: column;
  }

  .address-form,
  .order-summary {
    width: 100%;
  }

  .form-group label {
    font-size: 1em;
  }

  .form-group input,
  .form-group select,
  .form-group textarea {
    padding: 10px;
    font-size: 0.9em;
  }

  .summary-item {
    font-size: 0.9em;
  }
}

@media (max-width: 480px) {
  .payment-page {
    padding: 15px;
  }

  .address-form h1,
  .order-summary h2 {
    font-size: 1.5em;
  }

  .form-group label {
    font-size: 0.9em;
  }

  .form-group input,
  .form-group select,
  .form-group textarea {
    padding: 10px;
    font-size: 0.9em;
  }

  .btn-submit,
  .btn-final {
    padding: 10px;
    font-size: 0.9em;
  }

  .summary-item {
    font-size: 0.9em;
  }

  .payment-container {
    gap: 10px;
  }
}

body {
  margin: 0;
  font-family: 'Arial', sans-serif;
  background-color: #e9ecef;
}

h1,
h2 {
  margin: 0;
  padding: 0;
}

a {
  color: inherit;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.btn-submit:disabled,
.btn-final:disabled {
  background-color: #b0c4de;
  cursor: not-allowed;
}

.summary-item:last-child {
  border-bottom: none;
}

.summary-item:hover {
  background-color: #f1f1f1;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.payment-container {
  animation: fadeIn 0.5s;
}
</style>
