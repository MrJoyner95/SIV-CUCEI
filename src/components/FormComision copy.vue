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



      <h5 class="mt-5"> Actividades y programa </h5>
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

      <!-- Template Tabla (Programa de la comision) -->
      <b-row class="mt-2">
        <b-col md="12">
          <b-card>
            <b-row align-h="between">
              <h5>Programa de la comisión:</h5>
              <b-button size="sm" @click="ReiniciarDiaTemplate" v-b-modal.modal_agregar_dia variant="outline-primary" align="end">
                Agregar día
              </b-button>
            </b-row>
            <hr>

            <b-row>
              <b-table
                ref="tablaPrograma"
                head-variant="dark"
                bordered
                hover
                responsive
                small
                selectable
                select-mode="single"
                @row-selected="SeleccionarDia"
                :fields="headersTabla"
                :items="comision.programa"
              >
              </b-table>
            </b-row>
            
            <!-- Acciones -->
            <b-row align-h="center">
              <b-col md="3">
                <template v-if="this.diaTemplate.dia != null">
                  <b-button size="sm" v-b-modal.modal_editar_dia block variant="outline-secondary">Editar</b-button>
                </template>
                <template v-else>
                  <b-button size="sm" disabled block variant="outline-secondary">Editar</b-button>
                </template>
              </b-col>
              <b-col md="3">
                <template v-if="this.diaTemplate.dia != null">
                  <b-button size="sm" v-b-modal.modal_eliminar_dia block variant="outline-danger">Eliminar</b-button>
                </template>
                <template v-else>
                  <b-button size="sm" disabled block variant="outline-danger">Eliminar</b-button>
                </template>
              </b-col>
            </b-row>

          </b-card>
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
              variant="danger"
              v-b-tooltip.hover title="Elimina la solicitud por completo."
            >
              Cancelar solicitud
            </b-button>
          </b-col>
          <b-col cols="3">
            <!-- Espacio en blanco -->
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
            <b-button 
              block 
              variant="primary" 
              v-b-tooltip.hover title="Una vez enviada, no podrá editarse."
            >
              Enviar solicitud
            </b-button>
          </b-col>
        </b-row>

      </template>



      



      <!-- Espacio al final del formulario -->
      <p class="mt-3"></p>


      
    </b-card>





    <!-- Modal Agregar Dia -->
    <b-modal
      id="modal_agregar_dia"
      ref="modal_agregar_dia"
      title="Información del día"
      size="md"
      ok-title="Guardar"
      cancel-title="Cancelar"
      centered
      @show="ReiniciarModalAgregarDia"
      @hidden="ReiniciarModalAgregarDia"
      @ok="OkModalAgregarDia"
    >
      <b-card>
        <form ref="modal_agregar_dia_form">
          <b-form-group
            label=""
            description="Ingrese los detalles del programa de su comisión durante el día."
            invalid-feedback="Los datos ingresados no son válidos. Por favor, revíselos e intente de nuevo."
            :state="estadoModalAgregarDia"
          >
            <b-row>
              <b-col md="6">
                <p align="left">Fecha:</p>
                <b-form-input 
                  id="fecha-input" 
                  type="date" 
                  required 
                  v-model="diaTemplate.fecha"
                >
                </b-form-input>
              </b-col>

              <b-col md="6">
                <p align="left">Lugar:</p>
                <b-form-input 
                  id="lugar-input" 
                  type="text" 
                  placeholder="Lugar de estancia..."
                  required 
                  v-model="diaTemplate.lugar"
                >
                </b-form-input>
              </b-col>
            </b-row>

            <b-row class="mt-3">
              <b-col md="12">
                <p align="left">Tareas:</p>
                <b-form-textarea
                  id="tareas-input" 
                  v-model="diaTemplate.tareas"
                  placeholder="Tareas a realizar durante el día..."
                  required 
                  rows="3"
                  max-rows="3"
                >
                </b-form-textarea>
              </b-col>
            </b-row>
          </b-form-group>
        </form>
      </b-card>
    </b-modal>



    <!-- Modal Editar Dia -->
    <b-modal
      id="modal_editar_dia"
      ref="modal_editar_dia"
      title="Información del día"
      size="md"
      ok-title="Guardar"
      cancel-title="Cancelar"
      buttonSize="sm"
      centered
      @show="ReiniciarModalEditarDia"
      @hidden="ReiniciarModalEditarDia"
      @ok="OkModalEditarDia"
    >
      <b-card>
        <form ref="modal_editar_dia_form">
          <b-form-group
            label=""
            description="Ingrese la cantidad que estima gastar para cada rubro durante el día."
            invalid-feedback="Los datos ingresados no son válidos. Por favor, ingrese números positivos."
            :state="estadoModalEditarDia"
          >
            <b-row class="mt-2">
              <b-col md="6">
                <p align="left">Fecha:</p>
                <b-form-input 
                  id="fecha-input" 
                  type="date" 
                  required 
                  v-model="diaTemplate.fecha"
                >
                </b-form-input>
              </b-col>

              <b-col md="6">
                <p align="left">Lugar:</p>
                <b-form-input 
                  id="lugar-input" 
                  type="text" 
                  placeholder="Lugar de estancia..."
                  required 
                  v-model="diaTemplate.lugar"
                >
                </b-form-input>
              </b-col>
            </b-row>

            <b-row class="mt-2">
              <b-col md="12">
                <p align="left">Tareas:</p>
                <b-form-textarea
                  id="tareas-input" 
                  v-model="diaTemplate.tareas"
                  placeholder="Tareas a realizar durante el día..."
                  required 
                  rows="3"
                  max-rows="3"
                >
                </b-form-textarea>
              </b-col>
            </b-row>
          </b-form-group>
        </form>
      </b-card>
    </b-modal>



    <!-- Modal Eliminar Dia -->
    <b-modal
      id="modal_eliminar_dia"
      title="Confirmar eliminación"
      size= "sm"
      buttonSize="sm"
      okVariant="danger"
      okTitle="Eliminar"
      cancelTitle="Cancelar"
      footerClass="p-2"
      centered
      @ok="EliminarDia($data.diaTemplate)"
    >
      ¿Está seguro de eliminar el día seleccionado?
    </b-modal>





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
          programa: []
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
        programa: []
      },

      tipoComision: {
        opciones: [
          { value: null, text: 'Seleccione un tipo' },
          { value: 'nacional', text: 'Nacional' },
          { value: 'extranjero', text: 'Extranjero' }
        ]
      },
      destinoComision: {
        opciones: []
      },
      archivoInvitacion: null,
      archivoPrograma: null,


      // Tabla editable:
      headersTabla: [
        { key: "dia", label: "Día", sortable: false, variant: "secondary" },
        { key: "fecha", label: "Fecha", sortable: false },
        { key: "lugar", label: "Lugar de estancia", sortable: false },
        { key: "tareas", label: "Tareas a realizar", sortable: false }
      ],
      // Dia Template:
      // Se usa como modelo para manejar los datos de un dia nuevo/seleccionado.
      diaTemplate: {
        dia: null,
        fecha: null,
        lugar: null,
        tareas: null
      },
      // Modals Dia:
      estadoModalAgregarDia: null,
      estadoModalEditarDia: null,


    }
  },
  methods:{

    // ++++++++++++++++++++++++++++++++ Tabla editable ++++++++++++++++++++++++++++++++
    SeleccionarDia(item){
      // Verifica si se selecciono un objeto de la tabla o se quito la seleccion:
      if(item[0]){
        // Copia valor del item a diaTemplate:
        this.diaTemplate = JSON.parse(JSON.stringify(item[0]));
      }
      else{
        // Regresa al valor inicial:
        this.ReiniciarDiaTemplate();
      }
    },

    AgregarDia(diaNuevo){
      // Copia diaNuevo:
      var dia = JSON.parse(JSON.stringify(diaNuevo));
      // Comprobaciones de fecha:

      // Calcula el numero de dia:
      var contDia = this.comision.programa.length + 1;
      dia.dia = contDia.toString();
      // Agrega dia al arreglo de la comision:
      this.comision.programa.push(dia);
    },    

    EditarDia(diaSel){
      // Comprueba que haya un dia seleccionado:
      if(diaSel.dia != null){
        // Copia diaSel:
        var dia = JSON.parse(JSON.stringify(diaSel));
        // Comprobaciones de fecha:

        // Copia valor de diaTemplate al arreglo (toma el indice de diaTemplate):
        this.comision.programa[ parseInt(dia.dia) - 1 ] = dia;
        // Refresca tabla del programa:
        this.$refs.tablaPrograma.refresh();
      }
    },

    EliminarDia(diaSel){
      // Comprueba que haya un dia seleccionado:
      if(diaSel.dia != null){
        // Obtiene indice del objeto:
        var indiceDia = JSON.parse(JSON.stringify(diaSel.dia));
        indiceDia = parseInt(indiceDia - 1);
        // Elimina objeto del arreglo:
        this.comision.programa.splice(indiceDia, 1);
        // Recalcula los valores de dia:
        for (let i = 0; i < this.comision.programa.length; i++) {
          this.comision.programa[i].dia = i + 1;
        }
        // Refresca tabla del programa:
        this.$refs.tablaPrograma.refresh();
      }
    },

    ReiniciarDiaTemplate(){
      this.diaTemplate = {
        dia: null,
        fecha: null,
        lugar: null,
        tareas: null
      }
    },


    // ++++++++++++++++++++++++++++++++ Modal Agregar Dia ++++++++++++++++++++++++++++++++
    ComprobarModalAgregarDia() {
      //  Comprobaciones de valides del dia:

      // Comprueba el estado del form:
      const valid = this.$refs.modal_agregar_dia_form.checkValidity();
      this.estadoModalAgregarDia = valid ? "valid" : "invalid";
      return valid;
    },
    ReiniciarModalAgregarDia() {
      this.estadoModalAgregarDia = null;
      this.ReiniciarDiaTemplate();
    },
    OkModalAgregarDia(bvModalEvt) {
      // Previene default:
      bvModalEvt.preventDefault();
      // Se sale si el form no es valido:
      if (!this.ComprobarModalAgregarDia()) {
        return;
      }
      // Agrega dia:
      this.AgregarDia(this.diaTemplate);
      // Esconde modal:
      this.$nextTick(() => {
        this.$refs.modal_agregar_dia.hide();
      });
    },


    // ++++++++++++++++++++++++++++++++ Modal Editar Dia ++++++++++++++++++++++++++++++++
    ComprobarModalEditarDia() {
      //  Comprobaciones de valides del dia:

      // Comprueba el estado del form:
      const valid = this.$refs.modal_editar_dia_form.checkValidity();
      this.estadoModalEditarDia = valid ? "valid" : "invalid";
      return valid;
    },
    ReiniciarModalEditarDia() {
      this.estadoModalEditarDia = null;
    },
    OkModalEditarDia(bvModalEvt) {
      // Previene default:
      bvModalEvt.preventDefault();
      // Sale si el form no es valido:
      if (!this.ComprobarModalEditarDia()) {
        return;
      }
      // Agrega dia:
      this.EditarDia(this.diaTemplate);
      // Esconde modal:
      this.$nextTick(() => {
        this.$refs.modal_editar_dia.hide();
      });
    },

    

  }
};
</script>





<style>

</style>


