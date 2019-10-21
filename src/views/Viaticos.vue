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
                    Usted no cuenta con una comisión activa. Para solicitar viáticos es necesario solicitar una comisión.
                    <br>
                    <br>
                    Puede comenzar solicitud haciendo clic en el botón a continuación:
                  </b-card-text>

                  <!-- Boton comenzar solicitud -->
                  <div v-if="mostrarFormComision == false">
                    <b-button v-on:click="mostrarFormComision = true;" variant="outline-primary">Comenzar solicitud</b-button>
                  </div>
                  <div v-else>
                    <b-button disabled v-on:click="mostrarFormComision = true;" variant="outline-primary">Comenzar solicitud</b-button>
                  </div>
                </div>

                <!-- Comision No Enviada -->
                <div v-else-if="comisionActiva.estatus == 'NE'">
                  <b-card-text>
                    Usted cuenta con una comisión sin enviar, para continuar con el proceso de solicitud de viáticos debe completar la solicitud de la comisión y enviarla a revisión o cancelar la solicitud actual.
                    <br>
                    <br>
                    Por favor, complete su solicitud a continuación:
                  </b-card-text>
                  
                  <!-- Boton completar solicitud -->
                  <div v-if="mostrarFormComision == false">
                    <b-button v-on:click="mostrarFormComision = true;" variant="outline-primary">Completar solicitud</b-button>
                  </div>
                  <div v-else>
                    <b-button disabled v-on:click="mostrarFormComision = true;" variant="outline-primary">Completar solicitud</b-button>
                  </div>
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
                    v-on:click="mostrarFormComision = true;"
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
                    v-on:click="mostrarFormComision = true;"
                  >
                    Comisión {{ comisionActiva.folio }} <b-badge variant="success">Autorizada</b-badge>
                  </a>
                </div>
              </b-col>

              <!-- Historial de comisiones -->
              <b-col md="5">
                <h5 align="left" class="titleColor"> Historial de comisiones: </h5>
                <b-list-group>
                  <div v-for="comisionItem in historialComisiones.comisiones" v-bind:key="comisionItem.folio">
                    <b-list-group-item 
                      href="#" 
                      @click="MostrarComisionInactiva(comisionItem)"
                    > 
                      Comisión {{ comisionItem.folio }} ({{ comisionItem.destino }}) 
                    </b-list-group-item>
                  </div>
                </b-list-group>
              </b-col>

            </b-row>
          </b-card>

        </b-col>
      </b-row>


      <!-- Alerta -->
      <!-- <b-row>
        <b-alert
          variant="danger"
          dismissible
          fade
          :show="mostrarAlertaServidor"
          @dismissed="mostrarAlertaServidor=false"
        >
          Error: no se pudo obtener la información de la comisión.
        </b-alert>
      </b-row> -->





      <!-- Form Comision -->
      <transition enter-active-class="animated fade-in-top" leave-active-class="animated fade-out-top">
        <div v-if="mostrarFormComision == true">

          <b-row align-h="center" class="mt-5">
            <b-col cols="10">
              <!-- Form vacio (habilitado) -->
              <div v-if="comisionActiva == null || comisionActiva == undefined">
                <FormComision titulo="Solicitud de comisión nueva" :deshabilitado="false" />
              </div>

              <!-- Form con datos (habilitado) -->
              <div v-else-if="comisionActiva.estatus == 'NE'">
                <FormComision titulo="Solicitud de comisión sin completar" :deshabilitado="false" />
              </div>

              <!-- Form con datos (deshabilitado) -->
              <div v-else>
                <FormComision titulo="Solicitud de comisión" :deshabilitado="true" />
              </div>
            </b-col>
          </b-row>

          <br>

          <b-row class="mt-2" align-h="center">
            <b-col cols="4">
              <b-button 
                block 
                variant="secondary" 
                v-on:click="mostrarFormComision = false;"
              >
                Esconder formulario
              </b-button>
            </b-col>
          </b-row>

        </div>
      </transition>



      <!-- Comision Inactiva -->
      <transition enter-active-class="animated fade-in-top" leave-active-class="animated fade-out-top">
        <div v-if="mostrarComisionInactiva == true">

          <b-row align-h="center" class="mt-5">
            <b-col cols="10">
              <!-- Comision inactiva -->
              <FormComision :titulo="comisionInactiva.destino" :comisionInactiva="comisionInactiva" :deshabilitado="true" />
            </b-col>
          </b-row>

          <br>

          <b-row class="mt-2" align-h="center">
            <b-col cols="4">
              <b-button 
                block 
                variant="secondary" 
                v-on:click="mostrarComisionInactiva = false;"
              >
                Ocultar comision
              </b-button>
            </b-col>
          </b-row>

        </div>
      </transition>



      <!-- Comision autorizada (solicitud de viaticos) -->
      <template v-if="comisionActiva != null && comisionActiva.estatus == 'AU' && mostrarFormViaticos == false">
        <hr class="mt-5">

        <b-row class="mt-4" align-h="center">
          <b-col cols="4">
            <b-button 
              block 
              variant="success" 
              v-on:click="mostrarFormViaticos = true"
            >
              Comenzar solicitud de viáticos
            </b-button>
          </b-col>
        </b-row>

      </template>



      <!-- Form Viaticos -->
      <template v-if="mostrarFormViaticos == true">
        <hr class="mt-4">

        <b-row align-h="center" class="mt-5">
          <b-col cols="10">
            <FormViaticos/>
          </b-col>
        </b-row>

        <br>
        <b-row class="mt-2" align-h="center">
          <b-col cols="4">
            <b-button 
              block 
              variant="secondary" 
              v-on:click="mostrarFormViaticos = false"
            >
              Esconder formulario
            </b-button>
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
      historialComisiones: "historialComisiones",
    })
  },
  components: {
    FormComision,
    FormViaticos,
  },
  data() {
    return {
      // mostrarFormComision: { type: Boolean, default: false },
      // mostrarFormViaticos: { type: Boolean, default: false },
      mostrarFormComision: false,
      mostrarFormViaticos: false,

      // Historial de comisiones:
      mostrarComisionInactiva: false,
      comisionInactiva: null,
      // mostrarAlertaServidor: false,

    };
  },

  created: function () {
    // Verifica el estatus de la comision:
    if(this.comisionActiva != null){
      if(this.comisionActiva.estatus == 'NE'){
        this.mostrarFormComision = true;
      }
    }
  },

  methods: {

    // ++++++++++++++++++++++++++++++++ Historial de comisiones ++++++++++++++++++++++++++++++++
    MostrarComisionInactiva(comision) {

      console.log(comision);

      // Asigna el valor de la comision seleccionada:
      this.comisionInactiva = comision;
      // Cambia estado:
      this.mostrarComisionInactiva = true;

      // // Cambia estado de visualizacion de la comision:
      // this.mostrarComisionInactiva = true;
      // // Duplica el objeto raiz (this) para poder usarlo en una funcion interna dentro de "setInterval":
      // var data = this; // Dentro de una funcion interna se llama a "data" en lugar de "this".

      // // ++++++++++++++++++++++++ Enviando JSON al servidor y esperando respuesta: ++++++++++++++++++++++++
      // const request = require('request');
      // var timeleft = 5;
      // var downloadTimer = setInterval(function(){

      //   // ++++++++++++++++ Peticion HTTP al servidor ++++++++++++++++
      //   request(
      //     {
      //       method: "GET",
      //       uri: "http://localhost:3000/iniciarSesion"
      //     },
      //     function (error, response) {

      //       if(error){
      //         // Muestra error:
      //         data.mostrarAlertaServidor = true;
      //         // Detiene el contador:
      //         clearInterval(downloadTimer);
      //       }
      //       else{
      //         if(response.statusCode == 200){
      //           // Obtiene el objeto JSON de response:
      //           var body = JSON.parse(response.body);
                


      //           // Asigna objeto a comisionInactiva:
      //           data.comisionInactiva = body.comisionActiva;


      //           // Detiene el contador:
      //           clearInterval(downloadTimer);
      //         }
      //       }
      //     }
      //   )

      //   // ++++++++++++++++ No hubo respuesta del servidor ++++++++++++++++
      //   timeleft -= 1;
      //   if(timeleft <= 0){
      //     // Muestra error:
      //     data.mostrarAlertaServidor = true;
      //     // Detiene el contador:
      //     clearInterval(downloadTimer);
      //   }

      // }, 1000);


    }

  }

};
</script>





<style>

</style>


