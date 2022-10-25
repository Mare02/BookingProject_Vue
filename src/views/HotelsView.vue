<template>
  <div class="section-div d-flex j-center mt-5">
    <div class="filters">
      <div class="filter-search-div">
        <div class="filter-search-div-sec">
          <label>Destination:</label>
          <input type="text" id="search-input">
        </div>
        <div class="filter-search-div-sec">
          <label>Check in:</label>
          <input type="date">
        </div>
        <div class="filter-search-div-sec">
          <label>Check out:</label>
          <input type="date">
        </div>
        <div class="filter-search-div-sec">
          <button class="search-btn">Search</button>
        </div>
      </div>
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

export default{
  components:{
    HotelsList,
  },
  created(){
    console.log(this.$route);
  },
  mounted(){
    this.route_data = JSON.parse(this.$route.params.data)
    this.getHotels()
    console.log(this.$route);
  },
  data(){
    return{
      route_data: {},

      hotels: []
    }
  },
  methods:{
    async getHotels(){
      let res = await service.getHotels(this.route_data.des_id)
      console.log(res);
      this.hotels = res
    }
  }
}
</script>
<style>


</style>