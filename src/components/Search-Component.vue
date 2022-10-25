<template>
  <div class="searchComp-div">
    <div class="searchComp-section" id="text-input-sec">
      <label>Destination:</label>
      <input type="text" v-model="search" @input="searchDestinations()" id="des-input" autocomplete="off">
      <ul class="search-dropdown" id="dropdown" v-if="arrLength > 0" :class="{reactiveItems: arrLength <= 5, fiveItems: arrLength > 5}">
        <li v-for="des in destinations" :key="des.des_id" class="d-flex a-center" @click="selectDestination(des.des_id, des.des_name)">
          <img src="../assets/icons/free-location-pointer-icon-2961-thumb.png" alt="" class="des-icon">
          <div class="loc-name">
            <span>{{des.des_name}}</span>
            <span class="state">{{des.sta_name}}</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="searchComp-section">
      <label>Check in:</label>
      <input type="date" v-model="checkInDate" placeholder="date">
    </div>
    <div class="searchComp-section">
      <label>Check out:</label>
      <input type="date" v-model="checkOutDate">
    </div>
    <div class="searchComp-section" id="search-sec">
      <button @click="emitData()" class="search-btn">Search</button>
    </div>
  </div>
</template>
<script>
  import service from '../services/API'
  
  export default{
    props:[],
    mounted(){
      document.addEventListener('click', (event) => {
        if(event.target.id != 'des-input' && event.target.id != 'dropdown'){
          this.closeDropdown()
        }
      })
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
          console.log(this.arrLength);
        }
        else{
          this.destinations = []
          this.arrLength = this.destinations.length
          console.log(this.arrLength);
        }
      },
      selectDestination(id, name){
        this.destination_id = id
        this.search = name
      },
      closeDropdown(){
        this.destinations = []
        this.arrLength = this.destinations.length
      },
      emitData(){
        this.$emit('data', {des_id: this.destination_id, check_in: this.checkInDate, check_out: this.checkOutDate})
      }
    }
  }
</script>

<style scoped>
  .fiveItems{
    min-height: calc(5 * 3.5rem);
  }
  .reactiveItems{
    min-height: calc(v-bind('arrLength') * 3.5rem);
  }
</style>