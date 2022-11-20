<template>
  <div class="card-ver-container">
    <div class="card-ver-img">
      <img class="apa-card-image" :src="apartment.apa_image" alt="">
    </div>
    <div class="card-ver-header d-flex j-between">
      <span>{{apartment.cat_name}}</span>
      <button class="delete-btn" @click="deleteApartments()">Remove</button>
    </div>
    <div class="card-ver-body">
      <span>Features:</span>
      <ul class="card-ver-list">
        <li>
          <div class="d-flex a-center g-05">
            <img class="fea_image" src="../assets/bed.png" alt="">
            <span>{{apartment.cb_hot_count}}</span>
            <span v-if="apartment.cb_hot_count > 1">{{apartment.bed_name}}s</span>
            <span v-else>{{apartment.bed_name}}</span>
          </div>
        </li>
        <li>
          <div class="d-flex a-center g-05">
            <img class="fea_image" src="../assets/area.png" alt="">
            <span>{{apartment.apa_squares}} sq m</span>
          </div>
        </li>
        <li v-for="fea in apartment.apa_features" :key="fea.fea_id">
          <div class="d-flex a-center g-05">
            <img class="fea_image" :src="fea.fea_image" alt="">
            <span>{{fea.fea_name}}</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="card-ver-footer">
      <div class="card-ver-price">
        <span>Price: </span>
        <span class="price" v-if="apartment.full_price">{{apartment.full_price.toLocaleString('en-US')}} RSD</span>
        <span class="price" v-else>{{apartment.price_per_day.toLocaleString('en-US')}} RSD</span>
        <div class="d-flex a-center j-between">
          <span class="span-small" v-if="apartment.full_price">for {{apartment.num_of_days}} nights</span>
          <span class="span-small" v-else>for 1 night</span>
          <span class="span-small span-red" v-if="apartment.available_rooms_count < 3">We have {{apartment.available_rooms_count}} left</span>
        </div>
      </div>
      <div class="card-ver-btn"> 
        <button @click="emitReserve()">Book</button>
      </div>
    </div>
  </div>
</template>

<script>
  import service from '../services/API'
  export default{
    props: ['apartment'],
    methods:{
      emitReserve(){
        this.$emit('reserve')
      },
      async deleteApartments(){
        service.deleteApartments(this.apartment.cat_id, this.apartment.hot_id)
        this.$emit('reload')
      }
    }
  }
</script>

<style>
  .delete-btn{
    background-color: red;
    border: none;
    color: white;
    font-weight: bold;
    font-size: 1rem;
    border-radius: 5px;
    padding: .4rem;
    cursor: pointer;
    transition: all .2s;
  }
  .delete-btn:hover{
    background-color: rgb(150, 0, 0);
  }
  .fea_image{
    width: 1.3rem;
    object-fit: contain;
  }
  .card-ver-container{
    background-color: white;
    min-width: 20rem;
    max-width: 20rem;
    width: 20rem;
    margin: 1rem;
    display: flex;
    flex-direction: column;
    align-content: center;
    border-radius: 5px;
    box-shadow: 0 5px 5px 3px rgba(0, 0, 0, 0.3);
    overflow: hidden;
  }
  .card-ver-img{
    min-height: 10rem;
    max-height: 10rem;
    background-color: gray;
    width: 100%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .card-ver-img .apa-card-image{
    object-fit: cover;
    width: 100%;
    transition: scale 0.2s ease-in-out;
  }
  .card-ver-container:hover .apa-card-image{
    scale: 1.05;
  }
  .card-ver-header{
    text-align: left;
    padding: 1rem;
  }
  .card-ver-header span{
    font-size: 1.2rem;
  }
  .card-ver-body{
    padding: 1rem;
    font-size: 1.05rem;

  }
  .card-ver-list{
    list-style: none;
    height: 10.5rem;
    padding: .5rem;
    overflow-y: scroll;
    box-shadow: 0 5px 10px 1px rgb(0, 0, 0, .2);
    border-radius: 10px;
    margin-top: .5rem;
  }
  .card-ver-list li{
    margin: 0.3rem;
    display: flex;
    align-items: center;
  }
  .card-ver-list li span{
    color: rgb(48, 48, 48);
  }
  .card-ver-footer{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    padding-top: 0;
    margin-top: 1rem;
  }
  .card-ver-price{
    text-align: left;
    width: 100%;
    font-size: 1.2rem;
    display: flex;
    flex-direction: column;
  }
  .price{
    color: rgb(89, 60, 134);
    font-size: 1.45rem;
  }
  .span-small{
    font-size: 1rem;
  }
  .span-red{
    color: rgb(255, 64, 64);
  }
  .card-ver-btn{
    width: 100%;
    text-align: center;
    margin-top: 0.4rem;
    display: flex;
    flex-direction: column;
  }
  .card-ver-btn button{
    border-radius: 5px;
    background-color: rgb(77, 76, 125);
    color: white;
    border: none;
    padding: 0.5em;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.2s;
  }
  .card-ver-btn button:hover{
    background-color: rgb(77, 76, 125, 0.7);
  }

</style>