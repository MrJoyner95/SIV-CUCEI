<template>
  <div class="formComision">
    <b-card bg-variant="light">

      <h4 align="center"> {{ titulo }} </h4>

      <b-row class="mt-4">
        <b-col>
          <h6 align="right"> Folio de comisión: {{ comision.folio }} </h6>
        </b-col>
      </b-row>
      <b-row align-h="end" class="mt-3">
        <b-col cols="3">
          <b-form-input id="fecha-input" :placeholder="comision.fecha" style="text-align:center;" :readonly="deshabilitado"></b-form-input>
        </b-col>
      </b-row>



      <h5> Datos personales </h5>
      <hr>

      <b-row class="mt-2">
        <b-col cols="8">
          <b-form-group
            label-cols-sm="4"
            label="Código de trabajador:"
            label-for="codigoTrabajador-input"
          >
            <b-form-input 
              id="codigoTrabajador-input" 
              :placeholder="comision.codigoTrabajador" 
              :readonly="deshabilitado"
            >
            </b-form-input>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row align-h="start" class="mt-2">
        <b-col cols="8">
          <b-form-group
            label-cols-sm="4"
            label="Nombre del solicitante:"
            label-for="nombreSolicitante-input"
          >
            <b-form-input 
              id="nombreSolicitante-input" 
              :placeholder="comision.nombreSolicitante" 
              :readonly="deshabilitado"
            >
            </b-form-input>
          </b-form-group>
        </b-col>
      </b-row>



      <h5 class="mt-5"> Información de la comisión </h5>
      <hr>

      <b-row align-h="start" class="mt-2">
        <b-col cols="8">
          <b-form-group
            label-cols-sm="4"
            label="Área de adscripción:"
            label-for="areaAdscripcion-input"
          >
            <b-form-input 
              id="areaAdscripcion-input" 
              :placeholder="comision.areaAdscripcion" 
              :readonly="deshabilitado"
            >
            </b-form-input>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row class="mt-2">
        <b-col cols="8">
          <b-form-group
            label-cols-sm="4"
            label="Tipo de comisión:"
            label-for="tipoComision-input"
          >
            <b-form-select v-model="comision.tipoComision" :options="tipoComision.opciones" :disabled="deshabilitado"></b-form-select>
            <div class="mt-3">Selección: <strong>{{ comision.tipoComision }}</strong></div>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row class="mt-2">
        <b-col cols="8">
          <b-form-group
            label-cols-sm="4"
            label="Destino de la comisión:"
            label-for="destinoComision-input"
          >
            <b-form-select v-model="comision.destinoComision" class="mb-3" :disabled="deshabilitado">
              <option :value="null">Seleccione un país</option>
              <optgroup label="América">
                <option value="canada">Canadá</option>
                <option value="usa" disabled>Estados Unidos (no disponible)</option>
              </optgroup>
              <optgroup label="Europa">
                <option value="germany">Alemania</option>
                <option value="poland">Polonia</option>
              </optgroup>
              <optgroup label="Asia">
                <option value="turkey">Turquía</option>
                <option value="china">China</option>
              </optgroup>
            </b-form-select>
            <div class="mt-2">Selección: <strong>{{ comision.destinoComision }}</strong></div>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row class="mt-2">
        <b-col cols="8">
          <b-form-group
            label-cols-sm="4"
            label="Plaza laboral:"
            label-for="plazaLaboral-input"
          >
            <b-form-select v-model="comision.plazaLaboral" :options="tipoComision.opciones" :disabled="deshabilitado"></b-form-select>
            <div class="mt-3">Selección: <strong>{{ comision.plazaLaboral }}</strong></div>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row class="mt-2">
        <b-col cols="10">
          <b-form-group
            label-cols-sm="3"
            label="Justificación:"
            label-for="justificacion-input"
          >
            <b-form-textarea
              id="justificacion-input"
              :v-model="comision.justificacion"
              :placeholder="comision.justificacion || 'Justificación de la comisión...'"
              :disabled="deshabilitado"
              rows="4"
              max-rows="8"
            ></b-form-textarea>
          </b-form-group>
        </b-col>
      </b-row>



      <h5 class="mt-5"> Actividades y programa de la comisión </h5>
      <hr>

      <b-row class="mt-2">
        <b-col cols="8">
          <b-form-group
            label-cols-sm="4"
            label="Programa de trabajo:"
            label-for="programaTrabajo-input"
          >
            <b-form-input 
              id="programaTrabajo-input" 
              :placeholder="comision.programaTrabajo" 
              :readonly="deshabilitado"
            >
            </b-form-input>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row class="mt-2">
        <b-col cols="8">
          <b-form-group
            label-cols-sm="4"
            label="Objetivo de trabajo:"
            label-for="objetivoTrabajo-input"
          >
            <b-form-input 
              id="objetivoTrabajo-input" 
              :placeholder="comision.objetivoTrabajo" 
              :readonly="deshabilitado"
            >
            </b-form-input>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row class="mt-2">
        <b-col cols="8">
          <b-form-group
            label-cols-sm="4"
            label="Evento de la comisión:"
            label-for="eventoComision-input"
          >
            <b-form-input 
              id="eventoComision-input" 
              :placeholder="comision.eventoComision" 
              :readonly="deshabilitado"
            >
            </b-form-input>
          </b-form-group>
        </b-col>
      </b-row>



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



      <template v-if="deshabilitado === false">

        <hr class="mt-5">

        <b-row class="mt-4" align-h="center">
          <b-col cols="3">
            <b-button 
              block 
              variant="primary" 
              v-b-tooltip.hover title="Una vez enviada, no podrá editarse."
            >
              Enviar solicitud
            </b-button>
          </b-col>
          <b-col cols="3">
            <b-button 
              block 
              variant="secondary"
              v-b-tooltip.hover title="Se guarda la solicitud sin enviarla. Puede terminarla después."
            >
              Guardar solicitud
            </b-button>
          </b-col>
          <b-col cols="3">
            <!-- Espacio en blanco -->
          </b-col>
          <b-col cols="3">
            <b-button 
              block 
              variant="danger"
              v-b-tooltip.hover title="Elimina la solicitud por completo."
            >
              Cancelar solicitud
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
    // comision: {
    //   folio: "",
    //   fecha: "",
    //   codigoTrabajador: "",
    //   nombreSolicitante: "",
    //   areaAdscripcion: "",
    //   tipoComision: "",
    //   destinoComision: "",
    //   plazaLaboral: "",
    //   justificacion: "",
    //   programaTrabajo: "",
    //   objetivoTrabajo: "",
    //   eventoComision: "",
    //   programaComision: [
    //     {
    //       dia: "",
    //       lugar: "",
    //       tareas: ""
    //     }
    //   ]
    // }
  },

  data() {
    return {
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
</style>


