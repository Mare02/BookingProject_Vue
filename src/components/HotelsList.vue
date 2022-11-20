<template>
  <div class="d-flex f-col a-center w-100">
    <ul class="hot-list" id="hotels-list">
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
        <div class="hot-list-details pr-1">
          <div class="card-horizontal-header">
            <div class="hot-header">
              <div class="d-flex a-center">
                <a class="hot-name" @click="redirectToHotel(hot.hot_id)">{{hot.hot_name}}</a>
                <div class="hot-stars-div">
                  <img class="hot-star" v-for="star in hot.hot_stars" :key="star" src="../assets/Plain_Yellow_Star.png" alt=""/>
                </div>
              </div>
              <div class="hot-rating d-flex">
                <span class="rating-text">Rating: </span>
                <span class="rating-number" v-if="hot.hot_rating">{{hot.hot_rating.toFixed(1)}}</span>
              </div>
            </div>
          </div>
          <div class="card-horizontal-text">
            <div class="hot-description">
              <p>{{hot.hot_description}}</p>
            </div>
          </div>
          <div class="card-horizontal-footer">
            <div class="hot-price">
              <label class="price-label">Starting from: </label>
              <span class="price-small" v-if="hot.full_price">{{hot.full_price.toLocaleString("en-US")}} RSD</span>
              <span class="price-small" v-if="!hot.full_price && hot.price_per_day">{{hot.price_per_day.toLocaleString("en-US")}} RSD / day</span>
            </div>
          </div>
        </div>
      </li>
      <li class="hot-list-error-div" v-if="hotels.length === 0 && errorLoaded">
        <span class="search-error-msg">Sorry, there are no properties that match your search parameters.</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { Carousel, Navigation, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'

export default{
  props: ['hotels'],
  components:{
    Carousel,
    Slide,
    Navigation,
  },
  mounted(){
    this.$emit('loaded')
    setTimeout(() => {
      this.errorLoaded = true
    }, 500)
  },
  data(){
    return{
      errorLoaded: false
    }
  },
  methods:{
    redirectToHotel(hot_id){
      this.$router.push({name: 'hotel', params:{hot_id: hot_id}})
      localStorage.setItem('hot_id', hot_id)
    },
  }
}
</script>

<style>
.price-small{
  color: rgb(89, 60, 134);
  font-size: 1.1rem;
}
.hot-star{
  width: 1.3rem;
}
.hot-stars-div{
  margin-left: 0.5rem;
  display: flex;
  align-items: center;
  filter: brightness(80%);
}
</style>