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
          
        </div>



        <!-- ++++++++++++++++++++++++++++++++ Datos del trabajador ++++++++++++++++++++++++++++++++ -->

        
        <h5> Datos del beneficiario </h5>
        <hr>

        <b-row class="mt-2">
          
          <!-- Columnas dinamicas (tipo de beneficiario) -->
          <transition enter-active-class="animated fade-in-top" leave-active-class="animated fade-out-top">

            <div v-if="beneficiarioInvitado == false">
              <b-row align-h="start" class="mt-2">
                <b-col lg="7">
                  <p align="left">Código de trabajador:</p>
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
                </b-col>
              </b-row>

              <b-row align-h="start" class="mt-2">
                <b-col lg="7">
                  <p align="left">Nombre:</p>
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
                </b-col>
              </b-row>
            </div>

            <div v-else>
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

          <b-col cols="5">
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





    <b-card bg-variant="light">

      <b-row class="mt-4">
        <b-col>
          <h6 align="right"> Folio de comisión: (pendiente) </h6>
        </b-col>
      </b-row>
      <b-row align-h="end" class="mt-2">
        <b-col>
          <h6 align="right"> Fecha de creación: {{comision.fechaCreacion}} </h6>
        </b-col>
      </b-row>


      
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





      <h5 class="mt-5"> Proyectos </h5>
      <hr>

      <!-- Tabla de Proyectos -->
      <b-row class="mt-2">
        <b-col md="12">
          <b-card>
            <b-row>
              <b-col md="3">
                <p>No de proyectos: {{ viaticos.proyectos.length }}</p>
                <b-button v-b-modal.modal_agregar_proyecto size="sm" block variant="outline-primary">Agregar proyecto</b-button>
                <!-- <hr> -->
                <!-- Acciones -->
                <template v-if="this.proyectoTemplate.indice != null">
                  <b-button v-b-modal.modal_editar_proyecto block size="sm" variant="outline-secondary" align="end">Editar</b-button>
                  <b-button v-b-modal.modal_eliminar_proyecto block size="sm" variant="outline-danger" align="end">Eliminar</b-button>
                </template>
                <template v-else>
                  <b-button disabled size="sm" block variant="outline-secondary">Editar</b-button>
                  <b-button disabled size="sm" block variant="outline-danger">Eliminar</b-button>
                </template>
              </b-col>

              <b-col md="9">
                <hr>
                <b-table
                  ref="tablaProyectos"
                  head-variant="dark"
                  bordered
                  hover
                  responsive
                  small
                  selectable
                  select-mode="single"
                  @row-selected="SeleccionarProyecto"
                  :fields="headersTablaProyectos"
                  :items="viaticos.proyectos"
                >
                </b-table>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>





      <h5 class="mt-5"> Gastos </h5>
      <hr>


      <!-- Template Tabla -->
      <b-row no-gutters class="mt-2">
        <b-col md="12">
          <b-card>
            <b-row align-h="between">
              <h5> Importe por concepto del gasto: </h5>
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





    <!-- Modal Agregar Proyecto -->
    <b-modal
      id="modal_agregar_proyecto"
      ref="modal_agregar_proyecto"
      title="Proyecto"
      size="md"
      ok-title="Guardar"
      cancel-title="Cancelar"
      centered
      @show="ReiniciarModalAgregarProyecto"
      @hidden="ReiniciarModalAgregarProyecto"
      @ok="OkModalAgregarProyecto"
    >
      <b-card>
        <form ref="modal_agregar_proyecto_form">
          <b-form-group
            description="Seleccione el proyecto al que aplica la comisión."
            invalid-feedback="Por favor, seleccione un proyecto."
            :state="estadoModalAgregarProyecto"
          >
            <b-row>
              <b-col md="12">
                <p align="left">Proyecto:</p>
                <b-form-select 
                  v-model="proyectoSeleccionado"
                  :options="opcionesProyectos"
                >
                  <template v-slot:first>
                    <option :value="null" disabled>Seleccione una opción</option>
                  </template>
                </b-form-select>
              </b-col>
            </b-row>
          </b-form-group>
        </form>
      </b-card>
    </b-modal>



    <!-- Modal Editar Proyecto -->
    <b-modal
      id="modal_editar_proyecto"
      ref="modal_editar_proyecto"
      title="Proyecto"
      size="md"
      ok-title="Guardar"
      cancel-title="Cancelar"
      buttonSize="sm"
      centered
      @show="ReiniciarModalEditarProyecto"
      @hidden="ReiniciarModalEditarProyecto"
      @ok="OkModalEditarProyecto"
    >
      <b-card>
        <form ref="modal_editar_proyecto_form">
          <b-form-group
            description="Seleccione el proyecto al que aplica la comisión."
            invalid-feedback="Por favor, seleccione un proyecto."
            :state="estadoModalEditarProyecto"
          >
            <b-row>
              <b-col md="12">
                <p align="left">Proyecto seleccionado: <strong>{{ $data.proyectoTemplate.nombre }}</strong></p>
                <b-form-select 
                  v-model="proyectoSeleccionado"
                  :options="opcionesProyectos"
                >
                  <!-- <template v-slot:first>
                    <option :value="proyectoSeleccionado">{{$data.proyectoTemplate.nombre}}</option>
                  </template> -->
                </b-form-select>
              </b-col>
            </b-row>
          </b-form-group>
        </form>
      </b-card>
    </b-modal>



    <!-- Modal Eliminar Proyecto -->
    <b-modal
      id="modal_eliminar_proyecto"
      title="Confirmar eliminación"
      size= "sm"
      buttonSize="sm"
      okVariant="danger"
      okTitle="Eliminar"
      cancelTitle="Cancelar"
      footerClass="p-2"
      centered
      @ok="EliminarProyecto()"
    >
      ¿Está seguro de eliminar el proyecto seleccionado?
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
        this.$refs.modal_editar_dia.hide();
      });
    },

    

  }

};
</script>





<style>

</style>


