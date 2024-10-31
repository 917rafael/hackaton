<script setup>
import Header from "@/components/FoHea/header.vue";
</script>

<template>
  <Header />
  <div class="payment-page">
    <div class="payment-container">
      <div class="address-form">
        <h1>Adicione um endereço</h1>
        <form>
          <div class="form-group">
            <label for="fullName">Nome completo</label>
            <input type="text" id="fullName" placeholder="Como aparece no seu RG ou CNH" required />
          </div>
          <div class="form-group">
            <label for="cep">CEP</label>
            <input type="text" id="cep" placeholder="Digite seu CEP" required />
            <a href="#" class="cep-help">Não sei o meu CEP</a>
          </div>
          <div class="form-group">
            <label for="state">Estado</label>
            <input type="text" id="state" placeholder="Estado" required />
          </div>
          <div class="form-group">
            <label for="city">Cidade</label>
            <input type="text" id="city" placeholder="Cidade" required />
          </div>
          <div class="form-group">
            <label for="neighborhood">Bairro</label>
            <input type="text" id="neighborhood" placeholder="Bairro" required />
          </div>
          <div class="form-group">
            <label for="street">Rua/Avenida</label>
            <input type="text" id="street" placeholder="Rua/Avenida" required />
          </div>
          <div class="form-group">
            <label for="number">Número</label>
            <input type="text" id="number" placeholder="Número" required />
            <label class="no-number">
              <input type="checkbox" />
              Sem número
            </label>
          </div>
          <div class="form-group">
            <label for="deliveryType">Tipo de entrega</label>
            <select id="deliveryType" required>
              <option value="" disabled selected>Selecione uma opção</option>
              <option value="home">Entrega em casa</option>
              <option value="work">Entrega no trabalho</option>
            </select>
          </div>
          <div class="form-group">
            <label for="additionalInfo">Informações adicionais</label>
            <textarea id="additionalInfo" placeholder="Instruções especiais (opcional)"></textarea>
          </div>
          <button type="submit" class="btn-submit">Salvar Endereço</button>
        </form>
      </div>
      
      <div class="order-summary">
        <h2>Resumo da compra</h2>
        <div class="summary-item">
          <span>Produto</span>
          <span>R$ 250,20</span>
        </div>
        <div class="summary-item">
          <span>Frete</span>
          <span>R$ --,--</span>
        </div>
        <div class="summary-total">
          <span>Você pagará</span>
          <span>R$ 250,20</span>
          <button type="submit" class="btn-final">Finalizar a compra</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
    
.btn-final{
background-color: #007bff;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 100%;
  margin-top: 20px;
}

.payment-page {
  max-width: 900px;
  margin: 0 auto;
  padding: 30px;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
}

.payment-container {
  display: flex;
  gap: 20px;
}

.address-form,
.order-summary {
  background-color: #ffffff;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
}

.address-form h1 {
  font-size: 2em;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-size: 1em;
  font-weight: 600;
  color: #444;
  margin-bottom: 8px;
}

.form-group input,
.form-group select,
.form-group textarea {
  width : 100%;
  padding: 12px 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1em;
  font-weight: 400;
  color: #333;
}

.form-group input[type="checkbox"] {
  width: auto;
  margin-right: 10px;
}

.cep-help {
  font-size: 0.8em;
  color: #666;
  text-decoration: underline;
  cursor: pointer;
}

.no-number {
  font-size: 0.8em;
  color: #666;
  margin-left: 10px;
}

.btn-submit {
  background-color: #007bff;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 100%;
  margin-top: 20px;
}

.btn-submit:hover {
  background-color: #0056b3;
}

.order-summary {
  margin-top: 20px;
}

.order-summary h2 {
  font-size: 1.5em;
  color: #333;
  margin-bottom: 15px;
  text-align: center;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.summary-item span {
  font-size: 1em;
  color: #444;
}

.summary-total {
  font-size: 1.2em;
  font-weight: 600;
  color: #333;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #ccc;
}
</style>