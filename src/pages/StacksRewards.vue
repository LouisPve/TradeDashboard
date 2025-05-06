<template>
  <div class="trade-dashboard-summary">
    <h1>Opened Trades</h1>

    <div v-if="loading" class="loading">Loading...</div>

    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="rewards" class="content">
      <table v-if="rewards.length" class="trade-table">
        <thead>
          <tr>
            <th>Cycle</th>
            <th>Start Balance</th>
            <th>End Balance</th>
            <th>BTC Yield</th>
            <th>Period Yield</th>
            <th>Annualized Yield</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(reward, index) in rewards" :key="index">
            <td>{{ reward.cycleId }}</td>
            <td>{{ formatReward(reward.snapshots[0]) }} BTC</td>
            <td>
              {{
                reward.rewarded
                  ? formatReward(reward.snapshots[reward.snapshots.length - 1]) + ' BTC'
                  : ''
              }}
            </td>
            <td>{{ formatReward(reward?.rewarded ?? 0) }} BTC</td>
            <td>
              {{
                reward.rewarded
                  ? (
                      (reward.rewarded / reward.snapshots[reward.snapshots.length - 1]) *
                      100
                    ).toFixed(2) + '%'
                  : ''
              }}
            </td>
            <td>{{ '' }}</td>
          </tr>
          <tr>
            <td>Total</td>
            <td></td>
            <td></td>
            <td>{{ formatReward(totalRewards) }} BTC</td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <p v-else-if="!rewards.length && !loading">No rewards available.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { getStacksRewards, type StacksReward } from '../adapters/stacks'

const rewards = ref([] as StacksReward[])

const loading = ref(false)
const error = ref(null as Error | null)
const totalRewards = computed(() => {
  return rewards.value.reduce((acc, reward) => acc + (reward.rewarded ?? 0), 0)
})

onMounted(async () => {
  error.value = null
  loading.value = true

  try {
    // replace `getPost` with your data fetching util / API wrapper
    rewards.value = await getStacksRewards()
  } catch (err) {
    error.value = err as Error
    console.error('Error fetching trades:', error.value.message)
  } finally {
    loading.value = false
  }
})

function formatReward(reward: number) {
  return (reward * 10 ** -8).toFixed(8)
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
  background-color: #277529;
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
