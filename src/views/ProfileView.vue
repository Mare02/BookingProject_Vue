<template>
  <div class="profile-container section-div mt-nav g-1">
    <section class="user-section sec-white shadow">
      <div class="user-img shadow" @click="showImgInput()">
        <img :src="user_data.usr_image" alt="" v-if="user_data.usr_image" id="usr-img">
        <img v-else src="https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg" alt="">
        <span class="update-img">Update picture</span>
      </div>
      <input type="file" class="update-img-input" id="img-input" @change="getUsrImg">
      <div class="d-flex a-center g-05 mt-1" v-if="showConfirm">
        <button class="search-btn" @click="showConfirmImg()">Cancel</button>
        <button class="search-btn" @click="updateUsrImg()">Confirm</button>
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
import {useToast } from "vue-toastification";
import {POSITION} from "vue-toastification";
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

      new_usr_img: null,
      showConfirm: false,

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
    },
    showImgInput(){
      document.getElementById('img-input').click()
    },
    getUsrImg(e){
      this.new_usr_img = e.target.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(e.target.files[0])
      if(e.target.files[0]){
        reader.addEventListener('load', () => {
          const imgELem = document.getElementById('usr-img')
          imgELem.src = reader.result
          this.showConfirmImg()
        })
      }
    },
    async updateUsrImg(){
      let formdata = new FormData()

      formdata.append('file', this.new_usr_img)
      formdata.append('usr_id', this.getUserId)

      let res = await service.updateImg(formdata)
      console.log(res);
      if(res.status === 200){
        this.showConfirmImg()
        const toast = useToast()
        toast.success('Profile image updated!', {position: POSITION.TOP_CENTER})
        this.getUser()
      }
    },
    showConfirmImg(){
      this.showConfirm = !this.showConfirm
    }
  }
}
</script>

<style>

</style>