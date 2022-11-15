<template>
  <div class="d-flex f-col mt-nav">
    <div class="section-div">
      <div class="sec-white mt-1 d-flex j-between shadow">
        <div class="sec-title-fea">
          <div class="d-flex a-center">
            <span class="hotel-title">{{hotel.hot_name}}</span>
            <div class="hot-stars-div">
              <img class="hot-star" v-for="star in hotel.hot_stars" :key="star" src="../assets/Plain_Yellow_Star.png" alt=""/>
            </div>
          </div>
          <span class="mt-1 section-desc">{{hotel.hot_description}}</span>
          <div class="d-flex a-center mt-1">
            <span class="section-desc-dark">User rating: </span>&nbsp;
            <span class="rating-number-big">{{Number(hotel.rating).toFixed(1)}} / 10</span>
          </div>
        </div>
        <iframe class="map shadow"
          frameborder="0" 
          scrolling="yes" 
          marginheight="0" 
          marginwidth="0" 
          :src="'https://maps.google.com/maps?q='+lat+','+lng+'&hl=en&z=14&z=17&amp;output=embed'">
        </iframe>
      </div>
      <div class="gallery-loc-wrap mt-1 d-flex shadow">
        <div class="hotel-gallery">
          <grid-images :items="images_arr" :cells="3"/>
        </div>
        <span class="section-desc-big">{{hotel.hot_description_long}}</span>
      </div>
      <div class="sec-white shadow mt-1">
        <span class="section-desc-dark">Reviews: </span>
        <div class="comments-div">
          <div class="d-flex f-col">
            <div class="d-flex mt-1" v-for="com in hotel.comments" :key="com">
              <!-- <div class="profile-img">
                <img :src="com.usr_image" alt="">
              </div> -->
              <div class="d-flex f-col">
                <span class="comment-name">{{com.usr_firstname}}</span>
                <div class="d-flex a-center">
                  <span class="section-desc border-light">{{com.com_text}}</span>
                  <span class="ml-05 rating-number">{{com.usr_rating}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="sec-white d-flex j-center mt-1 shadow">
        <Search :only_date_mode="true"/>
      </div> 
      <div class="mt-1 d-flex j-center f-wrap">
        <ApartmentCard v-for="apa in apartments" :key="apa.cat_id" :apartment="apa" @reserve="makeReservation(
          getUserId, apa.apartments.apa_id, apa.cat_id
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
.comments-div{
  max-height: 18rem;
  overflow-y: scroll;
  border-radius: 10px;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
.profile-img{
  overflow: hidden;
  min-width: 3.5rem;
  min-height: 3.5rem;
  max-width: 3.5rem;
  max-height: 3.5rem;
  border-radius: 50%;
  margin-right: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.profile-img img{
  height: 100%;
  object-fit: cover;
}
.comment-wrap{
  border-radius: 10px;
  padding: 0.5rem;
  margin-right: 0.5rem;
}
.comment-name{
  margin-bottom: 0.2rem;
  font-size: 1.05rem;
}
.gallery-loc-wrap{
  display: flex;
  justify-content: center;
  height: 30rem;
  background-color: white;
  border-radius: 10px;
  padding: 1rem;
}
.map{
  border-radius: 10px;
  height: 20rem;
  width: 20rem;
  margin-left: 1rem;
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
.hotel-gallery{
  height: 100%;
  width: 65%;
  border-radius: 10px;
}
.section-desc-big{
  font-size: 1.1rem;
  color: rgb(58, 58, 58);
  width: 35%;
  height: 100%;
  overflow-y: scroll;
  margin-left: 1rem;
}
.hotel-gallery .gi-item{
  border: 5px solid white;
}
.hotel-gallery .gi-grid{
  overflow: hidden;
}
.search-cont{
  padding-left: 1rem;
  padding-right: 1rem;
}
.hotel-title{
  font-size: 1.7rem;
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