<template>
  <div class="homeProfesor">

    <b-container>
      <!-- Barra de navegacion -->
      <!-- <NavBar /> -->

      <!-- Vista general -->
      <!-- <b-row align-h="center" class="mt-5">
        <b-col cols="8">
          <b-card>
            <h4 class="mb-3 titleColor">Comisiones</h4>
            <template v-if="tipoUsuario === 'profesor'">
              <b-card-text>Usted cuenta con una comisión abierta, puede consultar los detalles de la misma a continuación:</b-card-text>
              <a
                href="#"
                v-on:click="mostrarFormComisionAbierta = true"
                class="card-link"
              >Comisión {{ comisionPrueba.folio }} </a>
            </template>
            <template v-else>
              <b-card-text>Actualmente usted no cuenta con una comisión. Puede abrir una comisión haciendo clic en el botón a continuación:</b-card-text>

              <b-button v-on:click="mostrarFormComision = true" variant="light">Crear comisión</b-button>
            </template>
          </b-card>
        </b-col>
      </b-row> -->
      
      <b-row align-h="center" class="mt-5">
        <b-col cols="10">
          <b-card>
            <b-row>

              <b-col md="7">
                <h4 class="mb-3 titleColor">Comisiones</h4>
                <template v-if="tipoUsuario === 'profesor'">
                  <b-card-text>Usted cuenta con una comisión abierta, por lo que no podrá solicitar una nueva comisón hasta que la finalice.
                    <br><br>Puede consultar los detalles de la misma a continuación:
                  </b-card-text>
                  <a
                    href="#"
                    v-on:click="mostrarFormComisionAbierta = true"
                    class="card-link"
                  >Comisión {{ comisionPrueba.folio }} </a>
                </template>
                <template v-else>
                  <b-card-text>Actualmente usted no cuenta con una comisión. Puede abrir una comisión haciendo clic en el botón a continuación:</b-card-text>

                  <b-button v-on:click="mostrarFormComision = true" variant="light">Crear comisión</b-button>
                </template>
              </b-col>

              <b-col md="5">
                <h5 align="left"> Historial de comisiones: </h5>
                <b-list-group>
                  <b-list-group-item href="#some-link">Comisión 000698 (Alemania)</b-list-group-item>
                  <b-list-group-item href="#">Comisión 000662 (Rusia)</b-list-group-item>
                  <b-list-group-item href="#">Comisión 000614 (Polonia)</b-list-group-item>
                </b-list-group>
              </b-col>

            </b-row>
          </b-card>
        </b-col>
      </b-row>
        


      <!-- Form comision vacia -->
      <transition enter-active-class="animated desliceInferior">
        <div v-if="mostrarFormComision == true">
          <b-row align-h="center" class="mt-5">
            <b-col cols="10">
              <FormComision titulo="Crear comision" :deshabilitado="false" />
            </b-col>
          </b-row>
        </div>
      </transition>

      <!-- Form comision abierta -->
      <transition enter-active-class="animation fade-in-top">
        <div v-if="mostrarFormComisionAbierta == true">
          <b-row align-h="center" class="mt-5">
            <b-col cols="10">
              <FormComision titulo="Comision abierta" :deshabilitado="true" :comision_prop="comisionPrueba" />
            </b-col>
          </b-row>
        </div>
      </transition>

    </b-container>
    
  </div>
</template>





<script>
// Propiedades:
import { mapState } from "vuex";

// Componentes:
import NavBar from "@/components/NavBar.vue";
import FormComision from "@/components/FormComision.vue";

// Atributos:
export default {
  name: "home",
  computed: {
    ...mapState(["tipoUsuario"])
    // otras propiedades
  },
  components: {
    NavBar,
    FormComision
  },
  data() {
    return {
      mostrarFormComision: false,
      mostrarFormComisionAbierta: false,

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
  methods: {}
};
</script>





<style>
.titleColor {
  color: #20603c;
}




/*
  ++++++++++++++++++++++++++++++++++++++++ Animaciones ++++++++++++++++++++++++++++++++++++++++
*/


.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}














.desliceInferior{
  animation: desliceInferior 0.8s forwards 0s ease;
}

@keyframes desliceInferior{
  0%{
      transform: rotate(0) scale(1) translateY(10%);
      opacity: 0;
      }
  100%{
      transform: rotate(0) scale(1) translateY(0);
      opacity: 1;
      }
}





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





</style>


