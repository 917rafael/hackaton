<script setup>
</script>
<template>
<header class="header">
      <div class="logo">Take a Deep Bread</div>
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
  padding: 35px;
  background-color: rgba(59, 24, 3, 0.85);
}

.logo {
  font-size: 24px;
  font-weight: bold;
  color: #ff5722;
}

.nav-links{
  display: flex;
  list-style: none;
}

.nav-links li {
  margin-right: 20px;
}

.nav-links a {
  text-decoration: none;
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  padding: 8px 16px;
  transition: background-color 0.5s ease;
}

.nav-links a:hover {
  background-color: #ff5722;
  border-radius: 4px;
}
</style>