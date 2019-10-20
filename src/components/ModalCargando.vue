<template>
  <div class="Cargando">
    
    <!-- Modal Cargando -->
    <b-modal
      id="modal_agregar_dia"
      ref="modal_agregar_dia"
      title="Información del día"
      size="md"
      ok-title="Guardar"
      cancel-title="Cancelar"
      centered
    >
      <b-card>

        <div class="d-flex align-items-center">
          <strong>Cargando...</strong>
          <b-spinner variant="success" type="grow" label="Spinning"></b-spinner>
        </div>

        <!-- <form ref="modal_agregar_dia_form">
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
        </form> -->

      </b-card>
    </b-modal>

  </div>
</template>





<script>

</script>





<style>

</style>


