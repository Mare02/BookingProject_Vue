<template>
  <div>
    Hotel {{this.$route.params.id}}
  </div>
</template>

<script>
export default{
    data(){
      return{
        route_params: {}
      }
    },
    mounted(){

    }
}
</script>