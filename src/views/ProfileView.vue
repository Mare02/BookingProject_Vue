<template>
  <div class="profile-container section-div mt-nav g-1">
    <section class="user-section sec-white shadow">
      <div class="user-img shadow" v-if="user_data.usr_image">
        <img :src="user_data.usr_image" alt="">
      </div>
      <div class="user-img shadow" v-else>
        <img src="https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg" alt="">
      </div>
      <div class="mt-1">
        <div class="d-flex f-col mt-1">
          <label class="section-desc">Firstname</label>
          <input type="text" v-model="user_data.usr_firstname">
        </div>
        <div class="d-flex f-col mt-1">
          <label class="section-desc">Lastname</label>
          <input type="text" v-model="user_data.usr_lastname">
        </div>
        <div class="d-flex f-col mt-1">
          <label class="section-desc">Email</label>
          <input type="text" v-model="user_data.usr_email">
        </div>
      </div>
    </section>

    <section class="content-section sec-white shadow">
      <h2>Your reservations:</h2>
      <div class="mt-1 p-05 border-radius-10 shadow d-flex p-rel" v-for="res in reservations" :key="res.res_id">
        <div class="res-image">
          <img :src="res.apa_image" alt="">
        </div>
        <div>
          <div class="d-flex"> 
            <label class="section-desc">Check in:</label>
            <span class="section-desc ml-05">{{res.check_in}}</span>
          </div>
          <div class="d-flex"> 
            <label class="section-desc">Check out:</label>
            <span class="section-desc ml-05">{{res.check_out}}</span>
          </div>
          <div class="d-flex"> 
            <label class="section-desc">Property:</label>
            <span class="section-desc ml-05">{{res.hot_name}}</span>
          </div>
          <div class="d-flex"> 
            <label class="section-desc">Destination:</label>
            <span class="section-desc ml-05">{{res.des_name}}</span>
          </div>
        </div>
        <span :class="{'expired': res.status === 'Expired', 
                       'active': res.status === 'Active',
                       'upcoming': res.status === 'Upcoming'}">{{res.status}}</span>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import service from '../services/API'

export default {
  computed:{
    ...mapGetters(['getUserId'])
  },
  mounted(){
    this.getUser()
    this.getReservations()
  },
  data(){
    return{
      user_data: {
        usr_firstname: '',
        usr_lastname: '',
        usr_email: '',
      },

      reservations: []
    }
  },
  methods:{
    async getUser(){
      console.log(this.getUserId);
      let res = await service.getUser(this.getUserId)
      console.log(res);
      let res_data = res.data.data[0]
      for(let index in res_data){
          this.user_data[index] = res_data[index]
      }
    },
    async getReservations(){
      let res = await service.getReservations(this.getUserId)
      console.log(res);
      this.reservations = res.data.data
    }
  }
}
</script>

<style>

</style>