<template>
  <Navbar v-if="this.$route.path !== '/auth'"/>
  <router-view/>
</template>

<script>
import Navbar from './components/Navbar-Component.vue'

export default{
  components:{
    Navbar
  }
}
</script>

<style src="../public/css/booking.css">

</style>
