<template>
  <div class="d-flex j-center">
    <ApartmentsList :apartments="apartments"/>
  </div>
</template>
<script>
import service from '../services/API'
import ApartmentsList from '../components/ApartmentsList.vue'

export default{
  components:{
    ApartmentsList
  },
  mounted(){
    this.data = JSON.parse(this.$route.params.data)
    this.getApartments()
  },
  data(){
    return{
      data: {},

      apartments: []
    }
  },
  methods:{
    async getApartments(){
      let res = await service.getApartments(this.data.des_id, this.data.check_in, this.data.check_out)
      console.log(res);
      this.apartments = res
    }
  }
}
</script>