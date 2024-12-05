<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <Header />
    <div class="payment-page">
      <div class="container">
        <div class="order-summary">
          <h2>Resumo do Pedido</h2>
          <div class="order-items">
            <div class="item" v-for="(item, index) in orderItems" :key="index">
              <div class="item-details">
                <img :src="item.image" alt="item.name" class="item-image" />
                <div class="item-info">
                  <h4>{{ item.name }}</h4>
                  <p>{{ item.quantity }} x {{ formatCurrency(item.price) }}</p>
                </div>
              </div>
              <div class="item-total">{{ formatCurrency(item.total) }}</div>
            </div>
          </div>
          <div class="order-total">
            <p>Total:</p>
            <p>{{ formatCurrency(total) }}</p>
          </div>
        </div>
  
        <div class="payment-form">
          <h2>Informações de Pagamento</h2>
          <form @submit.prevent="handlePayment">
            <div class="form-group">
              <label for="payment-method">Método de Pagamento</label>
              <select id="payment-method" v-model="paymentMethod" required>
                <option value="creditCard">Cartão de Crédito/Débito</option>
                <option value="pix">Pix</option>
                <option value="boleto">Boleto</option>
              </select>
            </div>
  
            <div v-if="paymentMethod === 'creditCard'">
              <div class="form-group">
                <label for="card-number">Número do Cartão</label>
                <input type="text" id="card-number" v-model="cardNumber" placeholder="1234 5678 1234 5678" required />
              </div>
              <div class="form-group">
                <label for="card-expiry">Data de Validade</label>
                <input type="text" id="card-expiry" v-model="cardExpiry" placeholder="MM/AA" required />
              </div>
              <div class="form-group">
                <label for="card-cvc">CVC</label>
                <input type="text" id="card-cvc" v-model="cardCVC" placeholder="123" required />
              </div>
            </div>
  
            <div v-if="paymentMethod === 'pix'">
              <div class="form-group">
                <label for="pix-key">Chave Pix</label>
                <input type="text" id="pix-key" v-model="pixKey" placeholder="exemplo@dominio.com" required />
              </div>
              <p>Realize o pagamento via Pix utilizando a chave informada.</p>
              <div class="qrcode-container">
                <img v-if="pixKey" :src="generateQRCode(pixKey, total)" alt="QR Code" class="qrcode-image" />
                <p v-if="!pixKey">A chave Pix será gerada automaticamente ao finalizar a compra.</p>
              </div>
            </div>
  
            <div v-if="paymentMethod === 'boleto'">
              <div class="form-group">
                <label for="cpf">CPF</label>
                <input type="text" id="cpf" v-model="cpf" placeholder="123.456.789-00" required />
              </div>
              <p>Após a confirmação do pedido, o boleto será gerado.</p>
            </div>
  
            <div class="form-group">
              <label for="address">Endereço de Entrega</label>
              <input type="text" id="address" v-model="address" placeholder="Rua Exemplo, 123" required />
            </div>
  
            <div class="form-actions">
              <button type="submit" class="submit-btn">Finalizar Pagamento</button>
              <button type="button" class="cancel-btn" @click="cancelPayment">Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <Footer />
  </template>
  

<script setup>
import Header from '@/components/FoHea/HeaderMais.vue';
import Footer from '@/components/FoHea/Footer.vue';
import { ref } from 'vue';

const orderItems = ref([
  { name: 'Pão Francês', quantity: 2, price: 1.50, total: 3.00, image: '/images/pao_frances.jpg' },
  { name: 'Croissant', quantity: 1, price: 2.50, total: 2.50, image: '/images/croissant.jpg' },
]);

const total = ref(5.50); 
const paymentMethod = ref('creditCard');
const cardNumber = ref('');
const cardExpiry = ref('');
const cardCVC = ref('');
const cpf = ref('');
const address = ref('');
const pixKey = ref('');
const isSubmitting = ref(false); 

const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

