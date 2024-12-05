<script setup>
import Header from '@/components/FoHea/header.vue'
import Footer from '@/components/FoHea/Footer.vue'
import { supabase } from '../lib/supabaseClient'
import { useSacolaStore } from '@/store/sacola'
import { calculateTotal } from '@/store/perfilStore'
import router from '@/router/index'
import { onMounted, ref } from 'vue'

const store = useSacolaStore();

// Variáveis de estado
const cep = ref('');
const estado = ref('');
const cidade = ref('');
const rua = ref('');
const bairro = ref('');
const numero = ref('');
const tipoentrega = ref('');
const informadic = ref('');
const message = ref('');
const enderecoAtual = ref({});
const isLoading = ref(false);
const isSuccess = ref(false);

// Função para obter o usuário autenticado
const getUser = async () => {
  const { data: user, error } = await supabase.auth.getUser();
  if (error || !user) throw new Error('Usuário não autenticado.');
  return user.user;
};

// Função para salvar o endereço
const insertData = async () => {
  isLoading.value = true;
  try {
    if (!cep.value || !estado.value || !cidade.value || !bairro.value || !rua.value || !numero.value || !tipoentrega.value) {
      message.value = 'Por favor, preencha todos os campos obrigatórios.';
      isSuccess.value = false;
      return;
    }

    const user = await getUser();
    const { error } = await supabase.from('endereco').insert([
      {
        cep: cep.value,
        estado: estado.value,
        cidade: cidade.value,
        bairro: bairro.value,
        rua: rua.value,
        numero: numero.value,
        tipoentrega: tipoentrega.value,
        informadic: informadic.value,
        id_user: user.id,
      },
    ]);

    if (error) {
      message.value = `Erro ao salvar endereço: ${error.message}`;
      isSuccess.value = false;
      return;
    }

    message.value = 'Endereço salvo com sucesso!';
    isSuccess.value = true;
  } catch (error) {
    console.error('Erro ao inserir dados:', error.message);
    message.value = 'Ocorreu um erro inesperado. Tente novamente.';
    isSuccess.value = false;
  } finally {
    isLoading.value = false;
  }
};

// Função para carregar o endereço
const carregarEndereco = async () => {
  try {
    const user = await getUser();

    const { data: enderecos, error } = await supabase
      .from('endereco')
      .select('*')
      .eq('id_user', user.id);

    if (error) throw error;
    enderecoAtual.value = enderecos?.[0] || {};
  } catch (error) {
    console.error('Erro ao carregar endereço:', error.message);
    enderecoAtual.value = null;
  }
};

// Função para finalizar o pedido
const finalizarPedido = async () => {
  isLoading.value = true;
  try {
    const user = await getUser();
    await supabase.from('sacola').delete().eq('user_id', user.id);
    store.sacola_cart = [];
    message.value = 'Pedido finalizado com sucesso!';
    isSuccess.value = true;
    router.push({ name: 'home' });
  } catch (error) {
    console.error('Erro ao finalizar pedido:', error.message);
    message.value = 'Erro ao finalizar o pedido. Tente novamente.';
    isSuccess.value = false;
  } finally {
    isLoading.value = false;
  }
};

const total = calculateTotal(store.sacola_cart);

// Carregar os dados quando o componente for montado
onMounted(() => {
  store.carregarSacola();
  carregarEndereco();
});
</script>



<template>
  <Header />
  <div class="payment-page">
    <div class="payment-container">
      <!-- Formulário de Endereço -->
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
          <button type="submit" class="btn-submit" :disabled="isLoading">Salvar Endereço</button>
        </form>
        <div v-if="message" class="alert" :class="{ success: isSuccess, error: !isSuccess }">
          {{ message }}
        </div>
      </div>

      <!-- Resumo do Endereço Atual -->
      <div class="order-summary">
        <h2>Endereço atual</h2>
        <div class="summary-item">
          <span>CEP:</span>
          <span>{{ enderecoAtual?.cep || 'Não informado' }}</span>
        </div>
        <div class="summary-item">
          <span>Estado:</span>
          <span>{{ enderecoAtual?.estado || 'Não informado' }}</span>
        </div>
        <div class="summary-item">
          <span>Cidade:</span>
          <span>{{ enderecoAtual?.cidade || 'Não informado' }}</span>
        </div>
        <div class="summary-item">
          <span>Bairro:</span>
          <span>{{ enderecoAtual?.bairro || 'Não informado' }}</span>
        </div>
        <div class="summary-item">
          <span>Rua:</span>
          <span>{{ enderecoAtual?.rua || 'Não informado' }}</span>
        </div>
        <div class="summary-item">
          <span>Número:</span>
          <span>{{ enderecoAtual?.numero || 'Não informado' }}</span>
        </div>
        <div class="summary-item">
          <span>Informações Adicionais:</span>
          <span>{{ enderecoAtual?.informadic || 'Não informado' }}</span>
        </div>
        <div class="summary-item">
          <span>Tipo de entrega:</span>
          <span>{{ enderecoAtual?.tipoentrega || 'Não informado' }}</span>
        </div>
        <button class="btn-final" @click="$router.push(`/perfil`)">Atualizar o meu endereço</button>
      </div>

      <!-- Resumo da Compra -->
      <div class="historico">
        <div class="order-summary">
          <h2>Resumo da Compra</h2>
          <div class="summary-item">
            <span>Produto</span>
            <span>{{ total }}</span>
          </div>
          <div class="summary-item">
            <span>Frete</span>
            <span>R$ --,--</span>
          </div>
          <div class="summary-item">
            <span>Total</span>
            <span>R$ {{ total }}</span>
          </div>
        </div>
        <button class="btn-final" :disabled="isLoading" @click="finalizarPedido">Finalizar Pedido</button>
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
