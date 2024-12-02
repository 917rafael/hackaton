<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-logo">
        <img src="/src/assets/image/Logo nova.png"  alt="Logo da Padaria" class="logo" />
      </div>

      <div class="footer-column about">
        <h3>Sobre Nós</h3>
        <p>
          Na nossa padaria, combinamos tradição e qualidade para oferecer os melhores pães e doces
          artesanais, feitos com ingredientes frescos e muito amor.
        </p>
        <p>
          Nosso compromisso é com a excelência, proporcionando aos nossos clientes uma experiência
          única e saborosa.
        </p>
        <a href="#" class="read-more">Saiba Mais</a>
      </div>

      <div class="footer-column contact">
        <h3>Contato</h3>
        <p>
          <i class="fas fa-map-marker-alt"></i> 121 Rock Street, 21 Avenue, Nova York, NY 92103-9000
        </p>
        <p>
          <i class="fas fa-map-marker-alt"></i> 121 Rock Street, 21 Avenue, Nova York, NY 92103-9000
        </p>
        <p><i class="fas fa-phone-alt"></i> (123) 456-7890</p>
        <p><i class="fas fa-envelope"></i> contato@padariaexemplo.com</p>
        <router-link to="/contato"> 
          <a class="contact-form-link">Fale Conosco</a>

        </router-link>  
      
      </div>

      <div class="footer-column hours">
        <h3>Horário de Funcionamento</h3>
        <p>Segunda a Sexta: 7h - 19h</p>
        <p>Sábado: 8h - 14h</p>
        <p>Domingo: Fechado</p>
      </div>

      <div class="footer-column social">
        <h3>Siga-nos</h3>
        <div class="social-icons">
          <a href="#"><i class="fab fa-facebook-f"></i></a>
          <a href="#"><i class="fab fa-instagram"></i></a>
          <a href="#"><i class="fab fa-twitter"></i></a>
          <a href="#"><i class="fab fa-pinterest"></i></a>
          <a href="#"><i class="fab fa-linkedin"></i></a>
        </div>
        <p>Fique por dentro das nossas novidades e promoções!</p>
        <a href="#" class="social-share">Compartilhe sua experiência</a>
      </div>

      <div class="footer-column testimonials">
        <h3>Depoimentos</h3>
        <blockquote>
          <p>"Os melhores pães da cidade! Sempre frescos e deliciosos."</p>
          <cite>- Maria S.</cite>
        </blockquote>
        <blockquote>
          <p>"Adoro os doces! Um pedaço do céu em cada mordida."</p>
          <cite>- João P.</cite>
        </blockquote>
      </div>
    </div>

    <div class="newsletter">
      <h3>Inscreva-se na nossa Newsletter</h3>
      <form @submit.prevent="subscribe">
        <input type="email" placeholder="Digite seu email" required />
        <button type="submit">Inscrever</button>
      </form>
      <p>Receba ofertas exclusivas e novidades diretamente no seu email.</p>
    </div>

    <div class="footer-bottom">
      <p>&copy; 2024 Padaria Exemplo. Todos os direitos reservados.</p>
      <div class="footer-links">
        <a href="#">Política de Privacidade</a> | <a href="#">Termos de Uso</a> |
        <a href="#">FAQ</a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: '/components/FoHea/Footer',
  methods: {
    subscribe() {
      alert('Obrigado por se inscrever na nossa newsletter!')
    }
  }
}
</script>

<style scoped>
.footer {
  background: linear-gradient(135deg, #7b3e2a 0%, #5d2f23 100%);
  color: #ffffff;
  padding: 60px 20px;
  font-family: 'Arial', sans-serif;
  position: relative;
  overflow: hidden;
}

.footer-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
}

.footer-logo {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  position: relative;
  animation: slideIn 0.5s ease-in-out;
}

.logo {
  width: 250px;
  height: auto;
  transition: transform 0.3s ease-in-out;
}

.logo:hover {
  animation: pulsate 1.5s infinite;
}

.footer-column {
  flex: 1 1 220px;
  margin: 20px;
  position: relative;
  padding: 20px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  transition:
    background-color 0.3s ease,
    transform 0.3s ease;
}

.footer-column:hover {
  background-color: rgba(255, 255, 255, 0.25);
  transform: translateY(-3px);
}

.footer-column h3 {
  font-size: 1.6em;
  margin-bottom: 15px;
  color: #f7e1c3;
  border-bottom: 2px solid #f39c12;
  padding-bottom: 5px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

.footer-column p {
  font-size: 0.9em;
  margin-bottom: 10px;
  color: #d0d0d0;
}

.footer-column a {
  color: #f39c12;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-column a:hover {
  text-decoration: underline;
}

.footer-column i {
  margin-right: 10px;
  color: #f7e1c3;
}

.social-icons {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.social-icons a {
  margin-right: 15px;
  color: #f39c12;
  font-size: 1.5em;
  transition: color 0.3s;
}

.social-icons a:hover {
  color: #ffcc00;
}

.newsletter {
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  text-align: center;
  padding: 30px;
  margin-top: 40px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  animation: fadeIn 0.5s ease-in-out;
}

.newsletter h3 {
  color: #f7e1c3;
  margin-bottom: 15px;
}

.newsletter form {
  display: flex;
  justify-content: center;
  align-items: center;
}

.newsletter input {
  padding: 10px;
  margin-right: 10px;
  border: none;
  border-radius: 5px;
  width: 250px;
  transition: box-shadow 0.3s;
}

.newsletter input:focus {
  box-shadow: 0 0 5px #f39c12;
}

.newsletter button {
  padding: 10px 15px;
  background-color: #f39c12;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition:
    background-color 0.3s,
    transform 0.3s;
}

.newsletter button:hover {
  background-color: #ffcc00;
  transform: scale(1.05);
}

.footer-bottom {
  background-color: #2c2a29;
  color: #d0d0d0;
  text-align: center;
  padding: 15px 0;
  position: relative;
  z-index: 1;
}

.footer-bottom p {
  margin: 0;
  font-size: 0.9em;
}

.footer-links {
  margin-top: 10px;
}

.footer-links a {
  color: #f39c12;
  text-decoration: none;
}

.footer-links a:hover {
  text-decoration: underline;
}

.read-more,
.contact-form-link,
.social-share {
  display: inline-block;
  margin-top: 10px;
  color: #f39c12;
  text-decoration: none;
  transition: color 0.3s;
}

.read-more:hover,
.contact-form-link:hover,
.social-share:hover {
  color: #ffcc00;
}


/* Animações */
@keyframes pulsate {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes slideIn {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .footer-container {
    flex-direction: column;
    align-items: center;
  }

  .footer-column {
    margin: 10px 0;
    width: 100%;
    max-width: 300px;
  }

  .newsletter {
    width: 90%;
  }

  .newsletter input {
    width: 70%;
  }

  .footer-decorations {
    display: none; /* Esconde as decorações em telas menores */
  }
}
</style>
