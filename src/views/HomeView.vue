<template>
<div class="d-flex f-col a-center w-100">
  <img class="home-bg" src="https://wallpaperaccess.com/full/2690549.jpg" alt="">
  <span v-if="getName" class="home-title margin fade-scale">Welcome {{getName}}, where would you like to go?</span>
  <span v-else class="home-title margin fade-scale">Where would you like to go?</span>
  <div class="d-flex j-center w-100">
    <Search @search="redirect" @selected="getDestinations()"/>
  </div>
  <section class="mt-5 section-div">
    <div class="d-flex f-col a-center sec-white">
      <div class="section-header d-flex a-center">
        <span class="section-title">Popular destinations</span>
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
    <div class="mt-5 sec-white d-flex f-col a-center">
      <h2>Hotel apartments you might like</h2>
      <div class="mt-1 d-flex j-center f-wrap">
        <ApartmentCard v-for="apa in home_apartments" :key="apa.cat_id" :apartment="apa"/>
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
import ApartmentCard from '../components/Apartment-Card.vue'

export default {
  name: 'HomeView',
  components: {
    Search, ApartmentCard
  },
  computed: {
    ...mapGetters(['getName'])
  },
  mounted(){
    this.getDestinations()
    this.getHomeApartments()
  },
  data(){
    return{
      destinations: [],
      sta_name: null,
      home_apartments: []
    }
  },
  methods:{
    async getDestinations(){
      let res = await service.getDestinationsById(1)
      this.destinations = res.data.data
      this.sta_name = res.data.data[0].sta_name
    },
    redirect(){
      this.$router.push({name: "hotels"}) 
    },
    redirectToHotels(des_id, des_name, sta_name){
      localStorage.setItem('des_id', des_id)
      localStorage.setItem('des_name', des_name)
      localStorage.setItem('sta_name', sta_name)
      this.$router.push({name: 'hotels'})
    },
    async getHomeApartments(){
      let res = await service.getApartments(2, null, null, null, 3)
      this.home_apartments = res
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