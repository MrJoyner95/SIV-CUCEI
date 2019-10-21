<template>
  <div id="navBar">

    <b-navbar type="dark" class="nav-background">
      <b-navbar-brand href="#/login">
      <img src="@/assets/images/logo.png" alt="SIV CUCEI" height="30" width="30">
        SIV CUCEI
      </b-navbar-brand>
      
      <!-- El usuario ha iniciado sesion -->
      <template v-if="trabajador != null">
        <div v-if="trabajador.tipo === 'DD'">
          <!-- Directivos -->
          <b-navbar-nav>
            <b-nav-item href="#/">Inicio</b-nav-item>
            <b-nav-item href="#/historicos">Históricos</b-nav-item>
            <b-nav-item href="#/viaticos">Viáticos</b-nav-item>
            <b-nav-item href="#/aportaciones">Aportaciones</b-nav-item>
            <b-nav-item href="#/estadisticas">Estadísticas</b-nav-item>
          </b-navbar-nav>
        </div>
        <div v-else-if="trabajador.tipo === 'RM'">
          <!-- Rangos Medios -->
          <b-navbar-nav>
            <b-nav-item href="#/">Inicio</b-nav-item>
            <b-nav-item href="#/historicos">Históricos</b-nav-item>
            <b-nav-item href="#/viaticos">Viáticos</b-nav-item>
            <b-nav-item href="#/aportaciones">Aportaciones</b-nav-item>
          </b-navbar-nav>
        </div>
        <div v-else-if="trabajador.tipo === 'AA'">
          <!-- Academicos -->
          <b-navbar-nav>
            <b-nav-item href="#/">Inicio</b-nav-item>
          </b-navbar-nav>
        </div>

        <!-- Perfil y cuenta -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown text="Usuario" right>
            <b-dropdown-item href="#">Perfil</b-dropdown-item>
            <b-dropdown-item href="#">Cerrar Sesión</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </template>
    </b-navbar>

  </div>
</template>



<script>
// Propiedades:
import { mapState } from 'vuex'

export default {
  name: 'navBar',
  computed: {
    ...mapState({
      trabajador: "trabajador",
    })
  }
}
</script>



<style>
.nav-background{
  background: #20603C;
}
</style>


