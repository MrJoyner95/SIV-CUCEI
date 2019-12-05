<template>
  <div class="formComision">

    <!-- ++++++++++++++++++++++++++++++++++++++++ Formulario de Solicitud de Comision ++++++++++++++++++++++++++++++++++++++++ -->

    

    <b-card bg-variant="light">

      <b-form @submit="$bvModal.show('modal_enviar_solicitud')">

        <!-- ++++++++++++++++++++++++++++++++ Datos generales de la solicitud ++++++++++++++++++++++++++++++++ -->
        <!-- <h4 align="center"> {{ titulo }} </h4> -->

        <div v-if="comision.folio == null">
          <h4 align="center"> Comisión <small><b-badge pill variant="secondary">Folio pendiente</b-badge></small> </h4>
        </div>
        <div v-else-if="comision.estatus == 'NE'">
          <h4 align="center"> Comisión (folio pendiente) <small><b-badge pill variant="secondary">No enviada</b-badge></small> </h4>
        </div>
        <div v-else-if="comision.estatus == 'PE'">
          <h4 align="center"> Comisión {{ comision.folio }} <small><b-badge pill variant="secondary">Pendiente</b-badge></small> </h4>
        </div>
        <div v-else-if="comision.estatus == 'RE'">
          <h4 align="center"> Comisión {{ comision.folio }} <small><b-badge pill variant="secondary">Rechazada</b-badge></small> </h4>
        </div>
        <div v-else-if="comision.estatus == 'AU'">
          <h4 align="center"> Comisión {{ comision.folio }} <small><b-badge pill variant="secondary">Autorizada</b-badge></small> </h4>
        </div>
        <div v-else-if="comision.estatus == 'EP'">
          <h4 align="center"> Comisión {{ comision.folio }} <small><b-badge pill variant="secondary">En proceso</b-badge></small> </h4>
        </div>
        <div v-else-if="comision.estatus == 'CO'">
          <h4 align="center"> Comisión {{ comision.folio }} <small><b-badge pill variant="secondary">Concluida</b-badge></small> </h4>
        </div>




        <div v-else>
          {{comision}}
          <h4 align="center"> ELSE </h4>
        </div>

        <!-- <h4 align="center"> {{ titulo }} </h4>
        <b-badge variant="primary">Pendiente</b-badge> -->


        


        <b-row class="mt-4">
          <b-col>
            <div v-if="comision == null">
              <h6 align="right"> Folio de comisión: (pendiente) </h6>
            </div>
            <div v-else>
              <h6 align="right"> Folio de comisión: {{comision.folio}} </h6>
            </div>
          </b-col>
        </b-row>
        <b-row align-h="end" class="mt-2">
          <b-col>
            <h6 align="right"> Fecha de creación: {{comision.fechaCreacion}} </h6>
          </b-col>
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

          <!-- Solicitud AU / EP / CO -->
          <div v-if="comision.fechaAutorizacion != null">
            <b-row align-h="end" class="mt-2">
              <b-col>
                <h6 align="right"> Fecha de autorización: {{comision.fechaAutorizacion}} </h6>
              </b-col>
            </b-row>
          </div>

          <!-- Solicitud CO -->
          <div v-if="comision.fechaConclusion != null">
            <b-row align-h="end" class="mt-2">
              <b-col>
                <h6 align="right"> Fecha de conclusión: {{comision.fechaConclusion}} </h6>
              </b-col>
            </b-row>
          </div>
          
        </div>



        <!-- ++++++++++++++++++++++++++++++++ Datos del trabajador ++++++++++++++++++++++++++++++++ -->

        
        <h5> Datos personales </h5>
        <hr>
        <b-row align-h="start" class="mt-2">
          <b-col lg="8">
            <b-form-group
              label-cols-sm="4"
              label="Código de trabajador:"
            >
              <!-- No se recibio una comision como parametro. Es una solicitud nueva -->
              <div v-if="comision.folio == null">
                <b-form-input :placeholder="trabajador.codigo" :disabled="true" >
                </b-form-input>
              </div>
              <!-- Comision recibida como parametro. Se muestran sus datos -->
              <div v-else>
                <b-form-input :placeholder="comision.codigoTrabajador" :disabled="true" >
                </b-form-input>
              </div>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row align-h="start" class="mt-2">
          <b-col lg="8">
            <b-form-group
              label-cols-sm="4"
              label="Nombre del solicitante:"
            >
              <!-- No se recibio una comision como parametro. Es una solicitud nueva -->
              <div v-if="comision.folio == null">
                <b-form-input :placeholder="trabajador.nombre" :disabled="true" >
                </b-form-input>
              </div>
              <!-- Comision recibida como parametro. Se muestran sus datos -->
              <div v-else>
                <b-form-input :placeholder="comision.nombreSolicitante" :disabled="true" >
                </b-form-input>
              </div>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row align-h="start" class="mt-2">
          <b-col lg="8">
            <b-form-group
              label-cols-sm="4"
              label="Área de adscripción:"
            >
              <!-- No se recibio una comision como parametro. Es una solicitud nueva -->
              <div v-if="comision.folio == null">
                <b-form-input :placeholder="trabajador.areaAdscripcion" :disabled="true" >
                </b-form-input>
              </div>
              <!-- Comision recibida como parametro. Se muestran sus datos -->
              <div v-else>
                <b-form-input :placeholder="comision.areaAdscripcion" :disabled="true" >
                </b-form-input>
              </div>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row align-h="start" class="mt-2">
          <b-col lg="8">
            <b-form-group
              label-cols-sm="4"
              label="Plaza laboral:"
            >
              <!-- No se recibio una comision como parametro. Es una solicitud nueva -->
              <div v-if="comision.folio == null">
                <b-form-input :placeholder="trabajador.plazaLaboral" :disabled="true" >
                </b-form-input>
              </div>
              <!-- Comision recibida como parametro. Se muestran sus datos -->
              <div v-else>
                <b-form-input :placeholder="comision.plazaLaboral" :disabled="true" >
                </b-form-input>
              </div>
            </b-form-group>
          </b-col>
        </b-row>
        
        <!-- No se recibio una comision como parametro. Es una solicitud nueva -->
        <div v-if="comision == null">

        </div>
        <!-- Comision recibida como parametro. Se muestran sus datos -->
        <div v-else>

        </div>
        <!-- <h5> Datos personales </h5>
        <hr>
        <b-row align-h="start" class="mt-2">
          <b-col cols="8">
            <b-form-group
              label-cols-sm="4"
              label="Código de trabajador:"
              label-for="codigoTrabajador-input"
            >
              <b-form-input 
                id="codigoTrabajador-input" 
                :placeholder="trabajador.codigo" 
                :disabled="true"
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
                :placeholder="trabajador.nombre" 
                :disabled="true"
              >
              </b-form-input>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row align-h="start" class="mt-2">
          <b-col cols="8">
            <b-form-group
              label-cols-sm="4"
              label="Área de adscripción:"
              label-for="areaAdscripcion-input"
            >
              <b-form-input 
                id="areaAdscripcion-input" 
                :placeholder="trabajador.areaAdscripcion" 
                :disabled="true"
              >
              </b-form-input>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row align-h="start" class="mt-2">
          <b-col cols="8">
            <b-form-group
              label-cols-sm="4"
              label="Plaza laboral:"
              label-for="plazaLaboral-input"
            >
              <b-form-input 
                id="plazaLaboral-input" 
                :placeholder="trabajador.plazaLaboral" 
                :disabled="true"
              >
              </b-form-input>
            </b-form-group>
          </b-col>
        </b-row> -->



        <!-- ++++++++++++++++++++++++++++++++ Informacion de la comision ++++++++++++++++++++++++++++++++ -->
        <h5 class="mt-5"> Información de la comisión </h5>
        <hr>

        <b-row class="mt-2">
          <b-col cols="8">
            <b-form-group
              label-cols-sm="4"
              label="Tipo de comisión:"
              label-for="tipo-input"
            >
              <b-form-select v-model="comision.tipo" :disabled="deshabilitado" required>
                <option :value="null" disabled>Seleccione un tipo</option>
                <option value="nacional">Nacional</option>
                <option value="extranjero">Extranjero</option>
              </b-form-select>
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
              <b-form-select v-model="comision.destino" class="mb-3" :disabled="deshabilitado" required>
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
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="8">
            <b-form-group
              label-cols-sm="4"
              label="Evento de la comisión:"
              label-for="evento-input"
            >
              <b-form-input 
                id="eventoComision-input" 
                v-model="comision.evento"
                placeholder="Nombre del evento..." 
                :disabled="deshabilitado"
                required
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
                placeholder="Objetivos al realizar la comisión..." 
                :disabled="deshabilitado"
                required
              >
              </b-form-input>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row class="mt-2">
          <b-col cols="8">
            <p>Justificación:</p>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="8">
            <b-form-textarea
              id="justificacion-input"
              v-model="comision.justificacion"
              placeholder="Describa detalladamente la razón por la que solicita la comisión..."
              :disabled="deshabilitado"
              required
              rows="4"
              max-rows="8"
            ></b-form-textarea>
          </b-col>
        </b-row>



        <!-- ++++++++++++++++++++++++++++++++ Actividades y programa ++++++++++++++++++++++++++++++++ -->
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
                placeholder="Programa de trabajo..." 
                :disabled="deshabilitado"
                required
              >
              </b-form-input>
            </b-form-group>
          </b-col>
        </b-row>

        
        <!-- ++++++++++++++++ Template Tabla (Programa de la comision) ++++++++++++++++ -->
        <b-row class="mt-2">
          <b-col md="12">
            <b-card>

              <b-row align-h="between">
                <h5>Programa de la comisión:</h5>
                <template v-if="deshabilitado == false">
                  <b-button size="sm" @click="ReiniciarDiaTemplate" v-b-modal.modal_agregar_dia variant="outline-primary" align="end" :disabled="deshabilitado">
                    Agregar día
                  </b-button>
                </template>
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
                  :selectable="!deshabilitado"
                  select-mode="single" 
                  @row-selected="SeleccionarDia"
                  :fields="headersTabla"
                  :items="comision.programa"
                >
                </b-table>
              </b-row>
              
              <!-- Acciones -->
              <template v-if="deshabilitado == false">
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
              </template>

            </b-card>
          </b-col>
        </b-row>

        <!-- Alerta de tabla -->
        <b-alert
          variant="danger"
          dismissible
          fade
          :show="mostrarAlertaProgramaComision"
          @dismissed="mostrarAlertaProgramaComision=false"
        >
          El programa de la comisión no puede dejarse vacío.
        </b-alert>



        <!-- ++++++++++++++++++++++++++++++++ Documentos adjuntos ++++++++++++++++++++++++++++++++ -->
        <h5 class="mt-5"> Documentos adjuntos</h5>
        <hr>

        <!-- Se permite seleccionar archivos -->
        <div v-if="deshabilitado == false">
          <b-row class="mt-2">
            <b-col cols="6">
              <label for="invitacion-input">Invitación al evento (opcional):</label>
              <b-form-file
                id="invitacion-input"
                v-model="comision.invitacionEvento"
                :state="Boolean(comision.invitacionEvento) || null"
                :disabled="deshabilitado"
                placeholder="Elija o arrastre un archivo..."
                drop-placeholder="Suelte el archivo aquí..."
                browse-text="Buscar"
              ></b-form-file>
              <div class="mt-3">Selección: <strong>{{ comision.invitacionEvento ? comision.invitacionEvento : '' }}</strong> </div>
            </b-col>

            <b-col cols="6">
              <label for="invitacion-input">Programa del evento (opcional):</label>
              <b-form-file
                id="invitacion-input"
                v-model="comision.programaEvento"
                :state="Boolean(comision.programaEvento) || null"
                :disabled="deshabilitado"
                placeholder="Elija o arrastre un archivo..."
                drop-placeholder="Suelte el archivo aquí..."
                browse-text="Buscar"
              ></b-form-file>
              <div class="mt-3">Selección: <strong>{{ comision.programaEvento ? comision.programaEvento : '' }}</strong> </div>
            </b-col>
          </b-row>
        </div>

        <!-- Solo se muestra el link de los archivos -->
        <div v-else>
          <b-row class="mt-2">
            <b-col cols="6">
              <label>Invitación al evento:</label>
              <p><i>{{ comision.invitacionEvento }}</i></p>
            </b-col>

            <b-col cols="6">
              <label>Programa del evento:</label>
              <p><i>{{ comision.programaEvento }}</i></p>
            </b-col>
          </b-row>
        </div>
        




        <!-- ++++++++++++++++++++++++++++++++ Acciones del form ++++++++++++++++++++++++++++++++ -->
        <transition enter-active-class="animated fade-in-top" leave-active-class="animated fade-out-top">
          <div v-if="deshabilitado == false">
            <hr class="mt-5">
            <b-row class="mt-4" align-h="center">

              <b-col cols="3">
                <b-button 
                  block 
                  variant="danger"
                  v-b-tooltip.hover title="Elimina la solicitud por completo."
                  v-on:click="$bvModal.show('modal_cancelar_solicitud')"
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
                  v-on:click="GuardarSolicitud()"
                >
                  Guardar solicitud
                </b-button>
              </b-col>

              <b-col cols="3">
                <b-button 
                  block 
                  variant="primary" 
                  v-b-tooltip.hover title="Una vez enviada, no podrá editarse." 
                  type="submit" 
                >
                  Enviar solicitud
                </b-button>
              </b-col>
            </b-row>
          </div>
        </transition>

        

      </b-form>
    
    </b-card>





    <!-- ++++++++++++++++++++++++++++++++++++++++ Notificaciones de resultado ++++++++++++++++++++++++++++++++++++++++ -->
    
    <br>
    <!-- Solicitud cancelada -->
    <b-alert
      variant="primary"
      dismissible
      fade
      :show="mostrarAlertaSolicitudCancelada"
      @dismissed="mostrarAlertaSolicitudCancelada=false"
    >
      La solicitud ha sido cancelada. Puede comenzar una nueva solicitud si lo desea.
    </b-alert>

    <!-- Solicitud guardada -->
    <b-alert
      variant="primary"
      dismissible
      fade
      :show="mostrarAlertaSolicitudGuardada"
      @dismissed="mostrarAlertaSolicitudGuardada=false"
    >
      La solicitud ha sido guardada. Puede completarla más tarde.
    </b-alert>

    <!-- Solicitud enviada -->
    <b-alert
      variant="success"
      dismissible
      fade
      :show="mostrarAlertaSolicitudEnviada"
      @dismissed="mostrarAlertaSolicitudEnviada=false"
    >
      La solicitud ha sido enviada. Espere a su resolución para continuar con la solicitud de viáticos.
    </b-alert>










    <!-- ++++++++++++++++++++++++++++++++++++++++ Recursos adicionales ++++++++++++++++++++++++++++++++++++++++ -->

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



    <!-- Modal Enviar Solicitud -->
    <b-modal
      id="modal_enviar_solicitud"
      title="¿Desea enviar la solicitud?"
      size= "md"
      buttonSize="sm"
      okVariant="success"
      okTitle="Enviar solicitud"
      cancelTitle="Cancelar envío"
      footerClass="p-2"
      centered
      @ok="EnviarSolicitud()"
    >
      Una vez enviada, no podrá editarse ni podrá comenzar una nueva solicitud hasta que esta sea resuelta.
    </b-modal>



    <!-- Modal Cancelar Solicitud -->
    <b-modal
      id="modal_cancelar_solicitud"
      title="¿Desea cancelar la solicitud?"
      size= "md"
      buttonSize="sm"
      okVariant="danger"
      okTitle="Cancelar solicitud"
      cancelTitle="Cerrar ventana"
      footerClass="p-2"
      centered
      @ok="CancelarSolicitud()"
    >
      Al cancelar la solicitud se eliminará toda la información relacionada a la misma y deberá comenzar una nueva solicitud.
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
  name: "formComision",

  computed: {
    ...mapState({
      comisionActiva: "comisionActiva",
      trabajador: "trabajador",
    })
  },

  props: {
    comisionInactiva: null,
    titulo: "",
    deshabilitado: false,
  },

  data() {
    return {

      // Variables de uso local:
      comision: {
        folio: null,
        fechaCreacion: new Date().toLocaleDateString(),
        fechaEnvio: null,
        fechaAutorizacion: null,
        fechaConclusion: null,
        estatus: null,
        codigoTrabajador: null,
        nombreSolicitante: null,
        areaAdscripcion: null,
        tipo: null,
        destino: null,
        plazaLaboral: null,
        justificacion: null,
        programaTrabajo: null,
        objetivoTrabajo: null,
        evento: null,
        programa: [],
        invitacionEvento: null,
        programaEvento: null
      },

      // Elementos visuales:
      mostrarAlertaProgramaComision: false,
      mostrarAlertaSolicitudCancelada: false,
      mostrarAlertaSolicitudGuardada: false,
      mostrarAlertaSolicitudEnviada: false,

      

      // tipoComision: {
      //   opciones: [
      //     { value: null, text: 'Seleccione un tipo' },
      //     { value: 'nacional', text: 'Nacional' },
      //     { value: 'extranjero', text: 'Extranjero' }
      //   ]
      // },
      // destinoComision: {
      //   opciones: []
      // },
      // archivoInvitacion: null,
      // archivoPrograma: null,



      // ++++++++++++++++ Tabla editable ++++++++++++++++
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

  created: function () {
    // Si recibe una comision como parametro, la muestra de forma inactiva:
    if(this.comisionInactiva){
      this.comision = this.comisionInactiva;
      this.deshabilitado = true;
    }
    // Si no se recibe una comision por parametros, revisa si hay una comision activa:
    else if(this.comisionActiva){
      this.comision = this.comisionActiva;
    }

    // Si hay una comision activa, asigna su valor a comision:
    // if(this.comisionActiva != null){
    //   this.comision = this.comisionActiva;
    // }
  },

  methods:{

    // ++++++++++++++++++++++++++++++++ Solicitud ++++++++++++++++++++++++++++++++
    CancelarSolicitud(){

      // Envia peticion al servidor para eliminar la solicitud de la BD

      this.comision = {
        folio: null,
        fechaCreacion: new Date().toLocaleDateString(),
        fechaEnvio: null,
        fechaAutorizacion: null,
        fechaConclusion: null,
        estatus: null,
        codigoTrabajador: null,
        nombreSolicitante: null,
        areaAdscripcion: null,
        tipo: null,
        destino: null,
        plazaLaboral: null,
        justificacion: null,
        programaTrabajo: null,
        objetivoTrabajo: null,
        evento: null,
        programa: [],
        invitacionEvento: null,
        programaEvento: null
      }

      // Reinicia el estado de comisionActiva:
      estado.commit("EstablecerComisionActiva", {
        comisionActiva: null
      });

      // Muestra alerta:
      this.mostrarAlertaSolicitudCancelada = true;
    },

    GuardarSolicitud(){

      // Se asignan los datos del trabajador a la solicitud:
      this.comision.codigoTrabajador  = this.trabajador.codigo;
      this.comision.nombreSolicitante = this.trabajador.nombre;
      this.comision.areaAdscripcion   = this.trabajador.areaAdscripcion;
      this.comision.plazaLaboral      = this.trabajador.plazaLaboral;
      this.comision.estatus           = "NE";

      // Envia peticion al servidor para guardar la solicitud en la BD:


      // Se asigna el valor de comision a comisionActiva (temporal):
      estado.commit("EstablecerComisionActiva", {
        comisionActiva: this.comision
      });

      // Muestra alerta:
      this.mostrarAlertaSolicitudGuardada = true;
    },

    EnviarSolicitud(){

      // Comprueba que el programa de la comision no este vacio:
      if(this.comision.programa.length > 0){

        // Se asignan los datos del trabajador a la solicitud:
        this.comision.codigoTrabajador  = this.trabajador.codigo;
        this.comision.nombreSolicitante = this.trabajador.nombre;
        this.comision.areaAdscripcion   = this.trabajador.areaAdscripcion;
        this.comision.plazaLaboral      = this.trabajador.plazaLaboral;
        this.comision.estatus           = "PE";
        this.comision.fechaEnvio        = new Date().toLocaleDateString();



        // Copia el objeto y remueve las variables innecesarias del objeto comision:
        var comisionJson = JSON.parse( JSON.stringify(this.comision) );
        delete comisionJson.folio;
        delete comisionJson.fechaAutorizacion;
        delete comisionJson.fechaConclusion;
        delete comisionJson.estatus;



        // Comparacion de objetos:
        console.log( "Comision objeto:", this.comision );
        console.log( "Comision JSON:", comisionJson );
        


        // Crea, define y envia peticion HTTP:
        const request = require('request');

        request(
          {
            url: 'http://localhost:9000/comision',
            method: 'POST',
            headers: {
              name: 'content-type',
              value: 'application/json'
            },
            
            json: true,
            body: comisionJson
          },
          function (error, response) {
            if(error){
              console.log("ERROR: ", error);
            }
            else{
              console.log('Objeto JSON guardado. Respuesta del servidor: ', response);
              console.log('Objeto JSON desde la funcion: ', comisionJson);
            }
          }
        )



        // Se asigna el valor de comision a comisionActiva (temporal):
        estado.commit("EstablecerComisionActiva", {
          comisionActiva: this.comision
        });

        // Muestra alerta:
        this.mostrarAlertaSolicitudEnviada = true;
      }
      else{
        // El programa de la comision esta vacio:
        this.mostrarAlertaProgramaComision = true;
      }
    },




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


