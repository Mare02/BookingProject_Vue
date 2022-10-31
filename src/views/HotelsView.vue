<template>
  <div class="section-div d-flex j-center mt-5">
    <div class="filters">
      <Search :vertical="true" @search="redirectTo" v-if="isLoadedList"/>
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
                <input class="price-input" type="number" v-model="filters.start_price">
              </div>
              <div class="d-flex f-col a-center">
                <label>To:</label>
                <input class="price-input" type="number" v-model="filters.end_price"> 
              </div>
            </div>
            <div class="mt-2">
              <button class="search-btn" @click="getHotels(filters.start_price, filters.end_price)"
              >Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="hot-list-container">
      <HotelsList :hotels="hotels" @loaded='this.isLoadedList = true'/>
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
    this.getHotels()
  },
  data(){
    return{
      hotels: [],
      filters: {
        start_price: null,
        end_price: null,
        isLoadedList: false
      }
    }
  },
  methods:{
    async getHotels(){
      let res = await service.getHotels(localStorage.getItem('des_id'), 
                                        localStorage.getItem('check_in') || null, 
                                        localStorage.getItem('check_out') || null,
                                        this.filters.start_price || null,
                                        this.filters.end_price || null)
      this.hotels = res
      console.log(res);
      localStorage.setItem('des_name', res[0].des_name)
      localStorage.setItem('sta_name', res[0].sta_name)
    },
    redirectTo(){
      this.getHotels()
    },
  },
}
</script>
<style>


</style>