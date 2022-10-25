import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthView from '../views/AuthView.vue'
import ApartmentsView from '../views/ApartmentsView.vue'
import ProfilView from '../views/ProfilView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/auth',
    name: 'auth',
    component: AuthView,
  },
  {
    path: '/apartments/:data',
    name: 'apartments',
    props: true,
    component: ApartmentsView,
  },
  {
    path: '/profil',
    name: 'profil',
    props: true,
    component: ProfilView,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
