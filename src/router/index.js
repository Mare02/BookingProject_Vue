import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthView from '../views/AuthView.vue'
<<<<<<< HEAD
import ApartmentsView from '../views/ApartmentsView.vue'
import ProfilView from '../views/ProfilView.vue'
=======
import HotelsView from '../views/HotelsView.vue'
import SingleHotelView from '../views/SingleHotelView.vue'
>>>>>>> ca87b91c2c26c15eabea7f4159865d135ce61970

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
    path: '/hotels/:data',
    name: 'hotels',
    props: true,
    component: HotelsView,
  },
  {
    path: '/hotels/:id/:data_id',
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
