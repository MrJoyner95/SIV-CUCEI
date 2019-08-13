<template>
  <div id="app">

    <!-- Barra de navegacion -->
    <NavBar/>

    <!-- Objeto del Router -->
    <router-view/>

    <!-- Footer -->
    <!-- <Footer/> -->

  </div>
</template>



<script>

// Componentes:
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'


export default {
  components: {
    NavBar,
    Footer
  }
}
</script>



<style>
/* 
  * Fuente:
*/
@import url('https://fonts.googleapis.com/css?family=Lato:400,700');

body{
  font-family: 'Lato', sans-serif;
}
</style>
