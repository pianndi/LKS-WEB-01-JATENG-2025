import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/dashboard',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/dashboard/request-validation',
      component: () => import('../views/ValidationCreate.vue')
    },
    {
      path: '/dashboard/installments',
      component: () => import('../views/InstallmentIndex.vue')
    },
    {
      path: '/dashboard/installments/:id',
      component: () => import('../views/InstallmentDetail.vue')
    }
  ]
})

export default router
