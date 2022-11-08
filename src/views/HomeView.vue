<template>
<div class="d-flex f-col a-center w-100">
  <img class="home-bg" src="https://wallpaperaccess.com/full/2690549.jpg" alt="">
  <span class="home-title margin">Where would you like to go?</span>
  <div class="d-flex j-center w-100">
    <Search @search="redirect" @selected="getDestinations()"/>
  </div>
  <section class="w-100 mt-5">
    <div class="section-div d-flex f-col a-center">
      <div class="section-header" v-if="sta_name">
        <span class="section-title">Popular destinations in {{sta_name}}</span>
        <span class="section-desc">Here are some popular destinations to explore</span>
      </div>
      <div class="d-flex a-center j-center f-wrap mt-1">
        <div class="card" v-for="d in destinations" :key="d.des_id">
          <div class="card-img">
            <img :src="d.images[0].image_url" alt="" v-if="d.images">
          </div>
          <label class="card-label">{{d.des_name}}</label>
        </div>
      </div>
    </div>
  </section>
</div>
</template>

<script>
import Search from '../components/Search-Component.vue'
import service from '../services/API'

export default {
  name: 'HomeView',
  components: {
    Search
  },
  computed: {
  },
  mounted(){
    if(localStorage.getItem('sta_id')){
      this.getDestinations()
    }
    this.sta_name = localStorage.getItem('sta_name')
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
    },
    redirect(){
      this.$router.push({name: "hotels"}) 
    },
  }
}
</script>

<style>
  .home-bg{
    position: absolute;
    top: -20.5rem;
    z-index: -1;
    height: 100%;
    width: 100%;
    object-fit: cover;
    filter: brightness(0.7);
    border-radius: 80px;
  }
  .margin{
    margin-top: 20rem;
  }
  .home-title{
    color: white;
    text-shadow: 0 0 10px black;
    font-size: 3rem;
  }
</style>