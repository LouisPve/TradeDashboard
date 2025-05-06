<template>
  <div class="trade-dashboard-summary">
    <h1>Opened Trades</h1>

    <div v-if="loading" class="loading">Loading...</div>

    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="openTrades" class="content">
      <table v-if="openTrades.length" class="trade-table">
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(trade, index) in openTrades" :key="index">
            <td>{{ trade.symbol }}</td>
            <td>{{ trade.quantity }}</td>
            <td>{{ trade.price }}</td>
            <td>
              <button @click="closeTrade(index)">Close</button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else-if="!openTrades.length && !loading">No open trades available.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getTrades, type Trade } from '../adapters/trade'

const openTrades = ref([] as Trade[])

const loading = ref(false)
const error = ref(null as Error | null)

onMounted(async () => {
  error.value = null
  loading.value = true

  try {
    // replace `getPost` with your data fetching util / API wrapper
    const trades = await getTrades()
    openTrades.value = trades
  } catch (err) {
    error.value = err as Error
    console.error('Error fetching trades:', error.value.message)
  } finally {
    loading.value = false
  }
})

function closeTrade(index: number) {
  openTrades.value.splice(index, 1)
}
</script>

<style scoped>
.trade-dashboard-summary {
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 20px auto; /* Adds space at the top */
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.content {
  display: flex;
  justify-content: center;
  width: 100%;
}

.trade-table {
  width: 100%;
  max-width: 800px;
  border-collapse: collapse;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.trade-table th,
.trade-table td {
  padding: 12px 15px;
  text-align: center;
  border-bottom: 1px solid #ddd;
}

.trade-table th {
  background-color: #007bff;
  color: #fff;
  font-weight: bold;
  text-transform: uppercase;
}

.trade-table tr:nth-child(even) {
  background-color: #f2f2f2;
}

.trade-table tr:hover {
  background-color: #e9f5ff;
}

button {
  padding: 8px 12px;
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #cc0000;
}

.loading,
.error {
  text-align: center;
  font-size: 16px;
}

.loading {
  color: #007bff;
}

.error {
  color: #ff4d4d;
}
</style>
