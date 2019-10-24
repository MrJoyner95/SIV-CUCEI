<template>
  <div class="viaticos">

    <div class="div_fondo_udg">
      <b-container>

        <!-- Vista general -->
        <b-row align-h="center" class="mt-5">
          <b-col md="10">

            <b-card>
              <b-row>
                <b-col md="7">
                  <!-- <h4 class="mb-3 titleColor">Viáticos</h4> -->
                  <h4 class="mb-3 titulo">Comisiones</h4>

                  <!-- Sin comision activa -->
                  <div v-if="comisionActiva == null || comisionActiva == undefined">
                    <b-card-text>
                      Usted no cuenta con una comisión activa. Para solicitar viáticos es necesario solicitar una comisión.
                      <br>
                      <br>
                      Puede comenzar solicitud haciendo clic en el botón a continuación:
                    </b-card-text>

                    <!-- Boton comenzar solicitud -->
                    <div v-if="formComisionVisible == false">
                      <b-button v-on:click="MostrarComisionActiva()" variant="outline-primary">Comenzar solicitud</b-button>
                    </div>
                    <div v-else>
                      <b-button disabled variant="outline-primary">Comenzar solicitud</b-button>
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
                    <div v-if="formComisionVisible == false">
                      <b-button v-on:click="MostrarComisionActiva()" variant="outline-primary">Completar solicitud</b-button>
                    </div>
                    <div v-else>
                      <b-button disabled variant="outline-primary">Completar solicitud</b-button>
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
                      v-on:click="MostrarComisionActiva()"
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
                      v-on:click="MostrarComisionActiva()"
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



        <!-- Form Comision -->
        <transition enter-active-class="animated fade-in-top" leave-active-class="animated fade-out-top">

          <div v-if="formComisionVisible == true">
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
            <b-row align-h="center">
              <b-col cols="4">
                <b-button 
                  block 
                  variant="secondary" 
                  v-on:click="OcultarComisionActiva()"
                >
                  Ocultar formulario
                </b-button>
              </b-col>
            </b-row>
          </div>

        </transition>



        <!-- Comision Inactiva -->
        <transition enter-active-class="animated fade-in-top" leave-active-class="animated fade-out-top">
          <div v-if="comisionInactivaVisible == true">

            <b-row align-h="center" class="mt-5">
              <b-col cols="10">
                <!-- Comision inactiva -->
                <FormComision :titulo="comisionInactiva.destino" :comisionInactiva="comisionInactiva" :deshabilitado="true" />
              </b-col>
            </b-row>

            <br>

            <b-row align-h="center">
              <b-col cols="4">
                <b-button 
                  block 
                  variant="secondary" 
                  v-on:click="OcultarComisionInactiva()"
                >
                  Ocultar comision
                </b-button>
              </b-col>
            </b-row>

          </div>
        </transition>



        <!-- Comision autorizada (solicitud de viaticos) -->
        <template v-if="comisionActiva != null && comisionActiva.estatus == 'AU' && formViaticosVisible == false">
          <hr class="mt-5">

          <b-row class="mt-4" align-h="center">
            <b-col cols="4">
              <b-button 
                block 
                variant="success" 
                v-on:click="formViaticosVisible = true"
              >
                Comenzar solicitud de viáticos
              </b-button>
            </b-col>
          </b-row>

        </template>



        <!-- Form Viaticos -->
        <template v-if="formViaticosVisible == true">
          <hr class="mt-4">

          <b-row align-h="center" class="mt-5">
            <b-col cols="10">
              <FormViaticos/>
            </b-col>
          </b-row>

          <br>
          <b-row align-h="center">
            <b-col cols="4">
              <b-button 
                block 
                variant="secondary" 
                v-on:click="formViaticosVisible = false"
              >
                Ocultar formulario
              </b-button>
            </b-col>
          </b-row>

        </template>

          
        <!-- <br> -->
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
      // Comision activa:
      formComisionVisible: false,
      formViaticosVisible: false,

      // Historial de comisiones:
      comisionInactiva: null,
      comisionInactivaVisible: false,
    };
  },

  created: function () {
    // Verifica el estatus de la comision:
    if(this.comisionActiva != null){
      if(this.comisionActiva.estatus == 'NE'){
        this.MostrarComisionActiva();
      }
    }
  },

  methods: {

    // ++++++++++++++++++++++++++++++++ Comision activa ++++++++++++++++++++++++++++++++

    MostrarComisionActiva() {
      // Si hay una comision inactiva visible, espera a que es esconda:
      if(this.comisionInactivaVisible == true){
        // Esconde comision inactiva:
        this.OcultarComisionInactiva();
        // Espera 0.25 segundos para que la transicion de esconder la comision anterior comience:
        var data = this;
        setTimeout(function () {
          // Muestra nueva comision despues de 0.25 segundos:
          data.formComisionVisible = true;
        }, 250);
      }
      else{
        // Cambia estado del form:
        this.formComisionVisible = true;
      }
    },

    OcultarComisionActiva() {
      // Cambia estado del form:
      this.formComisionVisible = false;
    },



    // ++++++++++++++++++++++++++++++++ Historial de comisiones ++++++++++++++++++++++++++++++++

    MostrarComisionInactiva(comision) {
      if(this.comisionInactiva != comision){
        // No se esta mostrando ninguna comision inactiva ni activa:
        if(this.comisionInactiva == null && this.formComisionVisible == false){
          // Cambia estado de la comision:
          this.comisionInactiva = comision;
          this.comisionInactivaVisible = true;
        }
        // Hay una comision visible y la cambia:
        else{
          // Oculta comision anterior y comision activa:
          this.OcultarComisionActiva();
          this.OcultarComisionInactiva();
          // Espera 0.25 segundos para que la transicion de esconder la comision anterior comience:
          var data = this;
          setTimeout(function () {
            // Muestra nueva comision despues de 0.25 segundos:
            data.comisionInactiva = comision;
            data.comisionInactivaVisible = true;
          }, 250);
        }
      }
    },

    OcultarComisionInactiva() {
      // Cambia estado:
      this.comisionInactiva = null;
      this.comisionInactivaVisible = false;
    }



    // ++++++++++++++++++++++++++++++++ Viaticos ++++++++++++++++++++++++++++++++

    // MostrarSolicitudViaticos() {
    //   // Si hay una comision inactiva visible, espera a que es esconda:
    //   if(this.comisionInactivaVisible == true){
    //     // Esconde comision inactiva:
    //     this.OcultarComisionInactiva();
    //     // Espera 0.25 segundos para que la transicion de esconder la comision anterior comience:
    //     var data = this;
    //     setTimeout(function () {
    //       // Muestra nueva comision despues de 0.25 segundos:
    //       data.formComisionVisible = true;
    //     }, 250);
    //   }
    //   else{
    //     // Cambia estado del form:
    //     this.formComisionVisible = true;
    //   }
    // },

    // OcultarSolicitudViaticos() {
    //   // Cambia estado del form:
    //   this.formComisionVisible = false;
    // },

  }
};
</script>





<style>

</style>


