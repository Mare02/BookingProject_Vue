<template>
  <div class="d-flex f-col mt-nav">
    <div class="section-div">
      <div class="sec-white mt-1 d-flex j-between">
        <div class="sec-title-fea">
          <div class="d-flex a-center border-radius-10 p-05 shadow">
            <span class="hotel-title">{{hotel.hot_name}}</span>
            <div class="hot-stars-div">
              <img class="hot-star" v-for="star in hotel.hot_stars" :key="star" src="../assets/Plain_Yellow_Star.png" alt=""/>
            </div>
          </div>
          <span class="mt-1 section-desc">{{hotel.hot_description}}</span>
          <div class="d-flex a-center mt-1">
            <h3>User rating:</h3>
            <span class="rating-number-big ml-05">{{Number(hotel.rating).toFixed(1)}} / 10</span>
          </div>
          <div class="d-flex g-05 f-wrap mt-2">
            <h3 class="w-100">Property highlights:</h3>
            <div class="d-flex border-light" v-for="fea in hotel.features" :key="fea.fea_id">
              <img class="fea_image" :src="fea.fea_image" alt="">
              <span class="ml-05 section-desc">{{fea.fea_name}}</span>
            </div>
          </div>
        </div>
        <div class="d-flex f-col">
          <iframe class="map shadow"
            frameborder="0" 
            scrolling="yes" 
            marginheight="0" 
            marginwidth="0" 
            :src="'https://maps.google.com/maps?q='+lat+','+lng+'&hl=en&z=14&z=17&amp;output=embed'">
          </iframe>
          <label class="m-1">{{hotel.hot_address}}</label>
        </div>
      </div>
      <div class="gallery-loc-wrap mt-1 d-flex ">
        <grid-images :items="images_arr" :cells="4"/>
      </div>
      <div class="sec-white mt-1">
        <span class="section-desc-dark">Reviews: </span>
        <div class="comments-div">
          <div class="d-flex f-col">
            <div class="d-flex mt-1" v-for="com in hotel.comments" :key="com">
              <div class="profile-img">
                <img :src="com.usr_image" alt="">
              </div>
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
        <Search :only_date_mode="true" @selected_date="getApartments()"/>
      </div> 
      <div class="mt-1 d-flex j-center f-wrap">
        <ApartmentCard v-for="apa in apartments" :key="apa.cat_id" :apartment="apa" 
         @reserve="makeReservation(
                      getUserId, apa.apartments[0].apa_id, apa.cat_id, apa.full_price
                    )"
         @reload="getApartments()"
        />
      </div>
      
      <div class="mt-2 sec-white d-flex f-col">
        <h3 class="mb-1 p-05 border-radius-10 bg-white shadow a-self-start">Property description</h3>
        <span class="section-desc">{{hotel.hot_description_long}}</span>
      </div>
    </div>
    <ReservationCard v-if="showBookCardComp" @close="showBookCard()"
                                              :price="selected_price"
                                              @proceed="makeReservation(
                                                          getUserId, selected_apa, selected_cat
                                                        )"/>
  </div>
</template>


<script>
import service from '../services/API'
import Search from '../components/Search-Component.vue'
import ApartmentCard from '../components/Apartment-Card.vue'
import ReservationCard from '../components/ReservationCard-Component.vue'
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
  },
  components:{
    Search, ApartmentCard, ReservationCard
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

      selected_price: null,
      selected_apa: null,
      selected_cat: null,

      showBookCardComp: false
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
    async makeReservation(usr_id, apa_id, cat_id, price){
      if(price){
        this.selected_price = price
        this.selected_apa = apa_id
        this.selected_cat = cat_id
      }
      const toast = useToast()
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
        if(!this.showBookCardComp){
          this.showBookCard()
          return
        }
        localStorage.removeItem('log_error')
        const res = await service.makeReservation(usr_id ,apa_id, cat_id, this.$route.params.hot_id,
                                            check_in, check_out)
        console.log(res);
        if(res.status === 200){
          toast.success('Apartment reserved! Enjoy your stay.', {position: POSITION.TOP_CENTER})
          this.$router.push({name: 'hotels'})
        }
      }
    },
    selectApartment(price){
      console.log(price);
      this.selected_price = price
      this.showBookCard()
    },
    showBookCard(){
      this.showBookCardComp = !this.showBookCardComp
    },
    handleProceed(id, apa_id, cat_id){
      console.log(id, apa_id, cat_id);
      this.makeReservation(id, apa_id, cat_id)
    }
  }
}
</script>

<style>
.padding{
  padding-right: 15rem;
  padding-left: 15rem;
}
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
  height: 25rem;
  background-color: white;
  border-radius: 10px;
  padding: 1rem;
}
.map{
  border-radius: 10px;
  height: 15rem;
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