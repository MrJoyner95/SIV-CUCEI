<template>
  <div id="historicos">
    <b-container>



      <!-- Vista general -->
      <b-row align-h="center" class="mt-5">
        <b-col cols="10">
          <b-card>
            
            <b-row>
              <b-col lg="12">
                <!-- <hr> -->
                <h4 class="titleColor">Comisiones atendidas</h4>
                <b-card-text class="mb-2">En esta sección pueden verse las solicitudes de comisión que ha atendido, independientemente de si han sido aprobadas o no. Las solicitudes aprobadas se muestran en verde y las rechazadas en rojo.
                <br><br>Consulte los detalles a continuación:
                </b-card-text>



                <b-list-group>
                  <b-list-group-item href="#" variant="success" @click="mostrarSolicitudPorAprobar()" class="flex-column align-items-start">
                    <div class="d-flex w-100 justify-content-between">
                      <h5 class="mb-2 titleColor">Comisión 000614</h5>
                      <small>Atendida ayer</small>
                    </div>
                    <p class="mb-0">
                      Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.
                    </p>
                    <small class="titleColor">Destino: <strong>Polonia</strong></small>
                  </b-list-group-item>

                  <b-list-group-item href="#" variant="danger" @click="mostrarSolicitudPorAprobar()" class="flex-column align-items-start">
                    <div class="d-flex w-100 justify-content-between">
                      <h5 class="mb-2 titleColor">Comisión 000662</h5>
                      <small>Atendida hace 3 día(s)</small>
                    </div>
                    <p class="mb-0">
                      Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.
                    </p>
                    <small class="titleColor">Destino: <strong>Alemania</strong></small>
                  </b-list-group-item>

                  <b-list-group-item href="#" variant="success" @click="mostrarSolicitudPorAprobar()" class="flex-column align-items-start">
                    <div class="d-flex w-100 justify-content-between">
                      <h5 class="mb-2 titleColor">Comisión 000698</h5>
                      <small>Atendida hace 8 día(s)</small>
                    </div>
                    <p class="mb-0">
                      Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.
                    </p>
                    <small class="titleColor">Destino: <strong>Rusia</strong></small>
                  </b-list-group-item>

                  <b-list-group-item href="#" variant="success" @click="mostrarSolicitudPorAprobar()" class="flex-column align-items-start">
                    <div class="d-flex w-100 justify-content-between">
                      <h5 class="mb-2 titleColor">Comisión 000623</h5>
                      <small>Atendida hace 10 día(s)</small>
                    </div>
                    <p class="mb-0">
                      Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.
                    </p>
                    <small class="titleColor">Destino: <strong>España</strong></small>
                  </b-list-group-item>

                  <b-list-group-item href="#" variant="success" @click="mostrarSolicitudPorAprobar()" class="flex-column align-items-start">
                    <div class="d-flex w-100 justify-content-between">
                      <h5 class="mb-2 titleColor">Comisión 000634</h5>
                      <small>Atendida hace 11 día(s)</small>
                    </div>
                    <p class="mb-0">
                      Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.
                    </p>
                    <small class="titleColor">Destino: <strong>España</strong></small>
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

</style>


