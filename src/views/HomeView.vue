<template>
<div>

</div>
</template>

<script>
import api_service from '../Services/API'

export default {
  name: 'HomeView',
  components: {
  },
  mounted(){
    api_service.getApartments(1, '2022-10-05', '2022-10-20')
  },
  data(){
    return{

    }
  },
  methods:{

  }
}
</script>
