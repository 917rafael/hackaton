<script setup>
import Input from '@/components/input.vue';
import headers from '@/components/FoHea/header.vue';
import { perguntas } from '@/data/perguntas.js';
import Footer from '@/components/FoHea/Footer.vue';


</script>

<template>
  <headers />
  <section class="hero">
    <div class="overlay"></div>

      <div class="contato">
        
        <div class="info">
          <router-link to="/">
            <img src="@/assets/image/logo.png" class="image-contato" alt="">
          </router-link>

          <h2>Contate-Nos</h2>
          <p>665, Rua Tecnicos Agricola, +55 47 4002-8922</p>
          <p>Seg - Sex: 9h - 20h</p>
          <p>Sáb - Dom: 9h - 12h</p>
          <p><a href="mailto:email@exemplo.com">email@exemplo.com</a></p>
         
          <div>
            <h2>Siga-nos</h2>
              
          </div>
        
        </div>

        <div class="contate">
          <Input v-for="pergunta in perguntas" :key="pergunta.id" :pergunta="pergunta" />
          <button class="custom-button">Enviar</button>
        </div> 

      </div>
    </section>
    <div class='footer'>
      <Footer />
    </div>
</template>

<style scoped>
.image-contato{
  width: 190px;
}

.social h2{
  font-size: 22px;
  margin-bottom: 15px;
  color: #11998e; 
}

.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.5); 
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('@/assets/image/Fundocontato.jpg');
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  filter: brightness(0.7); 
  z-index: -1; 
}

.contato {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap; 
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  max-width: 600px;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px; 
}

.info {
  flex: 1;
  margin-right: 20px;
  color: #333;
  font-family: Arial, sans-serif;
  font-size: 14px;
}

.info h2 {
  font-size: 22px;
  margin-bottom: 15px;
  color: #11998e; 
}

.info p {
  margin: 8px 0;
  line-height: 1.6;
}

.info a {
  color: #11998e;
  text-decoration: none;
  font-weight: bold;
}

.contate {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.custom-button {
  padding: 12px 24px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  background-color: #11998e;
  color: #ffffff;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  margin-top: 20px;
}

.custom-button:hover {
  background-color: #38ef7d;
  transform: translateY(-2px);
}

.social {
  margin-top: 20px;
  text-align: center;
  color: #ffffff;
}
</style>