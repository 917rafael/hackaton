
<template>
  <header>
    <div class="nav-bar">

      <router-link to="/"><img src="/src/assets/image/logo.png" alt="Logo" class="logo"></router-link>

    <nav>
      <ul class="nav-links">
        <li><router-link to="/" class="link">HOME</router-link></li>
        <li><router-link to="/contato" class="link">CONTATO</router-link></li>
        <li><router-link to="/estoque" class="link">MAIS</router-link></li>
        <li><button class="btn-login"><router-link to="/logClient" class="link-login">LOGIN</router-link></button></li>
      </ul>
    </nav>

    </div>
  </header>
</template>

<style scoped>

.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: rgba(59, 24, 3, 0.85);
}


.logo {
  width: 85px;
  height: auto;
  margin-left: 20px;
}

.nav-links {
  display: flex;
  list-style: none;
  margin-right: auto;
  gap: 50px;
  align-items: center;
}

.link {
  text-decoration: none;
  color: #fff;
  font-size: 14pt;
  transition: 0.5s;
}

.link:hover {
  color: #ff5722;
}


.btn-login {
  background-color: #ff5722;
  width: 90px;
  height: 35px;
  border: none;
  border-radius: 5px;
  margin-right: 20px;
  transition: 0.4s;
  
}

.btn-login:hover {
  background-color: #eb3e09;
}

.link-login {
  text-decoration: none;
  color: #fff;
  font-size: 13pt;
  display: block;
  text-align: center;
  line-height: 35px;
}
</style>