<template>
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
  </div>
  <div class="section-div d-flex j-center mt-2" id="hotels-view">
    <div class="slider-menu" id="slider">
      <div class="filters">
        <Search :vertical="true" @search="getHotels()" v-if="false"/>
        <div class="filter-search-div">
          <div class="filters-title">
            <span class="title">Filters</span>
          </div>
          <div class="filters-content">
            <div class="filter-inputs-div border-b">
              <label class="filter-label">Price:</label>
              <div class="d-flex j-center w-100 border-b">
                <div class="d-flex f-col a-center">
                  <label>From:</label>
                  <input class="price-input" type="number" v-model="filters.start_price">
                </div>
                <div class="d-flex f-col a-center">
                  <label>To:</label>
                  <input class="price-input" type="number" v-model="filters.end_price"> 
                </div>
              </div>
              <div class="mt-1">
                <label class="filter-label">Features</label>
              </div>
              <div class="features-div">
                <div class="features-item" v-for="fea in featuresDb" :key="fea.fea_id">
                  <input type="checkbox" class="checkbox" :value="fea.fea_id" @change="getCheckedFeatures()">
                  <label>{{fea.fea_name}}</label>
                </div>
              </div>
              <div class="mt-1">
                <button class="search-btn" @click="getHotels(filters.start_price, filters.end_price)"
                >Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="hot-list-container">
      <HotelsList :hotels="hotels" @loaded='this.isLoadedList = true'/>
    </div>
    <button @click="showSlider()">SHOW MENU</button>
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
    this.getFeatures()
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
    }
  },
  methods:{
    async getHotels(){
      let res = await service.getHotels(localStorage.getItem('des_id'), 
                                        localStorage.getItem('check_in') || null, 
                                        localStorage.getItem('check_out') || null,
                                        this.filters.start_price || null,
                                        this.filters.end_price || null,
                                        JSON.stringify(this.filters.featuresArr.toString().replace("[", "").replace("]", "")))
      this.hotels = res
      console.log(res);
      localStorage.setItem('des_name', res[0].des_name)
      localStorage.setItem('sta_name', res[0].sta_name)
    },
    async getFeatures(){
      let res = await service.getFeatures()
      this.featuresDb = res
    },
    getCheckedFeatures(){
      this.filters.featuresArr = []
      let values = document.querySelectorAll('.checkbox:checked')
      for(let val in values){
        if(values[val].value !== null && values[val].value !== undefined){
          this.filters.featuresArr.push(Number(values[val].value))
        }        
      }
      console.log(this.filters.featuresArr);
      this.getHotels()
    },
    showSlider(){
      let el = document.getElementById('slider')
      el.style.transform = "translateX(0rem)"
    }
  },
}
</script>
<style>
.tag-button{
  padding: 0.5rem;
  margin: 0.5rem;
  cursor: pointer;
  color: gray;
  display: flex;
  align-items: center;
  transition: all 0.2s;
  border: 2px solid lightgray;
  border-radius: 10px;
  background-color: white;
}
.tag-button img{
  width: 1.5rem;
  margin-right: 0.5rem;
}
.tag-button:hover{
  background-color: rgb(110, 109, 175);
  color: white;
  border: 2px solid rgb(187, 187, 152);
}

.features-div{
  margin-top: 1rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 1rem;
}
.features-item{
  display: flex;
  align-items: center;
  margin: 0.5rem;
}
.features-item input{
  width: 1.3rem;
  margin-right: 0.5rem;
  cursor: pointer;
  box-shadow: 0 0 3px 1px wheat;
}
</style>