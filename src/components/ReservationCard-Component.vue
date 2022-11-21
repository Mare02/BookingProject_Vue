<template>
  <div class="res-card-container">
    <div class="d-flex f-col res-card-div section-div sec-white shadow" id="res-card">
      <h2>Book property</h2>
      <span class="section-desc">Your info</span>
      <div class="inputs-div ">
        <div class="d-flex f-col mt-1">
          <label>Firstname:</label>
          <input type="text" v-model="getName">
        </div>
        <div class="d-flex f-col mt-1">
          <label>Lastname:</label>
          <input type="text" v-model="getLastName">
        </div>
        <div class="d-flex f-col mt-1">
          <label>Email:</label>
          <input type="text" v-model="getEmail">
        </div>
        <div class="d-flex f-col mt-1">
          <label>Phone number:</label>
          <input type="number">
        </div>
        <h3 class="mt-2">Payment</h3>
        <label for="">Supports multiple payment methods</label>
        <div class="w-100 d-flex a-center j-center g-1 mt-1 mb-1">
          <img class="credit-card-img" src="../assets/visa.png" alt="">
          <img class="credit-card-img" src="../assets/mastercard.png" alt="">
          <img class="credit-card-img" src="../assets/paypal.png" alt="">
          <img class="credit-card-img" src="../assets/agrobank.png" alt="">
          <img class="credit-card-img" src="../assets/americanExpress.png" alt="">
        </div>
        <div class="d-flex f-col mt-1">
          <label>Credit card number:</label>
          <input type="number" placeholder="0000 0000 0000 0000" required>
        </div>
        <div class="d-flex a-center mt-1 w-100 j-evenly">
          <div class="d-flex f-col a-center">
            <label>Expiration date:</label>
            <div class="d-flex a-center g-05">
              <input class="input-smaller" type="number" placeholder="MM">
              <h2>/</h2>
              <input class="input-smaller" type="number" placeholder="YY">
            </div>
          </div>
          <div class="d-flex f-col a-center">
            <label>Security code:</label>
            <input class="input-smaller" type="number" placeholder="000">
          </div>
        </div>
      </div>
      <div class="d-flex a-center mt-2">
        <h3>Total: </h3>
        <span class="price ml-05">{{price.toLocaleString('en-US')}} RSD</span>
      </div>
      <div class="mt-2 d-flex a-center w-100 j-center g-1">
        <button class="search-btn" @click="emitClose()">Cancel</button>
        <button class="search-btn" @click="emitProceed()">Proceed</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props:['price', 'room', 'hotel'],
  computed:{
    ...mapGetters(['getUserId', 'getName', 'getLastName', 'getEmail'])
  },
  mounted(){

  },
  data(){
    return{

    }
  },
  methods:{
    emitClose(){
      this.$emit('close')
    },
    emitProceed(){
      this.$emit('proceed')
    }
  }
}
</script>

<style>
.credit-card-img{
  width: 3rem;
}
.input-small{
  width: 5rem;
}
.input-smaller{
  width: 3rem;
}
.res-card-container{
  z-index: 99;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  top: 0;
  background-color: rgb(0, 0, 0, .5);
}
.res-card-div{
  max-width: 35rem;
  width: 80%;
}
</style>
