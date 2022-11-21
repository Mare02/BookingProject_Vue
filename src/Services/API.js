import axios from 'axios';
const api_url = 'http://908q122.e2.mars-hosting.com/booking/';
const bing_maps_key = 'AgHPai2_f_uHB1ftS5vQLzvSRcP7qgGW-lxFGSof_AULvD3eRtywQLjFgB-DYU8F';

const utils = {
  "getApartments": async function(hot_id, check_in_date, check_out_date, randQ, limitQ){
    try {
      const res = await axios.get(`${api_url + 'apartments'}`, 
        {params:{hot_id: hot_id, check_in: check_in_date, check_out: check_out_date, randQ: randQ, limitQ: limitQ}}
      )
      return res.data.data
    } 
    catch (error) {
      return error
    }
  },
  "deleteApartments": async function(cat_id, hot_id){
    try {
      const res = await axios.delete(`${api_url + 'apartments'}`, 
        {params:{cat_id: cat_id, hot_id: hot_id}}
      )
      return res
    } 
    catch (error) {
      return error
    }
  },
  "getHotels": async function(des_id, check_in, check_out, start_price, end_price, features, luxury, page, sortParam){
    try {
      const res = await axios.get(`${api_url + 'hotels'}`, {params:{
        des_id: des_id, check_in: check_in, check_out: check_out, 
        start_price: start_price, end_price: end_price, features: features,
        luxury: luxury, page: page, sortParam: sortParam
      }})
      return res.data
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
      return res
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
  async logOut(sid){
    try {
      let res = await axios.post(`${api_url + 'auth/logout'}`,{
        sid: sid
      })
      return res
    } 
    catch (error) {
      return error
    }
  },
  "checkSession": async function(sid){
    try {
      const res = await axios.get(`${api_url + 'auth/checkSession' }`, {params: {sid: sid}})
      return res
    } 
    catch (error) {
      return error
    }
  },
  "getUser": async function(user_id){
    try {
      const res = await axios.get(`${api_url + 'users/' + user_id}`)
      return res
    } 
    catch (error) {
      return error
    }
  },
  "getReservations": async function(user_id){
    try {
      const res = await axios.get(`${api_url + 'reservations'}`, {params: {usr_id: user_id}})
      return res
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
  "getDestinationsById": async function(sta_id, randQ){
    try {
      let res = await axios.get(`${api_url + 'destinations'}`, {
        params:{sta_id: sta_id, randQ: randQ}
      })
      return res
    } 
    catch (error) {
      return error  
    }
  },
  "getHotelFeatures": async function(){
    try {
      let res = await axios.get(`${api_url + 'features'}`)
      return res.data.data
    } 
    catch (error) {
      return error
    }
  },
  "getApaFeatures": async function(){
    try {
      let res = await axios.get(`${api_url + 'features'}`)
      return res.data.data
    } 
    catch (error) {
      return error
    }
  },
  "getTypes": async function(){
    try {
      let res = await axios.get(`${api_url + 'hotels/types'}`)
      return res.data.data
    } 
    catch (error) {
      return error
    }
  },
  "getSubtypes": async function(id){
    try {
      let res = await axios.get(`${api_url + 'hotels/types/subtypes'}`, {params:{type_id: id}})
      return res
    } 
    catch (error) {
      return error
    }
  },
  "getCategories": async function(){
    try {
      let res = await axios.get(`${api_url + 'apartments/categories'}`)
      return res.data.data
    } 
    catch (error) {
      return error
    }
  },
  "getLocations": async function(query){
    try {
      let res = await axios.get(`http://dev.virtualearth.net/REST/v1/Locations?query=${query}&key=${bing_maps_key}`)
      return res
    } 
    catch (error) {
      return error
    }
  },

  "addNewHotel": async function(params_obj){
    try {
      let res = await axios.post(`${api_url + 'hotels'}`, params_obj)
      console.log(res);
      return res
    } 
    catch (error) {
      return error
    }
  },
  "addNewApartment": async function(params_obj){
    try {
      let res = await axios.post(`${api_url + 'apartments'}`, params_obj)
      console.log(res);
      return res
    } 
    catch (error) {
      return error
    }
  }
}

export default utils 