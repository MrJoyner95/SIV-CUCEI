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


      <!-- Template Tabla -->
      <b-row no-gutters class="mt-2">
        <b-col md="12">
          <b-card>
            <b-row align-h="between">
              <h4 class="titulo"> Importe por concepto de gasto </h4>
              <b-button v-b-modal.modal_agregar_dia variant="outline-primary" align="end">
                Agregar día
              </b-button>
            </b-row>
            <hr>

            <b-row>
              <b-table
                ref="tablaDias"
                head-variant="dark"
                bordered
                hover
                responsive
                small
                selectable
                select-mode="single"
                @row-selected="SeleccionarDia"
                :fields="headersTabla"
                :items="dias"
              >
              </b-table>
            </b-row>
            
            <!-- Acciones -->
            <b-row align-h="center">
              <b-col md="3">
                <template v-if="this.diaSeleccionado.dia != 'null'">
                  <b-button v-b-modal.modal_editar_dia block variant="outline-secondary">Editar</b-button>
                </template>
                <template v-else>
                  <b-button disabled block variant="outline-secondary">Editar</b-button>
                </template>
              </b-col>
              <b-col md="3">
                <template v-if="this.diaSeleccionado.dia != 'null'">
                  <b-button v-b-modal.modal_eliminar_dia block variant="outline-danger">Eliminar</b-button>
                </template>
                <template v-else>
                  <b-button disabled block variant="outline-danger">Eliminar</b-button>
                </template>
              </b-col>
            </b-row>

            <!-- <b-row>
              <b-col>
                <p>{{ this.dias.length }}</p>
              </b-col>

              <b-col>
                <p> {{ this.diaSeleccionado }} </p>
              </b-col>
            </b-row> -->

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



    <!-- Modal Agregar Dia -->
    <!-- <b-modal
      id="modal_agregar_dia"
      ref="modal_agregar_dia"
      title="Información de gastos del día"
      size="lg"
      ok-title="Guardar"
      cancel-title="Cancelar"
      centered
      @show="reiniciarModalDia()"
      @hidden="reiniciarModalDia()"
      @ok="AgregarDia($data.diaNuevo)"
    >
      <b-card>
        <b-row class="mt-2">
          <b-col md="4">
            <p align="left">Alimentación:</p>
            <b-input-group prepend="$">
              <b-form-input id="alimentacion-input" v-model="diaNuevo.alimentacion">
              </b-form-input>
            </b-input-group>
          </b-col>

          <b-col md="4">
            <p align="left">Hospedaje:</p>
            <b-input-group prepend="$">
              <b-form-input id="hospedaje-input" v-model="diaNuevo.hospedaje">
              </b-form-input>
            </b-input-group>
          </b-col>

          <b-col md="4">
            <p align="left">Transporte foráneo:</p>
            <b-input-group prepend="$">
              <b-form-input id="transporte_foraneo-input" v-model="diaNuevo.transporte_foraneo">
              </b-form-input>
            </b-input-group>
          </b-col>
        </b-row>

        <b-row class="mt-2">
          <b-col md="4">
            <p align="left">Transporte local:</p>
            <b-input-group prepend="$">
              <b-form-input id="transporte_local-input" v-model="diaNuevo.transporte_local">
              </b-form-input>
            </b-input-group>
          </b-col>

          <b-col md="4">
            <p align="left">Combustible:</p>
            <b-input-group prepend="$">
              <b-form-input id="combustible-input" v-model="diaNuevo.combustible">
              </b-form-input>
            </b-input-group>
          </b-col>

          <b-col md="4">
            <p align="left">Otros conceptos:</p>
            <b-input-group prepend="$">
              <b-form-input id="otros_conceptos-input" v-model="diaNuevo.otros_conceptos">
              </b-form-input>
            </b-input-group>
          </b-col>
        </b-row>
      </b-card>
    </b-modal> -->

    <b-modal
      id="modal_agregar_dia"
      ref="modal_agregar_dia"
      title="Información de gastos del día"
      size="lg"
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
            description="Ingrese la cantidad que estima gastar para cada rubro durante el día."
            invalid-feedback="Los datos ingresados no son válidos. Por favor, ingrese números positivos."
            :state="estadoModalAgregarDia"
          >
            <b-row class="mt-2">
              <b-col md="4">
                <p align="left">Alimentación:</p>
                <b-input-group prepend="$">
                  <b-form-input id="alimentacion-input" type="number" required v-model="diaNuevo.alimentacion">
                  </b-form-input>
                </b-input-group>
              </b-col>

              <b-col md="4">
                <p align="left">Hospedaje:</p>
                <b-input-group prepend="$">
                  <b-form-input id="hospedaje-input" type="number" required v-model="diaNuevo.hospedaje">
                  </b-form-input>
                </b-input-group>
              </b-col>

              <b-col md="4">
                <p align="left">Transporte foráneo:</p>
                <b-input-group prepend="$">
                  <b-form-input id="transporte_foraneo-input" type="number" required v-model="diaNuevo.transporte_foraneo">
                  </b-form-input>
                </b-input-group>
              </b-col>
            </b-row>

            <b-row class="mt-2">
              <b-col md="4">
                <p align="left">Transporte local:</p>
                <b-input-group prepend="$">
                  <b-form-input id="transporte_local-input" type="number" required v-model="diaNuevo.transporte_local">
                  </b-form-input>
                </b-input-group>
              </b-col>

              <b-col md="4">
                <p align="left">Combustible:</p>
                <b-input-group prepend="$">
                  <b-form-input id="combustible-input" type="number" required v-model="diaNuevo.combustible">
                  </b-form-input>
                </b-input-group>
              </b-col>

              <b-col md="4">
                <p align="left">Otros conceptos:</p>
                <b-input-group prepend="$">
                  <b-form-input id="otros_conceptos-input" type="number" required v-model="diaNuevo.otros_conceptos">
                  </b-form-input>
                </b-input-group>
              </b-col>
            </b-row>
          </b-form-group>
        </form>
      </b-card>
    </b-modal>



    <!-- Modal Editar Dia -->
    <!-- <b-modal
      id="modal_editar_dia"
      ref="modal_editar_dia"
      title="Información de gastos del día"
      size="lg"
      ok-title="Guardar"
      cancel-title="Cancelar"
      centered
      @ok="EditarDia($data.diaSeleccionado)"
    >
      <b-card>
        <b-row class="mt-2">
          <b-col md="4">
            <p align="left">Alimentación:</p>
            <b-input-group prepend="$">
              <b-form-input id="alimentacion-input" v-model="diaSeleccionado.alimentacion">
              </b-form-input>
            </b-input-group>
          </b-col>

          <b-col md="4">
            <p align="left">Hospedaje:</p>
            <b-input-group prepend="$">
              <b-form-input id="hospedaje-input" v-model="diaSeleccionado.hospedaje">
              </b-form-input>
            </b-input-group>
          </b-col>

          <b-col md="4">
            <p align="left">Transporte foráneo:</p>
            <b-input-group prepend="$">
              <b-form-input id="transporte_foraneo-input" v-model="diaSeleccionado.transporte_foraneo">
              </b-form-input>
            </b-input-group>
          </b-col>
        </b-row>

        <b-row class="mt-2">
          <b-col md="4">
            <p align="left">Transporte local:</p>
            <b-input-group prepend="$">
              <b-form-input id="transporte_local-input" v-model="diaSeleccionado.transporte_local">
              </b-form-input>
            </b-input-group>
          </b-col>

          <b-col md="4">
            <p align="left">Combustible:</p>
            <b-input-group prepend="$">
              <b-form-input id="combustible-input" v-model="diaSeleccionado.combustible">
              </b-form-input>
            </b-input-group>
          </b-col>

          <b-col md="4">
            <p align="left">Otros conceptos:</p>
            <b-input-group prepend="$">
              <b-form-input id="otros_conceptos-input" v-model="diaSeleccionado.otros_conceptos">
              </b-form-input>
            </b-input-group>
          </b-col>
        </b-row>
      </b-card>
    </b-modal> -->


    <b-modal
      id="modal_editar_dia"
      ref="modal_editar_dia"
      title="Información de gastos del día"
      size="lg"
      ok-title="Guardar"
      cancel-title="Cancelar"
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
              <b-col md="4">
                <p align="left">Alimentación:</p>
                <b-input-group prepend="$">
                  <b-form-input id="alimentacion-input" type="number" required v-model="diaSeleccionado.alimentacion">
                  </b-form-input>
                </b-input-group>
              </b-col>

              <b-col md="4">
                <p align="left">Hospedaje:</p>
                <b-input-group prepend="$">
                  <b-form-input id="hospedaje-input" type="number" required v-model="diaSeleccionado.hospedaje">
                  </b-form-input>
                </b-input-group>
              </b-col>

              <b-col md="4">
                <p align="left">Transporte foráneo:</p>
                <b-input-group prepend="$">
                  <b-form-input id="transporte_foraneo-input" type="number" required v-model="diaSeleccionado.transporte_foraneo">
                  </b-form-input>
                </b-input-group>
              </b-col>
            </b-row>

            <b-row class="mt-2">
              <b-col md="4">
                <p align="left">Transporte local:</p>
                <b-input-group prepend="$">
                  <b-form-input id="transporte_local-input" type="number" required v-model="diaSeleccionado.transporte_local">
                  </b-form-input>
                </b-input-group>
              </b-col>

              <b-col md="4">
                <p align="left">Combustible:</p>
                <b-input-group prepend="$">
                  <b-form-input id="combustible-input" type="number" required v-model="diaSeleccionado.combustible">
                  </b-form-input>
                </b-input-group>
              </b-col>

              <b-col md="4">
                <p align="left">Otros conceptos:</p>
                <b-input-group prepend="$">
                  <b-form-input id="otros_conceptos-input" type="number" required v-model="diaSeleccionado.otros_conceptos">
                  </b-form-input>
                </b-input-group>
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
      @ok="EliminarDia($data.diaSeleccionado)"
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
          programaComision: [
            {
              dia: "",
              lugar: "",
              tareas: ""
            }
          ]
        }
      }
    },

    // diaVacio: {
    //   type: Object,
    //   // Por ser un objeto, se debe regresar con una funcion:
    //   default: function(){
    //     return{
    //       alimentacion: 0,
    //       hospedaje: 0,
    //       transporte_foraneo: 0,
    //       transporte_local: 0,
    //       combustible: 0,
    //       otros: 0,
    //       suma: 0
    //     }
    //   }
      
    // }

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
      archivoPrograma: null,



      // Tabla editable:
      headersTabla: [
        { key: "dia", label: "Día", sortable: false, variant: "secondary" },
        { key: "alimentacion", label: "Alimentación", sortable: false },
        { key: "hospedaje", label: "Hospedaje", sortable: false },
        { key: "transporte_foraneo", label: "Transporte foráneo", sortable: false },
        { key: "transporte_local", label: "Transporte local", sortable: false },
        { key: "combustible", label: "Combustible", sortable: false },
        { key: "otros_conceptos", label: "Otros conceptos", sortable: false },
        { key: "suma", label: "Suma", sortable: false, variant: "secondary" }
      ],
      // Dias:
      dias: [],
      // Dia seleccionado:
      diaSeleccionado: {
        dia: "null",
        alimentacion: "null",
        hospedaje: "null",
        transporte_foraneo: "null",
        transporte_local: "null",
        combustible: "null",
        otros_conceptos: "null",
        suma: "null"
      },

      // Dia base:
      // Al inicializar la aplicacion se deben asignar los valores maximos del tabulador al dia, en lugar de null.
      diaBase: {
        alimentacion: "0",
        hospedaje: "0",
        transporte_foraneo: "0",
        transporte_local: "0",
        combustible: "0",
        otros_conceptos: "0"
      },
      // Dia nuevo:
      // Se usa como modelo para manejar los datos de un dia nuevo:
      diaNuevo: {
        alimentacion: "null",
        hospedaje: "null",
        transporte_foraneo: "null",
        transporte_local: "null",
        combustible: "null",
        otros_conceptos: "null"
      },

      // diaSeleccionado: null,

      // Modals Dia:
      estadoModalAgregarDia: null,
      estadoModalEditarDia: null,


    }
  },
  methods:{

    // ++++++++++++++++++++++++++++++++ Tabla editable ++++++++++++++++++++++++++++++++
    AgregarDia(diaNuevo){
      // NOTAS:
      // se agregan las propiedades "dia" y "suma" en este metodo.

      // Copia diaNuevo:
      var dia = JSON.parse(JSON.stringify(diaNuevo));

      // Calcula la suma del dia:
      var suma = 0;
      for( var rubro in dia ) {
        if( dia.hasOwnProperty( rubro ) && rubro != "dia" && rubro != "suma" ) {
          suma += parseFloat( dia[rubro] );
        }
      }
      dia.suma = suma;

      // Calcula el numero de dia:
      var contDia = this.dias.length + 1;
      dia.dia = contDia.toString();

      // Agrega dia al arreglo:
      this.dias.push(dia);
    },

    SeleccionarDia(item){
      // Verifica si se selecciono un objeto de la tabla o se quito la seleccion:
      if(item[0]){
        // Copia valor del item a diaSeleccionado:
        this.diaSeleccionado = JSON.parse(JSON.stringify(item[0]));
      }
      else{
        // Regresa al valor inicial:
        this.diaSeleccionado = {
          dia: "null",
          alimentacion: "null",
          hospedaje: "null",
          transporte_foraneo: "null",
          transporte_local: "null",
          combustible: "null",
          otros_conceptos: "null",
          suma: "null"
        }
      }
    },

    EditarDia(diaSel){
      // Comprueba que haya un dia seleccionado:
      if(diaSel.dia != "null"){
        // Copia diaSel:
        var dia = JSON.parse(JSON.stringify(diaSel));

        // Calcula la suma del dia:
        var suma = 0;
        for( var rubro in dia ) {
          if( dia.hasOwnProperty( rubro ) && rubro != "dia" && rubro != "suma" ) {
            suma += parseFloat( dia[rubro] );
          }
        }
        dia.suma = suma;

        // Copia valor de diaSeleccionado al arreglo (toma el indice de diaSeleccionado):
        this.dias[ parseInt(dia.dia) - 1 ] = dia;

        // Refresca tabla:
        this.$refs.tablaDias.refresh();
      }
    },

    EliminarDia(diaSel){
      // Comprueba que haya un dia seleccionado:
      if(diaSel.dia != "null"){
        // Obtiene indice del objeto:
        var indiceDia = JSON.parse(JSON.stringify(diaSel.dia));
        indiceDia = parseInt(indiceDia - 1);

        // Elimina objeto del arreglo:
        this.dias.splice(indiceDia, 1);

        // Recalcula los valores de dia:
        for (let i = 0; i < this.dias.length; i++) {
          this.dias[i].dia = i + 1;
        }

        // Refresca tabla:
        this.$refs.tablaDias.refresh();
      }
    },


    // ++++++++++++++++++++++++++++++++ Modal Agregar Dia ++++++++++++++++++++++++++++++++
    ComprobarModalAgregarDia() {
      // Si algun rubro de diaNuevo es negativo o no es numero, regresa null:
      var dia = JSON.parse(JSON.stringify(this.diaNuevo));
      for( var rubro in dia ) {
        try {
          var cantidad = parseFloat(dia[rubro]);
          if( cantidad < 0 ){
            this.estadoModalAgregarDia = false;
            return false;
          }
        } catch (error) {
          this.estadoModalAgregarDia = false;
          return false;
        }
      }

      // Comprueba el estado del form:
      const valid = this.$refs.modal_agregar_dia_form.checkValidity();
      this.estadoModalAgregarDia = valid ? "valid" : "invalid";
      return valid;
    },
    ReiniciarModalAgregarDia() {
      this.estadoModalAgregarDia = null;
      // Copia valor de diaBase en diaNuevo:
      this.diaNuevo = JSON.parse(JSON.stringify(this.diaBase));
    },
    OkModalAgregarDia(bvModalEvt) {
      // Previene default:
      bvModalEvt.preventDefault();

      // Sale si el form no es valido:
      if (!this.ComprobarModalAgregarDia()) {
        return;
      }

      // Agrega dia:
      this.AgregarDia(this.diaNuevo);

      // Esconde modal:
      this.$nextTick(() => {
        this.$refs.modal_agregar_dia.hide();
      });
    },


    // ++++++++++++++++++++++++++++++++ Modal Editar Dia ++++++++++++++++++++++++++++++++
    ComprobarModalEditarDia() {
      // Si algun rubro de diaNuevo es negativo o no es numero, regresa null:
      var dia = JSON.parse(JSON.stringify(this.diaSeleccionado));
      for( var rubro in dia ) {
        try {
          var cantidad = parseFloat(dia[rubro]);
          if( cantidad < 0 ){
            this.estadoModalEditarDia = false;
            return false;
          }
        } catch (error) {
          this.estadoModalEditarDia = false;
          return false;
        }
      }

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
      this.EditarDia(this.diaSeleccionado);

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


