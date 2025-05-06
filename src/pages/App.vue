<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { capitalize } from '../utils/string.utils'

const route = useRoute()

// Compute breadcrumbs based on the current route path
const breadcrumbs = computed(() => {
  return route.fullPath
    .split('/')
    .filter((segment) => segment) // Remove empty segments
    .map((segment, index, array) => ({
      name: segment || 'Home',
      path: '/' + array.slice(0, index + 1).join('/'),
    }))
})
</script>

<template>
  <nav>
    <h1><RouterLink to="/trade">AllMyInvest</RouterLink></h1>
    <RouterLink to="/trade">Trades</RouterLink>
    <RouterLink to="/stacks">Bitcoin stacking</RouterLink>
    <RouterLink to="/aave">Aave</RouterLink>
    <RouterLink to="/about">Go to About</RouterLink>
  </nav>
  <div class="breadcrumbs">
    <p>
      @>
      <span v-for="(crumb, index) in breadcrumbs" :key="crumb.path">
        <RouterLink :to="crumb.path">{{ capitalize(crumb.name) }}</RouterLink>
        <span v-if="index < breadcrumbs.length - 1"> &gt; </span>
      </span>
    </p>
  </div>
  <main>
    <RouterView />
  </main>
</template>
