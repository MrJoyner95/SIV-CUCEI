<template>
  <div>
    <div class="div_fondo_udg">

      <!-- Vista General -->
      <template v-if="usuario.tipo === 'AA'">
        <h1>ACADEMICOS</h1>
      </template>
      <template v-else-if="usuario.tipo === 'RM'">
        <h1>RANGOS MEDIOS</h1>
      </template>
      <template v-else>
        <!-- <div class="d-flex align-items-center">
          <strong>ModalCargando...</strong>
          <b-spinner variant="success" type="grow" label="Spinning"></b-spinner>
        </div> -->
        <ModalCargando/>

      </template>

    </div>
  </div>
</template>





<script>
// Propiedades:
import { mapState } from "vuex";

// Componentes:
import NavBar from "@/components/NavBar.vue";
import FormComision from "@/components/FormComision.vue";
import FormViaticos from "@/components/FormViaticos.vue";

import ModalCargando from "@/components/ModalCargando.vue";

// Atributos:
export default {
  name: "home",



  computed:{
    ...mapState({
      usuario: "usuario"
    })
  },



  components: {
    NavBar,
    FormComision,
    FormViaticos,

    ModalCargando
  },
  data() {
    return {
      mostrarFormComision: false,
      mostrarFormComisionAbierta: false,
      
      formComisionVisible: {
        type: Boolean,
        default: false
      },
      formViaticosVisible: false,

      // Comision de prueba
      comisionPrueba: {
        folio: "000735",
        fecha: "08/08/2019",
        codigoTrabajador: "211693563",
        nombreSolicitante: "Octavio Romo",
        areaAdscripcion: "N/A",
        tipoComision: "Conferencia",
        destinoComision: "Turquia",
        plazaLaboral: "Investigador",
        justificacion: ` Quiero ir a una conferencia.
        Necesito dinero.
        Tenkiu :)
        `,
        programaTrabajo: "N/A",
        objetivoTrabajo: "Pues aprender cosas, dah...",
        eventoComision: "Comic-Con Estambul 2019",
        programaComision: [
          {
            dia: "15/09/2019",
            lugar: "Estambul, Turquia.",
            tareas: "Pensar"
          },
          {
            dia: "16/09/2019",
            lugar: "Estambul, Turquia.",
            tareas: "Y trabajar"
          }
        ]
      }

    };
  },
  methods: {}
};
</script>





<style>

</style>


