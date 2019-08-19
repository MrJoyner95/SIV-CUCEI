<template>
  <div>

    <div class="div_fondo_udg">
      <!-- Vista general -->
      <b-container>
        <b-row align-h="center" class="mt-5">
          <b-col cols="10">
            <b-card>
              
              <!-- <h3 align="center" class="titleColor">Jefe de departamento</h3> -->

              <b-row>

                <b-col lg="12">
                  <!-- <hr> -->
                  <h4 class="titleColor">Comisiones pendientes de autorización</h4>
                  <b-card-text class="mb-2">Las siguientes solicitudes requieren de su autorización. Una vez autorizada, la solicitud se enviará a la rectora para continuar con el proceso del solicitante. 
                  <br><br>Consulte y apruebe las solicitudes a continuación:
                  </b-card-text>
                  <!-- <b-list-group>
                    <b-list-group-item href="#" @click="mostrarSolicitudPorAprobar()">Comisión 000698 (Alemania) <span class="titleColor"> <strong><i>Recibida el: 04/08/2019</i></strong> </span> </b-list-group-item>
                    <b-list-group-item href="#" @click="mostrarSolicitudPorAprobar()">Comisión 000662 (Rusia) <span class="titleColor"> <strong><i>Recibida el: 06/08/2019</i></strong> </span></b-list-group-item>
                    <b-list-group-item href="#" @click="mostrarSolicitudPorAprobar()">Comisión 000614 (Polonia) <span class="titleColor"> <strong><i>Recibida el: 10/08/2019</i></strong> </span></b-list-group-item>
                  </b-list-group>
                  <br> -->



                  <b-list-group>
                    <b-list-group-item href="#" @click="mostrarSolicitudPorAprobar()" class="flex-column align-items-start">
                      <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-2 titleColor">Comisión 000614</h5>
                        <small>Hace 8 día(s)</small>
                      </div>
                      <p class="mb-0">
                        Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.
                      </p>
                      <small class="titleColor">Destino: <strong>Polonia</strong></small>
                    </b-list-group-item>

                    <b-list-group-item href="#" @click="mostrarSolicitudPorAprobar()" class="flex-column align-items-start">
                      <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-2 titleColor">Comisión 000662</h5>
                        <small>Hace 3 día(s)</small>
                      </div>
                      <p class="mb-0">
                        Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.
                      </p>
                      <small class="titleColor">Destino: <strong>Alemania</strong></small>
                    </b-list-group-item>

                    <b-list-group-item href="#" @click="mostrarSolicitudPorAprobar()" class="flex-column align-items-start">
                      <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-2 titleColor">Comisión 000698</h5>
                        <small>Ayer</small>
                      </div>
                      <p class="mb-0">
                        Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.
                      </p>
                      <small class="titleColor">Destino: <strong>Rusia</strong></small>
                    </b-list-group-item>
                    
                  </b-list-group>



                  
                </b-col>
              </b-row>

            </b-card>
          </b-col>
        </b-row>



        <!-- Form comision abierta -->
        <transition enter-active-class="animation fade-in-top" leave-active-class="animated fade-out-top">
          <div v-if="formComisionVisible === true">
            <b-row align-h="center" class="mt-5">
              <b-col cols="10">
                <FormComision titulo="Detalles de la solicitud" :deshabilitado="true" :comision_prop="comisionPrueba" />
              </b-col>
            </b-row>
          </div>
        </transition>

        <!-- Boton aprobar comision -->
        <template v-if="formComisionVisible === true && SolicitudPorAprobar === true">
          <br>        
          <b-row class="mt-4" align-h="center">
            <b-col cols="5">
              <b-button 
                block 
                variant="primary" 
                v-b-tooltip.hover title="Autorizar y enviar solicitud a la rectora."
              >
                Autorizar solicitud
              </b-button>
            </b-col>
            <b-col cols="5">
              <b-button 
                block 
                variant="danger"
                v-b-tooltip.hover title="Denegar la comisión solicitada."
                v-on:click="solicitudRechazada = !solicitudRechazada"
              >
                Rechazar solicitud
              </b-button>
            </b-col>
          </b-row>
          <!-- <hr> -->
          <hr>
        </template>

        <!-- Motivo de rechazo -->
        <transition enter-active-class="animated fade-in-top" leave-active-class="animated fade-out-top">
          <!--  -->
          <div v-if="formComisionVisible === true && SolicitudPorAprobar === true && solicitudRechazada === true">
              <b-row class="mt-2" align-h="center">
                  <b-col cols="5">
                      <!-- Espacio vacio -->
                  </b-col>
              <b-col cols="5">
                  <b-form-textarea
                  id="justificacion-input"
                  placeholder="Motivo de rechazo..."
                  rows="3"
                  max-rows="6"
                  >
                  </b-form-textarea>

                  <b-row>
                      <b-col cols="6">
                          <b-button 
                          block
                          variant="outline-danger" 
                          v-on:click="formComisionVisible = false"
                          >
                          Enviar motivo
                          </b-button>
                      </b-col>

                      <b-col cols="6">
                          <b-button 
                          block
                          variant="outline-secondary" 
                          v-on:click="formComisionVisible = false"
                          >
                          Cancelar rechazo
                          </b-button>
                      </b-col>
                  </b-row>
                  
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
                v-on:click="formComisionVisible = false"
              >
                Esconder formulario
              </b-button>
            </b-col>
          </b-row>
          <hr>
        </template>



      

      </b-container>
    </div>
    
  </div>
</template>





<script>

// Componentes:
import FormComision from "@/components/FormComision.vue";

export default {
name: "homeJefe",
  computed: {
  },
  components: {
    FormComision
  },
  data() {
    return {
      formComisionVisible: false,
      SolicitudPorAprobar: false,
      solicitudRechazada: false,

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
  methods: {
      mostrarSolicitudPorAprobar: function(){
          this.formComisionVisible = true;
          this.SolicitudPorAprobar = true;
          this.solicitudRechazada = false;
      },
      mostrarSolicitud: function(){
          this.SolicitudPorAprobar = false;
          this.formComisionVisible = true;
      },
      esconderSolicitud: function(){
          this.formComisionVisible = false;
          this.SolicitudPorAprobar = false;
          this.solicitudRechazada = false;
      }
  }
};
</script>





<style>

</style>


