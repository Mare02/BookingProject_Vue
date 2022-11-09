<template>
  <div class="d-flex f-col mt-2">
    <div class="section-div">
      <div class="gallery-loc-wrap">
        <div class="hotel-gallery">
          <grid-images :items="images_arr" :cells="5" />
        </div>
        <iframe class="map"
          frameborder="0" 
          scrolling="yes" 
          marginheight="0" 
          marginwidth="0" 
          :src="'https://maps.google.com/maps?q='+lat+','+lng+'&hl=en&z=14&z=17&amp;output=embed'">
        </iframe>
      </div>
      <div class="sec-white mt-1">
        <div class="sec-title-fea">
          <div class="d-flex a-center">
            <span class="hotel-title">{{hotel.hot_name}}</span>
            <div class="hot-stars-div">
              <img class="hot-star" v-for="star in hotel.hot_stars" :key="star" src="../assets/Plain_Yellow_Star.png" alt=""/>
            </div>
          </div>
          <span class="section-title-small">Features</span>
        </div>
      </div>
      <div class="sec-white mt-1">
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
      
    </div>
  </div>
</template>

<script>
import service from '../services/API'
import Search from '../components/Search-Component.vue'
import ApartmentCard from '../components/Apartment-Card.vue'
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
    Search, ApartmentCard
  },
  data(){
    return{
      route_data: {},
      hotel: [],
      apartments: [],
      images: [],
      images_arr: [],
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
      for(let el in res[0].images){
        this.images_arr.push(res[0].images[el].image_url)
      }
      console.log(this.images_arr);
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
  width: 100%;
  height: 30rem;
}
.map{
  border-radius: 10px;
  height: 100%;
  width: 35%;
}
.sec-white{
  background-color: white;
  padding: 1rem;
  border-radius: 10px;
}
.sec-title-fea{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.section-title-small{
  font-size: 1.3rem;
}

.carousel-big{
  width: 35rem;
  height: 100%;
}
.hotel-gallery{
  height: 100%;
  width: 65%;
}
.hotel-gallery .gi-item{
  border: 5px solid white;
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
</style>