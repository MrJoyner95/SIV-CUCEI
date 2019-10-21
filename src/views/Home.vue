<template>
  <div>
    <div class="div_fondo_udg">

      <!-- Academicos -->
      <div v-if="trabajador.tipo === 'AA'">
        <Viaticos/>
      </div>

      <!-- Rangos Medios -->
      <div v-else-if="trabajador.tipo === 'RM'">
        <h1>RANGOS MEDIOS</h1>
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
      

    </div>
  </div>
</template>





<script>
// Propiedades:
import { mapState } from "vuex";

// Vistas:
import Viaticos from "@/views/Viaticos.vue";

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
      
    })
  },
  components: {
    Viaticos,
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


