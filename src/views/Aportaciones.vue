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
              <!-- Informacion general -->
              <h4 class="mb-3 titulo" align="center">Aportar recursos</h4>
              <b-card-text class="mb-2">
                Puede aportar recursos económicos a uno o más rubros de la comisión.
                <br>
                <br>
                División: &emsp;&emsp;&emsp;&emsp;  <strong> {{finanzas.division}} </strong> <br> 
                Departamento: &emsp;                <strong> {{finanzas.departamento}} </strong> <br>
                Presupuesto: &emsp;&emsp;           <strong> $ {{ FormatearNumero(finanzas.presupuesto) }} MXN</strong> <br>
                Disponible: &emsp;&emsp;&emsp;      <strong> $ {{ FormatearNumero(finanzas.presupuestoDisponible) }} MXN</strong>
                <!-- <br> -->



                <!-- <h5 class="mt-1 titulo">{{ finanzas }}</h5> -->


              </b-card-text>


              <!-- Aportacion -->
              <b-list-group class="mt-3">
                <div v-for="solicitudViatico in solicitudViaticos" v-bind:key="solicitudViatico.rubro">

                  <b-list-group-item class="flex-column align-items-start">

                    <h5 class="mt-2 titulo">{{ solicitudViatico.nombre }}</h5>

                    <b-row align-h="center" class="mt-3 mb-2   d-flex w-100 justify-content-between">
                      <b-col lg="8">
                        <p class="mb-0">Cantidad solicitada: &ensp; <strong>${{ FormatearNumero(solicitudViatico.cantidadSolicitada) }} MXN</strong></p>
                        <p class="mb-0">Cantidad obtenida: &ensp;&nbsp; <strong>${{ FormatearNumero(solicitudViatico.cantidadObtenida) }} MXN</strong></p>
                      </b-col>
                    
                      <b-col lg="4">
                        <b-input-group prepend="$" align="right">
                          <b-form-input 
                            placeholder="Cantidad..."
                            type="number"
                            v-model="solicitudViatico.aportacion"
                            :change="ValidarAportacion(solicitudViatico)"
                          >
                          </b-form-input>
                          <b-input-group-append>

                            <!-- <template v-if="ValidarAportacion(solicitudViatico) == true">
                              <b-button variant="outline-primary">Aportar</b-button>
                            </template>
                            <template v-else>
                              <b-button variant="outline-secondary" disabled="">Aportar</b-button>
                            </template> -->

                            <template v-if="solicitudViatico.aportacionValida == true">
                              <b-button variant="primary" v-on:click="AportarRecursos(solicitudViatico)">Aportar</b-button>
                            </template>
                            <template v-else>
                              <b-button variant="secondary" disabled="">Aportar</b-button>
                            </template>

                            <!-- <template v-if="finanzas.presupuestoDisponible >= solicitudViatico.aportacion">
                              <h5>if="finanzas.presupuestoDisponible >= solicitudViatico.aportacion"</h5>
                            </template>
                            <template v-else-if="solicitudViatico.cantidadObtenida + solicitudViatico.aportacion <= solicitudViatico.cantidadSolicitada">
                              <h5>else-if="solicitudViatico.cantidadObtenida + solicitudViatico.aportacion c= solicitudViatico.cantidadSolicitada"</h5>
                            </template>
                            <template v-else-if="solicitudViatico.aportacion > 0">
                              <h5>else-if="solicitudViatico.aportacion > 0"</h5>
                            </template>
                            <template v-else>
                              <h5>ERROR</h5>
                            </template> -->


                          </b-input-group-append>
                        </b-input-group>
                      </b-col>

                    </b-row>
                  </b-list-group-item>

                </div>
              </b-list-group>


              <!-- <b-list-group class="mt-3">
                <div v-for="solicitudViatico in solicitudViaticos" v-bind:key="solicitudViatico.rubro">

                  <b-list-group-item class="flex-column align-items-start">
                    <div class="d-flex w-100 justify-content-between">
                      <h5 class="mt-1 titulo">{{ solicitudViatico.nombre }}</h5>
                    </div>

                    <b-row align-h="center" class="mb-0">
                      <b-col md="7">
                        <p class="mb-0">Cantidad solicitada: &ensp; <strong>${{solicitudViatico.cantidadSolicitada}} MXN</strong></p>
                        <p class="mb-0">Cantidad obtenida: &ensp;&nbsp; <strong>${{solicitudViatico.cantidadObtenida}} MXN</strong></p>
                      </b-col>
                    
                      <b-col md="5">
                        <b-input-group prepend="$" align="right">
                          <b-form-input 
                            placeholder="Cantidad..."
                            type="number"
                            v-model="cantidadAportada"
                          >
                          </b-form-input>
                          <b-input-group-append>

                            <template v-if="finanzas.presupuestoDisponible >= cantidadAportada && cantidadAportada < (solicitudViatico.cantidadSolicitada - solicitudViatico.cantidadObtenida)">
                              <b-button variant="outline-success" v-on:click="formComisionVisible=true">Aportar</b-button>
                            </template>
                            <template v-else>
                              <b-button variant="outline-danger" disabled="">Aportar</b-button>
                            </template>

                          </b-input-group-append>
                        </b-input-group>
                      </b-col>

                    </b-row>
                  </b-list-group-item>

                </div>
              </b-list-group> -->
              
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

