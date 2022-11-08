<template>
  <div class="d-flex f-col a-center section-div">
    <div class="hot-list-details">
      <div class="card-horizontal-header">
        <div class="d-flex j-center">  
          <span class="hotel-title">{{hotel.hot_name}}</span>
        </div>
      </div>
      <div class="d-flex a-center j-center w-100 mt-1">
        <div>
          <div class="big-card">
            <img :src="selectedUrl" alt="" id="showing-img" v-if="selectedUrl">
          </div>
        </div>
        <div class="mapouter m-1">
          <div class="gmap_canvas">
            <iframe width="370" height="370" id="gmap_canvas" src="https://maps.google.com/maps?q=2880%20Broadway,%20New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0">
            </iframe>
          </div>
        </div>
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
        <ApartmentCard v-for="apa in apartments" :key="apa.cat_id" :apartment="apa"/>
      </div>
      <div class="mt-3">

      </div>
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
      selectedUrl: null,
      center: {
        lat: 44.8134029,
        lng: 20.4340126,
      }
    }
  },
  methods:{
    async getHotelById(){
      const hot_id = this.$route.params.hot_id
      const res = await service.getHotelById(hot_id)
      this.hotel = res[0]
      if(this.hotel.images){
        this.selectedUrl = this.hotel.images[0].image_url
      }
    },
    async getApartments(){
      const hot_id = this.$route.params.hot_id
      const res = await service.getApartments(hot_id, localStorage.getItem('check_in') || null, 
                                              localStorage.getItem('check_out')) || null
      this.apartments = res
      console.log(this.apartments[0].full_price);
    },
    changeImg(src){
      this.selectedUrl = src
    },
    makeReservation(usr_id, apa_id, cat_id, hot_id, check_in, check_out){
      const res = service.makeReservation(usr_id, apa_id, cat_id, hot_id, check_in, check_out)
      console.log(res);
      if(res.status === 200){
        const toast = useToast()
        toast.success('Apartment reserved! Enjoy your stay.', {position: POSITION.TOP_CENTER})
        this.$router.push({name: 'hotels'})
      }
    }
  }
}
</script>

<style>
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