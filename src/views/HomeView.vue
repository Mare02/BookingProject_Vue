<template>
<div class="home-container">
  <span class="home-title">Find your next stay</span>
  <Search/>
  <section class="w-100">
    <div class="section-div">
      <div class="section-header">
        <span class="section-title">Delve into the gems of Serbia</span>
        <span class="section-desc">Here are some popular destinations to explore</span>
      </div>
      <div class="d-flex f-wrap w-100">
        <div class="card" v-for="des in destinations" :key="des.des_id">
          <div class="card-img">
            <img :src="des.des_image_url" alt="" v-if="des.des_image_url">
            <img src="../assets/street-out-city-centre-paris-random-walk-making-shots-beautiful-houses-huge-135493410.jpg" alt="" v-else>
          </div>
          <span>{{des.des_name}}</span>
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
  mounted(){
    this.getDestinations()
  },
  data(){
    return{
      destinations: []
    }
  },
  methods:{
    async getDestinations(){
      let res = await service.getDestinationsById(1)
      this.destinations = res.data.data
    }
  }
}
</script>
