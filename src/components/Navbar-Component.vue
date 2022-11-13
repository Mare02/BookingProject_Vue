<template>
  <div class="navbar">
    <div class="nav-title">
      <div @click="redirectHome()" class="logo-span">
        <span class="logo-span-part">INN</span>OVA
      </div>
    </div>
    <div class="d-flex a-center">
      <nav class="nav-links">
        <!-- <router-link class="link" :to="{name: 'profile'}">Profile</router-link> -->
        <button class="link">Profile</button>
        <router-link class="link" :to="{name: 'add_new_property'}">List your property</router-link>
        <!-- <button class="link-signin" v-if="this.$route.path !== '/auth' && !getUserId" @click="redirectToAuth()">Sign In</button> -->
        <router-link v-if="this.$route.path !== '/auth' && !getUserId" class="link-signin" :to="{name: 'auth'}">Sign In</router-link>
        <button class="link-signin" v-if="getUserId" @click="logOut()">Sign Out</button>
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
    async logOut(){
      const res = await service.logOut(localStorage.getItem('sid'))
      console.log(res);
      if(res.status === 200){
        localStorage.clear()
        location.reload()
        this.$router.push({name: 'home'})
      }
    }
  }
}
</script>

<style>

</style>