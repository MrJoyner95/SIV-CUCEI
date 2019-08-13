<template>
  <div class="formComision">
    <b-card bg-variant="light">

      <h4 align="center"> Solicitud de viáticos </h4>

      <b-row class="mt-4">
        <b-col>
          <h6 align="right"> Folio de comisión: {{ comision_prop.folio }} </h6>
        </b-col>
      </b-row>
      <b-row align-h="end" class="mt-2">
        <b-col>
          <h6 align="right"> Fecha: {{ comision_prop.fecha }} </h6>
        </b-col>
      </b-row>



      <!-- <h5> Datos del proyecto </h5>
      <hr> -->

      <!-- <b-row no-gutters class="mt-2">
        <b-col cols="5">
          <p align="center">Dependencia</p>
          <b-form-input 
            id="dependencia-input" 
            placeholder="dependencia..." 
          >
          </b-form-input>
        </b-col>

        <b-col cols="4">
          <p align="center" style="white-space: nowrap; overflow:hidden">Empleado o funcionario universitario</p>
          <b-form-input 
            id="dependencia-input" 
            placeholder="empleado..." 
          >
          </b-form-input>
        </b-col>

        <b-col cols="3">
          <p align="center">Invitado</p>
          <b-form-input 
            id="dependencia-input" 
            placeholder="invitado..." 
          >
          </b-form-input>
        </b-col>
      </b-row> -->

      <h5> Beneficiario </h5>
      <hr>

      <b-row class="mt-2">
        <b-col cols="7">
          <p align="left">Dependencia:</p>
          <b-form-input 
            id="dependencia-input" 
            placeholder="dependencia..." 
          >
          </b-form-input>
        </b-col>

        <b-col cols="5">
          <p align="left">Tipo de beneficiario:</p>
          <b-form-group>
            <b-form-radio-group 
            id="radio-1"
            name="radios-stacked" 
            v-model="esInvitado"
            stacked
            >
              <b-form-radio :value="false">Empleado o funcionario universitario</b-form-radio>
              <b-form-radio :value="true">Invitado</b-form-radio>
            </b-form-radio-group>
          </b-form-group>
        </b-col>
      </b-row>

      <!-- Row escondido -->
      <transition enter-active-class="animated fade-in-top" leave-active-class="animated fade-out-top">
        <div v-if="esInvitado === true">
          <b-row class="mt-1">
            <b-col cols="7">
              <p align="left">Nombre del invitado:</p>
              <b-form-input 
                id="dependencia-input" 
                placeholder="nombre..." 
              >
              </b-form-input>
            </b-col>
          </b-row>
        </div>
      </transition>





      <h5 class="mt-5"> Proyecto </h5>
      <hr>

      <b-row no-gutters class="mt-2">
        <b-col cols="4">
          <p align="left">No. de proyectos: {{ noProyectos }} </p>
          <b-button 
            variant="outline-primary"
            v-on:click="noProyectos++"
          >
            Agregar proyecto
          </b-button>
        </b-col>
        
        <b-col cols="8">
          <p align="left">Proyectos:</p>
          <b-input-group prepend="1">
            <b-form-input></b-form-input>
            <b-input-group-append>
              <b-button v-on:click="noProyectos--" variant="outline-danger">Borrar</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-col>
      </b-row>





      <h5 class="mt-5"> Gastos </h5>
      <hr>

      <b-row no-gutters class="mt-2">
        <b-col cols="12">
          <p align="left">Proyectos:</p>
          <b-card>
            <h1>Tabla modificable de gastos</h1>
          </b-card>
        </b-col>
      </b-row>

      <p align="left">Comentarios:</p>
      <b-form-textarea
        id="comentarios-input"
        :placeholder="'comentarios...'"
        rows="3"
        max-rows="8"
      ></b-form-textarea>


      
      
      



      <!-- <h5 class="mt-5"> Datos del proyecto </h5>
      <hr>

      <b-row no-gutters class="mt-2">
        <b-col cols="5">
          <p align="center">No. de proyectos</p>
          <b-form-input 
            id="dependencia-input" 
            placeholder="no. de proyectos..." 
          >
          </b-form-input>
        </b-col>
        
        <b-col cols="7">
          <p align="center">Nombre del invitado</p>
          <b-form-input 
            id="dependencia-input" 
            placeholder="nombre del invitado..." 
          >
          </b-form-input>
        </b-col>
      </b-row> -->



      <h5 class="mt-5"> Documentos adjuntos (opcional)</h5>
      <hr>

      <b-row class="mt-2">
        <b-col cols="6">
          <label for="invitacion-input">Invitación:</label>
          <b-form-file
            id="invitacion-input"
            v-model="archivoInvitacion"
            :state="Boolean(archivoInvitacion) || null"
            :disabled="deshabilitado"
            placeholder="Elija o arrastre un archivo..."
            drop-placeholder="Suelte el archivo aquí..."
            browse-text="Buscar"
          ></b-form-file>
          <div class="mt-3">Selección: <strong>{{ archivoInvitacion ? archivoInvitacion.name : '' }}</strong> </div>
        </b-col>

        <b-col cols="6">
          <label for="invitacion-input">Programa del evento:</label>
          <b-form-file
            id="invitacion-input"
            v-model="archivoPrograma"
            :state="Boolean(archivoPrograma) || null"
            :disabled="deshabilitado"
            placeholder="Elija o arrastre un archivo..."
            drop-placeholder="Suelte el archivo aquí..."
            browse-text="Buscar"
          ></b-form-file>
          <div class="mt-3">Selección: <strong>{{ archivoPrograma ? archivoPrograma.name : '' }}</strong> </div>
        </b-col>
      </b-row>



      <template v-if="1 == 1">

        <hr class="mt-5">

        <b-row class="mt-4" align-h="center">
          <b-col cols="6">
            <b-button 
              block 
              variant="primary" 
              v-b-tooltip.hover title="Guarda el estado actual de la solicitud. Puede editarse después"
            >
              Guardar estado actual
            </b-button>
          </b-col>
          <b-col cols="6">
            <b-button 
              block 
              variant="danger"
              v-b-tooltip.hover title="Reinicia los valores de la solicitud"
            >
              Reiniciar solicitud
            </b-button>
          </b-col>
        </b-row>

      </template>



      



      <!-- Espacio al final del formulario -->
      <p class="mt-3"></p>
      
    </b-card>
  </div>
