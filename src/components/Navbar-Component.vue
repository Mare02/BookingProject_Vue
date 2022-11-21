<template>
  <div class="navbar">
    <div class="nav-title">
      <div @click="redirectHome()" class="logo-span">
        <span class="logo-span-part">INN</span>OVA
      </div>
    </div>
    <div class="d-flex a-center">
      <nav class="nav-links">
        <router-link v-if="getUserId && this.$route.name !== 'profile'" class="link" :to="{name: 'profile'}">Profile</router-link>
        <router-link class="link" :to="{name: 'add_new_property'}" v-if="getUserId && this.$route.name !== 'add_new_property'">List your property</router-link>
        <router-link v-if="!getUserId" class="link-signin" :to="{name: 'auth'}">Sign In</router-link>
        <a class="link-signin" v-if="getUserId" @click="logOut()">Sign Out</a>
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
      localStorage.clear()
      await this.$router.push({name: 'home'})
      location.reload()
    }
  }
}
</script>

<style>

</style>