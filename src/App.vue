<template>
  <div id="app">

    <!-- Barra de navegacion -->
    <NavBar/>

    <!-- Objeto del Router -->
    <router-view/>

    <!-- Footer -->
    <Footer/>

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



/* 
 * Estilos Globales:
*/
.titulo {
  color: #20603c;
}

.div_fondo_udg {
  /* border: 2px solid black; */
  padding: 25px;
  background: url("./assets/images/fondo_udg.png") no-repeat center center fixed;
  background-repeat: no-repeat;
  background-size: 250px;
  /* opacity: .95; */
  min-height: 94vh;
  /* height: 100%; */
}



/* 
 * Animaciones Globales:
*/
.fade-in-top {
	animation: fade-in-top 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
}

@keyframes fade-in-top {
  0% {
    transform: translateY(-50px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}



.fade-out-top {
	animation: fade-out-top 0.6s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

@keyframes fade-out-top {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(-50px);
    opacity: 0;
  }
}

</style>
