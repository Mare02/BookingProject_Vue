import { createRouter, createWebHistory } from 'vue-router'
import service from '../services/API'
import HomeView from '../views/HomeView.vue'
import AuthView from '../views/AuthView.vue'
import HotelsView from '../views/HotelsView.vue'
import SingleHotelView from '../views/SingleHotelView.vue'
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
    component: HotelsView,
  },
  {
    path: '/hotels/:hot_id',
    name: 'hotel',
    component: SingleHotelView,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async () => {
  const res = await service.checkSession(localStorage.getItem('sid'))
  console.log(res);
  if(res.status === 200){
    store.state.user.usr_id = res.data.data[0].usr_id
    store.state.user.usr_email = res.data.data[0].usr_email
    store.state.user.rol_id = res.data.data[0].fk_rol_id
    store.state.user.rol_name = res.data.data[0].rol_name
    store.state.user.usr_firstname = res.data.data[0].usr_firstname
    store.state.user.usr_lastname = res.data.data[0].usr_lastname
  }
})

export default router
