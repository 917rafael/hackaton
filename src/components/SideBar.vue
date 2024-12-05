
<template>
  <aside class="sidebar">
    <h2 class="sidebar-title">Menu</h2>
    <ul class="sidebar-menu">
      <li>
        <router-link to="/rendimento" class="sidebar-menu-item">
          <span class="icon">
            <i class="fas fa-chart-line"></i>
          </span>
          <span class="label">Rendimentos</span>
        </router-link>
      </li>
      <li>
        <!--<router-link to="/manipulacao" class="sidebar-menu-item">-->
        <span class="icon">
            <i class="fas fa-users"></i>
          </span>
          <span class="label">Manipulação de Funcionários</span>
        <!-- </router-link> -->
      </li>
      <li>
        <!--<router-link to="/notificacoes" class="sidebar-menu-item">-->
          <span class="icon">
            <i class="fas fa-bell"></i>
          </span>
          <span class="label">Notificações</span>
        <!--</router-link>-->
      </li>
      <li>
        <!--<router-link to="/configuracoes" class="sidebar-menu-item">-->
          <span class="icon">
            <i class="fas fa-cogs"></i>
          </span>
          <span class="label">Configurações</span>
        <!--</router-link>-->
      </li>
    </ul>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 250px;
  background: #2a2d3e;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
}

.sidebar-title {
  font-size: 1.2rem;
  margin-bottom: 20px;
  color: #ffffff;
}

.sidebar-menu {
  list-style: none;
  padding: 0;
}

.sidebar-menu li {
  display: flex;
  align-items: center;
  padding: 15px 10px;
  margin-bottom: 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.sidebar-menu-item {
  text-decoration: none;
  color: white;
  display: flex;
  align-items: center;
}

.sidebar-menu-item:hover,
.sidebar-menu-item.router-link-active {
  background: #4c567a;
}

.icon {
  margin-right: 10px;
  font-size: 1.2rem;
}

.label {
  font-size: 1rem;
}
</style>
