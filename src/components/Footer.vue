<template>
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-logo">
          <img src="@/assets/image/logo.png" alt="Logo da Padaria" class="logo">
        </div>
        
      
        <div class="footer-column">
          <h3>Sobre Nós</h3>
          <p>Na nossa padaria, combinamos tradição e qualidade para oferecer os melhores pães e doces artesanais. Feitos com ingredientes frescos e muito amor.</p>
        </div>
        
   
        <div class="footer-column">
          <h3>Contato</h3>
          <p><i class="fas fa-map-marker-alt"></i> 121 Rock Street, 21 Avenue, Nova York, NY 92103-9000</p>
          <p><i class="fas fa-phone-alt"></i> (123) 456-7890</p>
          <p><i class="fas fa-envelope"></i> contato@padariaexemplo.com</p>
        </div>
        
   
        <div class="footer-column">
          <h3>Horário de Funcionamento</h3>
          <p>Segunda a Sexta: 7h - 19h</p>
          <p>Sábado: 8h - 14h</p>
          <p>Domingo: Fechado</p>
        </div>
        
     
        <div class="footer-column">
          <h3>Siga-nos</h3>
          <div class="social-icons">
            <a href="#"><i class="fab fa-facebook-f"></i></a>
            <a href="#"><i class="fab fa-instagram"></i></a>
            <a href="#"><i class="fab fa-twitter"></i></a>
          </div>
        </div>
      </div>
      
    
      <div class="footer-bottom">
        <p>&copy; 2024 Padaria Exemplo. Todos os direitos reservados.</p>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: "Footer",
  };
  </script>
  
  <style scoped>
  .footer {
    background-color: #f4f1ea;
    color: #333;
    padding: 20px 0;
    font-family: 'Arial', sans-serif;
    border-top: 4px solid #d35400; 
    width: 100%; 
    margin-top: 20px; 
  }
  
  .footer-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
  
  .footer-logo {
    flex: 1;
    min-width: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .logo {
    width: 100px;
    height: auto;
    transition: transform 0.3s ease-in-out;
  }
  
  .logo:hover {
    animation: pulsate 1.5s infinite; 
  }
  
  .footer-column {
    flex: 1;
    min-width: 220px;
    margin-bottom: 20px;
  }
  
  .footer-column h3 {
    font-size: 1.2em;
    margin-bottom: 10px;
    color: #d35400;
  }
  
  .footer-column p, .footer-column a {
    font-size: 0.9em;
    margin-bottom: 8px;
    color: #555;
  }
  
  .footer-column i {
    margin-right: 8px;
    color: #d35400;
  }
  
  .social-icons a {
    margin-right: 10px;
    color: #d35400;
    font-size: 1.5em;
    transition: color 0.3s;
  }
  
  .social-icons a:hover {
    color: #e67e22;
  }
  
  .footer-bottom {
    background-color: #333;
    color: #fff;
    text-align: center;
    padding: 10px 0;
    margin: 0;
    width: 100%;
  }
  
  .footer-bottom p {
    margin: 0;
    font-size: 0.8em;
  }
  
  .footer-bottom a {
    color: #e67e22;
    text-decoration: none;
  }
  
  .footer-bottom a:hover {
    text-decoration: underline;
  }
  
  
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
  </style>
  