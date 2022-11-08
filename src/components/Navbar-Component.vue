<template>
  <div class="navbar">
    <div class="nav-title">
      <div @click="redirectHome()" class="logo-span">
        <span class="logo-span-part">INN</span>OVA
      </div>
    </div>
    <div class="d-flex a-center">
      <nav class="nav-links">
        <a class="link" v-if="getUserId">Profile</a>
        <a class="link" v-if="getUserId">List your property</a>
        <button class="link-signin" v-if="$route.path !== '/auth'" @click="redirectToAuth()">Sign In</button>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

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
    }
  }
}
</script>

<style>

</style>