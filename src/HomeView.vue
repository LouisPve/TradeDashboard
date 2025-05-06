<script setup lang="ts">
import TradeTable from './components/TradeTable.vue'
</script>

<template>
  <div class="home-container"><TradeTable /></div>
</template>

<style scoped>
.home-container {
  display: flexbox;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family: Arial, sans-serif;
  color: #333;
  text-align: center;
  padding: 20px;
  margin: 0px auto; /* Adds space at the top */
  max-width: 800px;
}
</style>
