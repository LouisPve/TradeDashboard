import './assets/main.css'

import { createApp } from 'vue'
import App from './pages/App.vue'
import { /* createMemoryHistory */ createWebHistory, createRouter } from 'vue-router'

import HomeView from './pages/HomeView.vue'
import AboutView from './pages/AboutView.vue'
import TradeDetails from './components/TradeDetails.vue'
import StacksView from './pages/StacksRewards.vue'
import ComingSoon from './pages/ComingSoon.vue'

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
  { path: '/stacks', component: StacksView },
  { path: '/aave', component: ComingSoon },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

createApp(App).use(router).mount('#app')
