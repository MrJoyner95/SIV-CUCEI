<template>
  <div>
    <!-- <div class="div_fondo_udg"> -->

      <!-- Academicos -->
      <div v-if="trabajador.tipo === 'AA'">
        <Viaticos/>
      </div>

      <!-- Rangos Medios -->
      <div v-else-if="trabajador.tipo === 'RM'">
        <!-- <h1>RANGOS MEDIOS</h1> -->

        <!-- 
          Cambia de vista dependiendo si tiene la funcion de aprobar solicitudes o no.
          Si el objeto JSON que recibe al iniciar sesion contiene el objeto "solicitudesPendientes", aun si es un arreglo vacio,
          el usuario tiene la funcion de aprobar solicitudes. Si el objeto es null, no.
         -->
        <div v-if="solicitudesPendientes != null">
          <Solicitudes/>
        </div>
        <!-- Si no tiene el privilegio de aprobar solicitudes, se muestra la vista de viatios -->
        <div v-else>
          <Viaticos/>
        </div>
      </div>

      <!-- Directivos -->
      <div v-else-if="trabajador.tipo === 'DD'">
        <h1>RANGOS MEDIOS</h1>
      </div>

      

      <!-- <h4>{{trabajador}}</h4>
      <br>
      <br>
      <div v-if="comisionActiva != null">
        <h4>{{comisionActiva}}</h4>
      </div>
      <div v-else>
        <h4> SIN COMISION ACTIVA </h4>
      </div> -->
      

    <!-- </div> -->
  </div>
</template>





<script>
// Propiedades:
import { mapState } from "vuex";

// Vistas:
import Viaticos from "@/views/Viaticos.vue";
import Solicitudes from "@/views/Solicitudes.vue";

// Componentes:
import FormComision from "@/components/FormComision.vue";
import FormViaticos from "@/components/FormViaticos.vue";


// Atributos:
export default {
  name: "home",
  computed:{
    ...mapState({
      trabajador: "trabajador",
      comisionActiva: "comisionActiva",
      solicitudesPendientes: "solicitudesPendientes",
    })
  },
  components: {
    Viaticos,
    Solicitudes,

    FormComision,
    FormViaticos,
  },
  data() {
    return {
      mostrarFormComision: false,
      mostrarFormComisionAbierta: false,
      
    };
  },
  methods: {}
};
</script>





<style>

</style>


