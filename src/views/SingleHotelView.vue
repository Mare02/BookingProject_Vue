<template>
  <div class="d-flex f-col a-center">
    <div class="section-div">
      <div class="card-horizontal-header">
        <div class="d-flex j-center">  
          <span class="hotel-title">{{hotel.hot_name}}</span>
        </div>
      </div>
      <div class="gallery-loc-wrap">
        <div class="hotel-gallery">
          <Carousel class="carousel-big" :wrapAround="true" v-if="images">
            <Slide v-for="img in images" :key="img.file_id" class="carousel-slide">
              <div class="hot-card-img-big">
                <img :src="img.image_url" alt="">
              </div>
            </Slide>
            <template #addons>
              <Navigation v-if="images.length > 1"/>
            </template>
          </Carousel>
        </div>
        <iframe 
          width="400" 
          height="100%" 
          frameborder="0" 
          scrolling="yes" 
          marginheight="0" 
          marginwidth="0" 
          :src="'https://maps.google.com/maps?q='+lat+','+lng+'&hl=en&z=14&z=17&amp;output=embed'">
        </iframe>
      </div>
      <div class="d-flex j-center mt-3">
        <span class="section-title">Features</span>
      </div>
      <div class="d-flex a-center j-center f-wrap mt-1">
        <div v-for="fea in hotel.features" :key="fea.fea_id" class="feature-div">
          {{fea.fea_name}}
        </div>
      </div>
      <div class="d-flex mt-3">
        <span class="section-desc">{{hotel.hot_description_long}}</span>
      </div>
      <div class="d-flex j-center mt-3">
        <Search :only_date_mode="true"/>
      </div> 
      <div class="mt-2 d-flex j-center f-wrap">
        <ApartmentCard v-for="apa in apartments" :key="apa.cat_id" :apartment="apa" @reserve="makeReservation(
          getUserId, apa.apartments[0].apa_id, apa.cat_id
        )"/>
      </div>
      <div class="mt-3"></div>
    </div>
  </div>
</template>

<script>
import service from '../services/API'
import Search from '../components/Search-Component.vue'
import ApartmentCard from '../components/Apartment-Card.vue'
import { Carousel, Navigation, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
import { mapGetters } from 'vuex'
import {useToast } from "vue-toastification";
import {POSITION} from "vue-toastification";

export default{
  mounted(){
    this.getHotelById()
    this.getApartments()
  },
  computed: {
    ...mapGetters(['getUserId']),

    src(){
      const position = `44.8134029+,+20.4340126`
      return `https://maps.google.com/maps?q=+` + position + `+&hl=en&z=14&amp;output=embed`
    }
  },
  components:{
    Search, ApartmentCard, Carousel, Slide, Navigation,
  },
  data(){
    return{
      route_data: {},
      hotel: [],
      apartments: [],
      images: [],
      lat: null,
      lng: null,
    }
  },
  methods:{
    async getHotelById(){
      const hot_id = this.$route.params.hot_id
      const res = await service.getHotelById(hot_id)
      this.hotel = res[0]
      this.images = this.hotel.images
      this.lat = this.hotel.hot_map_lat
      this.lng = this.hotel.hot_map_lng
    },
    async getApartments(){
      const hot_id = this.$route.params.hot_id
      const res = await service.getApartments(hot_id, localStorage.getItem('check_in') || null, 
                                              localStorage.getItem('check_out')) || null
      this.apartments = res
    },
    async makeReservation(usr_id, apa_id, cat_id){
      const toast = useToast()
      console.log(usr_id, apa_id, cat_id);
      let check_in = localStorage.getItem('check_in')
      let check_out = localStorage.getItem('check_out')
      console.log(typeof(check_in), typeof(check_out));
      if(check_in === null || check_out === null){
        toast.warning('Please choose desired date of stay', {position: POSITION.TOP_CENTER})
      }
      else if(!usr_id){
        toast.warning('We need your account details. Please log in!', {position: POSITION.TOP_CENTER})
        this.$router.push({name: 'auth'})
        localStorage.setItem('log_error', true)
      }
      else{
        localStorage.removeItem('log_error')
        const res = await service.makeReservation(usr_id ,apa_id, cat_id, this.$route.params.hot_id,
                                            check_in, check_out)
        console.log(res);
        if(res.status === 200){
          toast.success('Apartment reserved! Enjoy your stay.', {position: POSITION.TOP_CENTER})
          this.$router.push({name: 'hotels'})
        }
      }
    }
  }
}
</script>

<style>
.gallery-loc-wrap{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 25rem;
  width: 100%;
}
.carousel-big{
  width: 35rem;
  height: 100%;
}
.hotel-gallery{
  height: 100%;
}
.hot-card-img-big{
  height: 25rem;
  width: 35rem;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 10px;
  cursor: pointer;
}
.hot-card-img-big img{
  object-fit: cover;
  width: 100%;
  height: 100%;
}
.search-cont{
  padding-left: 1rem;
  padding-right: 1rem;
}
.hotel-title{
  font-size: 1.8rem;
  margin: 1.5rem;
  color: rgb(99, 68, 129);
}
.feature-div{
  padding: 0.5rem;
  border: 2px solid rgb(151, 151, 151);
  border-radius: 5px;
  margin: 0.5rem;
  color: rgb(75, 75, 75);
}
.apartments-div{
  display: flex;
  flex-direction: column;
  align-content: center;
  background-color: wheat;
}
.table{
  border-radius: 10px;
}
.col-title{
  border-top: 2px solid lightgray;
  background-color: rgb(95, 75, 112);
  border-right: 2px solid lightgray;
  border-left: 2px solid lightgray;
  height: 3rem;
  color: white;
}
.col-title-small{
  color: white;
  background-color: rgb(95, 75, 112);
  border-top: 2px solid lightgray;
  border-right: 2px solid lightgray;
  border-left: 2px solid lightgray;
  height: 3rem;
}
.col-text{
  background-color: white;
  border-right: 2px solid lightgray;
  border-bottom: 2px solid gray;
  border-left: 2px solid lightgray;
  text-align: left;
  padding: 1rem;
  width: 20rem;
}
.col-button{
  background-color: white;
  border-right: 2px solid lightgray;
  border-bottom: 2px solid gray;
  border-left: 2px solid lightgray;
  text-align: center;
  padding: 1rem;
  width: 5rem;
  vertical-align:middle;  
}
.col-button-title{
  color: white;
  background-color: rgb(95, 75, 112);
  border-top: 2px solid lightgray;
  border-right: 2px solid lightgray;
  border-left: 2px solid lightgray;
  height: 3rem;
}
.col-text-title{
  color: rgb(79, 65, 92);
  font-size: 1.1rem;
  border-bottom: 2px solid rgb(79, 65, 92);
}
.col-price{
  width: auto !important;
  text-align: left;
}
</style>