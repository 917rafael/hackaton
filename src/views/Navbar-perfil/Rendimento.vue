<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import Header from '@/components/FoHea/HeaderMais.vue';
import { ref, computed, onMounted, watch } from 'vue';
import { Bar, Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from 'chart.js';
import { useRoute } from 'vue-router';  // Importando o hook useRoute

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const salesData = ref([1200, 1500, 1300, 1800, 2000, 2100, 1600]);
const expenseData = ref([800, 900, 1000, 750, 1200, 1150, 950]);
const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho'];

const profitData = computed(() =>
  salesData.value.map((s, i) => (s ?? 0) - (expenseData.value[i] ?? 0))
);

const totalSales = computed(() =>
  salesData.value.reduce((acc, curr) => acc + (curr ?? 0), 0).toLocaleString('pt-BR')
);

const totalExpenses = computed(() =>
  expenseData.value.reduce((acc, curr) => acc + (curr ?? 0), 0).toLocaleString('pt-BR')
);

const totalProfit = computed(() =>
  profitData.value.reduce((acc, curr) => acc + (curr ?? 0), 0).toLocaleString('pt-BR')
);

const saveData = () => {
  const data = {
    sales: salesData.value,
    expenses: expenseData.value,
    savedAt: new Date()
  };
  localStorage.setItem('weeklyData', JSON.stringify(data));
};

const loadData = () => {
  const storedData = localStorage.getItem('weeklyData');
  if (storedData) {
    const data = JSON.parse(storedData);
    const now = new Date();
    const savedDate = new Date(data.savedAt);
    const oneWeek = 7 * 24 * 60 * 60 * 1000;

    if (now - savedDate > oneWeek) {
      salesData.value = new Array(7).fill(0);
      expenseData.value = new Array(7).fill(0);
      localStorage.removeItem('weeklyData');
    } else {
      salesData.value = data.sales;
      expenseData.value = data.expenses;
    }
  }
};

onMounted(() => {
  loadData();
});

watch([salesData, expenseData], saveData);

// Barra Lateral - Menu de Navegação
const route = useRoute();  // Hook do Vue Router para acessar a rota atual

const getIcon = (item) => {
  switch (item) {
    case "Rendimentos":
      return "fas fa-chart-line";
    case "Manipulação de Funcionários":
      return "fas fa-users";
    case "Notificações":
      return "fas fa-bell";
    case "Configurações":
      return "fas fa-cogs";
    default:
      return "fas fa-question-circle";
  }
};
</script>

<template>
  <Header />

  <div class="dashboard">
    <!-- Barra Lateral -->
    <aside class="sidebar">
      <h2 class="sidebar-title">Menu</h2>
      <ul class="sidebar-menu">
        <!-- Usando router-link para navegação -->
        <li 
          v-for="item in ['Rendimentosz', 'Manipulação de Funcionários', 'Notificações', 'Configurações']" 
          :key="item"
        >
          <router-link 
            :to="`/${item.toLowerCase().replace(' ', '-')}`" 
            class="sidebar-menu-item" 
            :class="{ active: route.path.includes(item.toLowerCase().replace(' ', '-')) }"
          >
            <span class="icon">
              <i :class="getIcon(item)"></i>
            </span>
            <span class="label">{{ item }}</span>
          </router-link>
        </li>
      </ul>
    </aside>

    <!-- Conteúdo Principal -->
    <main class="content">
      <header class="content-header">
        <h1>{{ route.name }}</h1> <!-- Mostra o nome da rota ativa -->
      </header>

      <section class="content-body">
        <div class="summary-section">
          <div class="summary-card">
            <h3>Vendas Totais</h3>
            <p>R$ {{ totalSales }}</p>
          </div>
          <div class="summary-card">
            <h3>Despesas Totais</h3>
            <p>R$ {{ totalExpenses }}</p>
          </div>
          <div class="summary-card">
            <h3>Lucro</h3>
            <p>R$ {{ totalProfit }}</p>
          </div>
        </div>

        <!-- Gráficos -->
        <div class="charts-section">
          <div class="chart-container">
            <h4>Gráfico de Vendas</h4>
            <Bar
              :data="{
                labels: months,
                datasets: [
                  {
                    label: 'Vendas',
                    data: salesData,
                    backgroundColor: 'rgba(76, 175, 80, 0.8)',
                    borderColor: 'rgba(76, 175, 80, 1)',
                    borderWidth: 1
                  }
                ]
              }"
            />
          </div>
          <div class="chart-container">
            <h4>Gráfico de Despesas</h4>
            <Bar
              :data="{
                labels: months,
                datasets: [
                  {
                    label: 'Despesas',
                    data: expenseData,
                    backgroundColor: 'rgba(244, 67, 54, 0.8)',
                    borderColor: 'rgba(244, 67, 54, 1)',
                    borderWidth: 1
                  }
                ]
              }"
            />
          </div>
          <div class="chart-container">
            <h4>Lucro por Mês</h4>
            <Line
              :data="{
                labels: months,
                datasets: [
                  {
                    label: 'Lucro',
                    data: profitData,
                    backgroundColor: 'rgba(33, 150, 243, 0.8)',
                    borderColor: 'rgba(33, 150, 243, 1)',
                    borderWidth: 1,
                    fill: true
                  }
                ]
              }"
            />
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.dashboard {
  display: flex;
  height: 100vh;
  background: #f5f7fa;
  font-family: 'Segoe UI', sans-serif;
}

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
.sidebar-menu-item.active {
  background: #4c567a;
}

.icon {
  margin-right: 10px;
  font-size: 1.2rem;
}

.label {
  font-size: 1rem;
}

.content {
  flex-grow: 1;
  padding: 20px;
}

.content-header {
  background: #ffffff;
  padding: 15px 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.content-header h1 {
  font-size: 1.5rem;
  color: #333333;
}

.summary-section {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
}

.summary-card {
  flex: 1;
  margin: 0 0.5rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, #4b3d2c, #55442e);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  color: #fff;
  transition: transform 0.3s ease;
}

.summary-card:hover {
  transform: translateY(-10px);
}

.charts-section {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
}

.chart-container {
  flex: 1;
}

@media screen and (max-width: 768px) {
  .sidebar {
    width: 200px;
  }
  
  .content-header h1 {
    font-size: 1.2rem;
  }
  
  .charts-section {
    flex-direction: column;
  }

  .chart-container {
    margin-bottom: 2rem;
  }
}
</style>
