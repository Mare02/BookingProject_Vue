<template>
<div class="home-container">
  <span class="home-title">Find your next stay</span>
  <Search @data="redirectTo"/>
  <section class="w-100 mt-5">
    <div class="section-div">
      <div class="section-header">
        <span class="section-title">Delve into the gems of Serbia</span>
        <span class="section-desc">Here are some popular destinations to explore</span>
      </div>
      <div class="d-flex f-wrap w-100">
        <div class="card c-pointer" v-for="des in destinations" :key="des.des_id">
          <a class="card-img"  v-if="des.images" href="#">
            <img v-for="img in des.images" :key="img.file_id" :src="img.image_url" alt="">
          </a>
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
    },
    redirectTo(data){
      this.$router.push({name: "apartments", params: { data: JSON.stringify(data) }})
    }
  }
}
</script>
