<template>
  <div class="d-flex f-col j-center a-center w-100 h-100">
    <div class="section-div d-flex f-col j-center">
      <span class="step-info">Step {{step}} of {{totalSteps}}</span>
      <section v-if="step === 1">
        <h2>Where is your property located?</h2>
        <span class="section-desc">Please enter the full address</span>
        <div class="sec-white shadow mt-1">
          <div class="inputs-wrapper">
            <div class="d-flex f-col w-100 p-rel">
              <label>Location:</label>
              <input type="text" v-model="location_query" @input="getLocations()">
              <div class="loc-dropdown shadow d-flex f-col" v-if="map_resources.length > 0">
                <div class="loc-item" v-for="res in map_resources" :key="res" @click="selectAddress(res, res.point.coordinates)">
                  <span class="section-desc" v-if="res.address.addressLine">{{res.address.addressLine}}</span>
                  <span class="section-desc" v-else>{{res.address.formattedAddress}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <iframe class="adding-new-map shadow mt-2" v-if="selected_coord.lat && selected_coord.lng"
          frameborder="0" 
          scrolling="yes" 
          marginheight="0" 
          marginwidth="0" 
          :src="'https://maps.google.com/maps?q='+selected_coord.lat+','+selected_coord.lng+'&hl=en&z=14&z=17&amp;output=embed'">
        </iframe>
      </section>

      <section class="sec-white shadow-center" v-if="step === 2">
        <div class="inputs-wrapper">
          <div class="d-flex f-col w-100">
            <label>Property name:</label>
            <input type="text">
          </div>
        </div>
      </section>

      <section class="sec-white shadow" v-if="step === 3">
        
      </section>

      <section class="sec-white shadow" v-if="step === 4">
        
      </section>
    </div>
    <div class="d-flex a-center g-1 mt-5">
      <button class="search-btn " v-if="step !== 1" @click="previousStep()">Previous step</button>
      <button 
        class="search-btn" 
        :class="{'disabled': false}" v-if="step !== totalSteps" 
        @click="nextStep()">Continue
      </button>
    </div>
  </div>
</template>

<script>
import service from '../services/API'
export default {
  computed:{

  },
  mounted(){
    this.getTypes()
  },
  data(){
    return{
      totalSteps: 4,
      step: 1,

      prop_types: [],
      input_data: {
        type: null,
      },
      map_resources: [],
      location_query: '',
      selected_address: {
        state: null,
        destination: null,
        street: null
      },
      selected_coord: {
        lat: null,
        lng: null
      }
    }
  },
  methods:{
    async getTypes(){
      let res = await service.getTypes()
      this.prop_types = res
    },
    async getLocations(){
      if(this.location_query.length > 1){
        let res = await service.getLocations(this.location_query)
        this.map_resources = res.data.resourceSets[0].resources
        console.log(res.data.resourceSets[0]);
      }
      else{
        this.map_resources = []
        return
      }
    },
    selectAddress(data, coord){
      console.log(data);
      console.log(coord);
      this.location_query = data.address.addressLine || data.name
      this.selected_address.destination = data.address.locality
      this.selected_address.state = data.address.countryRegion
      this.selected_address.street = data.address.addressLine
      this.selected_coord.lat = coord[0]
      this.selected_coord.lng = coord[1]
      this.map_resources = []
    },
    nextStep(){
      this.step ++
    },
    previousStep(){
      this.step --
    }
  }
}
</script>

<style> 
.loc-item{
  cursor: pointer;
  height: 2rem;
  transition: all .2s;
  padding: 0.5rem;
  border-radius: 5px;
  display: flex;
  align-items: center;
}
.loc-item:hover{
  background-color: rgb(212, 198, 230)
}
.loc-dropdown{
  background-color: white;
  border-radius: 10px;
  position: absolute;
  top: 4.7rem;
  left: 0;
  right: 0;
  max-height: 15rem;
  overflow-y: scroll;
  padding: 0.5rem;
  border: 2px solid lightgray;
}
.adding-new-map{
  width: 100%;
  height: 22rem;
  border-radius: 10px;
}
.step-info{
  font-size: 1.1rem;
  opacity: 0.7;
  margin-bottom: 1rem;
}
</style>