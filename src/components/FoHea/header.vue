<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { useAuthStore } from '@/store/auth';
import { ref, onMounted, onBeforeUnmount } from 'vue';

const authStore = useAuthStore();

const isScrolled = ref(false);
const handleScroll = () => {
  if (window.scrollY > 0) {
    isScrolled.value = true; 
  } else {
    isScrolled.value = false; 
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>


<template>
  <header :class="{ scrolled: isScrolled }">
    <div class="nav-bar">
      <router-link to="/"><img src="/src/assets/image/Logo nova.png" alt="Logo" class="logo"></router-link>
      <nav>
        <ul class="nav-links">
          <li><router-link to="/" class="link">HOME</router-link></li>
          <li><router-link to="/contato" class="link">CONTATO</router-link></li>
          <li><router-link to="/estoque" class="link">MAIS</router-link></li>

          <li>
            <button class="btn-login" v-if="!authStore.access_token">
              <router-link to="/login" class="link-login">LOGIN</router-link>
            </button>

            <span v-if="authStore.access_token && authStore.user.user_metadata.tipo == 'funcionario'">
              <router-link to="/perfil">funcionario</router-link>
            </span>

            <span v-if="authStore.access_token && authStore.user.user_metadata.tipo == 'cliente'">
              <router-link to="/perfil">cliente</router-link>
            </span>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped>
header {
  position: sticky; 
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 10px 20px;
}

header.scrolled {
  background-color: #5d2f23;
  height: 15%;
}

.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;  padding: 10px 20px;
  height: 100px;
}


.logo {
  max-width: 150px; 
  max-height: 100px; 
  width: auto;
  height: auto;
  margin-left: 5px; 
}

/* Links de navegação */
.nav-links {
  display: flex;
  list-style: none;
  margin-right: auto;
  gap: 50px;
  align-items: center;
}

.link {
  font-weight: bold;
  text-decoration: none;
  color: #fff;
  font-size: 18pt;
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
  font-weight: bold;
  text-decoration: none;
  color: #fff;
  font-size: 15pt;
  display: block;
  text-align: center;
  line-height: 35px;
}
</style>