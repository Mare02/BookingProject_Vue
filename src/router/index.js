import { createRouter, createWebHistory } from 'vue-router'
import service from '../services/API'
import HomeView from '../views/HomeView.vue'
import AuthView from '../views/AuthView.vue'
import HotelsView from '../views/HotelsView.vue'
import SingleHotelView from '../views/SingleHotelView.vue'
<<<<<<< HEAD
<<<<<<< HEAD
import ProfilView from '../views/ProfilView.vue'
=======
// import store from '@/store'
>>>>>>> 6319c8bb2e9d918722b4b433251224eb74418adc
=======
import AddProperty from '../views/AddNewProperty.vue'

import store from '@/store'
>>>>>>> c623128e9dc91a105f147c19a0980cc9f03a0a3c

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
  {
<<<<<<< HEAD
    path: '/profil',
    name: 'profil',
    props: true,
    component: ProfilView,
  }
=======
    path: '/add_new_property',
    name: 'add_new_property',
    component: AddProperty,
  },
>>>>>>> c623128e9dc91a105f147c19a0980cc9f03a0a3c
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async () => {
  const sid = localStorage.getItem('sid')
  if(sid !== 'null' && sid){
    const res = await service.checkSession(sid)
    console.log(res.data.data[0]);
    if(res.status === 200){
      store.state.user.usr_id = res.data.data[0].usr_id
      store.state.user.usr_email = res.data.data[0].usr_email
      store.state.user.rol_id = res.data.data[0].fk_rol_id
      store.state.user.rol_name = res.data.data[0].rol_name
      store.state.user.usr_firstname = res.data.data[0].usr_firstname
      store.state.user.usr_lastname = res.data.data[0].usr_lastname
    }
  }
})

export default router
