import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import PromotionView from '@/views/PromotionView.vue'
import RegisterView from '@/views/RegisterView.vue'

const NotFoundView = () => import("@/views/NotFoundView.vue")

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: '/',
        name: 'home',
        component: HomeView
      },
      {
        path: '/about',
        name: 'about',
        component: AboutView
      },
      {
        path: '/:pathMatch(.*)*',
        name: 'NotFoundView',
        component: NotFoundView,
      },
      {
        path: '/promotion/:id',
        name: 'PromotionView',
        component: PromotionView,
      },
      {
        path: '/register',
        name: 'RegisterView',
        component: RegisterView,
      }
    ]
  })

export default router
