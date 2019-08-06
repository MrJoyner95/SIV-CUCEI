<template>
  <div>
    
    <!-- Navbar -->
    <div>
      <b-navbar type="dark" variant="dark">

          <b-navbar-brand href="#">SIV CUCEI</b-navbar-brand>
          
          <!-- Elementos alineados a la izquierda -->
          <b-navbar-nav>
            <b-nav-item href="#/home">Inicio</b-nav-item>
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



    <p>
      <!-- use router-link component for navigation. -->
      <!-- specify the link by passing the `to` prop. -->
      <!-- `<router-link>` will be rendered as an `<a>` tag by default -->
      <router-link to="/login">Login</router-link>
      <router-link to="/home">Home</router-link>
    </p>
    <!-- route outlet -->

    <!-- component matched by the route will render here -->
    <router-view>
      <div></div>
    </router-view>



  </div>
</template>

<script>
import login from './components/login'

export default {
  name: 'app',
  components: {
    login
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
