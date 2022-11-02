import { createStore } from 'vuex'

export default createStore({
  state: {
    user: {
      rol_id: null,
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
    }
  },
  modules: {
  }
})
