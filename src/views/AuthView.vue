<template>
<div class="auth-container">
  <div class="auth-content">
    <div class="inputs-wrapper">
      <span class="title" v-if="!showRegister">Sign In</span>
      <span class="title" v-if="showRegister">Sign Up</span>
      <div class="inputs">
        <transition>
          <div class="input-div" v-if="showRegister">
            <label>First name:</label>
            <input type="text" v-model="inputs.first_name"
              :class="{error: v$.inputs.first_name.$errors.length}">
            <span v-for="error in v$.inputs.first_name.$errors" :key="error" class="error-msg">{{error.$message}}</span>
          </div>
        </transition>
        <transition>
          <div class="input-div" v-if="showRegister">
            <label>Last name:</label>
            <input type="text" v-model="inputs.last_name"
              :class="{error: v$.inputs.last_name.$errors.length}">
            <span v-for="error in v$.inputs.last_name.$errors" :key="error" class="error-msg">{{error.$message}}</span>
          </div>
        </transition>
        <div class="input-div">
          <label>Email:</label>
          <input type="text" v-model="inputs.email"
            :class="{error: v$.inputs.email.$errors.length}">
          <span v-for="error in v$.inputs.email.$errors" :key="error" class="error-msg">{{error.$message}}</span>
        </div>
        <div class="input-div">
          <label>Password: </label>
          <input type="password" v-model="inputs.password" id="password"
            :class="{error: v$.inputs.password.$errors.length}">
          <div class="show-pass-div">
            <input type="checkbox" @click="showPass()">
            <span>show password</span>
          </div>
          <span v-for="error in v$.inputs.password.$errors" :key="error" class="error-msg">{{error.$message}}</span>
        </div>
        <transition>
          <div class="input-div" v-if="showRegister">
            <label>Confirm password:</label>
            <input type="password" v-model="inputs.c_password" id="password-co"
              :class="{error: v$.inputs.c_password.$errors.length}">
            <span v-for="error in v$.inputs.c_password.$errors" :key="error" class="error-msg">{{error.$message}}</span>
          </div>
        </transition>
      </div>
      <span class="error-msg">{{api_error_msg}}</span>
      <button  class="login-btn" v-if="!showRegister" @click="logIn()">Sign In</button>
      <button type="submit" class="register-btn" v-if="showRegister" @click="signUp()">Submit</button>
      <div class="reg-option" v-if="!showRegister">
        <span>Dont't have an account?</span>
        <button @click="changeReg()">Sign Up</button>
      </div>
      <div class="log-option" v-if="showRegister">
        <span>Already have an account?</span>
        <button @click="changeReg()">Sign In</button>
      </div>
    </div>
  </div>
  <div class="auth-img d-flex a-center j-center">
    <img class="bg-img" src="../assets/hotel_room.jpg" alt="">
    <div class="d-flex f-col">
      <span class="logo"><span class="logo-span-part">INN</span>OVA</span>
      <span class="section-title">Find your perfect <span class="logo-span-part">INN</span>.</span>
    </div>
  </div>
</div>
</template>

<script>
import service from '../services/API'
import useVuelidate from '@vuelidate/core'
import { required, email, minLength, sameAs, helpers } from '@vuelidate/validators'

export default {
  name: 'AuthView',
  components: {
  },
  mounted(){
    
  },
  data(){
    return{
      showRegister: false,
      api_error_msg: '',

      v$: useVuelidate(),
      inputs: {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        c_password: ''
      }
    }
  },
  validations(){
    return{
      inputs: {
        first_name: {required},
        last_name: {required},
        email: {required, email},
        password: {required, minLength: minLength(8)},
        c_password: {required, minLength: minLength(8), sameAs: helpers.withMessage('Passwords do not match!', sameAs(this.inputs.password))}
      }
    }
  },
  methods:{
    changeReg(){
      this.showRegister = !this.showRegister
      this.passMatch = true
      this.api_error_msg = ''
      this.v$.$reset()
    },
    async signUp(){
      this.v$.$validate()
      if(!this.v$.$error){
        for(let el in this.inputs){
          this.inputs[el].trim()
        }
        const res = await service.signUp(this.inputs.first_name, this.inputs.last_name, 
                                    this.inputs.email, this.inputs.password, this.inputs.c_password)
        if(res.status !== 200) this.api_error_msg = res.response.data.msg;
        else{
          this.api_error_msg = '';
          this.changeReg()
        }
      }
    },
    async logIn(){
      console.log(this.v$);
      this.v$.$validate(this.inputs.email, this.inputs.password)
      if(!this.v$.inputs.email.$error && !this.v$.inputs.password.$error){
        for(let el in this.inputs){
          this.inputs[el].trim()
        }
        const res = await service.logIn(this.inputs.email, this.inputs.password)
        if(res.status !== 200) this.api_error_msg = res.response.data.msg;
        else{
          localStorage.setItem('sid', res.data.sid)
          this.api_error_msg = '';
          if(localStorage.getItem('log_error')){
            this.$router.push({name: 'hotel', params:{hot_id: parseInt(localStorage.getItem('hot_id'))}})
          }
          else{
            this.$router.push({name: 'home'})
          }
        } 
      }
    },
    showPass(){
      const pass = document.getElementById("password");
      const pass_co = document.getElementById('password-co')
      if (pass.type === "password") {
        pass.type = "text";
        if(pass_co) pass_co.type = "text";
      } 
      else {
        pass.type = "password";
        if(pass_co) pass_co.type = "password";
      }
    },
  }
}
</script>