<template>
  <div class="navbar">
    <div class="nav-title">
      <span @click="redirectHome()">Booking Project</span>
    </div>
    <div class="d-flex a-center">
      <nav class="nav-links">
        <button class="link">Menu</button>
        <button class="link-signin" v-if="$route.path !== '/auth'" @click="redirectToAuth()">Sign In</button>
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
    }
  }
}

</script>

<style>

</style>