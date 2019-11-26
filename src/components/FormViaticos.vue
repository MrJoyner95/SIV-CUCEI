<template>
  <div class="formComision">



    <!-- ++++++++++++++++++++++++++++++++++++++++ Formulario de Solicitud de Viaticos ++++++++++++++++++++++++++++++++++++++++ -->

    

    <b-card bg-variant="light">

      <b-form @submit="$bvModal.show('modal_enviar_solicitud')">

        <!-- ++++++++++++++++++++++++++++++++ Datos generales de la solicitud ++++++++++++++++++++++++++++++++ -->
        <div v-if="1 == 1">
          <h4 align="center"> Solicitud de viáticos <small><b-badge pill variant="secondary">No enviada</b-badge></small> </h4>
        </div>
        <div v-else>
          <h4 align="center"> Solicitud de viáticos <small><b-badge pill variant="success">Enviada</b-badge></small> </h4>
        </div>



        <!-- Detalles de la solicitud -->
        <b-row align-h="end" class="mt-5">
          <h6 align="right"> Folio de comisión: {{comisionActiva.folio}} </h6>
        </b-row>
        <b-row align-h="end" class="mt-2">
          <h6 align="right"> Fecha de creación: {{comisionActiva.fechaCreacion}} </h6>
        </b-row>


        <!-- Solicitud con datos -->
        <div v-if="comision != null">

          <!-- Solicitud PE / AU / RE / EP / CO -->
          <div v-if="comision.fechaEnvio != null">
            <b-row align-h="end" class="mt-2">
              <b-col>
                <h6 align="right"> Fecha de envio: {{comision.fechaEnvio}} </h6>
              </b-col>
            </b-row>
          </div>
          
        </div>





        <!-- ++++++++++++++++++++++++++++++++++++++++++++++++ Beneficiario ++++++++++++++++++++++++++++++++++++++++++++++++ -->
        
        <h5> Información del beneficiario </h5>
        <hr>

        <b-row align-h="start" class="mt-2">

          <!-- <b-col md="6">
            El beneficiario es un invitado
            <transition enter-active-class="animated fade-in-fwd" leave-active-class="animated fade-out-bck">
              <div v-if="beneficiarioInvitado == true && animacionActiva == false">
                <p align="left">Nombre del invitado:</p>
                <b-form-input 
                  id="dependencia-input" 
                  placeholder="nombre..." 
                >
                </b-form-input>                
              </div>
            </transition>

            El beneficiario es el solicitante. Se muestra su informacion
            <transition enter-active-class="animated fade-in-fwd" leave-active-class="animated fade-out-bck">
              <div v-if="beneficiarioInvitado == false && animacionActiva == false">
                <p align="left">Código de trabajador:</p>
                <b-form-input :placeholder="trabajador.codigo" :disabled="true" >
                </b-form-input>

                <p align="left">Nombre:</p>
                <b-form-input :placeholder="trabajador.nombre" :disabled="true" >
                </b-form-input>
              </div>
            </transition>
          </b-col> -->

          <b-col md="6">

            <!-- Informacion del beneficiario/solicitante -->
            <div v-if="beneficiarioInvitado == false">
              <b-form-group
                label="Código del trabajador:"
              >
                <b-form-input :placeholder="trabajador.codigo" :disabled="true" >
                </b-form-input>
              </b-form-group>

              <b-form-group
                label="Nombre del trabajador:"
              >
                <b-form-input :placeholder="trabajador.nombre" :disabled="true" >
                </b-form-input>
              </b-form-group>
            </div>
            <div v-else>
              <b-form-group
                label="Código del anfitrión:"
              >
                <b-form-input :placeholder="trabajador.codigo" :disabled="true" >
                </b-form-input>
              </b-form-group>

              <b-form-group
                label="Nombre del anfitrión:"
              >
                <b-form-input :placeholder="trabajador.nombre" :disabled="true" >
                </b-form-input>
              </b-form-group>
            </div>
          
            

            <!-- El beneficiario es un invitado -->
            <transition enter-active-class="animated fade-in-fwd" leave-active-class="animated fade-out-bck">
              <div v-if="beneficiarioInvitado == true && animacionActiva == false">
                <p align="left">Nombre del invitado:</p>
                <b-form-input 
                  id="dependencia-input" 
                  placeholder="nombre..." 
                >
                </b-form-input>                
              </div>
            </transition>

            
          </b-col>



          <b-col md="6">
            <p align="left">Tipo de beneficiario:</p>
            <b-form-group>
              <b-form-radio-group 
              id="radio-1"
              name="radios-stacked" 
              v-model="beneficiarioInvitado"
              stacked
              >
                <b-form-radio :value="false">Empleado o funcionario universitario</b-form-radio>
                <b-form-radio :value="true">Invitado</b-form-radio>
              </b-form-radio-group>
            </b-form-group>
          </b-col>

        </b-row>





        <!-- ++++++++++++++++++++++++++++++++++++++++++++++++ Comision ++++++++++++++++++++++++++++++++++++++++++++++++ -->
        
        <h5 class="mt-5"> Información de la comisión </h5>
        <hr>

        <b-row class="mt-2">
          <b-col md="6">
            <b-form-group
              label="Tipo de comisión:"
            >
              <b-form-input :placeholder="comisionActiva.tipo" :disabled="true" >
              </b-form-input>
            </b-form-group>
          </b-col>
          
          <b-col md="6">
            <b-form-group
              label="Destino de la comisión:"
            >
            <b-form-input :placeholder="comisionActiva.destino" :disabled="true" >
            </b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        
        <b-row class="mt-2">
          <b-col md="12">

            <p align="left">Programa de la comisión:</p>
            <b-table
              ref="tablaPrograma"
              head-variant="dark"
              bordered
              hover
              responsive
              small
              :selectable="false"
              :fields="headersPrograma"
              :items="comisionActiva.programa"
            >
            </b-table>

          </b-col>
        </b-row>





        <!-- ++++++++++++++++++++++++++++++++++++++++++++++++ Gastos ++++++++++++++++++++++++++++++++++++++++++++++++ -->
        
        <h5 class="mt-5"> Importe por concepto del gasto </h5>
        <hr>

        <!-- <h1>{{diaSeleccionado}}</h1> -->

        <b-row class="mt-2">
          <b-col md="12">

            <p align="left"> Se ofrece la máxima cantidad por día. Puede modificar los valores. </p>
            <b-table
              ref="tablaGastos"
              head-variant="dark"
              bordered
              hover
              responsive
              small
              selectable
              select-mode="single"
              @row-selected="SeleccionarDia"
              :fields="headersGastos"
              :items="diasGastos"
            >
            </b-table>

          </b-col>
        </b-row>

        <!-- Acciones de la tabla -->
        <b-row align-h="center">
          <b-col md="3">
            <template v-if="this.diaSeleccionado.dia != 'null'">
              <b-button v-b-modal.modal_editar_dia_gastos block variant="outline-primary">Editar día</b-button>
            </template>
            <template v-else>
              <b-button disabled block variant="outline-secondary">Editar día</b-button>
            </template>
          </b-col>
        </b-row>









        <!-- ++++++++++++++++++++++++++++++++++++++++ Acciones del form ++++++++++++++++++++++++++++++++++++++++ -->

        <hr class="mt-5">
          <b-row class="mt-4" align-h="center">



            

            <b-col md="6">
              <b-button 
                block 
                variant="secondary"
                v-b-tooltip.hover title="Reinicia la solicitud de viáticos por completo."
                v-on:click="$bvModal.show('modal_cancelar_solicitud')"
              >
                Reiniciar solicitud
              </b-button>
            </b-col>

            <b-col md="6">
              <b-button 
                block 
                variant="primary" 
                v-b-tooltip.hover title="Una vez guardada, la solicitud no podrá editarse." 
                type="submit" 
              >
                Guardar solicitud
              </b-button>
            </b-col>



          </b-row>






        

      </b-form>
    
    </b-card>










    <b-modal
      id="modal_editar_dia_gastos"
      ref="modal_editar_dia_gastos"
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












  </div>
