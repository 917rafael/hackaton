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
  Legend,
  Filler
} from 'chart.js'
import { ref, computed, watch, onMounted } from 'vue'

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler
)

const salesData = ref([1200, 1500, 1300, 1800, 2000, 2100, 1600])
const expenseData = ref([800, 900, 1000, 750, 1200, 1150, 950])
const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho']

const profitData = computed(() =>
  salesData.value.map((s, i) => (s ?? 0) - (expenseData.value[i] ?? 0))
)

const totalSales = computed(() =>
  salesData.value.reduce((acc, curr) => acc + (curr ?? 0), 0).toLocaleString('pt-BR')
)

const totalExpenses = computed(() =>
  expenseData.value.reduce((acc, curr) => acc + (curr ?? 0), 0).toLocaleString('pt-BR')
)

const totalProfit = computed(() =>
  profitData.value.reduce((acc, curr) => acc + (curr ?? 0), 0).toLocaleString('pt-BR')
)

const saveData = () => {
  const data = {
    sales: salesData.value,
    expenses: expenseData.value,
    savedAt: new Date()
  }
  localStorage.setItem('weeklyData', JSON.stringify(data))
}

const loadData = () => {
  const storedData = localStorage.getItem('weeklyData')
  if (storedData) {
    const data = JSON.parse(storedData)
    const now = new Date()
    const savedDate = new Date(data.savedAt)
    const oneWeek = 7 * 24 * 60 * 60 * 1000

    if (now - savedDate > oneWeek) {
      salesData.value = new Array(7).fill(0)
      expenseData.value = new Array(7).fill(0)
      localStorage.removeItem('weeklyData')
    } else {
      salesData.value = data.sales
      expenseData.value = data.expenses
    }
  }
}

onMounted(() => {
  loadData()
})

watch([salesData, expenseData], saveData)
</script>

<template>
  <div class="page-container">
    <Header />
    <div class="dashboard">
      <section class="summary-section">
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
      </section>

      <section class="input-section">
        <h3>Modificar Dados</h3>
        <div class="input-grid">
          <div v-for="(month, index) in months" :key="month" class="input-card">
            <label>{{ month }} - Vendas:</label>
            <input type="number" v-model.number="salesData[index]" placeholder="R$ 0,00" />
            <label>{{ month }} - Despesas:</label>
            <input type="number" v-model.number="expenseData[index]" placeholder="R$ 0,00" />
          </div>
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
        <div class="chart-container">
          <h4>Distribuição de Despesas</h4>
          <Doughnut
            :data="{
              labels: ['Insumos', 'Funcionários', 'Manutenção', 'Outros'],
              datasets: [
                {
                  data: [500, 300, 200, 150],
                  backgroundColor: [
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)'
                  ]
                }
              ]
            }"
          />
        </div>
      </section>

      <section class="notes-section">
        <h4>Notas</h4>
        <textarea
          v-model="notes"
          placeholder="Escreva suas notas aqui..."
          class="notes-input"
        ></textarea>
      </section>

      <section class="footer-section">
        <p>© 2024 - Sua Empresa. Todos os direitos reservados.</p>
      </section>
    </div>
  </div>
</template>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(to right, #e3f2fd, #bbdefb);
  font-family: 'Arial', sans-serif;
  color: #333;
}

.dashboard {
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.dashboard:hover {
  transform: translateY(-2px);
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
  transition:
    transform 0.3s,
    box-shadow 0.3s;
}

.summary-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.input-section {
  margin-bottom: 2rem;
  background: #ffffff;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.input-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.input-card {
  background: #f5f5f5;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition:
    background 0.3s,
    transform 0.3s;
}

.input-card:hover {
  background: #e3f2fd;
  transform: translateY(-3px);
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 2px solid #42a5f5;
  border-radius: 4px;
  transition:
    border-color 0.3s,
    box-shadow 0.3s;
}

input:focus {
  border-color: #1976d2;
  outline: none;
  box-shadow: 0 0 5px rgba(25, 118, 210, 0.5);
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
  transition: transform 0.3s;
}

.chart-container:hover {
  transform: scale(1.02);
}

h3,
h4 {
  margin: 0.5rem 0;
  color: #ffffff;
  font-weight: 600;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

p {
  font-size: 1.5rem;
  font-weight: bold;
  color: #ffffff;
}

.notes-section {
  margin-top: 2rem;
  background: #ffffff;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.notes-input {
  width: 100%;
  height: 100px;
  padding: 0.5rem;
  border: 2px solid #42a5f5;
  border-radius: 4px;
  resize: none;
  transition:
    border-color 0.3s,
    box-shadow 0.3s;
}

.notes-input:focus {
  border-color: #1976d2;
  outline: none;
  box-shadow: 0 0 5px rgba(25, 118, 210, 0.5);
}

.footer-section {
  text-align: center;
  margin-top: 2rem;
  padding: 1rem;
  background: #c4b397;
  border-radius: 8px;
  color: #333;
  font-size: 0.9rem;
}

.footer-section p {
  margin: 0;
}

/* Estilo responsivo */
@media (max-width: 768px) {
  .summary-section {
    flex-direction: column;
  }
  .summary-card {
    margin: 1rem 0;
  }
  .input-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .dashboard {
    padding: 1rem;
  }
  h3,
  h4 {
    font-size: 1.2rem;
  }
  p {
    font-size: 1.2rem;
  }
}

.chart-container canvas {
  max-width: 100%;
  height: auto !important;
}

/* Adicionando transições mais suaves */
.summary-card,
.input-card,
.chart-container {
  transition: all 0.3s ease;
}

.summary-card:hover,
.input-card:hover,
.chart-container:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}
</style>
