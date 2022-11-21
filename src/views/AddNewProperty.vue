<template>
  <div class="d-flex f-col j-center a-center w-100 h-100">
    <img class="bg-img" src="https://img1.10bestmedia.com/Images/Photos/378649/Park-Hyatt-New-York-Manhattan-Sky-Suite-Master-Bedroom-low-res_54_990x660.jpg" alt="">
    <div class="section-div d-flex f-col j-center sec-white shadow">
      <div class="mb-1 bg-nav p-05 border-radius-10 white a-self-start" v-if="hotel_input_data.type && step !== 0">
        <span class="step-info">Step {{step}} of {{total_steps}}</span>
      </div>
      
      <section v-if="step === 0" id="step-section">
        <h2>What is the type of your property?</h2>
        <div class="sec-white mt-1">
          <div class="d-flex a-center j-evenly">
            <div class="d-flex f-col a-center sec-white type-item c-pointer m-1" v-for="typ in prop_types" :key="typ.typ_id"
                                                                                :class="{'selected-typ': typ.typ_id === property_type_id}"
                                                                                @click="{property_type_id = typ.typ_id; this.getSubtypes()}">
              <img class="type-img" :src="typ.typ_image" alt="">
              <span class="price mt-1">{{typ.typ_name}}</span>
              <span class="span-small">{{typ.typ_desc}}</span>
            </div>
          </div>
          <div class="sec-white d-flex f-col" v-if="property_type_id">
            <label>Select property subtype</label>
            <select class="select" v-model="hotel_input_data.type">
              <option v-for="(sut, index) in prop_subtypes" :key="index" :value="sut.sut_id">{{sut.sut_name}}</option>
            </select>
          </div>
        </div>
      </section>

      <section v-if="step === 1" id="step-section">
        <div v-if="hotel_data_mode !== 'existing'">
          <h2>Where is your property located?</h2>
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
        <h2>Tells us more about your property.</h2>
        <div class="sec-white mt-1">
          <div class="inputs-wrapper">
            <div class="d-flex f-col w-100">
              <label>Property name:</label>
              <input type="text" spellcheck="false" v-model="hotel_input_data.name">
            </div>
            <div class="d-flex f-col w-100 mt-1" v-if="property_type_id === 1">
              <label>Stars (optional):</label>
              <input type="number" v-model="hotel_input_data.hotel_stars">
            </div>
            <div class="d-flex f-col w-100 mt-1" v-if="property_type_id !== 1">
              <label>Property size (sq m):</label>
              <input type="number" v-model="hotel_input_data.size">
            </div>
            <div class="d-flex f-col w-100 mt-1" v-if="property_type_id !== 1">
              <label>Price per night (RSD):</label>
              <input type="number" v-model="hotel_input_data.price">
            </div>
            <div class="d-flex f-col w-100 mt-1">
              <label>Property features</label>
              <VueMultiselect class="border-gray c-pointer"
                v-model="hotel_input_data.hotel_features_selected"
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
              <label>Short description:</label>
              <textarea name="" id="" cols="30" rows="3" v-model="hotel_input_data.description"></textarea>
            </div>
            <div class="d-flex f-col w-100 mt-1">
              <label>Long description:</label>
              <textarea name="" id="" cols="30" rows="5" v-model="hotel_input_data.description_long"></textarea>
            </div>
          </div>
        </div>
      </section>

      <section v-if="step === 3" id="step-section">
        <h2>Add images so others can see your property.</h2>
        <div class="sec-white mt-1">
          <div class="inputs-wrapper">
            <div class="d-flex f-col w-100">
              <input type="file" multiple @change="getImages">
            </div>
          </div>
        </div>
        <div class="sec-white shadow mt-1 d-flex a-center j-center" v-if="url_arr.length > 0">
          <grid-images style="width: 30rem; height: 20rem" :items="url_arr" :cells="3"/>
        </div>
      </section>

      <section v-if="step === 4 && property_type_id === 1" id="step-section">
        <h2>Add apartment details.</h2>
        <div class="sec-white mt-1">
          <div class="inputs-wrapper">
            <div class="d-flex f-col w-100">
              <label>Apartment category:</label>
              <select class="select" v-model="apa_input_data.apa_category">
                <option v-for="cat in apa_categories" :key="cat.cat_id" :value="cat.cat_id">{{cat.cat_name}}</option>
              </select>
            </div>
            <div class="d-flex f-col w-100 mt-1">
              <label>Number of units:</label>
              <input type="number" spellcheck="false" v-model="apa_input_data.number_of_units">
            </div>
            <div class="d-flex f-col w-100 mt-1">
              <label>Select features:</label>
              <VueMultiselect class="border-gray c-pointer"
                v-model="apa_input_data.apa_features_selected"
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
              <input type="number" spellcheck="false" v-model="apa_input_data.apa_price">
            </div>
            <div class="d-flex f-col w-100 mt-1">
              <label>Apartment size (square meters):</label>
              <input type="number" spellcheck="false" v-model="apa_input_data.apa_size">
            </div>
            <div class="d-flex f-col w-100 mt-1">
              <label>Choose a picture:</label>
              <input type="file" @change="getApaImage">
            </div>
          </div>
        </div>
        <div class="d-flex w-100 a-center j-center g-1">
          <button class="search-btn" @click="addNewApartment()">Add apartment</button>
        </div>
      </section>
      
    </div>
    <div class="d-flex a-center g-1 mt-3">
      <div class="back-btn shadow border-light" v-if="step > 0" @click="step--">
        <img src="../assets/icons/back-icon.png" alt="">
      </div>
      <button 
        class="continue-btn border-light shadow"  
        :class="{'disabled': !hotel_input_data.type}"
        v-if="step !== total_steps" 
        @click="step++">Continue
      </button>
      <button class="continue-btn border-light shadow" v-if="step === total_steps" @click="addNewHotel()">Finish</button>
    </div>
  </div>
