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
            <b-row align-h="center" class="mt-5 mb-4">
              <b-col cols="10">
                <FormComision titulo="Solicitud de comisión" :comisionInactiva="solicitud" :deshabilitado="true" />
              </b-col>
            </b-row>

          </div>
        </transition>





        <!-- Aportar recursos -->
        <div v-if="solicitudVisible == true">
          <!-- <br> -->
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
                              step="any"
                              v-model="solicitudViatico.aportacion"
                              :change="ValidarAportacion(solicitudViatico)"
                            >
                            </b-form-input>
                            <b-input-group-append>
                              <template v-if="solicitudViatico.aportacionValida == true">
                                <b-button 
                                  variant="primary" 
                                  v-b-tooltip.hover title="Confirmar la aportación"
                                  v-on:click="DefinirAportacion(solicitudViatico)"
                                >
                                  Aportar
                                </b-button>
                              </template>
                              <template v-else>
                                <b-button variant="secondary" disabled="">Aportar</b-button>
                              </template>
                            </b-input-group-append>
                          </b-input-group>

                        </b-col>
                      </b-row>
                    </b-list-group-item>

                  </div>
                </b-list-group>
              </b-card>

            </b-col>
          </b-row>
          <!-- Espacio vacio -->
          <br>
          <br>
          <br>
        </div>

      </b-container>
    </div>










    <!-- ++++++++++++++++++++++++++++++++++++++++ Recursos adicionales ++++++++++++++++++++++++++++++++++++++++ -->

    <!-- Modal Confirmar Aportacion -->
    <b-modal
      id="modal_confirmar_aportacion"
      ref="modal_confirmar_aportacion"
      title="¿Desea continuar con la aportación?"
      size= "md"
      buttonSize="md"
      okVariant="success"
      okTitle="Confirmar"
      cancelTitle="Cancelar"
      footerClass="p-2"
      centered
      @ok="ConfirmarAportacion()"
    >
      Por favor, confirme que los datos del aporte sean correctos.
      <br>
      <br>
      <div v-if="aportacion != null">
        <pre class="pre_normal">
          Folio de comisión:  <strong>{{ aportacion.folioComision }}</strong>
          Beneficiario:              <strong>{{ aportacion.beneficiario }}</strong> 
          Rubro:                           <strong>{{ aportacion.nombre }}</strong> 
          Aporte:                         <strong>${{ FormatearNumero(aportacion.cantidadAportada) }} MXN</strong> 
        </pre>
      </div>
    </b-modal>





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
// State:
import state from "@/store.js";

// Componentes:
import FormComision from "@/components/FormComision.vue";

// Pantalla de carga:
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
name: "aportaciones",
  computed: {
    ...mapState({
      trabajador: "trabajador",
      finanzas: "finanzas",
    })
  },
  components: {
    FormComision,
    Loading,
  },
  data() {
    return {
      // Solicitud:
      folioABuscar: null,
      solicitud: null,
      solicitudVisible: false,

      // Solicitud de viaticos:
      solicitudViaticos: null,
      rubroSeleccionado: null,

      // Aportaciones:
      aportacion: null,

      // Recursos visuales:
      pantallaCargaVisible: false,
      alertaSolicitudVisible: false,
      alertaServidorVisible: false,
    };
  },
  methods: {
    
    // ++++++++++++++++++++++++++++++++++++++++ Solicitud ++++++++++++++++++++++++++++++++++++++++

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





    // ++++++++++++++++++++++++++++++++++++++++ Solicitud Viaticos ++++++++++++++++++++++++++++++++++++++++

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

      // Asigna this a una variable local:
      var data = this;

      // No se esta mostrando ninguna solicitud:
      if(this.solicitud == null){
        // Asigna solicitudes:
        this.AsignarSolicitudes(solicitud, solicitudViaticos);
      }
      // Hay una solicitud y la cambia:
      else{
        // Oculta solicitud anterior:
        this.solicitud = null;
        this.solicitudViaticos = null;
        this.solicitudVisible = false;

        // Espera 0.25 segundos para que la transicion de esconder la solicitud anterior comience:
        setTimeout(function () {
          // Asigna solicitudes:
          data.AsignarSolicitudes(solicitud, solicitudViaticos);

        }, 250);
      }
    },






    // ++++++++++++++++++++++++++++++++++++++++ Aportaciones ++++++++++++++++++++++++++++++++++++++++

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



    DefinirAportacion(solicitudViatico) {
      // Define objeto de aportacion vacio:
      this.aportacion = {};

      // Define atributos del objeto:
      this.aportacion.benefactor =        this.trabajador.codigo;
      this.aportacion.division =          this.finanzas.division;
      this.aportacion.departamento =      this.finanzas.departamento;
      this.aportacion.beneficiario =      this.solicitud.codigoTrabajador;
      this.aportacion.folioComision =     this.solicitud.folio;
      this.aportacion.rubro =             solicitudViatico.rubro;
      this.aportacion.nombre =            solicitudViatico.nombre;
      this.aportacion.cantidadAportada =  solicitudViatico.aportacion;

      // Abre modal de confirmacion:
      this.$refs.modal_confirmar_aportacion.show();
    },



    ConfirmarAportacion() {


      // ENVIAR PETICION AL SERVIDOR


      // Recorre arreglo de solicitud de viaticos:
      this.solicitudViaticos.forEach(solicitud => {

        if(solicitud.rubro == this.aportacion.rubro){
          // Convierte las variables de vuelta a float y limita los decimales a 2 (toFixed() convierte la variable a string):
          this.aportacion.cantidadAportada = parseFloat( this.aportacion.cantidadAportada.toFixed(2) );
          solicitud.cantidadObtenida = parseFloat( solicitud.cantidadObtenida.toFixed(2) );

          // Cambia estado de finanzas:
          state.commit("ReducirPresupuestoDisponible", {
            reduccion: this.aportacion.cantidadAportada
          });

          // Actualiza cantidad obtenidad de la solicitud:
          solicitud.cantidadObtenida += this.aportacion.cantidadAportada;
          // Limita los decimales y convierte de vuelta a float:
          solicitud.cantidadObtenida = parseFloat( solicitud.cantidadObtenida.toFixed(2) );
        }
      });
    },





    // ++++++++++++++++++++++++++++++++ Funciones auxiliares ++++++++++++++++++++++++++++++++
    MostrarPantallaCarga() {
      this.pantallaCargaVisible = true;
    },

    OcultarPantallaCarga() {
      this.pantallaCargaVisible = false;
    },

    FormatearNumero(numero) {
      numero = parseFloat(numero).toFixed(2);
      var partesNumero = numero.toString().split(".");
      partesNumero[0] = partesNumero[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return partesNumero.join(".");
    },



  }
};
</script>





<style>

</style>




