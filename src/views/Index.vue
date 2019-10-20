<template>
  <div class="home">

    <!-- Barra de navegacion -->
    <!-- <NavBar/> -->

    <!-- <router-view></router-view> -->

    <!-- Homes de usuarios -->
    <!-- <div v-if= "tipoUsuario === 'profesor' || tipoUsuario === 'profesor2' || tipoUsuario === 'profesor3'" >
      <HomeProfesor/>
    </div>
    <div v-else-if= "tipoUsuario === 'rectora'">
      <HomeRectora/>
    </div>
    <div v-else-if= "tipoUsuario === 'jefe'">
      <HomeJefeDep/>
    </div>
    <div v-else>
      <Login/>
    </div> -->



    <!-- <div v-if= "tipoUsuario === 'profesor' || tipoUsuario === 'profesor2' || tipoUsuario === 'profesor3'" >
      <HomeProfesor/>
    </div>
    <div v-else-if= "tipoUsuario === 'rectora'">
      <HomeRectora/>
    </div>
    <div v-else-if= "tipoUsuario === 'jefe'">
      <HomeJefeDep/>
    </div>
    <div v-else>
      <HomeProfesor/>
    </div> -->



    <!-- Redireccionamiento de la ruta / -->
    <div v-if= "trabajador.codigo == null || trabajador.codigo == undefined" >
      <Login/>
    </div>
    <div v-else>
      <Home/>
    </div>

    
  </div>
</template>





<script>
// Propiedades:
import { mapState } from 'vuex'

// Vistas:
import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'


import HomeProfesor from '@/views/HomeProfesor.vue'
// import HomeProfesor from '@/views/HomeProfesor_NEW.vue'
import HomeRectora from '@/views/HomeRectora.vue'
import HomeJefeDep from '@/views/HomeJefeDep.vue'

// Componentes:
import NavBar from '@/components/NavBar.vue'
import Null from '@/components/Null.vue'

export default {
  name: 'index',
  computed: {
    ...mapState([
      'trabajador',
      'tipoUsuario'
    ]),
    // otras propiedades
  },
  components: {
    Login,
    Home, 

    NavBar,
    Null,
    HomeProfesor,
    HomeRectora,
    HomeJefeDep
  }
}
</script>





<style>

</style>


