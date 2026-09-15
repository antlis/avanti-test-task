import { createRouter, createWebHistory } from 'vue-router'

import AvantiDashboardView from '@/views/avanti_dashboard_view.vue'
import AvantiPlaceholderView from '@/views/avanti_placeholder_view.vue'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: AvantiDashboardView
    },
    {
      path: '/documenti',
      name: 'documenti',
      component: AvantiPlaceholderView,
      props: { title: 'Documenti' }
    },
    {
      path: '/profilo',
      name: 'profilo',
      component: AvantiPlaceholderView,
      props: { title: 'Profilo' }
    }
  ]
})