</template>





<script>
export default {
  name: "formComision",
  props: {
    titulo: "",
    deshabilitado: false,
    comision_prop: {
      type: Object,
      // Por ser un objeto, se debe regresar con una funcion:
      default: function() {
        return {
          folio: "001302",
          fecha: new Date().toLocaleDateString(),
          codigoTrabajador: "",
          nombreSolicitante: "",
          areaAdscripcion: "",
          tipoComision: "",
          destinoComision: "",
          plazaLaboral: "",
          justificacion: "",
          programaTrabajo: "",
          objetivoTrabajo: "",
          eventoComision: "",
          programaComision: [
            {
              dia: "",
              lugar: "",
              tareas: ""
            }
          ]
        }
      }
    }

  },

  data() {
    return {

      esInvitado: false,
      noProyectos: 1,

        comision: {
        folio: "",
        fecha: "",
        codigoTrabajador: "",
        nombreSolicitante: "",
        areaAdscripcion: "",
        tipoComision: "",
        destinoComision: "",
        plazaLaboral: "",
        justificacion: "",
        programaTrabajo: "",
        objetivoTrabajo: "",
        eventoComision: "",
        programaComision: [
          {
            dia: "",
            lugar: "",
            tareas: ""
          }
        ]
      },

      tipoComision: {
        opciones: [
          { value: null, text: 'Seleccione un tipo' },
          { value: 'a', text: 'Tipo a' },
          { value: 'b', text: 'Tipo b' },
          { value: 'c', text: 'Tipo c' },
          { value: 'd', text: 'Tipo d (no disponible)', disabled: true }
        ]
      },
      destinoComision: {
        opciones: []
      },
      archivoInvitacion: null,
      archivoPrograma: null
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



.fade-in-left {
	animation: fade-in-left 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
}

/* ----------------------------------------------
 * Generated by Animista on 2019-8-10 3:36:36
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation fade-in-left
 * ----------------------------------------
 */
@keyframes fade-in-left {
  0% {
    transform: translateX(-50px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}



.fade-out-left {
	animation: fade-out-left 0.6s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

/* ----------------------------------------------
 * Generated by Animista on 2019-8-10 3:37:19
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation fade-out-left
 * ----------------------------------------
 */
@keyframes fade-out-left {
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(-50px);
    opacity: 0;
  }
}





</style>


