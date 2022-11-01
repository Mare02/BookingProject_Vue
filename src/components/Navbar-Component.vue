<template>
  <div class="navbar">
    <div class="nav-title">
      <span @click="redirectHome()" class="logo-span"><span class="logo-span-part">INN</span>OVA</span>
    </div>
    <div class="d-flex a-center div-rel">
      <nav class="nav-links">
        <button class="link" @click="showMenu()">Menu</button>
        <button class="link-signin" v-if="$route.path !== '/auth'" @click="redirectToAuth()">Sign In</button>
      </nav>
      <div v-if="showDropdown" class="dropdown">
        <ul>
          <li>
            <a href="">Menu item</a>
          </li>
          <li>
            <a href="">Menu item</a>
          </li>
          <li>
            <a href="">Menu item</a>
          </li>
          <li>
            <a href="">Menu item</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default{
  name: 'Navbar-Component',
  data(){
    return{
      showDropdown: false
    }
  },
  methods:{
    redirectToAuth(){
      this.$router.push({name: 'auth'})
    },
    redirectHome(){
      this.$router.push({name: 'home'})
    },
    showMenu(){
      this.showDropdown = !this.showDropdown
    }
  }
}

</script>

<style>
.div-rel{
  position: relative;
}
.dropdown{
  position: absolute;
  top: 4rem;
  right: 3rem;
  border: 1px solid rgb(77, 76, 125);
  border-radius: 10px;
  background: #fff;
  overflow: hidden;
  width: 10rem;
}
.dropdown ul{
  list-style: none;
}
.dropdown ul li{
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  cursor: pointer;
}
.dropdown ul li:hover{
  background: rgb(195, 195, 196);
}
.dropdown ul li a{
  color: rgb(77, 76, 125);
  text-decoration: none;
}


</style>