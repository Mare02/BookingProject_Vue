<template>
  <div class="footer-container">
    <div class="d-flex a-center j-evenly w-70 mt-2">
      <div class="footer-section">
        <span class="footer-title mb-1">Team</span>
        <div class="footer-text">
          <span>Marko Obradovic</span>
          <span>Vuk Rajovic</span>
          <span>Rade Obradovic</span>
        </div>
      </div>
      <div class="footer-section">
        <span class="footer-title mb-1">About us</span>
        <div class="footer-text">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor quis placeat pariatur.
        </div>
      </div>
      <div class="footer-section">
        <span class="footer-title mb-1">Lorem</span>
        <div class="footer-text">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor quis placeat pariatur.
        </div>
      </div>
    </div>
    <div class="d-flex mt-3 a-center j-center">
      <span class="footer-title mb-1 d-flex a-center">
        © Copyright&nbsp;&nbsp;<span class="logo-span-part">INN</span>OVA&nbsp;&nbsp;2022
      </span>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style>
  .footer-container{
    bottom: 0;
    width: 100%;
    background-color: var(--nav-bg-color);
    z-index: 20;
    border-top: 2px solid white;
    margin-top: 5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    font-family: 'Montserrat', sans-serif !important;
    font-size: 1rem;
  }
  .footer-section{
    width: 10rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .footer-title{
    font-size: 1.1rem;
  }
  .footer-text{
    opacity: 0.9;
    display: flex;
    flex-direction: column;
    gap: .3rem;
  }
</style>