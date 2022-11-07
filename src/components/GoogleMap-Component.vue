<template>
  <div id="map">
    test google map
  </div>
</template>


<script>
  export default{
    props:['lat', 'lng'],
    methods:{
      initMap(){
        console.log('map');
      }
    }
  }
</script>

<style>
</style>