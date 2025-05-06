<template>
  <div class="trade-details">
    <h2>Trade Details</h2>
    <div v-if="id">
      <p><strong>Trade ID:</strong> {{ trade?.id }}</p>
      <p><strong>Symbol:</strong> {{ trade?.symbol }}</p>
      <p><strong>Quantity:</strong> {{ trade?.quantity }}</p>
      <p><strong>Price:</strong> ${{ trade?.price }}</p>
      <p><strong>PNL:</strong> ${{ trade?.pnl?.toFixed(2) }}</p>
      <p><strong>Date:</strong> {{ trade ? new Date(trade.date).toLocaleString() : '' }}</p>
    </div>
    <div v-else>
      <p>No trade selected.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted /* computed */ } from 'vue'
import { useRoute } from 'vue-router'
import { findTrade, type Trade } from '../adapters/trade'

const route = useRoute()
const id = route.params.id as string
const trade = ref(null as Trade | null)

onMounted(async () => {
  trade.value = await findTrade(parseInt(id))
})
</script>

<style scoped>
.trade-details {
  border: 1px solid #ccc;
  padding: 16px;
  border-radius: 8px;
  background-color: #f9f9f9;
  max-width: 400px;
  margin: 0 auto;
}

.trade-details h2 {
  margin-bottom: 16px;
  font-size: 1.5em;
  color: #333;
}

.trade-details p {
  margin: 8px 0;
  font-size: 1em;
  color: #555;
}

.trade-details strong {
  color: #000;
}
</style>
