<template>
  <div id="navBar">



    <div v-if= "tipoUsuario === 'jefe'">

      <!-- Barra de mandos medios y superiores -->
      <b-navbar type="dark" class="nav-background">
        <b-navbar-brand href="#/login">
        <img src="@/assets/images/logo.png" alt="SIV CUCEI" height="30" width="30">
          SIV CUCEI
        </b-navbar-brand>
        
        <!-- Elementos alineados a la izquierda -->
        <b-navbar-nav>
          <b-nav-item href="#/">Inicio</b-nav-item>
          <b-nav-item href="#/historicos">Históricos</b-nav-item>
          <b-nav-item href="#/viaticos">Viáticos</b-nav-item>
          <b-nav-item href="#/aportaciones">Aportaciones</b-nav-item>
        </b-navbar-nav>

        <!-- Elementos alineados a la derecha -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown text="Usuario" right>
            <b-dropdown-item href="#">Perfil</b-dropdown-item>
            <b-dropdown-item href="#">Cerrar Sesión</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-navbar>
      
    </div>
    <div v-else-if= "tipoUsuario === 'rectora'">

      <!-- Barra de rectora -->
      <b-navbar type="dark" class="nav-background">
        <b-navbar-brand href="#/login">
        <img src="@/assets/images/logo.png" alt="SIV CUCEI" height="30" width="30">
          SIV CUCEI
        </b-navbar-brand>
        
        <!-- Elementos alineados a la izquierda -->
        <b-navbar-nav>
          <b-nav-item href="#/">Inicio</b-nav-item>
          <b-nav-item href="#/historicos">Históricos</b-nav-item>
          <b-nav-item href="#/viaticos">Viáticos</b-nav-item>
          <b-nav-item href="#/aportaciones">Aportaciones</b-nav-item>
          <b-nav-item href="#/">Estadísticas</b-nav-item>
        </b-navbar-nav>

        <!-- Elementos alineados a la derecha -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown text="Usuario" right>
            <b-dropdown-item href="#">Perfil</b-dropdown-item>
            <b-dropdown-item href="#">Cerrar Sesión</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-navbar>
      
    </div>
    <div v-else>

      <!-- Barra de rectora -->
      <b-navbar type="dark" class="nav-background">
        <b-navbar-brand href="#/login">
        <img src="@/assets/images/logo.png" alt="SIV CUCEI" height="30" width="30">
          SIV CUCEI
        </b-navbar-brand>
        
        <!-- Elementos alineados a la izquierda -->
        <b-navbar-nav>
          <b-nav-item href="#/">Inicio</b-nav-item>
        </b-navbar-nav>

        <!-- Elementos alineados a la derecha -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown text="Usuario" right>
            <b-dropdown-item href="#">Perfil</b-dropdown-item>
            <b-dropdown-item href="#">Cerrar Sesión</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-navbar>
      
    </div>



  </div>
</template>



<script>
// Propiedades:
import { mapState } from 'vuex'

export default {
  name: 'navBar',
  computed: {
    ...mapState([
      'tipoUsuario'
    ]),
    // otras propiedades
  }
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


