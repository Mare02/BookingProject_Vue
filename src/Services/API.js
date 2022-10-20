import axios from 'axios'
const api_url = 'http://908q122.e2.mars-hosting.com/booking/'

const utils = {
  "getApartments": async function(des_id, check_in_date, check_out_date){
    try {
      const res = await axios.get(`${api_url + 'apartments'}`, 
        {params:{des_id: des_id, check_in: check_in_date, check_out: check_out_date}}
      )
      return res.data.data
    } 
    catch (error) {
      return error
    }
  },
  "signUp": async function(firstName, lastName, email, password, confirm_password){
    try {
      let res = await axios.post(`${api_url + 'auth/signup'}`, {
        firstname: firstName, lastname: lastName, email: email, password: password, cpassword: confirm_password
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
  }
}

export default utils 