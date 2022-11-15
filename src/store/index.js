import { createStore } from 'vuex'

export default createStore({
  state: {
    user: {
      rol_id: null,
      usr_id: null,
      usr_email: 'testEmail',
      usr_firstname: null,
      usr_lastname: null
    }
  },
  getters: {
    getEmail(state){
      return state.user.usr_email
    },
    getFullName(state){
      return `${state.user.usr_firstname + ' ' + state.user.usr_lastname}`
    },
    getUserId(state){
      return state.user.usr_id
    }
  },
  mutations: {
  },
  actions: {
    setEmail(email_param){
      this.state.user.usr_email = email_param
    },
    setFullName(firstname_param, lastname_param){
      this.state.user.usr_firstname = firstname_param;
      this.state.user.usr_lastname = lastname_param
    },
    setRole(role_param){
      this.state.user.rol_id = role_param;
    },
    setUserId(usr_id){
      this.state.user.usr_id = usr_id
    }
  },
  modules: {
  }
})
