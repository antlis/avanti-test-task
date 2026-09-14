import { createRouter, createWebHistory } from 'vue-router'

import AvantiDashboardView from '@/views/avanti_dashboard_view.vue'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: AvantiDashboardView
    }
  ]
})
