<template>
  <div id="aportaciones">
    <b-container>



      <!-- Vista general -->
      <b-row align-h="center" class="mt-5">
        <b-col cols="10">
          <b-card>
            
            <b-row>
              <b-col lg="12">
                <!-- <hr> -->
                <h4 class="titleColor">Aportaciones económicas</h4>
                <b-card-text class="mb-2">En esta sección puede aportar recursos económicos a una comisión que haya sido previamente aprobada por la rectora.
                <br><br>Ingrese el número de folio de la comisión a continuación:
                </b-card-text>



                <b-row align-h="center" class="mt-3">
                  <b-col cols="6">
                    <b-input-group>
                      <b-form-input placeholder="Folio de comisión..."></b-form-input>
                      <b-input-group-append>
                        <b-button variant="outline-primary" v-on:click="formComisionVisible=true">Buscar</b-button>
                      </b-input-group-append>
                    </b-input-group>
                  </b-col>
                </b-row>
                
                
                <b-row class="mt-2"></b-row>


                
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



      <!-- Seccion aportar recursos -->
      <template v-if="formComisionVisible === true">
        <br>
        <hr>

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

      </template>



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



    <br>
    <br>

    </b-container>
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

.fade-in-top {
	animation: fade-in-top 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
}

/* ----------------------------------------------
 * Generated by Animista on 2019-8-9 23:14:22
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation fade-in-top
 * ----------------------------------------
 */
@keyframes fade-in-top {
  0% {
    transform: translateY(-50px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}



.fade-out-top {
	animation: fade-out-top 0.6s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

/* ----------------------------------------------
 * Generated by Animista on 2019-8-10 3:34:20
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation fade-out-top
 * ----------------------------------------
 */
@keyframes fade-out-top {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(-50px);
    opacity: 0;
  }
}



</style>