const generateQRCode = (key, amount) => {
  const pixData = {
    version: '01',
    merchantAccount: key,
    transactionAmount: amount,
    transactionCurrency: 'BRL',
    identifier: `Pedido-${Date.now()}`, 
    merchantName: 'Seu Nome ou Empresa',
    merchantCity: 'Sua Cidade',
  };

  const pixString = `00020126360014BR.GOV.BCB.PIX0114${pixData.merchantAccount}520400005303986540${pixData.transactionAmount}5802BR5913${pixData.merchantName}6009${pixData.merchantCity}62070503***`;

  return `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(pixString)}&size=200x200`;
};

const handlePayment = async () => {
  if (isSubmitting.value) return; 

  isSubmitting.value = true;

  try {
    if (paymentMethod.value === 'creditCard') {
      await processCreditCardPayment();
      alert('Pagamento com cartão de crédito realizado com sucesso!');
    } else if (paymentMethod.value === 'pix') {
      await processPixPayment();
      alert('Pagamento via Pix realizado com sucesso!');
    } else if (paymentMethod.value === 'boleto') {
      await processBoletoPayment();
      alert('Boleto gerado com sucesso!');
    }
  } catch (error) {
    alert('Erro ao processar pagamento. Tente novamente.');
  } finally {
    isSubmitting.value = false;
  }
};

const processCreditCardPayment = () => {
  return new Promise((resolve) => setTimeout(resolve, 2000));
};


const processPixPayment = () => {
  return new Promise((resolve) => setTimeout(resolve, 2000));
};
const processBoletoPayment = () => {
  return new Promise((resolve) => setTimeout(resolve, 2000));
};

const cancelPayment = () => {
  cardNumber.value = '';
  cardExpiry.value = '';
  cardCVC.value = '';
  cpf.value = '';
  address.value = '';
  pixKey.value = '';
  paymentMethod.value = 'creditCard';
};
</script>

  
<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body, html {
  font-family: 'Poppins', sans-serif;
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: #f4f7fc;
  background-image: url('../assets/image/FundoSite.png'); 
  background-size: cover; 
  background-position: center center; 
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.payment-page {
  width: 100%;
  min-height: 100vh;
  background-color: rgba(244, 247, 252, 0.8); 
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 40px;
  position: relative; 
}

.container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1300px;
  background-color: #fff;
  border-radius: 15px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.container:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
}

.order-summary {
  width: 48%;
  padding: 25px;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.order-summary h2 {
  font-size: 26px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
}

.order-items {
  margin-bottom: 25px;
}

.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  border-bottom: 1px solid #eee;
  padding-bottom: 15px;
  transition: transform 0.3s ease;
}

.item:hover {
  transform: scale(1.02);
}

.item-details {
  display: flex;
  align-items: center;
}

.item-image {
  width: 65px;
  height: 65px;
  object-fit: cover;
  margin-right: 15px;
  border-radius: 10px;
  transition: transform 0.3s ease;
}

.item-image:hover {
  transform: scale(1.1);
}

.item-info h4 {
  font-size: 20px;
  color: #333;
}

.item-info p {
  color: #777;
}

.item-total {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  padding-left: 20px;
}

.order-total {
  display: flex;
  justify-content: space-between;
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-top: 20px;
}

.payment-form {
  width: 48%;
  padding: 25px;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.payment-form h2 {
  font-size: 26px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 25px;
}

label {
  font-size: 18px;
  color: #333;
  margin-bottom: 10px;
  display: block;
}

input,
select {
  width: 100%;
  padding: 15px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #f9f9f9;
  color: #333;
  transition: all 0.3s ease;
}

input:focus,
select:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 10px rgba(52, 152, 219, 0.3);
}

input::placeholder,
select::placeholder {
  color: #bbb;
}

.qrcode-container {
  text-align: center;
  margin-top: 20px;
}

.qrcode-image {
  width: 100%;
  max-width: 300px;
  height: auto;
  border: 2px solid #ddd;
  border-radius: 12px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
}

