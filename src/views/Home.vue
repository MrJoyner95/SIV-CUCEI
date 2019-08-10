<template>
  <div class="home">

    <!-- Barra de navegacion -->
    <!-- <NavBar/> -->

    <!-- <router-view></router-view> -->

    <!-- Homes de usuarios -->
    <div v-if= "tipoUsuario === 'profesor' || tipoUsuario === 'profesor2' || tipoUsuario === 'profesor3'" >
      <HomeProfesor/>
    </div>
    <div v-else-if= "tipoUsuario === 'rectora'">
      <HomeRectora/>
    </div>
    <div v-else>
      <Login/>
    </div>
    
  </div>
</template>





<script>
// Propiedades:
import { mapState } from 'vuex'

// Vistas:
import Login from '@/views/Login.vue'
import HomeProfesor from '@/views/HomeProfesor.vue'
import HomeRectora from '@/views/HomeRectora.vue'

// Componentes:
import NavBar from '@/components/NavBar.vue'
import Null from '@/components/Null.vue'

export default {
  name: 'home',
  computed: {
    ...mapState([
      'tipoUsuario'
    ]),
    // otras propiedades
  },
  components: {
    NavBar,
    Login,
    Null,
    HomeProfesor,
    HomeRectora
  }
}
</script>





<style>
/**
 * Animaciones:
**/


</style>


