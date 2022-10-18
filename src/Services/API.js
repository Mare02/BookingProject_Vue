import axios from 'axios'
const api_url = 'http://908q122.e2.mars-hosting.com/booking/'

const utils = {
  "getApartments": async function(des_id, check_in_date, check_out_date){
    try {
      const res = await axios.get(`${api_url + 'apartments'}`, 
        {params:{des_id: des_id, check_in: check_in_date, check_out: check_out_date}}
      )
      console.log(res);
      return res.data.data
    } 
    catch (error) {
      console.log(error);
    }
  },
  // "signUp": async function(firstname, lastname, email, password){
  //   try {
  //     await axios.post(`${api_url + 'auth/signup'}`)
  //   } 
  //   catch (error) {
  //     console.log(error); 
  //   }
  // }
}

export default utils 