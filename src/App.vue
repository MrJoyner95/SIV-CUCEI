<template>
  <div id="app">

    <!-- Barra de navegacion -->
    <NavBar/>

    <!-- Objeto del Router -->
    <!-- <router-view/> -->

  </div>
</template>



<script>

// Componentes:
import NavBar from '@/components/NavBar.vue'


export default {
  components: {
    NavBar
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
