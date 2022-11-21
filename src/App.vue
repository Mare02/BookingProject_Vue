<template>
  <div>
    <Navbar v-if="this.$route.name !== 'auth'"/>
    <router-view/>
    <Footer v-if="this.$route.name !== 'auth' && this.$route.name !== 'add_new_property' && this.$route.name !== 'profile'"/>
  </div>
</template>

<script>
import Navbar from './components/Navbar-Component.vue'
import Footer from './components/Footer-Component.vue'

export default{
  components:{
    Navbar, Footer
  }
}
</script>

<style src="../public/css/booking.css">

</style>