</template>

<script>
import service from '../services/API'
import VueMultiselect from 'vue-multiselect'
import {useToast } from "vue-toastification";
import {POSITION} from "vue-toastification";

export default {
  computed:{
  },
  components:{ VueMultiselect },
  mounted(){
    this.getTypes()
    this.getCategories()
    this.getFeatures()
  },
  watch:{
    property_type_id(){
      if(this.property_type_id !== 1){
        this.total_steps = 3
      }
      else{
        this.total_steps = 4
      }
    }
  },
  data(){
    return{
      total_steps: 4,
      step: 0,

      isHotelAdded: false,

      property_type_id: null,

      prop_types: [],
      map_resources: [],
      apa_categories: [],
      apa_features: [],
      prop_subtypes: [],
      hotel_images: [],
      url_arr: [],
      hotel_data_mode: 'new',

      hotel_input_data: {
        size: null,
        price: null,
        type: null,
        name: "",
        description: "",
        description_long: "",
        hotel_features_selected: [],
        hotel_stars: null,
      },

      apa_input_data: {
        apa_category: null,
        apa_features_selected: [],
        number_of_units: null,
        apa_price: null,
        apa_size: null,
        apa_image: null,
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
    async getSubtypes(){
      let res = await service.getSubtypes(this.property_type_id)
      console.log(this.property_type_id);
      this.prop_subtypes = res.data.data
    },
    async getFeatures(){
      let res = await service.getHotelFeatures()
      this.apa_features = res
    },
    async getCategories(){
      let res = await service.getCategories()
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
        this.hotel_images.push(file)
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.addEventListener('load', () => {
          this.url_arr.push(reader.result)
        })
      }
    },
    getApaImage(e){
      this.apa_input_data.apa_image = e.target.files[0]
    },

    async addNewHotel(){
      let hotel_params = {
        "hot_name": this.hotel_input_data.name,
        "state_name": this.selected_address.state,
        "des_name": this.selected_address.destination,
        "street": this.selected_address.street,
        "hot_description": this.hotel_input_data.description,
        "hot_description_long": this.hotel_input_data.description_long,
        "hot_stars": this.hotel_input_data.hotel_stars,
        "hot_map_lat": this.selected_coord.lat,
        "hot_map_lng": this.selected_coord.lng,
        "type_id": this.hotel_input_data.type,
        "size": this.hotel_input_data.size,
        "price": this.hotel_input_data.price,
      }
      let formdata = new FormData()
      for(let index in hotel_params){
        if(index !== 'hot_stars' && index !== 'size' && index !== 'price'){
          if(hotel_params[index] === null || hotel_params[index] === '' || hotel_params[index] === []){
            const toast = useToast()
            toast.warning(`You didn't fill required inputs!`, {position: POSITION.TOP_CENTER})
            console.log('greska unosa hotela');
            return
          }
        }
        formdata.append([index], hotel_params[index])
      }
      for(let file of this.hotel_images){
        formdata.append('hotel_files', file)
      }
      let hot_features = this.hotel_input_data.hotel_features_selected
      for(let el of hot_features){
        formdata.append('hotel_features', JSON.stringify(el))
      }

      let added_hotel_res = await service.addNewHotel(formdata)
      if(added_hotel_res.status === 200){
        this.isHotelAdded = true
        localStorage.setItem('new_hot_id', added_hotel_res.data.new_hot_id)
        const toast = useToast()
        toast.success('Hotel added successfuly!', {position: POSITION.TOP_CENTER})
      }
    },

    async addNewApartment(){
      if(!this.isHotelAdded){
        await this.addNewHotel()
      }
      console.log(localStorage.getItem('new_hot_id'));
      let apa_params = {
        "apa_cat_id": this.apa_input_data.apa_category,
        "apa_price": this.apa_input_data.apa_price,
        "apa_size": this.apa_input_data.apa_size,
        "apa_hot_id": parseInt(localStorage.getItem('new_hot_id')),
        "num_of_units": this.apa_input_data.number_of_units
      }
      
      let formdata = new FormData()
      for(let index in apa_params){
        // if(apa_params[index] === null || apa_params[index] === '' || apa_params[index] === []){
        //   console.log('greska unosa apartmana');
        //   const toast = useToast()
        //   toast.warning(`You didn't fill required inputs!`, {position: POSITION.TOP_CENTER})
        //   return
        // }
        formdata.append([index], apa_params[index])
      }
      
      let apa_features = this.apa_input_data.apa_features_selected
      for(let el of apa_features){
        formdata.append('apa_features', JSON.stringify(el))
      }
      formdata.append('apa_file', this.apa_input_data.apa_image)

      let res = await service.addNewApartment(formdata)
      if(res.status === 200){
        for(let el in this.apa_input_data){
        this.apa_input_data[el] = null
        }
        this.apa_input_data.apa_image = null

        const toast = useToast()
        toast.success('Apartment added successfuly!', {position: POSITION.TOP_CENTER})
      }
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
  width: 13rem;
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