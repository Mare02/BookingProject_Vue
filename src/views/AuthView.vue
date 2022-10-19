<template>
<div class="auth-container">
  <div class="inputs-wrapper">
    <span class="title" v-if="!showRegister">Sign In</span>
    <span class="title" v-if="showRegister">Register</span>
    <div class="inputs">
      <transition>
        <div class="input-div" v-if="showRegister">
          <label>First Name:</label>
          <input type="text" v-model="inputs.first_name">
        </div>
      </transition>
      <transition>
        <div class="input-div" v-if="showRegister">
          <label>Last Name:</label>
          <input type="text" v-model="inputs.last_name">
        </div>
      </transition>
      <div class="input-div">
        <label>Email:</label>
        <input type="text" v-model="inputs.email">
      </div>
      <div class="input-div">
        <label>Password:</label>
        <input type="password" v-model="inputs.password">
      </div>
      <transition>
        <div class="input-div" v-if="showRegister">
          <label>Confirm password:</label>
          <input type="password" v-model="inputs.c_password">
        </div>
      </transition>
    </div>
    <button class="login-btn" v-if="!showRegister">Log In</button>
    <button class="register-btn" v-if="showRegister" @click="signUp()">Register</button>
    <div class="reg-option" v-if="!showRegister">
      <span>Dont't have an account?</span>
      <button @click="changeReg()">Register</button>
    </div>
    <div class="log-option" v-if="showRegister">
      <span>Already have an account?</span>
      <button @click="changeReg()">Sign In</button>
    </div>
  </div>
</div>
</template>

<script>
import service from '../services/API'

export default {
  name: 'AuthView',
  components: {
  },
  mounted(){
  },
  data(){
    return{
      showRegister: false,

      inputs: {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        c_password: ''
      }
    }
  },
  methods:{
    changeReg(){
      this.showRegister = !this.showRegister
    },
    async signUp(){
      let res = await service.signUp(this.inputs.first_name, this.inputs.last_name, 
                                    this.inputs.email, this.inputs.password, this.inputs.c_password)
      console.log(res.data.msg);

      this.inputs = {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        c_password: ''
      }
    }
  }
}
</script>