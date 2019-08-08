<template>
  <div class="home">

    <!-- Barra de navegacion -->
    <NavBar/>

    <!-- Home por usuario -->
    <div v-if= "tipoUsuario === 'profesor' || tipoUsuario === 'profesor2'" >
      <Profesor/>
    </div>
    <div v-else-if= "tipoUsuario === 'rectora'">
      <Rectora/>
    </div>
    <div v-else>
      <Null/>
    </div>
    
  </div>
</template>





<script>
// Propiedades:
import { mapState } from 'vuex'

// Vistas:
import Profesor from '@/views/Profesor.vue'
import Rectora from '@/views/Rectora.vue'

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
    Null,
    Profesor,
    Rectora
  }
}
</script>
