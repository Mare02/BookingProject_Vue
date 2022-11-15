<template>
  <div class="navbar">
    <div class="nav-title">
      <div @click="redirectHome()" class="logo-span">
        <span class="logo-span-part">INN</span>OVA
      </div>
    </div>
    <div class="d-flex a-center">
      <nav class="nav-links">
        <button class="link" v-if="getUserId">Profile</button>
        <router-link class="link" :to="{name: 'add_new_property'}" v-if="this.$route.name !== 'add_new_property'">List your property</router-link>
        <router-link v-if="!getUserId" class="link-signin" :to="{name: 'auth'}">Sign In</router-link>
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