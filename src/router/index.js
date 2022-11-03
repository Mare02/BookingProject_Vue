import { createRouter, createWebHistory } from 'vue-router'
// import service from '../services/API'
import HomeView from '../views/HomeView.vue'
import AuthView from '../views/AuthView.vue'
import HotelsView from '../views/HotelsView.vue'
import SingleHotelView from '../views/SingleHotelView.vue'
// import store from '@/store'

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

// router.beforeEach(async () => {
//   const res = await service.checkSession(localStorage.getItem('sid'))
//   if(res){
//     console.log('session_user_iz_baze', res[0]);
//     store.state.user.usr_id = res[0].usr_id
//     store.state.user.usr_email = res[0].usr_email
//     store.state.user.rol_id = res[0].fk_rol_id
//     store.state.user.rol_name = res[0].rol_name
//     store.state.user.usr_firstname = res[0].usr_firstname
//     store.state.user.usr_lastname = res[0].usr_lastname
//   }
// })

export default router
