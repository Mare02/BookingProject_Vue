<template>
  <div class="filters shadow">
    <img class="filters-close-btn" src="https://cdn.icon-icons.com/icons2/1674/PNG/512/close_111152.png" alt="" @click="emitShowFilters()">
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
          <div class="submit-btn">
            <button class="search-btn" @click="emitFilters()"
            >Submit</button>
          </div>
          <div class="border-b w-100"></div>
          <div class="mt-1">
            <label class="filter-label">Features</label>
          </div>
          <div class="features-div">
            <div class="features-item" v-for="fea in featuresDb" :key="fea.fea_id">
              <input type="checkbox" class="checkbox" :value="fea.fea_id" @change="getCheckedFeatures()">
              <label>{{fea.fea_name}}</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import service from '../services/API'

  export default{
    props: [],
    data(){
      return{
        filters: {
          start_price: null,
          end_price: null,
          featuresArr: []
        },
        featuresDb: [],
      }
    },
    mounted(){
      this.getFeatures()
    },
    methods: {
      getCheckedFeatures(){
        this.filters.featuresArr = []
        let values = document.querySelectorAll('.checkbox:checked')
        for(let val in values){
          if(values[val].value !== null && values[val].value !== undefined){
            this.filters.featuresArr.push(Number(values[val].value))
          }        
        }
        this.emitFilters()
      },
      async getFeatures(){
        let res = await service.getFeatures()
        this.featuresDb = res
      },
      emitFilters(){
        this.$emit('filters_emit', {'filters_arr': this.filters.featuresArr,
                                    'start_price': this.filters.start_price, 'end_price': this.filters.end_price})
      },
      emitShowFilters(){
        this.$emit('emitShowFilters')
      }
    }
  }
</script>

<style>
  
</style>