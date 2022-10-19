<template>
  <div class="navbar">
    <div class="nav-title">
      <span @click="redirectHome()">Booking Project</span>
    </div>
    <nav class="nav-links">
      <button v-if="$route.path !== '/auth'" @click="redirectToAuth()">Log In</button>
    </nav>
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