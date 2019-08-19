<template>
  <div class="viaticos">

    <b-container>
      
      

      <!-- Vista general -->
      <b-row align-h="center" class="mt-5">
        <b-col cols="10">
          <b-card>
            <b-row>

              <b-col md="7">
                <h4 class="mb-3 titleColor">Viáticos</h4>

                <template v-if="tipoUsuario === 'jefe'">
                  <b-card-text>Usted cuenta con una comisión abierta, por lo que no podrá solicitar una nueva comisón hasta que la finalice.
                    <br><br>Puede consultar los detalles de la misma a continuación:
                  </b-card-text>
                  <a
                    href="#"
                    v-on:click="mostrarFormComisionAbierta = true; formComisionVisible = true"
                    class="card-link"
                  >Comisión {{ comisionPrueba.folio }} 
                    <b-badge variant="primary">Pendiente</b-badge>
                  </a>
                </template>

                <template v-else>
                  <b-card-text>Actualmente usted no cuenta con una comisión. Puede abrir una comisión haciendo clic en el botón a continuación:</b-card-text>
                  <b-button v-on:click="mostrarFormComision = true; formComisionVisible = true" variant="outline-primary">Crear comisión</b-button>
                </template>

              </b-col>

              <b-col md="5">
                <h5 align="left" class="titleColor"> Historial de comisiones: </h5>
                <b-list-group>
                  <b-list-group-item href="#" @click="mostrarFormComisionAbierta = true; formComisionVisible = true">Comisión 000831 (Italia)</b-list-group-item>
                  <b-list-group-item href="#" @click="mostrarFormComisionAbierta = true; formComisionVisible = true">Comisión 000795 (España)</b-list-group-item>
                </b-list-group>
              </b-col>

            </b-row>
          </b-card>
        </b-col>
      </b-row>
        


      <!-- Form comision vacia -->
      <transition enter-active-class="animated desliceInferior" leave-active-class="animated fade-out-top">
        <div v-if="mostrarFormComision == true">
          <b-row align-h="center" class="mt-5">
            <b-col cols="10">
              <FormComision titulo="Crear comision" :deshabilitado="false" />
            </b-col>
          </b-row>
        </div>
      </transition>

      <!-- Form comision abierta -->
      <transition enter-active-class="animation fade-in-top" leave-active-class="animated fade-out-top">
        <div v-if="mostrarFormComisionAbierta == true">
          <b-row align-h="center" class="mt-5">
            <b-col cols="10">
              <FormComision titulo="Detalles de la comisión" :deshabilitado="true" :comision_prop="comisionPrueba" />
            </b-col>
          </b-row>
        </div>
      </transition>



      <!-- Boton esconder comision -->
      <template v-if="formComisionVisible === true">
        <br>
        <b-row class="mt-2" align-h="center">
          <b-col cols="4">
            <b-button 
              block 
              variant="secondary" 
              v-on:click="mostrarFormComision = false; mostrarFormComisionAbierta = false; formComisionVisible = false"
            >
              Esconder formulario
            </b-button>
          </b-col>
        </b-row>
      </template>



      <!-- Comision autorizada (continuar a viaticos) -->
      <template v-if="tipoUsuario === 'profesor3' && formViaticosVisible === false">

        <hr class="mt-5">

        <b-row class="mt-4" align-h="center">
          <b-col cols="4">
            <b-button 
              block 
              variant="outline-primary" 
              v-on:click="formViaticosVisible = true"
            >
              Comenzar la solicitud de viáticos
            </b-button>
          </b-col>
        </b-row>

      </template>



      <!-- Form para viaticos -->
      <template v-if="formViaticosVisible === true">
        <hr class="mt-4">
        <b-row align-h="center" class="mt-5">
          <b-col cols="10">
            <FormViaticos/>
          </b-col>
        </b-row>
      </template>



      <br>
      <br>

    </b-container>
    
  </div>
</template>





<script>
// Propiedades:
import { mapState } from "vuex";

// Componentes:
import NavBar from "@/components/NavBar.vue";
import FormComision from "@/components/FormComision.vue";
import FormViaticos from "@/components/FormViaticos.vue";

// Atributos:
export default {
  name: "home",
  computed: {
    ...mapState(["tipoUsuario"])
    // otras propiedades
  },
  components: {
    NavBar,
    FormComision,
    FormViaticos
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


