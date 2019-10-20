<template>
  <div class="viaticos">

    <b-container>
      
      <!-- Vista general -->
      <b-row align-h="center" class="mt-5">
        <b-col md="10">

          <b-card>
            <b-row>
              <b-col md="7">
                <h4 class="mb-3 titleColor">Viáticos</h4>

                <!-- Sin comision activa -->
                <div v-if="comisionActiva == null || comisionActiva == undefined">
                  <b-card-text>
                    Usted no cuenta con una comisión activa. Para solicitar viáticos es necesario crear una comisión.
                    <br>
                    <br>
                    Puede crear una comisión haciendo clic en el botón a continuación:
                  </b-card-text>
                  <b-button v-on:click="mostrarFormComision = true; formComisionVisible = true" variant="outline-primary">Crear comisión</b-button>
                </div>

                <!-- Comision No Enviada -->
                <div v-else-if="comisionActiva.estatus == 'NE'">
                  <b-card-text>
                    Usted cuenta con una comisión sin enviar, para continuar con el proceso de solicitud de viáticos debe completar la solicitud de la comisión y enviarla a revisión o cancelar la solicitud actual.
                    <br>
                    <br>
                    Por favor, complete su solicitud a continuación:
                  </b-card-text>
                </div>

                <!-- Comision Pendiente -->
                <div v-else-if="comisionActiva.estatus == 'PE'">
                  <b-card-text>
                    Usted cuenta con una comisión en proceso de autorización. Por favor, espere a que se resuelva la comisión actual para continuar con el proceso de solicitud de viáticos.
                    <br><br>
                    Puede consultar los detalles de la comisión a continuación:
                  </b-card-text>
                  <a
                    href="#"
                    v-on:click="mostrarFormComisionAbierta = true; formComisionVisible = true"
                    class="card-link"
                  >
                    Comisión {{ comisionActiva.folio }} <b-badge variant="primary">Pendiente</b-badge>
                  </a>
                </div>

                <!-- Comision Autorizada -->
                <div v-else-if="comisionActiva.estatus == 'AU'">
                  <b-card-text>Su solicitud de comisión ha sido autorizada. Continúe con la solicitud de viáticos haciendo clic en el botón inferior.
                    <br><br>Puede consultar los detalles de la misma a continuación:
                  </b-card-text>
                  <a
                    href="#"
                    v-on:click="mostrarFormComisionAbierta = true; formComisionVisible = true"
                    class="card-link"
                  >
                    Comisión {{ comisionActiva.folio }} <b-badge variant="success">Autorizada</b-badge>
                  </a>
                </div>

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





      <!-- Form Comision -->
      <transition enter-active-class="animated desliceInferior" leave-active-class="animated fade-out-top">
        <div v-if="mostrarFormComision == true">
          <b-row align-h="center" class="mt-5">
            <b-col cols="10">
              <FormComision titulo="Crear comision" :deshabilitado="false" />
            </b-col>
          </b-row>
        </div>
      </transition>

        


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
import FormComision from "@/components/FormComision.vue";
import FormViaticos from "@/components/FormViaticos.vue";

// Atributos:
export default {
  name: "viaticos",
  computed: {
    ...mapState({
      comisionActiva: "comisionActiva",
    })
  },
  components: {
    FormComision,
    FormViaticos,
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

  created: function () {
    // Verifica el estatus de la comision:
    if(this.comisionActiva.estatus == 'NE'){
      this.mostrarFormComision = true;
    }
  },

  methods: {}

};
</script>





<style>

</style>


