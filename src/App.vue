<template>
  <Navbar/>
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

<style src="../public/booking.css">

</style>
