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
        <button class="link-signin" v-if="$route.path !== '/auth' && $route.path !== '/profil'" @click="redirectToAuth()">Sign In</button>
=======
        <a class="link">Profile</a>
        <a class="link">List your property</a>
        <button class="link-signin" v-if="$route.path !== '/auth'" @click="redirectToAuth()">Sign In</button>
>>>>>>> 6319c8bb2e9d918722b4b433251224eb74418adc
      </nav>
    </div>
  </div>
</template>

<script>
export default{
  name: 'Navbar-Component',
  methods:{
    redirectToAuth(){
      this.$router.push({name: 'auth'})
    },
    redirectHome(){
      this.$router.push({name: 'home'})
    },
    },
  }
<<<<<<< HEAD


=======
}
>>>>>>> 6319c8bb2e9d918722b4b433251224eb74418adc
</script>

<style>

</style>