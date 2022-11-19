<template>
<div class="d-flex f-col a-center w-100">
  <img class="home-bg" src="https://wallpaperaccess.com/full/2690549.jpg" alt="">
  <span v-if="getName" class="home-title margin fade-scale">Welcome {{getName}}, where would you like to go?</span>
  <span v-else class="home-title margin fade-scale">Where would you like to go?</span>
  <div class="d-flex j-center w-100">
    <Search @search="redirect" @selected="getDestinations()"/>
  </div>
  <section class="mt-5 section-div">
    <div class="sec-white d-flex f-col shadow" v-if="sta_name">
      <div class="section-header">
        <span class="section-title">Popular destinations in {{sta_name}}</span>
        <span class="section-desc">Here are some popular destinations to explore</span>
      </div>
      <div class="d-flex a-center j-center f-wrap mt-1">
        <div class="card" v-for="d in destinations" :key="d.des_id" @click="redirectToHotels(d.des_id, d.des_name, d.sta_name)">
          <div class="card-img">
            <img :src="d.images[0].image_url" alt="" v-if="d.images">
          </div>
          <span class="section-desc mt-1">{{d.des_name}}</span>
        </div>
      </div>
    </div>
  </section>
  <div class="mt-3"></div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import Search from '../components/Search-Component.vue'
import service from '../services/API'

export default {
  name: 'HomeView',
  components: {
    Search
  },
  computed: {
    ...mapGetters(['getName'])
  },
  mounted(){
    if(localStorage.getItem('sta_id')){
      this.getDestinations()
    }
  },
  data(){
    return{
      destinations: [],
      sta_name: null
    }
  },
  methods:{
    async getDestinations(){
      let res = await service.getDestinationsById(localStorage.getItem('sta_id'))
      this.destinations = res
      this.sta_name = localStorage.getItem('sta_name')
    },
    redirect(){
      this.$router.push({name: "hotels"}) 
    },
    redirectToHotels(des_id, des_name, sta_name){
      localStorage.setItem('des_id', des_id)
      localStorage.setItem('des_name', des_name)
      localStorage.setItem('sta_name', sta_name)
      this.$router.push({name: 'hotels'})
    }
  }
}
</script>

<style>
  .margin{
    margin-top: 21rem;
  }
  .home-title{
    color: white;
    text-shadow: 0 0 10px black;
    font-size: 3rem;
  }
</style>