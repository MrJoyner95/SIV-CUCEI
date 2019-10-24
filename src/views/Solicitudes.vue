<template>
  <div>

    <div class="div_fondo_udg">
      <!-- Vista general -->
      <b-container>
        <b-row align-h="center" class="mt-5">
          <b-col md="10">

            <b-card>
              <h4 class="mb-3 titulo">Comisiones pendientes de autorización</h4>
              <b-card-text class="mb-2">Las siguientes solicitudes requieren de su autorización. Una vez autorizada, la solicitud se enviará a la rectora para continuar con el proceso del solicitante. 
                <br>
                <br>
                Consulte y apruebe las solicitudes a continuación:
              </b-card-text>

              <b-list-group>
                <!-- Recorre el atributo "solicitudesPendientes" del state y crea un group-item por elemento -->
                
                <!-- <div v-for="solicitud in solicitudesPendientes" v-bind:key="solicitud.folio">
                  <b-list-group-item 
                    href="#" 
                    class="flex-column align-items-start"
                    @click="mostrarSolicitudPorAprobar()" 
                  >
                    <div class="d-flex w-100 justify-content-between">
                      <h5 class="mb-2 titulo">Comisión {{ solicitud.folio }}</h5>
                       Muestra dias de espera de la solicitud 
                      <template v-if="solicitud.diasDeEspera == 0">
                        <small>Hoy</small>
                      </template>
                      <template v-else-if="solicitud.diasDeEspera == 1">
                        <small>Ayer</small>
                      </template>
                      <template v-else>
                        <small>Hace {{ solicitud.diasDeEspera }} días</small>
                      </template>
                    </div>
                     Descripcion de la solicitud 
                    <p class="mb-0">
                      {{ solicitud.justificacion }}
                    </p>
                    <small class="titulo">Destino: <strong>{{ solicitud.destino }}</strong></small>
                  </b-list-group-item>
                </div> -->


                <div v-for="solicitud in solicitudesPendientes" v-bind:key="solicitud.folio">
                  <b-list-group-item 
                    href="#" 
                    class="flex-column align-items-start"
                    @click="MostrarSolicitud(solicitud)" 
                  >
                    <div class="d-flex w-100 justify-content-between">
                      <h5 class="mb-2 titulo">Comisión {{ solicitud.folio }}</h5>
                      <!-- Muestra dias de espera de la solicitud -->
                      <template v-if="solicitud.diasDeEspera == 0">
                        <small>Hoy</small>
                      </template>
                      <template v-else-if="solicitud.diasDeEspera == 1">
                        <small>Ayer</small>
                      </template>
                      <template v-else>
                        <small>Hace {{ solicitud.diasDeEspera }} días</small>
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

            <!-- Acciones sobre solicitud -->
            <b-row align-h="center">
              <b-col cols="5">
                <b-button 
                  block 
                  variant="danger"
                  v-b-tooltip.hover title="Rechazar la comisión solicitada."
                  v-on:click="$bvModal.show('modal_rechazar_solicitud')"
                >
                  Rechazar solicitud
                </b-button>
              </b-col>
              <b-col cols="5">
                <b-button 
                  block 
                  variant="primary" 
                  v-b-tooltip.hover title="Autorizar y enviar solicitud a la rectora."
                  v-on:click="$bvModal.show('modal_autorizar_solicitud')"
                >
                  Autorizar solicitud
                </b-button>
              </b-col>
            </b-row>
            <hr>

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









        <!-- ++++++++++++++++++++++++++++++++ Recursos adicionales ++++++++++++++++++++++++++++++++ -->

        <!-- Modal Autorizar Solicitud -->
        <b-modal
          id="modal_autorizar_solicitud"
          title="¿Desea autorizar la solicitud?"
          size= "md"
          buttonSize="sm"
          okVariant="success"
          okTitle="Autorizar solicitud"
          cancelTitle="Cancelar"
          footerClass="p-2"
          centered
          @ok="AutorizarSolicitud(solicitud)"
        >
          Esta acción no podrá revertirse.
        </b-modal>



        <!-- Modal Rechazar Solicitud -->
        <b-modal
          id="modal_rechazar_solicitud"
          ref="modal_rechazar_solicitud"
          title="¿Desea rechazar la solicitud?"
          size= "md"
          buttonSize="sm"
          okVariant="danger"
          okTitle="Rechazar solicitud"
          cancelTitle="Cancelar"
          centered
          @ok="OkModalRechazarSolicitud"
          @show="ReiniciarModalRechazarSolicitud"
          @hidden="ReiniciarModalRechazarSolicitud"
        >
          <form ref="modal_rechazar_solicitud_form">
            <b-form-group
              label=""
              description="Por favor, especifique el motivo de rechazo."
              invalid-feedback="El motivo de rechazo no puede dejarse en blanco."
              :state="stateModalRechazarSolicitud"
            >
              <b-form-textarea
                id="justificacion-input"
                placeholder="Motivo de rechazo..."
                rows="3"
                max-rows="6"
                required 
                v-model="motivoRechazo"
              >
              </b-form-textarea>
            </b-form-group>
          </form>
        </b-modal>


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
name: "solicitudes",
  computed: {
    ...mapState({
      trabajador: "trabajador",
      solicitudesPendientes: "solicitudesPendientes",
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

      // Rechazar solicitud:
      motivoRechazo: null,
      stateModalRechazarSolicitud: null,

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
    },

    AutorizarSolicitud(Solicitud){
      // Envia peticion al servidor:
    },

    RechazarSolicitud(solicitud){
      // Define objeto a enviar:
      var objetoJSON = {
        folioSolicitud: this.solicitud.folio,
        motivoRechazo: this.motivoRechazo
      }
      // Convierte objeto a JSON
      objetoJSON = JSON.stringify(objetoJSON);

      // Envia peticion al servidor:
      console.log(objetoJSON);
    },



    // ++++++++++++++++++++++++++++++++ Modal rechazar solicitud ++++++++++++++++++++++++++++++++
    ReiniciarModalRechazarSolicitud() {
      this.motivoRechazo = null;
      this.stateModalRechazarSolicitud = null;
    },
    OkModalRechazarSolicitud(bvModalEvt) {
      // Previene campos vacios:
      bvModalEvt.preventDefault();
      // Comprueba que el form sea valido:
      const formValido = this.$refs.modal_rechazar_solicitud_form.checkValidity();
      // Asigna el estado del modal:
      this.stateModalRechazarSolicitud = formValido;
      
      if(formValido){
        // Ejecuta funcion:
        this.RechazarSolicitud();
        // Esconde modal:
        this.$nextTick(() => {
          this.$refs.modal_rechazar_solicitud.hide();
        });
      }
    },

  }
};
</script>





<style>

</style>


