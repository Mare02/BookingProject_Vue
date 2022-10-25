<template>
  <div>
    Hotel {{this.$route.params.id}}
    {{route_data}}
  </div>
</template>

<script>
export default{
    data(){
      return{
        route_data: {}
      }
    },
    mounted(){
      this.route_data = JSON.parse(this.$route.params.data_id)
    }
}
</script>