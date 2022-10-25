<template>
  <div class="d-flex f-col a-center w-100">
    <ul class="hot-list">
      <li class="hot-list-item" v-for="hot in hotels" :key="hot.hot_id">
        <Carousel class="carousel" :wrapAround="true" v-if="hot.images">
          <Slide v-for="img in hot.images" :key="img.file_id" class="carousel-slide">
            <div class="hot-card-img" @click="redirectToHotel(hot.hot_id)">
              <img :src="img.image_url" alt="">
            </div>
          </Slide>
          <template #addons>
            <Navigation v-if="hot.images.length > 1"/>
          </template>
        </Carousel>
        <Carousel class="carousel" :wrapAround="true" v-else>
          <Slide class="carousel-slide">
            <div class="hot-card-img" @click="redirectToHotel(hot.hot_id)">
              <img src="../assets/street-out-city-centre-paris-random-walk-making-shots-beautiful-houses-huge-135493410.jpg" alt="">
            </div>
          </Slide>
        </Carousel>
        <div class="hot-list-details">
          <div class="hot-top">
            <div class="hot-header">
              <a class="hot-name" @click="redirectToHotel(hot.hot_id)">{{hot.hot_name}}</a>
              <div class="hot-rating">
                [RATING]
              </div>
            </div>
          </div>
          <div class="hot-bottom">
            <div class="hot-description">
              <p>{{hot.hot_description}}</p>
            </div>
          </div>
          <div class="hot-end">
            <div class="hot-price">
              <label class="price-label">Price: </label>
              <span class="price">[PRICE]</span>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { Carousel, Navigation, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'

export default{
  props: ['hotels', 'check_in', 'check_out'],
  components:{
    Carousel,
    Slide,
    Navigation,
  },
  mounted(){

  },
  data(){
    return{

    }
  },
  methods:{
    redirectToHotel(id){
      console.log(id);
      this.$router.push({name: 'hotel', params:{id: id, data_id: JSON.stringify({check_in: this.check_in, check_out: this.check_out})}})
    }
  }
}
</script>
<style>
.hot-top{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20%;
  padding-top: 1rem;
}
.hot-bottom{
  height: 70%;
  display: flex;
  flex-direction: column;
}
.hot-end{
  height: 10%;
  display: flex;
  align-self: flex-end;
  padding-bottom: 1rem;
}
</style>