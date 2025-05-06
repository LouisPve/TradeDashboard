import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { /* createMemoryHistory */ createWebHistory, createRouter } from 'vue-router'

import HomeView from './HomeView.vue'
import AboutView from './AboutView.vue'
import TradeDetails from './components/TradeDetails.vue'

const routes = [
  {
    path: '/',
    component: () => {
      router.push('/trade')
    },
  },
  { path: '/about', component: AboutView },
  { path: '/trade', component: HomeView },
  { path: '/trade/:id', name: 'trade', component: TradeDetails, props: true },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

createApp(App).use(router).mount('#app')
