<template>
  <div class="section-div d-flex j-center mt-5">
    <div class="filters">
      <Search :vertical="true" @data="redirectTo"/>
      <div class="filter-search-div">
        <div class="filters-title">
          <span class="title">Filters</span>
        </div>
        <div class="filters-content">
          <div class="filter-inputs-div">
            <label class="filter-label">Price:</label>
            <div class="d-flex j-center w-100">
              <div class="d-flex f-col a-center">
                <label>From:</label>
                <input class="price-input" type="number">
              </div>
              <div class="d-flex f-col a-center">
                <label>To:</label>
                <input class="price-input" type="number">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="hot-list-container">
      <HotelsList :hotels="hotels" :check_in="route_data.check_in" :check_out="route_data.check_out"/>
    </div>
  </div>
</template>
<script>
import service from '../services/API'
import HotelsList from '../components/HotelsList.vue'
import Search from '../components/Search-Component.vue'

export default{
  components:{
    HotelsList, Search
  },
  mounted(){
    this.route_data = JSON.parse(this.$route.params.data)
    this.getHotels(this.route_data.des_id, this.route_data.check_in, this.route_data.check_out)
  },
  data(){
    return{
      route_data: {},

      hotels: []
    }
  },
  methods:{
    async getHotels(des_id, check_in, check_out){
      let res = await service.getHotels(des_id, check_in, check_out)
      this.hotels = res
    },
    redirectTo(data){
      this.$router.push({name: "hotels", params: { data: JSON.stringify(data) }})
      this.getHotels(data.des_id, data.check_in, data.check_out)
    }
  },
}
</script>
<style>


</style>