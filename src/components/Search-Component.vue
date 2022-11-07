<template>
  <div :class="{'searchComp-div': !vertical, 'searchComp-div-ver': vertical}">
    <div class="searchComp-section" id="des-input-section">
      <label>Destination:</label>
      <div class="rel">
        <input type="text" v-model="search" @input="searchDestinations()" id="des-input" autocomplete="off" placeholder="Search">
        <img src="../assets/icons/free-location-pointer-icon-2961-thumb.png" class="des-icon-abs" alt="">
      </div>
      <ul class="search-dropdown" id="dropdown" v-if="arrLength > 0" :class="{'dropdownReactive': arrLength <= 5, 'dropdownMin': arrLength > 5}">
        <li v-for="des in destinations" :key="des.des_id" class="d-flex a-center" @click="selectDestination(des.des_id, des.des_name, des.sta_name, des.des_sta_id)">
          <img src="../assets/icons/free-location-pointer-icon-2961-thumb.png" alt="" class="des-icon">
          <div class="loc-name">
            <span>{{des.des_name}}</span>
            <span class="state">{{des.sta_name}}</span>
          </div>
        </li>
      </ul>
    </div>
    <div id="dates-div">
      <div class="dates-sec">
        <div class="searchComp-section" id="date-div-margin">
          <label>Check in:</label>
          <input type="date" v-model="checkInDate" id="date-input">
        </div>
        <div class="searchComp-section">
          <label>Check out:</label>
          <input type="date" v-model="checkOutDate" id="date-input">
        </div>
      </div>
      <div class="searchComp-section" id="search-sec">
        <button @click="emitData()" class="search-btn">Search</button>
      </div>
    </div>
  </div>
</template>
<script>
  import service from '../services/API'
  
  export default{
    props:['vertical'],
    mounted(){
      document.addEventListener('click', (event) => {
        if(event.target.id != 'des-input' && event.target.id != 'dropdown'){
          this.closeDropdown()
        }
      })
      if(localStorage.getItem('des_name')){
        this.selectDestination(localStorage.getItem('des_id'), localStorage.getItem('des_name'), 
                              localStorage.getItem('sta_name'), localStorage.getItem('sta_id'))
        if(localStorage.getItem('check_in') && localStorage.getItem('check_out')){
          this.checkInDate = localStorage.getItem('check_in')
          this.checkOutDate = localStorage.getItem('check_out')
        }
      }
    },
    data(){
      return{
        search: '',
        destination_id: '',
        checkInDate: null,
        checkOutDate: null,
        destinations: [],
        arrLength: null
      }
    },
    methods:{
      async searchDestinations(){
        if(this.search !== ''){
          const res = await service.searchDestinations(this.search.trim())
          this.destinations = res.data.data
          this.arrLength = this.destinations.length
        }
        else{
          this.destinations = []
          this.arrLength = this.destinations.length
        }
      },
      selectDestination(id, des_name, sta_name, sta_id){
        localStorage.setItem('sta_id', sta_id)
        this.destination_id = id
        this.search = `${des_name}, ${sta_name}`
        this.$emit('selected')
      },
      closeDropdown(){
        this.destinations = []
        this.arrLength = this.destinations.length
      },
      emitData(){
        if(this.checkInDate){
          localStorage.setItem('check_in', this.checkInDate)
        }
        if(this.checkOutDate){
          localStorage.setItem('check_out', this.checkOutDate)
        }        
        localStorage.setItem('des_id', this.destination_id)
        this.$emit('search')
      }
    }
  }
</script>

<style scoped>
.dropdownMin{
  min-height: calc(5 * 3.5rem);
}
.dropdownReactive{
  min-height: calc(v-bind('arrLength') * 3.5rem);
  overflow-y: visible;
}
</style>