<template>
  <div class="formComision">
    <b-card bg-variant="light">

      <h4 align="center"> {{ titulo }} </h4>

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
              v-model="comision.codigoTrabajador"
              :placeholder="comision_prop.codigoTrabajador" 
              :disabled="deshabilitado"
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
              v-model="comision.nombreSolicitante"
              :placeholder="comision_prop.nombreSolicitante" 
              :disabled="deshabilitado"
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
              v-model="comision.areaAdscripcion"
              :placeholder="comision_prop.areaAdscripcion" 
              :disabled="deshabilitado"
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

            <div v-if="deshabilitado === true">
              <div class="mt-2">Selección: <strong>{{ comision_prop.tipoComision }}</strong></div>
            </div>
            <div v-else>
              <div class="mt-2">Selección: <strong>{{ comision.tipoComision }}</strong></div>
            </div>

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

            <div v-if="deshabilitado === true">
              <div class="mt-2">Selección: <strong>{{ comision_prop.destinoComision }}</strong></div>
            </div>
            <div v-else>
              <div class="mt-2">Selección: <strong>{{ comision.destinoComision }}</strong></div>
            </div>

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
            
            <div v-if="deshabilitado === true">
              <div class="mt-2">Selección: <strong>{{ comision_prop.plazaLaboral }}</strong></div>
            </div>
            <div v-else>
              <div class="mt-2">Selección: <strong>{{ comision.plazaLaboral }}</strong></div>
            </div>
            
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
              v-model="comision.justificacion"
              :placeholder="comision_prop.justificacion || 'Justificación de la comisión...'"
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
              v-model="comision.programaTrabajo"
              :placeholder="comision_prop.programaTrabajo" 
              :disabled="deshabilitado"
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
              v-model="comision.objetivoTrabajo"
              :placeholder="comision_prop.objetivoTrabajo" 
              :disabled="deshabilitado"
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
              v-model="comision.eventoComision"
              :placeholder="comision_prop.eventoComision" 
              :disabled="deshabilitado"
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


