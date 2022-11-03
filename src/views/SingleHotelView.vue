<template>
  <div class="d-flex f-col a-center section-div">
    <div class="hot-list-details">
      <div class="card-horizontal-header">
        <div class="d-flex j-center">  
          <span class="hotel-title">{{hotel.hot_name}}</span>
        </div>
      </div>
      <div class="d-flex a-center f-col w-100 mt-1">
        <div class="big-card">
          <img :src="selectedUrl" alt="" id="showing-img" v-if="selectedUrl">
        </div>
        <div class="gallery-selector">
          <div class="small-card" v-for="img in hotel.images" :key="img.file_id" @click="changeImg(img.image_url)">
            <img :src="img.image_url" alt="">
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
      <div class="mt-3 d-flex j-center">
        <table class="table">
          <tr class="table-section">
            <th class="col-title-small">Room Type</th>
            <th class="col-title">Price Per Day</th>
            <th class="col-button-title">Reserve</th>
          </tr>
          <tr v-for="apa in apartments" :key="apa.apa_id" class="table-section">
            <td class="col-text d-flex f-col">
              <span class="col-text-title">{{apa.cat_name}}</span>
              <span class="mt-1">Features:</span>
              <hr>
              <div>
                <label v-for="fea in apa.features" :key="fea.fea_id">
                  {{fea.fea_name}}
                </label>
              </div>
            </td>
            <td v-if="apa.price_per_day" class="col-text col-price">{{apa.price_per_day.toLocaleString("en-US")}} RSD</td>
            <td class="col-button">
              <button @click="makeReservation(
                getUserId, apa.apartments[0].apa_id, apa.cat_id, apa.hot_id, 
                localStorage.getItem('check_in'), localStorage.getItem('check_out')
              )" class="reserve-button">Select</button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import service from '../services/API'
import { mapGetters } from 'vuex'

export default{
  mounted(){
    this.getHotelById()
    this.getApartments()
  },
  computed: {
    ...mapGetters(['getUserId'])
  },
  components:{
    
  },
  data(){
    return{
      route_data: {},
      hotel: [],
      apartments: [],
      selectedUrl: null,
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
      console.log(res);
      this.apartments = res
    },
    changeImg(src){
      this.selectedUrl = src
    },
    makeReservation(usr_id, apa_id, cat_id, hot_id, check_in, check_out){
      const res = service.makeReservation(usr_id, apa_id, cat_id, hot_id, check_in, check_out)
      console.log(res);
    }
  }
}
</script>
<style>
.hotel-title{
  font-size: 2rem;
  margin: 1.5rem;
  color: rgb(99, 68, 129);
}
.feature-div{
  padding: 0.5rem;
  border: 1px solid lightgrey;
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
  border-right: 2px solid lightgray;
  border-bottom: 2px solid gray;
  border-left: 2px solid lightgray;
  text-align: left;
  padding: 1rem;
  width: 20rem;
}
.col-button{
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
  width: 5rem;
  text-align: center;
}
</style>