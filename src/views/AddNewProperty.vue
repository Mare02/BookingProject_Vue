<template>
  <div class="d-flex f-col j-center a-center w-100 h-100">
    <img class="bg-img" src="https://img1.10bestmedia.com/Images/Photos/378649/Park-Hyatt-New-York-Manhattan-Sky-Suite-Master-Bedroom-low-res_54_990x660.jpg" alt="">
    <div class="section-div d-flex f-col j-center sec-white shadow">
      <div class="mb-1 bg-nav p-05 border-radius-10 white a-self-start" v-if="input_data.type && step !== 0">
        <span class="step-info">Step {{step}} of {{total_steps}}</span>
      </div>
      
      <section v-if="step === 0" id="step-section">
        <h2>What is the type of your property?</h2>
        <div class="sec-white mt-1">
          <div class="d-flex a-center j-evenly">
            <div class="d-flex f-col a-center sec-white type-item c-pointer m-1" v-for="typ in prop_types" :key="typ.typ_id"
                                                                                :class="{'selected-typ': typ.typ_id === input_data.type}">
              <img class="type-img" :src="typ.typ_image" alt="" @click="input_data.type = typ.typ_id">
              <span class="section-desc">{{typ.typ_name}}</span>
            </div>
          </div>
          <!-- <div class="sec-white d-flex j-center a-center g-1" v-if="property_type == 'hotel'">
            <select name="" id="" class="select" v-model="hotel_data_mode">
              <option value="new">Add new hotel</option>
              <option value="existing">Add apartments to existing hotel</option>
            </select>
          </div> -->
        </div>
      </section>
      
      <section v-if="step === 1">

      </section>

      <section v-if="step === 1" id="step-section">
        <div v-if="hotel_data_mode !== 'existing'">
          <h2>Where is your {{property_type}} located?</h2>
          <span class="section-desc">Please enter the full address</span>
          <div class="sec-white mt-1">
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
        </div>
        
      </section>

      <section v-if="step === 2" id="step-section">
        <h2>Tells us more about your {{property_type}}.</h2>
        <div class="sec-white mt-1">
          <div class="inputs-wrapper">
            <div class="d-flex f-col w-100">
              <label>Property name:</label>
              <input type="text" spellcheck="false" v-model="input_data.name">
            </div>
            <div class="d-flex f-col w-100 mt-1">
              <label>Short description:</label>
              <textarea name="" id="" cols="30" rows="5" v-model="input_data.description"></textarea>
            </div>
            <div class="d-flex f-col w-100 mt-1">
              <label>Long description:</label>
              <textarea name="" id="" cols="30" rows="10" v-model="input_data.description_long"></textarea>
            </div>
          </div>
        </div>
      </section>

      <section v-if="step === 3" id="step-section">
        <h2>Add image so others can see your {{property_type}}.</h2>
        <div class="sec-white mt-1">
          <div class="inputs-wrapper">
            <div class="d-flex f-col w-100">
              <label>Image:</label>
              <input type="file" multiple @change="getImages">
            </div>
          </div>
        </div>
        <div class="sec-white shadow mt-1 d-flex a-center j-center" v-if="url_arr.length > 0">
          <grid-images style="width: 30rem; height: 20rem" :items="url_arr" :cells="3"/>
        </div>
      </section>

      <section v-if="step === 4" id="step-section">
        <h2>Add your hotel's apartment details.</h2>
        <div class="sec-white mt-1">
          <div class="inputs-wrapper">
            <div class="d-flex f-col w-100">
              <label>Apartment category:</label>
              <select class="select" v-model="input_data.apa_category">
                <option v-for="cat in apa_categories" :key="cat.cat_id" :value="cat.cat_id">{{cat.cat_name}}</option>
              </select>
            </div>
            <div class="d-flex f-col w-100 mt-1">
              <label>Number of units:</label>
              <input type="number" spellcheck="false" v-model="input_data.number_of_units">
            </div>
            <div class="d-flex f-col w-100 mt-1">
              <label>Select features:</label>
              <VueMultiselect class="border-gray c-pointer"
                v-model="input_data.apa_features_selected"
                :options="apa_features"
                :multiple="true"
                :searchable="false"
                :show-labels="true"
                :close-on-select="false"
                label="fea_name"
                track-by="fea_name"
                placeholder="Select">
              </VueMultiselect>
            </div>
            <div class="d-flex f-col w-100 mt-1">
              <label>Price per night (RSD):</label>
              <input type="number" spellcheck="false" v-model="input_data.apa_price">
            </div>
            <div class="d-flex f-col w-100 mt-1">
              <label>Apartment size (square meters):</label>
              <input type="number" spellcheck="false" v-model="input_data.apa_size">
            </div>
            <div class="d-flex f-col w-100 mt-1">
              <label>Choose a picture:</label>
              <input type="file" multiple @change="getApaImage">
            </div>
          </div>
        </div>
      </section>
    </div>
    <div class="d-flex a-center g-1 mt-3">
      <div class="back-btn shadow border-light" v-if="step > 0" @click="previousStep()">
        <img src="../assets/icons/back-icon.png" alt="">
      </div>
      <button 
        class="continue-btn border-light shadow"  
        v-if="step !== total_steps" 
        @click="nextStep()">Continue
      </button>
    </div>
  </div>
</template>

<script>
import service from '../services/API'
import VueMultiselect from 'vue-multiselect'

export default {
  computed:{
    property_type(){
      if(this.input_data.type === 1) return 'hotel'
      else return 'apartment'
    },
  },
  components:{ VueMultiselect },
  mounted(){
    this.getTypes()
    this.getCategories()
    this.getFeatures()
  },
  watch:{
    hotel_data_mode(){
      if(this.hotel_data_mode === 'existing') this.total_steps = 4
      else this.total_steps = 5
    }
  },
  data(){
    return{
      total_steps: 4,
      step: 0,

      prop_types: [],
      map_resources: [],
      apa_categories: [],
      apa_features: [],
      input_images: [],
      url_arr: [],
      hotel_data_mode: 'new',

      input_data: {
        type: null,
        apa_category: null,
        apa_features_selected: [],
        number_of_units: null,
        apa_price: null,
        apa_size: null,
        name: "",
        description: "",
        description_long: "",
        image: null,
        list_of_apartments:[]
      },
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
    async getFeatures(){
      let res = await service.getHotelFeatures()
      this.apa_features = res
    },
    async getCategories(){
      let res = await service.getCategories()
      console.log(res);
      this.apa_categories = res
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
      for(let file of e.target.files){
        this.input_images.push(file)
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.addEventListener('load', () => {
          this.url_arr.push(reader.result)
        })
      }
      console.log(this.url_arr);
    },
    getApaImage(e){
      this.input_data.image = e.target.files[0]
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

<style src="vue-multiselect/dist/vue-multiselect.css"></style>
<style> 
.back-btn img{
  width: 1.1rem;
  filter: invert();
}
.back-btn{
  cursor: pointer;
  background-color: var(--btn-color);
  border-radius: 5px;
  padding: .5rem 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all .2s;
}
.continue-btn{
  background-color: var(--btn-color);
  border-radius: 5px;
  padding: 0.83rem 2rem; 
  color: white;
  font-size: 1.05rem;
  cursor: pointer;
  transition: all .2s;
}
.continue-btn:hover, .back-btn:hover{
  background-color: var(--link-color);
}
.select{
  width: 100%;
  padding: .3rem;
  font-size: 1.1rem;
  cursor: pointer;
  height: 2.5rem;
  border-radius: 5px;
}
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
  opacity: 0.9;
  margin-bottom: 1rem;
}

</style>