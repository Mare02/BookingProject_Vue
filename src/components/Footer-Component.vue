<template>
  <div class="footer-container p-rel after-line">
    <div class="d-flex a-top j-center pr-1 pl-1 mt-2 g-2 f-wrap">
      <div class="footer-section">
        <span class="footer-title footer-title-bg mb-05">Team</span>
        <div class="footer-text">
          <span>Marko Obradovic</span>
          <span>Vuk Rajovic</span>
          <span>Rade Calic</span>
        </div>
      </div>
      <div class="footer-section">
        <span class="footer-title footer-title-bg mb-05">About us</span>
        <div class="footer-text">
          INNOVA.com gives travellers one of the widest selections of accommodation on the net, including both 
          independent and major chain hotels as well as self-catering in over hundreds of thousands properties worldwide. 
          The company offers a one-stop shopping source for hotel pricing, amenities and availability.
        </div>
      </div>
      <div class="footer-section">
        <span class="footer-title footer-title-bg mb-05">Contact</span>
        <div class="footer-text">
          <span>+381600324965</span>
          <span>innovaBooking@gmail.com</span>
        </div>
      </div>
    </div>
    <div class="d-flex mt-3 a-center j-center">
      <span class="footer-title mb-1 d-flex a-center">
        © Copyright&nbsp;&nbsp;<span class="logo-span-part">INN</span>OVA&nbsp;&nbsp;2022.
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
    box-shadow: 0px -10px 5px 1px rgb(0, 0, 0, .2);
    margin-top: 5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    font-size: 1rem;
  }
  .footer-container *, .footer-container .logo-span-part{
    font-family: 'Montserrat', sans-serif;
    font-weight: 500 !important;
    text-shadow: 0 5px 5px black;
  }
  .footer-section{
    max-width: 40%;
    display: flex;
    flex-direction: column;
  }
  .footer-title{
    font-size: 1.1rem;
    font-weight: 600;    
  }
  .footer-text{
    opacity: 0.9;
    display: flex;
    flex-direction: column;
    gap: .3rem;
  }
  .footer-title-bg{
    background-color: rgb(66, 66, 105);
    padding: .5rem;
    border-radius: 10px;
    width: fit-content;
  }
</style>