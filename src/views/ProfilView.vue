<template>
<div class="d-flex f-row j-center a-center w-100 h-100">
    <div class="info">
      <div class="picture">
        <span>span</span>
      </div>
      <span>Spna</span>
    </div>  
    <div class="reservations">
      <span>Spna</span>
    </div>
  </div>

  
</template>
<script>


export default{


  name: 'ProfileView',
  components: {
  },
  
  setup() {
    
  },
  data(){
    return{

    }
  },
  methods:{

  }
}
</script>
<style scoped>
.info{
  width: 40%;
    height: 100vh
vh
;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(255, 255, 255);
}
.picture{
  background-color: red;
}
.reservations{
  width: 70%;
  height: 50%;
}



</style>