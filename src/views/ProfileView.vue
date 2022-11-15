<template>
  <div id="data-holder">
    <div id="pic-holder">
        
    </div>
    <h2 id="user-name">Ime Prezime</h2>
    <h3 id="user-email">Email adresa</h3>
    <h3 id="num-of-res">Broj aktivnih rezervacija: <span>1</span></h3>
  </div>
</template>

<script>
export default {

}
</script>

<style>

    #data-holder{
        background:  rgb(249, 245, 235);;
        border: 1px solid #000;
        width: 40%;
        height: 100vh;
        position: relative;
    }
    #pic-holder{
        width: 100px;
        height: 100px;
        border: 1px solid #000;
        border-radius: 50%;
        position: absolute;
        left: 20px;
        top: 20px;
    }
    #user-name{
        font-family: sans-serif;
        position: absolute;
        top: 130px;
        left: 20px;
    }
    #user-email{
        position: absolute;
        top: 160px;
        left: 20px;
    }
    #num-of-res{
        position: absolute;
        top: 190px;
        left: 20px;
    }
</style>