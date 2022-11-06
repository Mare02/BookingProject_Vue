<template>
  <div class="filters-mobile" v-if="filters_responsive && showFiltersComp">
    <Filters @filters_emit="getEmitFilters" @emitShowFilters="showFilters()"/>
  </div>
  <div class="d-flex j-center w-100 mt-3">
    <Search @search="getHotels()"/>
  </div>
  <div class="section-div d-flex j-center a-center f-wrap mt-2">
    <div class="tag-button d-flex a-center">
      <img src="../assets/icons8-tag-window-100.png" alt="">
      Family
    </div>
    <div class="tag-button">
      <img src="../assets/icons8-tag-window-100.png" alt="">
      Couple
    </div>
    <div class="tag-button">
      <img src="../assets/icons8-tag-window-100.png" alt="">
      Highest Rated
    </div>
    <div class="tag-button">
      <img src="../assets/icons8-tag-window-100.png" alt="">
      Luxury
    </div>
    <div class="tag-button">
      <img src="../assets/icons8-tag-window-100.png" alt="">
      Best Deals
    </div>
    <div class="tag-button">
      <img src="../assets/icons8-tag-window-100.png" alt="">
      Pet Friendly
    </div>
    <div class="tag-button">
      <img src="../assets/icons8-tag-window-100.png" alt="">
      Popular
    </div>
  </div>
  <div class="filter-sort-div">
    <button class="filter-btn" @click="showFilters()">Filters</button>
    <button class="sort-btn">Sort by</button>    
  </div>
  <div class="section-div d-flex j-center mt-2" id="hotels-view">
    <Filters @filters_emit="getEmitFilters" v-if="!filters_responsive"/>
    <div class="hot-list-container">
      <HotelsList :hotels="hotels" @loaded='this.isLoadedList = true'/>
    </div>
  </div>
</template>

<script>
import service from '../services/API'
import HotelsList from '../components/HotelsList.vue'
import Search from '../components/Search-Component.vue'
import Filters from '../components/Filters-Component.vue'

var x = window.matchMedia("(max-width: 850px)")

export default{
  components:{
    HotelsList, Search, Filters
  },
  mounted(){
    this.getHotels()
    if(x.matches){
      this.filters_responsive = true
    }
    window.addEventListener('resize', () => {
      if(x.matches){
        this.filters_responsive = true
      }
      else{
        this.filters_responsive = false
      }
    })
  },
  data(){
    return{
      hotels: [],
      featuresDb: [],
      filters: {
        start_price: null,
        end_price: null,
        featuresArr: []
      },
      isLoadedList: false,
      filters_responsive: false,
      showFiltersComp: false
    }
  },
  methods:{
    async getHotels(){
      let res = await service.getHotels(localStorage.getItem('des_id'), 
                                        localStorage.getItem('check_in'), 
                                        localStorage.getItem('check_out'),
                                        this.filters.start_price || null,
                                        this.filters.end_price || null,
                                        JSON.stringify(this.filters.featuresArr.toString().replace("[", "").replace("]", "")) || null,
                                        null)
      this.hotels = res
      localStorage.setItem('des_name', res[0].des_name)
      localStorage.setItem('sta_name', res[0].sta_name)
    },
    getCheckedFeatures(){
      this.filters.featuresArr = []
      let values = document.querySelectorAll('.checkbox:checked')
      for(let val in values){
        if(values[val].value !== null && values[val].value !== undefined){
          this.filters.featuresArr.push(Number(values[val].value))
        }        
      }
      this.getHotels()
    },
    getEmitFilters(data){
      this.filters.start_price = data.start_price
      this.filters.end_price = data.end_price
      this.filters.featuresArr = data.filters_arr
      this.getHotels()
    },
    showFilters(){
      this.showFiltersComp = !this.showFiltersComp
    }
  },
}
</script>

<style>

</style>