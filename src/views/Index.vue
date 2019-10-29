<template>
  <div>

    <!-- Redireccionamiento de la ruta / -->
    <div v-if="trabajador == null" >
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

// Atributos:
export default {
  name: 'index',
  computed: {
    ...mapState({
      trabajador: "trabajador",
    })
  },
  components: {
    Login,
    Home,
  }


  
  ,created: function () {
    console.log("index");
  },



}
</script>





<style>

</style>


