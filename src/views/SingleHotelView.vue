<template>
  <div class="d-flex f-col a-center section-div">
    <div class="hot-list-details">
      <div class="card-horizontal-header">
        <div class="d-flex j-center">  
          <span class="section-title">{{hotel.hot_name}}</span>
        </div>
      </div>
      <div class="d-flex a-center f-col w-100 mt-3">
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
        <!-- <div class="apartments-div">
          <div v-for="apa in apartments" :key="apa.apa_id" class="apartments-div-item">
            {{apa[1].cat_name}}
          </div>
        </div> -->
        <table class="table">
          <tr class="table-section">
            <th class="col-title-small">Room Type</th>
            <th class="col-title">Price Per Day</th>
          </tr>
          <tr v-for="apa in apartments.count" :key="apa.apa_id" class="table-section">
            <td class="col-text">{{apa.cat_name}}</td>
            <td class="col-text">{{apa.price_per_day}}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import service from '../services/API'

export default{
  mounted(){
      this.route_data = JSON.parse(this.$route.params.data_id)
      this.getHotelById()
      this.getApartments()
    },
    data(){
      return{
        route_data: {},
        hotel: [],
        apartments: [],
        selectedUrl: null
      }
    },
    methods:{
      async getHotelById(){
        const hot_id = this.$route.params.id
        const res = await service.getHotelById(hot_id)
        this.hotel = res[0]
        if(this.hotel.images){
          this.selectedUrl = this.hotel.images[0].image_url
        }
      },
      async getApartments(){
        const hot_id = this.$route.params.id
        const res = await service.getApartments(hot_id, this.route_data.check_in, this.route_data.check_out)
        console.log(res);
        this.apartments = res
      },
      changeImg(src){
        this.selectedUrl = src
      }
    }
}
</script>
<style>
.feature-div{
  padding: 0.5rem;
  border: 2px solid lightgray;
  border-radius: 10px;
  margin: 0.5rem;
}
.apartments-div{
  display: flex;
  flex-direction: column;
  align-content: center;
  background-color: wheat;
}
.table{
  border-radius: 10px;
  width: 80%;
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
  width: 10rem;
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
  padding-left: 1rem;
  padding-right: 1rem;
  height: 3rem;
}
</style>