import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/project/:id',
    name: 'project-detail',
    component: () => import('@/views/ProjectDetailView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else if (to.hash) {
      return new Promise((resolve) => {
        let attempts = 0
        const checkEl = () => {
          const el = document.querySelector(to.hash)
          if (el) {
            resolve({
              el: to.hash,
              behavior: 'smooth'
            })
          } else if (attempts < 20) {
            attempts++
            setTimeout(checkEl, 50)
          } else {
            resolve({ top: 0 })
          }
        }
        checkEl()
      })
    } else {
      return { top: 0 }
    }
  }
})

export default router
