<template>
  <div class="filters-mobile" v-if="filters_responsive && showFiltersComp">
    <Filters @filters_emit="getEmitFilters" @emitShowFilters="showFilters()"/>
  </div>
  <div class="section-div mt-nav">
    <div class="sec-white shadow bg-des" :style="{backgroundImage: `url(${bg_des})`}">
      <div class="d-flex j-center w-100 mt-3 mb-3">
        <Search @search="getHotels()"/>
      </div>
    </div>
  </div>
  <div class="filter-sort-div section-div">
    <div class="sec-white w-100 d-flex j-evenly shadow">
      <button class="filter-btn shadow" @click="showFilters()">Filters</button>
      <button class="sort-btn shadow">Sort by</button>    
    </div>
  </div>
  <div class="section-div d-flex mt-1 mb-2" id="hotels-view">
    <Filters @filters_emit="getEmitFilters" v-if="!filters_responsive"/>
    <div class="hot-list-container">
      <div class="sec-white p-0 d-flex j-center a-center shadow" v-if="pages > 0">
        <div class="page-span" v-for="page in pages" :key="page" :class="{pageSelected: page === selected_page + 1}" @click="selectPage(page - 1)">
          {{page}}
        </div>
      </div>
      <HotelsList class="mt-1" :hotels="hotels" @loaded='this.isLoadedList = true'/>
      <div class="sec-white p-0 d-flex j-center a-center shadow" v-if="pages > 0">
        <div class="page-span" v-for="page in pages" :key="page" :class="{pageSelected: page === selected_page + 1}" @click="selectPage(page - 1)">
          {{page}}
        </div>
      </div>
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
  computed: {
    hotels_length(){
      return this.hotels.length
    }
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
      pages: null,
      selected_page: 0,
      filters: {
        start_price: null,
        end_price: null,
        featuresArr: [],
      },
      isLoadedList: false,
      filters_responsive: false,
      showFiltersComp: false,

      bg_des: null
    }
  },
  methods:{
    async getHotels(){
      let res = await service.getHotels(localStorage.getItem('des_id'), 
                                        localStorage.getItem('check_in'), 
                                        localStorage.getItem('check_out'),
                                        this.filters.start_price || null,
                                        this.filters.end_price || null,
                                        JSON.stringify(this.filters.featuresArr) || null,
                                        null, this.selected_page)
      this.hotels = res.data
      this.pages = res.pages[0].pages
      this.bg_des = res.data[0].des_image
      localStorage.setItem('des_name', res.data[0].des_name)
      localStorage.setItem('sta_name', res.data[0].sta_name)
    },
    getEmitFilters(data){
      this.filters.start_price = data.start_price
      this.filters.end_price = data.end_price
      this.filters.featuresArr = data.filters_arr
      this.selected_page = 0;
      this.showFiltersComp = false
      this.getHotels()
    },
    showFilters(){
      this.showFiltersComp = !this.showFiltersComp
    },
    selectPage(value){
      this.selected_page = value
      this.getHotels()
    }
  },
}
</script>

<style>
  .bg-des{
    background-repeat: no-repeat;
    background-size: cover;
  }
  .page-span{
    padding: 0.3rem;
    border-radius: 5px;
    margin: 0.4rem;
    background-color: var(--btn-color-hover);
    width: 1rem;
    height: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 0.2s;
    color: white;
  }
  .pageSelected{
    background-color: var(--btn-color) !important;
  }
  .page-span:hover{
    background-color: var(--btn-color);
  }
</style>