<template>
  <div class="navbar">
    <div class="nav-title">
      <div @click="redirectHome()" class="logo-span">
        <span class="logo-span-part">INN</span>OVA
      </div>
    </div>
    <div class="d-flex a-center">
      <nav class="nav-links">
<<<<<<< HEAD
<<<<<<< HEAD
        <button class="link-signin" v-if="$route.path !== '/auth' && $route.path !== '/profil'" @click="redirectToAuth()">Sign In</button>
=======
        <a class="link">Profile</a>
        <a class="link">List your property</a>
        <button class="link-signin" v-if="$route.path !== '/auth'" @click="redirectToAuth()">Sign In</button>
>>>>>>> 6319c8bb2e9d918722b4b433251224eb74418adc
=======
        <!-- <router-link class="link" :to="{name: 'profile'}">Profile</router-link> -->
        <button class="link">Profile</button>
        <router-link class="link" :to="{name: 'add_new_property'}">List your property</router-link>
        <!-- <button class="link-signin" v-if="this.$route.path !== '/auth' && !getUserId" @click="redirectToAuth()">Sign In</button> -->
        <router-link v-if="this.$route.path !== '/auth' && !getUserId" class="link-signin" :to="{name: 'auth'}">Sign In</router-link>
        <button class="link-signin" v-if="getUserId" @click="logOut()">Sign Out</button>
>>>>>>> c623128e9dc91a105f147c19a0980cc9f03a0a3c
      </nav>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import service from '../services/API'

export default{
  name: 'Navbar-Component',
  computed:{
    ...mapGetters(['getUserId']),
  },
  methods:{
    redirectToAuth(){
      this.$router.push({name: 'auth'})
    },
    redirectHome(){
      this.$router.push({name: 'home'})
    },
<<<<<<< HEAD
    },
=======
    async logOut(){
      const res = await service.logOut(localStorage.getItem('sid'))
      console.log(res);
      if(res.status === 200){
        localStorage.clear()
        location.reload()
        this.$router.push({name: 'home'})
      }
    }
>>>>>>> c623128e9dc91a105f147c19a0980cc9f03a0a3c
  }
<<<<<<< HEAD


=======
}
>>>>>>> 6319c8bb2e9d918722b4b433251224eb74418adc
</script>

<style>

</style>