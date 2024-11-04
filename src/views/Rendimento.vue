<script setup>
import Header from '../components/FoHea/header.vue'
import { Bar, Line, Doughnut } from 'vue-chartjs'
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'
import { computed } from 'vue'

// Registra componentes do Chart.js
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
)

// Dados simulados para gráficos
const salesData = [1200, 1500, 1300, 1800, 2000, 2100, 1600]
const expenseData = [800, 900, 1000, 750, 1200, 1150, 950]
const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho']

// Cálculo do lucro
const profitData = computed(() => salesData.map((s, i) => s - expenseData[i]))
</script>

<template>
  <div class="page-container">
    <Header />
    <div class="dashboard">
      <section class="summary-section">
        <div class="summary-card">
          <h3>Vendas Totais</h3>
          <p>{{ salesData.reduce((acc, curr) => acc + curr, 0) }}</p>
        </div>
        <div class="summary-card">
          <h3>Despesas Totais</h3>
          <p>{{ expenseData.reduce((acc, curr) => acc + curr, 0) }}</p>
        </div>
        <div class="summary-card">
          <h3>Lucro</h3>
          <p>{{ profitData.reduce((acc, curr) => acc + curr, 0) }}</p>
        </div>
      </section>

      <section class="charts-section">
        <div class="chart-container">
          <h4>Gráfico de Vendas</h4>
          <Bar
            :data="{
              labels: months,
              datasets: [
                {
                  label: 'Vendas',
                  data: salesData,
                  backgroundColor: 'rgba(54, 162, 235, 0.6)',
                  borderColor: 'rgba(54, 162, 235, 1)',
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
                  backgroundColor: 'rgba(75, 192, 192, 0.6)',
                  borderColor: 'rgba(75, 192, 192, 1)',
                  borderWidth: 1
                }
              ]
            }"
          />
        </div>
        <div class="chart-container">
          <h4>Distribuição de Despesas</h4>
          <Doughnut
            :data="{
              labels: ['Insumos', 'Funcionários', 'Manutenção', 'Outros'],
              datasets: [
                {
                  data: [500, 300, 200, 150],
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)'
                  ]
                }
              ]
            }"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f5f5f5;
}

.dashboard {
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  background: #fafafa;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  color: #333;
}

.charts-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.chart-container {
  padding: 1rem;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h3,
h4 {
  margin: 0.5rem 0;
  color: #333;
}

p {
  font-size: 1.5rem;
  font-weight: bold;
  color: #444;
}
</style>
