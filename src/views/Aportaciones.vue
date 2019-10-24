<template>
  <div>

    <div class="div_fondo_udg">
      <!-- Vista general -->
      <b-container>

        <b-row align-h="center" class="mt-5">
          <b-col md="10">
            
            <b-card>
              <h4 class="mb-3 titulo">Aportaciones económicas</h4>
              <b-card-text class="mb-2">
                En esta sección puede aportar recursos económicos a una comisión que haya sido previamente autorizada. 
                <br>
                <br>
                Ingrese el folio de la comisión a continuación:
              </b-card-text>

              <!-- Busqueda -->
              <b-row align-h="center" class="mt-3">
                <b-col md="5">

                  <b-form @submit="BuscarSolicitud()">
                    <b-input-group>
                      <b-form-input 
                        placeholder="Folio de comisión..."
                        v-model="folioABuscar"
                      >
                      </b-form-input>
                      <b-input-group-append>
                        <!-- Boton activo -->
                        <template v-if="folioABuscar != null && folioABuscar.length > 0">
                          <b-button variant="outline-primary" v-on:click="BuscarSolicitud()">
                            Buscar
                          </b-button>
                        </template>
                        <!-- Boton inactivo -->
                        <template v-else>
                          <b-button variant="outline-primary" disabled>
                            Buscar
                          </b-button>
                        </template>
                      </b-input-group-append>
                    </b-input-group>
                  </b-form>
                  
                </b-col>
              </b-row>



              <!-- Alertas -->
              <b-row align-h="center" class="mt-3">
                <b-col md="6">
                  
                  <!-- Alerta de solicitud -->
                  <b-alert
                    variant="danger"
                    dismissible
                    fade
                    :show="alertaSolicitudVisible"
                    @dismissed="alertaSolicitudVisible=false"
                  >
                    Error: no se encontró la solicitud indicada.
                  </b-alert>
                  <!-- Alerta de servidor -->
                  <b-alert
                    variant="danger"
                    dismissible
                    fade
                    :show="alertaServidorVisible"
                    @dismissed="alertaServidorVisible=false"
                  >
                    Error: no se obtuvo respuesta del servidor.
                  </b-alert>

                </b-col>
              </b-row>

              
            </b-card>

          </b-col>
        </b-row>





        <!-- Solicitud de comision -->
        <transition enter-active-class="animated fade-in-top" leave-active-class="animated fade-out-top">
          <div v-if="solicitudVisible == true">
            
            <!-- Solicitud -->
            <b-row align-h="center" class="mt-5">
              <b-col cols="10">
                <FormComision titulo="Solicitud de comisión" :comisionInactiva="solicitud" :deshabilitado="true" />
              </b-col>
            </b-row>

            <!-- Boton ocultar solicitud -->
            <!-- <br>
            <b-row align-h="center">
              <b-col cols="4">
                <b-button 
                  block 
                  variant="secondary" 
                  v-on:click="OcultarSolicitud()"
                >
                  Ocultar solicitud
                </b-button>
              </b-col>
            </b-row> -->

          </div>
        </transition>





        <!-- Aportar recursos -->
        <div v-if="solicitudVisible == true">
          <br>
          <hr>


          <b-row align-h="center" class="mt-5">
          <b-col md="10">
            
            <b-card>
              <h4 class="mb-3 titulo">Aportaciones económicas</h4>
              <b-card-text class="mb-2">
                En esta sección puede aportar recursos económicos a una comisión que haya sido previamente autorizada. 
                <br>
                <br>
                Ingrese el folio de la comisión a continuación:
              </b-card-text>

              <!-- Busqueda -->
              <b-row align-h="center" class="mt-3">
                <b-col md="5">
                  <b-input-group>

                    <b-form-input 
                      placeholder="Folio de comisión..."
                      v-model="folioABuscar"
                    >
                    </b-form-input>
                    <b-input-group-append>
                      <!-- Boton activo -->
                      <template v-if="folioABuscar != null && folioABuscar.length > 0">
                        <b-button variant="outline-primary" v-on:click="BuscarSolicitud()">
                          Buscar
                        </b-button>
                      </template>
                      <!-- Boton inactivo -->
                      <template v-else>
                        <b-button variant="outline-primary" disabled>
                          Buscar
                        </b-button>
                      </template>
                    </b-input-group-append>

                  </b-input-group>
                </b-col>
              </b-row>

              
            </b-card>

          </b-col>
        </b-row>





          <b-row align-h="center" class="mt-5">
            <b-col cols="10">
              <b-card>
                
                <b-row>
                  <b-col lg="12">
                    <!-- <hr> -->
                    <h4 class="mb-3 titleColor" align="center">Aportar recursos</h4>
                    <b-card-text>Puede aportar recursos económicos a uno o más rubros de la comisión.
                    <br>Presupuesto disponible: <strong>$32,350.00 MXN</strong>
                    </b-card-text>

                    
                    
                    <b-list-group>
                      <b-list-group-item variant="danger" class="flex-column align-items-start">
                        <div class="d-flex w-100 justify-content-between">
                          <h5 class="mb-2 titleColor">Hospedaje y alimentación</h5>
                        </div>

                        <b-row align-h="center" class="mt-3">
                          <b-col cols="7">
                            <p class="mb-0">Cantidad solicitada: <strong>$40,000.00 MXN</strong></p>
                          </b-col>
                        
                          <b-col cols="5">
                            <b-input-group prepend="$" align="right">
                              <b-form-input disabled placeholder="Cantidad..."></b-form-input>
                              <b-input-group-append>
                                <b-button disabled variant="outline-secondary" v-on:click="formComisionVisible=true">Aportar</b-button>
                              </b-input-group-append>
                            </b-input-group>
                          </b-col>
                        </b-row>
                      </b-list-group-item>

                      <b-list-group-item class="flex-column align-items-start">
                        <div class="d-flex w-100 justify-content-between">
                          <h5 class="mb-2 titleColor">Transporte</h5>
                        </div>

                        <b-row align-h="center" class="mt-3">
                          <b-col cols="7">
                            <p class="mb-0">Cantidad solicitada: <strong>$18,000.00 MXN</strong></p>
                          </b-col>
                        
                          <b-col cols="5">
                            <b-input-group prepend="$" align="right">
                              <b-form-input placeholder="Cantidad..."></b-form-input>
                              <b-input-group-append>
                                <b-button variant="outline-success" v-on:click="formComisionVisible=true">Aportar</b-button>
                              </b-input-group-append>
                            </b-input-group>
                          </b-col>
                        </b-row>
                      </b-list-group-item>

                      <b-list-group-item class="flex-column align-items-start">
                        <div class="d-flex w-100 justify-content-between">
                          <h5 class="mb-2 titleColor">Transporte interno</h5>
                        </div>

                        <b-row align-h="center" class="mt-3">
                          <b-col cols="7">
                            <p class="mb-0">Cantidad solicitada: <strong>$5,500.00 MXN</strong></p>
                          </b-col>
                        
                          <b-col cols="5">
                            <b-input-group prepend="$" align="right">
                              <b-form-input placeholder="Cantidad..."></b-form-input>
                              <b-input-group-append>
                                <b-button variant="outline-success" v-on:click="formComisionVisible=true">Aportar</b-button>
                              </b-input-group-append>
                            </b-input-group>
                          </b-col>
                        </b-row>
                      </b-list-group-item>
                      
                    </b-list-group>


                    
                  </b-col>
                </b-row>

              </b-card>
            </b-col>
          </b-row>

        </div>



        <!-- Boton cancelar aporte -->
        <template v-if="formComisionVisible === true">
          <br>
          <b-row class="mt-2" align-h="center">
            <b-col cols="4">
              <b-button 
                block 
                variant="outline-secondary" 
                v-on:click="formComisionVisible = false"
              >
                Cancelar aporte
              </b-button>
            </b-col>
          </b-row>
          <hr>
        </template>
      


        
        
      

      </b-container>
    </div>
    





    <!-- ++++++++++++++++++++++++++++++++++++++++ Recursos adicionales ++++++++++++++++++++++++++++++++++++++++ -->
    <!-- Pantalla de carga -->

    <loading 
      :active.sync="pantallaCargaVisible" 
      :can-cancel="false"
      :is-full-page="true"
      loader="dots"
      :height=100
      :width=100
      color="#1db255"
      background-color="#3e3e3e"
      :opacity=0.5
    >
    </loading>




  </div>
