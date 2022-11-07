import axios from 'axios'
const api_url = 'http://908q122.e2.mars-hosting.com/booking/'

const utils = {
  "getApartments": async function(hot_id, check_in_date, check_out_date){
    try {
      const res = await axios.get(`${api_url + 'apartments'}`, 
        {params:{hot_id: hot_id, check_in: check_in_date, check_out: check_out_date}}
      )
      return res.data.data
    } 
    catch (error) {
      return error
    }
  },
  "getHotels": async function(des_id, check_in, check_out, start_price, end_price, features, luxury){
    try {
      const res = await axios.get(`${api_url + 'hotels'}`, {params:{
        des_id: des_id, check_in: check_in, check_out: check_out, 
        start_price: start_price, end_price: end_price, features: features,
        luxury: luxury
      }})
      console.log(res.data);
      return res.data.data
    } 
    catch (error) {
      return error
    }
  },
  "getHotelById": async function(id){
    try {
      const res = await axios.get(`${api_url + 'hotels/' + id}`)
      return res.data.data
    } 
    catch (error) {
      return error
    }
  },
  "makeReservation": async function(usr_id, apa_id, cat_id, hot_id, check_in, check_out){
    try {
      let res = await axios.post(`${api_url + 'reservations'}`, {
        usr_id: usr_id, apa_id: apa_id, hot_id: hot_id, check_in: check_in, 
        check_out: check_out, cat_id: cat_id
      })  
      return res.data.data
    } 
    catch (error) {
      return error
    }
  },
  "signUp": async function(firstName, lastName, email, password, confirm_password){
    console.log(arguments);
    try {
      let res = await axios.post(`${api_url + 'auth/signup'}`, {
        firstname: firstName, lastname: lastName, email: email, password: password, c_password: confirm_password
      })
      return res
    } 
    catch (error) {
      return error
    }
  },
  "logIn": async function(email, password){
    try{
      let res = await axios.post(`${api_url + 'auth/login'}`,{
        email: email, password: password
      })
      console.log(res);
      return res
    }
    catch (error) {
      return error
    }
  },
  "checkSession": async function(sid){
    try {
      const res = await axios.get(`${api_url + 'auth/checkSession' }`, {params: {sid: sid}})
      return res.data.data
    } 
    catch (error) {
      return error
    }
  },
  "searchDestinations": async function(search){
    try {
      let res = await axios.get(`${api_url + 'destinations/search'}`, {
        params:{search: search}
      })
      return res
    } 
    catch (error) {
      console.log(error);
      return error  
    }
  },
  "getDestinationsById": async function(sta_id){
    try {
      let res = await axios.get(`${api_url + 'destinations'}`, {
        params:{sta_id: sta_id}
      })
      return res.data.data
    } 
    catch (error) {
      return error  
    }
  },
  "getFeatures": async function(){
    try {
      let res = await axios.get('http://908q122.e2.mars-hosting.com/booking/features')
      return res.data.data
    } 
    catch (error) {
      return error
    }
  }
}

export default utils 