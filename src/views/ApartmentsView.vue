<template>
  <div class="section-div d-flex j-center mt-5">
    <div class="filters">
      <span class="section-title">FIlters</span>
    </div>
    <div class="list-container">
      <ApartmentsList :apartments="apartments"/>
    </div>
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
    this.route_data = JSON.parse(this.$route.params.data)
    this.getApartments()
  },
  data(){
    return{
      route_data: {},

      apartments: []
    }
  },
  methods:{
    async getApartments(){
      let res = await service.getApartments(this.route_data.des_id, this.route_data.check_in, this.route_data.check_out)
      console.log(res);
      this.apartments = res
    }
  }
}
</script>
<style>
.filters{
  width: 30%;
  height: 30rem;
  border: 2px solid gray;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 1rem;
  min-width: 13rem;
}
.list-container{
  width: 70%;
  min-width: 35rem;
}
.apa-container{
  display: flex;
  justify-content: center;
  padding-left: 15rem;
  padding-right: 15rem;
}
</style>