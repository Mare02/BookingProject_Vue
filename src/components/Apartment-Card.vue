<template>
  <div class="card-ver-container">
    <div class="card-ver-img">
      <img :src="apartment.apa_image" alt="">
    </div>
    <div class="card-ver-header">
      <span>{{apartment.cat_name}}</span>
    </div>
    <div class="card-ver-body">
      <span>Features:</span>
      <ul class="card-ver-list">
        <li v-for="fea in apartment.features" :key="fea.fea_id">
          <span>- {{fea.fea_name}}</span>
        </li>
      </ul>
    </div>
    <div class="card-ver-footer">
      <div class="card-ver-price">
        <span>Price: </span>
        <span class="price">{{apartment.price_per_day.toLocaleString('en-US')}} RSD</span>
        <div class="d-flex a-center j-between">
          <span class="span-small">for 1 night</span>
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
  export default{
    props: ['apartment'],
    methods:{
      emitReserve(){
        this.$emit('reserve')
      }
    }
  }
</script>

<style>
  .card-ver-container{
    background-color: white;
    min-width: 20rem;
    max-width: 20rem;
    width: 20rem;
    margin: 0.5rem;
    display: flex;
    flex-direction: column;
    align-content: center;
    border-radius: 5px;
    box-shadow: 0 5px 5px 3px rgba(0, 0, 0, 0.3);
    overflow: hidden;
  }
  .card-ver-img{
    min-height: 11rem;
    max-height: 15rem;
    background-color: gray;
    width: 100%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .card-ver-img img{
    object-fit: cover;
    width: 100%;
    transition: scale 0.2s ease-in-out;
  }
  .card-ver-container:hover img{
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
    height: 60%;
    font-size: 1.05rem;
  }
  .card-ver-list{
    list-style: none;
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
    height: 9rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    padding-top: 0;
  }
  .card-ver-price{
    text-align: left;
    width: 100%;
    font-size: 1.2rem;
    display: flex;
    flex-direction: column;
  }
  .card-ver-price .price{
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