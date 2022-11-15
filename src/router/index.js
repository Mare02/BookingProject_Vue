import { createRouter, createWebHistory } from 'vue-router'
import service from '../services/API'
import HomeView from '../views/HomeView.vue'
import AuthView from '../views/AuthView.vue'
import HotelsView from '../views/HotelsView.vue'
import SingleHotelView from '../views/SingleHotelView.vue'
import ProfileView from '../views/ProfileView.vue'
import store from '@/store'

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
    path: '/profile/:id',
    name: 'profile',
    component: ProfileView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async () => {
  const res = await service.checkSession(localStorage.getItem('sid'))
  console.log('session_user', res[0]);
  store.dispatch('setEmail', res.usr_email)
  //console.log(store.getters.getEmail);
  store.dispatch('setUserId', res.usr_id)
  store.dispatch('setFullName', res.usr_firstname, res.usr_lastname)
})

export default router
