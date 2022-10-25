<template>
  <div class="d-flex f-col a-center w-100">
    <span class="section-title">{{apartments.length}} properties found</span>
    <ul class="apa-list">
      <li class="apa-list-item" v-for="apa in apartments" :key="apa.apa_id">
        <Carousel class="carousel" :wrapAround="true" v-if="apa.images">
          <Slide v-for="img in apa.images" :key="img.file_id" class="carousel-slide">
            <div class="apa-card-img">
              <img :src="img.image_url" alt="">
            </div>
          </Slide>
          <template #addons>
            <Navigation/>
            <Pagination/>
          </template>
          
        </Carousel>
        <Carousel class="carousel" :wrapAround="true" v-else>
          <Slide class="carousel-slide">
            <div class="apa-card-img">
              <img src="../assets/street-out-city-centre-paris-random-walk-making-shots-beautiful-houses-huge-135493410.jpg" alt="">
            </div>
          </Slide>
        </Carousel>
        <div>
          {{apa.apa_id}}
          {{apa.hot_name}}
          {{apa.des_name}}
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { Carousel, Navigation, Slide, Pagination } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'

export default{
  props: ['apartments'],
  components:{
    Carousel,
    Slide,
    Navigation,
    Pagination
  },
  mounted(){

  },
  data(){
    return{

    }
  }
}
</script>
<style>

</style>