<template>
  <div id="navBar">

    <!-- Navbar -->
    <div>
      <!-- <b-navbar type="dark" variant="dark"> -->
      <b-navbar type="dark" class="nav-background">

          <b-navbar-brand href="#/login">
          <img src="@/assets/icons/siv-logo.png" alt="SIV CUCEI" height="30" width="30">
          SIV CUCEI
          </b-navbar-brand>
          
          <!-- Elementos alineados a la izquierda -->
          <b-navbar-nav>
            <b-nav-item href="#/">Inicio</b-nav-item>
          </b-navbar-nav>

          <!-- Elementos alineados a la derecha -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown text="Usuario" right>
              <b-dropdown-item href="#">Configuración</b-dropdown-item>
              <b-dropdown-item href="#">Cerrar Sesión</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
          
      </b-navbar>
    </div>

    <router-view></router-view>

  </div>
</template>



<script>
export default {
  
}
</script>



<style>
.nav-background{
  background: #20603C;
}

/* 
  * Fuente:
*/
@import url('https://fonts.googleapis.com/css?family=Lato:400,700');

body{
  /* background: #F8FAF0; */
  font-family: 'Lato', sans-serif;
}
</style>


