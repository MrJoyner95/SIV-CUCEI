<template>
  <div>

    <div class="div_fondo_udg">
      <!-- Vista general -->
      <b-container>

        
        <b-row align-h="center" class="mt-5">
            <b-col md="10">

              <b-card>
                <h4 class="mb-3 titulo">Historial de comisiones atendidas</h4>
                <b-card-text class="mb-2">En esta sección pueden verse las solicitudes de comisión que ha atendido, independientemente de si han sido aprobadas o no. Las solicitudes aprobadas se muestran en verde y las rechazadas en rojo.
                  <br>
                  <br>
                  Consulte los detalles de las solicitudes a continuación:
                </b-card-text>



                <!-- Filtro de visualizacion -->
                <b-form-group label="Filtrar solicitudes:">
                  <b-form-radio-group 
                    id="filtro_radio" 
                    name="filtro_radio"
                    v-model="filtro" 
                    @change="EsconderSolicitud()"
                  >
                    <b-form-radio value="todas">Todas</b-form-radio>
                    <b-form-radio value="autorizadas">Autorizadas</b-form-radio>
                    <b-form-radio value="rechazadas">Rechazadas</b-form-radio>
                  </b-form-radio-group>
                </b-form-group>



                <!-- Solicitudes -->
                <b-list-group>

                  <div v-for="solicitud in historicoSolicitudes" v-bind:key="solicitud.folio">
                    
                    <!-- Aplica el filtro -->
                    <div v-if="filtro == 'todas' || filtro == 'autorizadas' && solicitud.estatus != 'RE' || filtro == 'rechazadas' && solicitud.estatus == 'RE'">

                      <b-list-group-item 
                        href="#" 
                        class="flex-column align-items-start" 
                        @click="MostrarSolicitud(solicitud)" 
                      >
                        <div class="d-flex w-100 justify-content-between">
                          <!-- <h5 class="mb-2 titulo">Comisión {{ solicitud.folio }}</h5> -->
                          <!-- Muestra decision de la comision -->
                          <template v-if="solicitud.estatus == 'RE'">
                            <h5 class="mb-2 titulo">Comisión {{ solicitud.folio }} <b-badge pill variant="danger">Rechazada</b-badge> </h5>
                          </template>
                          <template v-else>
                            <h5 class="mb-2 titulo">Comisión {{ solicitud.folio }} <b-badge pill variant="success">Autorizada</b-badge> </h5>
                          </template>

                          <!-- Muestra dias de espera de la solicitud -->
                          <template v-if="solicitud.haceDias == 0">
                            <small>Atendida hoy</small>
                          </template>
                          <template v-else-if="solicitud.haceDias == 1">
                            <small>Atendida ayer</small>
                          </template>
                          <template v-else>
                            <small>Atendida hace {{ solicitud.haceDias }} días</small>
                          </template>
                        </div>
                        <!-- Descripcion de la solicitud -->
                        <p class="mb-0"> {{ solicitud.justificacion }} </p>
                        <!-- Informacion relevante -->
                        <hr>
                        <div class="d-flex w-100 justify-content-between">
                          <small class="titulo">Evento:  <strong>{{ solicitud.evento }}</strong></small>
                          <small class="titulo">Destino: <strong>{{ solicitud.destino }}</strong></small>
                        </div>
                      </b-list-group-item>

                    </div>
                    
                  </div>

                </b-list-group>
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
              <br>
              <b-row align-h="center">
                <b-col cols="4">
                  <b-button 
                    block 
                    variant="secondary" 
                    v-on:click="EsconderSolicitud()"
                  >
                    Ocultar comision
                  </b-button>
                </b-col>
              </b-row>
            </div>

          </transition>




      <br>
      <br>

      </b-container>
    </div>
    
  </div>
</template>





<script>
// Propiedades:
import { mapState } from "vuex";

// Componentes:
import FormComision from "@/components/FormComision.vue";

export default {
name: "homeJefe",
  computed: {
    ...mapState({
      historicoSolicitudes: "historicoSolicitudes",
    })
  },
  components: {
    FormComision
  },
  data() {
    return {
      // Solicitud:
      solicitud: null,
      solicitudVisible: false,

      // Filtro:
      filtro: "todas", // rechazadas/ autorizadas
    };
  },
  methods: {

    MostrarSolicitud(solicitud) {
      if(this.solicitud != solicitud){
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
      }
    },

    EsconderSolicitud() {
      this.solicitud = null;
      this.solicitudVisible = false;
    }


  }
};
</script>





<style>

</style>


