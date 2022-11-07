<template>
  <img class="bg-img" src="./assets/3b806816-cfbd-4777-8ce3-236d94ef2e7c.png" alt="">
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

<style src="../public/css/booking.css">

</style>
