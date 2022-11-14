import { createStore } from 'vuex'

export default createStore({
  state: {
    user: {
      rol_id: null,
      usr_id: null,
      usr_email: 'test email',
      usr_firstname: null,
      usr_lastname: null
    }
  },
  getters: {
    getEmail(state){
      return state.user.usr_email
    },
    getName(state){
      return state.user.usr_firstname
    },
    getUserId(state){
      return state.user.usr_id
    },
  },
  mutations: {
  },
  actions: {
    setEmail(email_param){
      this.state.user.usr_email = email_param
    },
    setRole(role_param){
      this.state.user.rol_id = role_param;
    },
    setUserId(usr_id){
      console.log(usr_id);
      this.state.user.usr_id = usr_id
    }
  },
  modules: {
  }
})