</template>





<script>

// Componentes:
import FormComision from "@/components/FormComision.vue";

// Pantalla de carga:
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
name: "aportaciones",
  computed: {
  },
  components: {
    FormComision,
    Loading,
  },
  data() {
    return {
      formComisionVisible: false,
      SolicitudPorAprobar: false,
      solicitudRechazada: false,

      // 

      // Solicitud:
      folioABuscar: null,
      solicitud: null,
      solicitudVisible: false,

      // Recursos visuales:
      pantallaCargaVisible: false,
      alertaSolicitudVisible: false,
      alertaServidorVisible: false,

    };
  },
  methods: {

    // ++++++++++++++++++++++++++++++++ Solicitud ++++++++++++++++++++++++++++++++
    BuscarSolicitud() {
      if(this.folioABuscar != null){
        
        this.MostrarPantallaCarga();
        // Duplica el objeto raiz (this) para poder usarlo en una funcion interna dentro de "setInterval":
        var data = this; // Dentro de una funcion interna se llama a "data" en lugar de "this".

        // ++++++++++++++++++++++++ Enviando JSON al servidor y esperando respuesta: ++++++++++++++++++++++++
        const request = require('request');
        var timeleft = 3;
        var downloadTimer = setInterval(function(){

          // ++++++++++++++++ Peticion HTTP al servidor ++++++++++++++++
          request(
            {
              method: "GET",
              uri: "http://localhost:3000/buscarSolicitud"
            },
            function (error, response) {
              if(error){
                // Muestra error:
                data.OcultarPantallaCarga();
                data.alertaServidorVisible = true;
                // Detiene el contador:
                clearInterval(downloadTimer);
              }
              else{
                if(response.statusCode == 200){
                  // Obtiene el objeto JSON de response:
                  var body = JSON.parse(response.body);

                  // Se encontro la solicitud:
                  if(body.solicitud != null){
                    // Muestra solicitud:
                    data.MostrarSolicitud(body.solicitud);
                  }
                  else{
                    data.alertaSolicitudVisible = true;
                  }
                  
                  // Esconde pantalla de carga:
                  data.OcultarPantallaCarga();
                  // Detiene el contador:
                  clearInterval(downloadTimer);
                }
              }
            }
          )
          // ++++++++++++++++ No hubo respuesta del servidor ++++++++++++++++
          timeleft -= 1;
          if(timeleft <= 0){
            data.OcultarPantallaCarga();
            // Muestra error:
            data.alertaServidorVisible = true;
            // Detiene el contador:
            clearInterval(downloadTimer);
            // Cancela la petition:

          }
        }, 1000);
      }
    },

    MostrarSolicitud(solicitud) {
      // No se esta mostrando ninguna solicitud:
      if(this.solicitud == null){
        // Cambia estado de la solicitud:
        this.solicitud = solicitud;
        this.solicitudVisible = true;
      }
      // Hay una solicitud y la cambia:
      else{
        // Oculta solicitud anterior:
        this.solicitud = null;
        this.solicitudVisible = false;
        // Espera 0.25 segundos para que la transicion de esconder la solicitud anterior comience:
        var data = this;
        setTimeout(function () {
          // Muestra nueva solicitud despues de 0.25 segundos:
          data.solicitud = solicitud;
          data.solicitudVisible = true;
        }, 250);
      }
    },

    OcultarSolicitud() {
      this.solicitud = null;
      this.solicitudVisible = false;
    },



    // ++++++++++++++++++++++++++++++++ Auxiliares ++++++++++++++++++++++++++++++++
    MostrarPantallaCarga() {
      this.pantallaCargaVisible = true;
    },

    OcultarPantallaCarga() {
      this.pantallaCargaVisible = false;
    },

  }
};
</script>





<style>

</style>