// Propiedades:
import { mapState } from "vuex";

// Componentes:
import FormComision from "@/components/FormComision.vue";

// Pantalla de carga:
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import { isNullOrUndefined } from 'util';

export default {
name: "aportaciones",
  computed: {
    ...mapState({
      finanzas: "finanzas",
    })
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

      // Solicitud de viaticos:
      solicitudViaticos: null,
      cantidadAportada: null,

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
                  if(body.solicitud != null && body.solicitudViaticos != null){
                    // Asigna solicitud:
                    data.MostrarSolicitud(body.solicitud, body.solicitudViaticos);
                    // Asigna solicitud de viaticos:
                    
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



    // AsignarSolicitudes(solicitud, solViaticos){

    //   // Crea un objeto vacio:
    //   var solicitudViaticos = {};

    //   // Convierte campos numericos de solicitud de viaticos a number:
    //   solViaticos.forEach(solViatico => {
    //     // Crea objeto del rubro:
    //     var nombreRubro = solViatico.rubro;
    //     solicitudViaticos[nombreRubro] = {};
    //     // Usa el nombre de la variable para asignar al objeto primario:
    //     solicitudViaticos[nombreRubro].cantidadSolicitada = parseFloat(solViatico.cantidadSolicitada);
    //     solicitudViaticos[nombreRubro].cantidadObtenida = parseFloat(solViatico.cantidadObtenida);
    //   });

    //   // console.log("solicitudViaticos: ", solicitudViaticos);

    //   // Cambia estado de la solicitud:
    //   this.solicitud = solicitud;
    //   this.solicitudViaticos = solicitudViaticos;
    //   this.solicitudVisible = true;

    // },


    AsignarSolicitudes(solicitud, solViaticos){

      solViaticos.forEach(solViatico => {
        // Agrega el atributo de aportacion:
        solViatico.aportacion = null;
        // Convierte campos numericos de solicitud de viaticos a float:
        solViatico.cantidadSolicitada = parseFloat(solViatico.cantidadSolicitada);
        solViatico.cantidadObtenida = parseFloat(solViatico.cantidadObtenida);
      });

      // Cambia estado de la solicitud:
      this.solicitud = solicitud;
      this.solicitudViaticos = solViaticos;
      this.solicitudVisible = true;

    },



    MostrarSolicitud(solicitud, solicitudViaticos) {

      // "solicitudViaticos": [
      //   {
      //     "rubro": "hospedajeAlimentacion",
      //     "nombre": "Hospedaje y alimentación",
      //     "cantidadSolicitada": "12000",
      //     "cantidadObtenida": "6000"
      //   },
      //   {
      //     "rubro": "transporteAereo",
      //     "nombre": "Transporte aéreo",
      //     "cantidadSolicitada": "30000",
      //     "cantidadObtenida": "0"
      //   },
      //   {
      //     "rubro": "transporteInterno",
      //     "nombre": "Transporte interno",
      //     "cantidadSolicitada": "2500",
      //     "cantidadObtenida": "2500"
      //   },
      //   {
      //     "rubro": "combustible",
      //     "nombre": "Combustible",
      //     "cantidadSolicitada": "0",
      //     "cantidadObtenida": "0"
      //   },
      //   {
      //     "rubro": "otrosConceptos",
      //     "nombre": "Otros conceptos",
      //     "cantidadSolicitada": "0",
      //     "cantidadObtenida": "0"
      //   }
      // ]



      // "solicitudViaticos": {
      //   "hospedajeAlimentacion": {
      //     "cantidadSolicitada": "12000.00",
      //     "cantidadFaltante": "6000.00"
      //   },
      //   "transporteAereo": {
      //     "cantidadSolicitada": "30000.00",
      //     "cantidadFaltante": "30000.00"
      //   },
      //   "transporteInterno": {
      //     "cantidadSolicitada": "2500.00",
      //     "cantidadFaltante": "0"
      //   },
      //   "combustible": {
      //     "cantidadSolicitada": "0",
      //     "cantidadFaltante": "0"
      //   },
      //   "otrosConceptos": {
      //     "cantidadSolicitada": "0",
      //     "cantidadFaltante": "0"
      //   }
      // }



      // // Convierte campos numericos de solicitud de viaticos a number:
      // // hospedajeAlimentacion:
      // solicitudViaticos.hospedajeAlimentacion.cantidadSolicitada = parseFloat(solicitudViaticos.hospedajeAlimentacion.cantidadSolicitada);
      // solicitudViaticos.hospedajeAlimentacion.cantidadFaltante = parseFloat(solicitudViaticos.hospedajeAlimentacion.cantidadFaltante);
      // // transporteAereo:
      // solicitudViaticos.transporteAereo.cantidadSolicitada = parseFloat(solicitudViaticos.transporteAereo.cantidadSolicitada);
      // solicitudViaticos.transporteAereo.cantidadFaltante = parseFloat(solicitudViaticos.transporteAereo.cantidadFaltante);
      // // transporteInterno:
      // solicitudViaticos.transporteInterno.cantidadSolicitada = parseFloat(solicitudViaticos.transporteInterno.cantidadSolicitada);
      // solicitudViaticos.transporteInterno.cantidadFaltante = parseFloat(solicitudViaticos.transporteInterno.cantidadFaltante);
      // // combustible:
      // solicitudViaticos.combustible.cantidadSolicitada = parseFloat(solicitudViaticos.combustible.cantidadSolicitada);
      // solicitudViaticos.combustible.cantidadFaltante = parseFloat(solicitudViaticos.combustible.cantidadFaltante);
      // // otrosConceptos:
      // solicitudViaticos.otrosConceptos.cantidadSolicitada = parseFloat(solicitudViaticos.otrosConceptos.cantidadSolicitada);
      // solicitudViaticos.otrosConceptos.cantidadFaltante = parseFloat(solicitudViaticos.otrosConceptos.cantidadFaltante);



      // solicitudViaticos.forEach(solViatico => {
      //   solViatico.cantidadSolicitada = parseFloat(solViatico.cantidadSolicitada);
      //   solViatico.cantidadObtenida = parseFloat(solViatico.cantidadObtenida);
      // });

      // console.log("solicitud: ", solicitud);
      // console.log("solicitudViaticos: ", solicitudViaticos);

      // No se esta mostrando ninguna solicitud:
      if(this.solicitud == null){

        

        // Cambia estado de la solicitud:
        // this.solicitud = solicitud;
        // this.solicitudViaticos = solicitudViaticos;
        // this.solicitudVisible = true;

        // Asigna solicitudes:
        this.AsignarSolicitudes(solicitud, solicitudViaticos);

        console.log("IF");
        console.log("solicitud: ", this.solicitud);
        console.log("solicitudViaticos: ", this.solicitudViaticos);
      }
      // Hay una solicitud y la cambia:
      else{

        

        // Oculta solicitud anterior:
        this.solicitud = null;
        this.solicitudViaticos = null;
        this.solicitudVisible = false;
        // Espera 0.25 segundos para que la transicion de esconder la solicitud anterior comience:
        var data = this;
        setTimeout(function () {
          // Muestra nueva solicitud despues de 0.25 segundos:
          // data.solicitud = solicitud;
          // data.solicitudViaticos = solicitudViaticos;
          // data.solicitudVisible = true;

          // Asigna solicitudes:
          data.AsignarSolicitudes(solicitud, solicitudViaticos);

          console.log("ELSE");
          console.log("solicitud: ", data.solicitud);
          console.log("solicitudViaticos: ", data.solicitudViaticos);
          
        }, 250);
      }



      // console.log("solicitud: ", this.solicitud);
      // console.log("solicitudViaticos: ", this.solicitudViaticos);

    },

    OcultarSolicitud() {
      this.solicitud = null;
      this.solicitudViaticos = null;
      this.solicitudVisible = false;
    },



    // ++++++++++++++++++++++++++++++++ Auxiliares ++++++++++++++++++++++++++++++++
    ValidarAportacion(solicitudViatico) {
      try {
        // Convierte aportacion a float (cada que se borra por completo, se convierte en string):
        solicitudViatico.aportacion = parseFloat(solicitudViatico.aportacion);
        // Valida que la aportacion sea valida:
        if(solicitudViatico.aportacion > 0  && solicitudViatico.aportacion <= this.finanzas.presupuestoDisponible && (solicitudViatico.aportacion + solicitudViatico.cantidadObtenida) <= solicitudViatico.cantidadSolicitada){
          // Asigna estado de la aportacion:
          solicitudViatico.aportacionValida = true;
        }
        else{
          solicitudViatico.aportacionValida = false;
        }
      } catch (error) {
        solicitudViatico.aportacionValida = false;
      }
    },


    AportarRecursos(solicitudViatico) {

      console.log(solicitudViatico);

    },



    MostrarPantallaCarga() {
      this.pantallaCargaVisible = true;
    },

    OcultarPantallaCarga() {
      this.pantallaCargaVisible = false;
    },

    FormatearNumero(numero) {
      var partesNumero = numero.toString().split(".");
      partesNumero[0] = partesNumero[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return partesNumero.join(".");
    },

  }
};
</script>





<style>

</style>




