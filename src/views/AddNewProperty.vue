<template>
  <div class="d-flex f-col j-center a-center w-100 h-100">
    <!-- <img class="bg-img" src="https://wallpapercrafter.com/desktop/28050-interior-style-design-home-hotel-living-room-4k.jpg" alt=""> -->
    <div class="section-div d-flex f-col j-center">
      <span class="step-info">Step {{step}} of {{total_steps}}</span>
      
      <section v-if="step === 1">
        <h2>What is the type of your property?</h2>
        <div class="sec-white shadow mt-1">
          <div class="d-flex a-center j-evenly">
            <div class="d-flex f-col a-center sec-white type-item c-pointer m-1" v-for="typ in prop_types" :key="typ.typ_id"
                                                                                :class="{'selected-typ': typ.typ_id === input_data.type}">
              <img class="type-img" :src="typ.typ_image" alt="" @click="input_data.type = typ.typ_id">
              <span class="section-desc">{{typ.typ_name}}</span>
            </div>
          </div>
          <div class="sec-white">
            <div class="inputs-wrapper">
              <div class="d-flex f-col w-100">
                <label>Number of units:</label>
                <input type="number" spellcheck="false" v-model="input_data.number_of_units">
              </div>
            </div>
          </div>
        </div>
      </section>

      <section v-if="step === 2">
        <h2>Where is your {{property_type}} located?</h2>
        <span class="section-desc">Please enter the full address</span>
        <div class="sec-white shadow mt-1">
          <div class="inputs-wrapper">
            <div class="d-flex f-col w-100 p-rel">
              <label>Location:</label>
              <input type="text" spellcheck="false" v-model="location_query" @input="getLocations()">
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

      <section v-if="step === 3">
        <h2>Tells us more about your {{property_type}}.</h2>
        <div class="sec-white shadow mt-1">
          <div class="inputs-wrapper">
            <div class="d-flex f-col w-100">
              <label>Property name:</label>
              <input type="text" spellcheck="false" v-model="input_data.name">
            </div>
            <div class="d-flex f-col w-100 mt-1">
              <label>Short description:</label>
              <textarea name="" id="" cols="30" rows="5"></textarea>
            </div>
            <div class="d-flex f-col w-100 mt-1">
              <label>Long description:</label>
              <textarea name="" id="" cols="30" rows="10"></textarea>
            </div>
          </div>
        </div>
      </section>

      <section v-if="step === 4">
        <h2>Add image so others can see your {{property_type}}.</h2>
        <div class="sec-white shadow mt-1">
          <div class="inputs-wrapper">
            <div class="d-flex f-col w-100">
              <label>Image:</label>
              <input type="file" @change="getImages">
            </div>
          </div>
        </div>
        <div class="sec-white shadow mt-1 d-flex a-center j-center">
          <img src="" alt="preview" id="preview">
        </div>
      </section>

      <section class="sec-white shadow" v-if="step === 5">
      </section>
    </div>
    <div class="d-flex a-center g-1 mt-5">
      <button class="search-btn" v-if="step !== 1" @click="previousStep()">Back</button>
      <button 
        class="search-btn"  
        v-if="step !== total_steps" 
        @click="nextStep()">Continue
      </button>
    </div>
  </div>
</template>

<script>
import service from '../services/API'
export default {
  computed:{
    property_type(){
      if(this.input_data.type === 1) return 'hotel'
      else return 'apartment'
    }
  },
  mounted(){
    this.getTypes()
  },
  data(){
    return{
      total_steps: 5,
      step: 4,

      prop_types: [],
      input_data: {
        type: null,
        number_of_units: null,
        name: "",
        description: "",
        description_long: "",
        image: null
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
      if(this.location_query.length > 2){
        let res = await service.getLocations(this.location_query)
        this.map_resources = res.data.resourceSets[0].resources
      }
      else{
        this.map_resources = []
        return
      }
    },
    selectAddress(data, coord){
      this.location_query = data.address.addressLine || data.name
      this.selected_address.destination = data.address.locality
      this.selected_address.state = data.address.countryRegion
      this.selected_address.street = data.address.addressLine
      this.selected_coord.lat = coord[0]
      this.selected_coord.lng = coord[1]
      this.map_resources = []
    },
    getImages(e){
      let img = e.target.files[0]
      this.input_data.image = img
      const imgElem = document.getElementById('preview')
      
      const reader = new FileReader()
      reader.readAsDataURL(img)
      reader.addEventListener('load', () => {
        const img_url = reader.result
        imgElem.src = img_url
      })
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
#preview{
  width: 20rem;
}
.type-img{
  width: 15rem;
}
.type-item:hover{
  background-color: rgb(230, 222, 238);
}
.selected-typ{
  background-color: rgb(211, 200, 221);
}
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