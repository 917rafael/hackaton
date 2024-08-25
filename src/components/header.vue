<script setup>
</script>

<template>
  <header class="header">
    <!-- Use router-link para navegação interna -->
    <router-link to="/">
      <img src="/src/assets/image/logo.png" alt="Logo" class="logo">
    </router-link>
    <nav>
      <ul class="nav-links">
        <li><router-link to="/contato">Contato</router-link></li>
        <li><router-link to="/contato">Contato</router-link></li>
        <li><router-link to="/contato">Contato</router-link></li>
        <li><router-link to="/contato">Contato</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
.container {
  font-family: 'Arial', sans-serif;
  color: #fff;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(59, 24, 3, 0.85);
  height: 2%;
}

.logo {
  max-width: 139px; /* Define um tamanho máximo para a logo */
  height: 110px; /* Mantém a proporção da logo */
  margin-left: 60px;
}

.nav-links {
  display: flex;
  list-style: none;
  padding-right: 90px;
}

.nav-links li {
  margin-right: 20px;
}

.nav-links a {
  text-decoration: none;
  color: #fff;
  font-weight: bold;
  font-size: 20px;
  padding: 8px 16px;
  transition: background-color 0.5s ease;
}

.nav-links a:hover {
  background-color: #ff5722;
  border-radius: 4px;
}
</style>
