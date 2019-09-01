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
              <b-button v-b-modal.modal_dia @click="AgregarDia()" variant="outline-primary" align="end">
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
                selectable
                select-mode="single"
                @row-selected="SeleccionarDia"
                :fields="headersTabla"
                :items="dias"
              >
              </b-table>
            </b-row>
            

            <!-- Obtejo seleccionado -->
            <!-- <b-card class="mt-4">
              <b-row class="mt-2">
                <b-col md="4">
                  <p align="left">Alimentación:</p>
                  <b-input-group prepend="$">
                    <b-form-input 
                      id="alimentacion-input"
                      :placeholder="diaSeleccionado.alimentacion"
                    >
                    </b-form-input>
                  </b-input-group>
                </b-col>

                <b-col md="4">
                  <p align="left">Hospedaje:</p>
                  <b-input-group prepend="$">
                    <b-form-input 
                      id="hospedaje-input"
                      :placeholder="diaSeleccionado.hospedaje"
                    >
                    </b-form-input>
                  </b-input-group>
                </b-col>

                <b-col md="4">
                  <p align="left">Transporte foráneo:</p>
                  <b-input-group prepend="$">
                    <b-form-input 
                      id="transporte_foraneo-input"
                      :placeholder="diaSeleccionado.transporte_foraneo"
                    >
                    </b-form-input>
                  </b-input-group>
                </b-col>
              </b-row>


              <b-row class="mt-2">
                <b-col md="4">
                  <p align="left">Transporte local:</p>
                  <b-input-group prepend="$">
                    <b-form-input 
                      id="transporte_local-input"
                      :placeholder="diaSeleccionado.transporte_local"
                    >
                    </b-form-input>
                  </b-input-group>
                </b-col>

                <b-col md="4">
                  <p align="left">Combustible:</p>
                  <b-input-group prepend="$">
                    <b-form-input 
                      id="combustible-input"
                      :placeholder="diaSeleccionado.combustible"
                    >
                    </b-form-input>
                  </b-input-group>
                </b-col>

                <b-col md="4">
                  <p align="left">Otros conceptos:</p>
                  <b-input-group prepend="$">
                    <b-form-input 
                      id="otros_conceptos-input"
                      :placeholder="diaSeleccionado.otros_conceptos"
                    >
                    </b-form-input>
                  </b-input-group>
                </b-col>
              </b-row>


              <b-row align-h="center" class="mt-2">
                <b-col md="4">
                  <p align="center"><strong>Suma:</strong></p>
                  <b-input-group prepend="$">
                    <b-form-input 
                      id="suma-input"
                      :placeholder="diaSeleccionado.suma"
                    >
                    </b-form-input>
                  </b-input-group>
                </b-col>
              </b-row>
            </b-card> -->


            <!-- Acciones -->
            <b-row align-h="center">
              <b-col md="3">
                <b-button block variant="outline-secondary">Editar</b-button>
              </b-col>
              <b-col md="3">
                <b-button block variant="outline-danger">Eliminar</b-button>
              </b-col>
            </b-row>



            <b-row>
              <b-col>
                <p>{{ this.dias.length }}</p>
              </b-col>

              <b-col>
                <p> {{ diaSeleccionado }} </p>
              </b-col>
            </b-row>

          </b-card>
        </b-col>
      </b-row>

      <!-- <ul id="example-1">
        <li v-for="item in items">
          {{ item.message }}
        </li>
      </ul> -->


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





    <!-- Modal Agregar/Editar dia -->
    <b-modal
      id="modal_dia"
      ref="modal"
      title="Información de gastos del día"
      size="lg"
      ok-title="Guardar"
      cancel-title="Cancelar"
      centered
    >

      <b-card>
        <b-row class="mt-2">
          <b-col md="4">
            <p align="left">Alimentación:</p>
            <b-input-group prepend="$">
              <b-form-input 
                id="alimentacion-input"
                :placeholder="diaSeleccionado.alimentacion"
              >
              </b-form-input>
            </b-input-group>
          </b-col>

          <b-col md="4">
            <p align="left">Hospedaje:</p>
            <b-input-group prepend="$">
              <b-form-input 
                id="hospedaje-input"
                :placeholder="diaSeleccionado.hospedaje"
              >
              </b-form-input>
            </b-input-group>
          </b-col>

          <b-col md="4">
            <p align="left">Transporte foráneo:</p>
            <b-input-group prepend="$">
              <b-form-input 
                id="transporte_foraneo-input"
                :placeholder="diaSeleccionado.transporte_foraneo"
              >
              </b-form-input>
            </b-input-group>
          </b-col>
        </b-row>


        <b-row class="mt-2">
          <b-col md="4">
            <p align="left">Transporte local:</p>
            <b-input-group prepend="$">
              <b-form-input 
                id="transporte_local-input"
                :placeholder="diaSeleccionado.transporte_local"
              >
              </b-form-input>
            </b-input-group>
          </b-col>

          <b-col md="4">
            <p align="left">Combustible:</p>
            <b-input-group prepend="$">
              <b-form-input 
                id="combustible-input"
                :placeholder="diaSeleccionado.combustible"
              >
              </b-form-input>
            </b-input-group>
          </b-col>

          <b-col md="4">
            <p align="left">Otros conceptos:</p>
            <b-input-group prepend="$">
              <b-form-input 
                id="otros_conceptos-input"
                :placeholder="diaSeleccionado.otros_conceptos"
              >
              </b-form-input>
            </b-input-group>
          </b-col>
        </b-row>


        <b-row align-h="center" class="mt-2">
          <b-col md="4">
            <p align="center"><strong>Suma:</strong></p>
            <b-input-group prepend="$">
              <b-form-input 
                id="suma-input"
                :placeholder="diaSeleccionado.suma"
              >
              </b-form-input>
            </b-input-group>
          </b-col>
        </b-row>
      </b-card>

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
        { key: "dia", label: "Día", sortable: false },
        { key: "alimentacion", label: "Alimentación", sortable: false },
        { key: "hospedaje", label: "Hospedaje", sortable: false },
        { key: "transporte_foraneo", label: "Transporte foráneo", sortable: false },
        { key: "transporte_local", label: "Transporte local", sortable: false },
        { key: "combustible", label: "Combustible", sortable: false },
        { key: "otros_conceptos", label: "Otros conceptos", sortable: false },
        { key: "suma", label: "Suma", sortable: false }
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

      // Dia nuevo:
      diaNuevo: {
        dia: "null",
        alimentacion: "null",
        hospedaje: "null",
        transporte_foraneo: "null",
        transporte_local: "null",
        combustible: "null",
        otros_conceptos: "null",
        suma: "null"
      },

    }
  },
  methods:{

    // ++++++++++++++++++++++++++++++++ Tabla editable ++++++++++++++++++++++++++++++++
    AgregarDia(){
      // Crea un nuevo dia inicializado:
      var diaNuevo = {
        dia: "0",
        alimentacion: "0",
        hospedaje: "0",
        transporte_foraneo: "0",
        transporte_local: "0",
        combustible: "0",
        otros_conceptos: "0",
        suma: "0"
      };
      // Calcula el numero de dia:
      var contDia = this.dias.length + 1;
      diaNuevo.dia = contDia.toString();
      // Agrega objeto nuevo a la lista:
      this.dias.push(diaNuevo);
    },

    SeleccionarDia(item){
      // Verifica si se selecciono un objeto de la tabla o se quito la seleccion:
      if(item[0]){
        // Asigna valor a dia seleccionado:
        this.diaSeleccionado = item[0];
      }
      else{
        // Asigna valor inicial:
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

    EditarDia(){
      // Reemplaza objeto en el index seleccionado:
      
    }

  }

};
</script>





<style>

</style>