.qrcode-image:hover {
  transform: scale(1.05);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
}

.submit-btn,
.cancel-btn {
  padding: 15px 25px;
  font-size: 18px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.submit-btn {
  background-color: #3498db;
  color: white;
}

.submit-btn:hover {
  background-color: #2980b9;
  transform: translateY(-3px);
}

.cancel-btn {
  background-color: #e74c3c;
  color: white;
}

.cancel-btn:hover {
  background-color: #c0392b;
  transform: translateY(-3px);
}


@media (max-width: 1024px) {
  .container {
    flex-direction: column;
    padding: 30px;
  }

  .order-summary,
  .payment-form {
    width: 100%;
    margin-bottom: 30px;
  }

  .item-image {
    width: 55px;
    height: 55px;
  }

  .item-info h4 {
    font-size: 18px;
  }

  .item-info p {
    font-size: 15px;
  }

  .order-total {
    font-size: 20px;
  }

  .submit-btn,
  .cancel-btn {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .order-summary h2,
  .payment-form h2 {
    font-size: 22px;
  }

  .form-group input,
  .form-group select {
    font-size: 14px;
  }

  .submit-btn,
  .cancel-btn {
    font-size: 16px;
    padding: 12px 20px;
  }
}

body {
  font-family: 'Poppins', sans-serif;
  background-color: #f4f7fc;
  margin: 0;
  padding: 0;
}

.payment-page {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 30px;
  min-height: 100vh;
  background-color: #f4f7fc;
}

.container {
  width: 100%;
  max-width: 1300px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #fff;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  border-radius: 15px;
  overflow: hidden;
  padding: 40px;
}

.order-summary {
  width: 45%;
  padding: 25px;
}

.order-summary h2 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

.order-items {
  margin-bottom: 25px;
}

.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.item-details {
  display: flex;
  align-items: center;
}

.item-image {
  width: 70px;
  height: 70px;
  object-fit: cover;
  margin-right: 20px;
}

.item-info h4 {
  font-size: 18px;
  margin: 0;
  color: #333;
}

.item-info p {
  margin: 0;
  color: #777;
}

.item-total {
  font-size: 20px;
  font-weight: bold;
  color: #333;
}

.order-total {
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  margin-top: 20px;
  font-weight: bold;
  color: #333;
}

.payment-form {
  width: 45%;
  padding: 25px;
}

.payment-form h2 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

.form-group {
  margin-bottom: 25px;
}

label {
  font-size: 16px;
  color: #333;
  margin-bottom: 8px;
  display: block;
}

input,
select {
  width: 100%;
  padding: 15px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  color: #333;
  transition: all 0.3s ease;
}

input:focus,
select:focus {
  outline: none;
  border-color: #3498db;
}

input::placeholder,
select::placeholder {
  color: #bbb;
}

.qrcode-container {
  text-align: center;
  margin-top: 20px;
}

.qrcode-image {
  width: 100%;
  max-width: 300px;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
}

.submit-btn,
.cancel-btn {
  padding: 15px 25px;
  font-size: 18px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}

.submit-btn {
  background-color: #3498db;
  color: white;
}

.submit-btn:hover {
  background-color: #2980b9;
}

.cancel-btn {
  background-color: #e74c3c;
  color: white;
}

.cancel-btn:hover {
  background-color: #c0392b;
}

@media (max-width: 1024px) {
  .container {
    flex-direction: column;
    padding: 30px;
  }

  .order-summary,
  .payment-form {
    width: 100%;
  }

  .item-image {
    width: 60px;
    height: 60px;
  }

  .order-total {
    font-size: 18px;
  }

  .submit-btn,
  .cancel-btn {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .order-summary h2,
  .payment-form h2 {
    font-size: 20px;
  }

  .form-group input,
  .form-group select {
    font-size: 14px;
  }

  .submit-btn,
  .cancel-btn {
    font-size: 16px;
    padding: 12px 20px;
  }
}
</style>
