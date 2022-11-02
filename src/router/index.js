import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthView from '../views/AuthView.vue'
import HotelsView from '../views/HotelsView.vue'
import SingleHotelView from '../views/SingleHotelView.vue'
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
    path: '/hotels',
    name: 'hotels',
    props: true,
    component: HotelsView,
  },
  {
    path: '/hotels/:hot_id',
    name: 'hotel',
    component: SingleHotelView,
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
