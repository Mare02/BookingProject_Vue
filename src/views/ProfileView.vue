<template>
  <div class="profile-container section-div mt-nav g-1">
    <section class="user-section sec-white shadow">
      <div class="user-img shadow">
        <img :src="user_data.usr_image" alt="">
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
      <div class="mt-1 p-05 border-radius-10 shadow d-flex res-item" v-for="res in reservations" :key="res.res_id">
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
      let res = await service.getUser(this.getUserId)
      console.log(res);
      let res_data = res.data.data[0]
      for(let index in res_data){
          this.user_data[index] = res_data[index]
      }
    },
    async getReservations(){
      let res = await service.getReservations(25)
      console.log(res);
      this.reservations = res.data.data
    }
  }
}
</script>

<style>
.expired{
  position: absolute;
  top: 0.5rem;
  right: 1rem;
  color: red;
  font-size: 1.2rem;
}
.active{
  position: absolute;
  top: 0.5rem;
  right: 1rem;
  color: green;
  font-size: 1.2rem;
}
.upcoming{
  position: absolute;
  top: 0.5rem;
  right: 1rem;
  color: var(--nav-bg-color);
  font-size: 1.2rem;
}
.res-item{
  cursor: pointer;
  transition: all .2s;
  position: relative;
}
.res-item:hover{
  scale: 1.02;
  background-color: rgb(217, 211, 231);
}
  .title-abs{
    position: absolute;
    background-color: white;
    height: 3rem;
    top: 0;
  }
  .res-image{
    width: 10.5rem;
    height: 6.5rem;
    overflow: hidden;
    border-radius: 5px;
    margin-right: 2rem;
  }
  .res-image img{
    object-fit: cover;
    object-position: center;
    height: 100%;
    width: 100%;
  }
  .usr-details{
    display: flex;
    flex-direction: column;
    margin-top: 2rem;
    padding-left: 1rem;
    padding-right: 1rem;
  }
  .user-img{
    width: 7rem;
    height: 7rem;
    overflow: hidden;
    border-radius: 50%;
    border: 2px solid white;
  }
  .user-img img{
    object-fit: fill;
    object-position: center;
    height: 100%;
  }
  .profile-container{
    padding-top: 2rem;
    display: flex;
    justify-content: center;
  }
  .user-section{
    width: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 82.5vh;
  }
  .content-section{
    position: relative;
    width: 70%;
    height: 82.5vh;
    overflow-y: scroll;
  }
</style>