</template>





<script>
// State:
import estado from "@/store.js";

// Propiedades:
import { mapState } from "vuex";

// Componentes:

// Atributos:
export default {
  name: "formViaticos",

  computed: {
    ...mapState({
      comisionActiva: "comisionActiva",
      trabajador: "trabajador",
    })
  },





  props: {

  },
  
  data() {
    return {




      animacionActiva: false,
      
      // Programa de comision:
      headersPrograma: [
        { key: "dia", label: "Día", sortable: false, variant: "secondary" },
        { key: "fecha", label: "Fecha", sortable: false },
        { key: "lugar", label: "Lugar de estancia", sortable: false },
        { key: "tareas", label: "Tareas a realizar", sortable: false }
      ],

      // Tabla de gastos:
      headersGastos: [
        { key: "dia", label: "Día", sortable: false, variant: "secondary" },
        { key: "alimentacion", label: "Alimentación", sortable: false },
        { key: "hospedaje", label: "Hospedaje", sortable: false },
        { key: "transporte_foraneo", label: "Transporte foráneo", sortable: false },
        { key: "transporte_local", label: "Transporte local", sortable: false },
        { key: "combustible", label: "Combustible", sortable: false },
        { key: "otros_conceptos", label: "Otros conceptos", sortable: false },
        { key: "suma", label: "Suma", sortable: false, variant: "secondary" }
      ],

      diasGastos: [],

      beneficiarioInvitado: false,









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


      // Viaticos:
      viaticos: {
        dependencia: null,
        esEmpleado: null,
        nombreInvitado: null,
        proyectos: [],
        dias: [],
        comentarios: null
      },



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



      // Tabla Proyectos:
      headersTablaProyectos: [
        { key: "nombre", label: "Proyecto", sortable: false }
      ],
      
      proyectoTemplate: {
        indice: null,
        nombre: null,
      },

      // Proyecto seleccionado en los modals:
      proyectoSeleccionado: null,
      opcionesProyectos: [
        { value: 'a', text: 'proyecto A' },
        { value: 'b', text: 'proyecto B' },
        { value: 'c', text: 'proyecto C' }
      ],
      // Modals Proyecto:
      estadoModalAgregarProyecto: null,
      estadoModalEditarProyecto: null,


    }
  },





  created: function () {
    // Inicializa el objeto diasGastos:
    for (let i = 0; i < this.comisionActiva.programa.length; i++) {
      // Define dia nuevo:
      var diaNuevo = {
        dia: i+1,
        alimentacion: 0,
        hospedaje: 0,
        transporte_foraneo: 0,
        transporte_local: 0,
        combustible: 0,
        otros_conceptos: 0,
        suma: 0
      }
      // Agrega dia al arreglo:
      this.diasGastos.push(diaNuevo);
    }
  },





  methods:{

    // ++++++++++++++++++++++++++++++++ Tabla Proyectos ++++++++++++++++++++++++++++++++
    SeleccionarProyecto(item){
      // Verifica si se selecciono un objeto de la tabla o se quito la seleccion:
      if(item[0]){
        // Copia valor del item a proyectoTemplate:
        this.proyectoTemplate = JSON.parse(JSON.stringify(item[0]));
      }
      else{
        // Regresa al valor inicial:
        this.ReiniciarProyectoTemplate();
      }
    },

    AgregarProyecto(proyectoNuevo){
      // Copia template de proyecto:
      var proyecto = JSON.parse(JSON.stringify(this.proyectoTemplate));
      // Copia proyecto seleccionado:
      proyecto.nombre = JSON.parse(JSON.stringify(proyectoNuevo));
      // Comprobaciones de fecha:

      // Agrega el indice de proyecto:
      var contProy = this.viaticos.proyectos.length;
      proyecto.indice = contProy.toString();
      // Agrega dia al arreglo de la comision:
      this.viaticos.proyectos.push(proyecto);
    },    

    EditarProyecto(proySel){
      // Comprueba que haya un proyecto seleccionado:
      if(this.proyectoTemplate.indice != null){
        // Copia template de proyecto:
        var proyecto = JSON.parse(JSON.stringify(this.proyectoTemplate));
        // Copia proySel (opcion seleccionada en modal):
        proyecto.nombre = JSON.parse(JSON.stringify(proySel));
        // Copia indice de proyectoTemplate:
        proyecto.indice = JSON.parse(JSON.stringify(this.proyectoTemplate.indice)); 
        // Comprobaciones de fecha:

        // Copia valor de proyecto al arreglo:
        this.viaticos.proyectos[ parseInt(proyecto.indice) ] = proyecto;
        // Refresca tabla del programa:
        this.$refs.tablaProyectos.refresh();
      }
    },

    EliminarProyecto(){
      // Comprueba que haya un proyecto seleccionado:
      if(this.proyectoTemplate.indice != null){
        // Obtiene indice del objeto:
        var indiceProyecto = JSON.parse(JSON.stringify(this.proyectoTemplate.indice));
        indiceProyecto = parseInt(indiceProyecto);
        // Elimina objeto del arreglo:
        this.viaticos.proyectos.splice(indiceProyecto, 1);
        // Recalcula los valores de indice:
        for (let i = 0; i < this.viaticos.proyectos.length; i++) {
          this.viaticos.proyectos[i].indice = i;
        }
        // Refresca tabla del programa:
        this.$refs.tablaProyectos.refresh();
      }
    },

    ReiniciarProyectoTemplate(){
      this.proyectoTemplate = {
        indice: null,
        nombre: null
      }
    },


    // ++++++++++++++++++++++++++++++++ Modal Agregar Proyecto ++++++++++++++++++++++++++++++++
    ComprobarModalAgregarProyecto() {
      // Comprueba que haya seleccionado una opcion de proyecto:
      if(this.proyectoSeleccionado === null){
        this.estadoModalAgregarProyecto = false;
        return false;
      }
      // Comprueba el estado del form:
      const valid = this.$refs.modal_agregar_proyecto_form.checkValidity();
      this.estadoModalAgregarProyecto = valid ? "valid" : "invalid";
      return valid;
    },
    ReiniciarModalAgregarProyecto() {
      this.estadoModalAgregarProyecto = null;
      this.ReiniciarProyectoTemplate();
    },
    OkModalAgregarProyecto(bvModalEvt) {
      // Previene default:
      bvModalEvt.preventDefault();
      // Se sale si el form no es valido:
      if (!this.ComprobarModalAgregarProyecto()) {
        return;
      }
      // Agrega proyecto:
      this.AgregarProyecto(this.proyectoSeleccionado);
      // Esconde modal:
      this.$nextTick(() => {
        this.$refs.modal_agregar_proyecto.hide();
      });
    },


    // ++++++++++++++++++++++++++++++++ Modal Editar Proyecto ++++++++++++++++++++++++++++++++
    ComprobarModalEditarProyecto() {
      // Comprueba que haya seleccionado una opcion de proyecto:
      if(this.proyectoSeleccionado === null){
        this.estadoModalEditarProyecto = false;
        return false;
      }
      // Comprueba el estado del form:
      const valid = this.$refs.modal_editar_proyecto_form.checkValidity();
      this.estadoModalEditarProyecto = valid ? "valid" : "invalid";
      return valid;
    },
    ReiniciarModalEditarProyecto() {
      this.estadoModalEditarProyecto = null;
    },
    OkModalEditarProyecto(bvModalEvt) {
      // Previene default:
      bvModalEvt.preventDefault();
      // Sale si el form no es valido:
      if (!this.ComprobarModalEditarProyecto()) {
        return;
      }
      // Agrega dia:
      this.EditarProyecto(this.proyectoSeleccionado);
      // Esconde modal:
      this.$nextTick(() => {
        this.$refs.modal_editar_proyecto.hide();
      });
    },





    // ++++++++++++++++++++++++++++++++ Tabla Gastos ++++++++++++++++++++++++++++++++
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

      // Calcula el indice de dia:
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
        // this.dias[ parseInt(dia.dia) - 1 ] = dia;
        
        this.diasGastos[ parseInt(dia.dia) - 1 ] = dia;


        // Refresca tabla:
        // this.$refs.tablaDias.refresh();

        this.$refs.tablaGastos.refresh();
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
      // Si algun rubro de diaNuevo es negativo o no es indice, regresa null:
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
      // Si algun rubro de diaNuevo es negativo o no es indice, regresa null:
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
        this.$refs.modal_editar_dia_gastos.hide();
      });
    },





    RetrasarAnimacion(milisegundosEnEspera){

      // Detiene las animaciones:
      this.animacionActiva = true;
      // Copia el objeto this a un objeto local:
      var data = this;
      // Retrasa la funcion los milisegundos especificados:
      setTimeout(function () {
        data.animacionActiva = false;
      }, milisegundosEnEspera);

    }

    

  }

};
</script>





<style>

</style>


