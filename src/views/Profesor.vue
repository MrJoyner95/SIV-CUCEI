<template>
  <div class="profesor">

    <!-- Vista general -->
    <!-- <VistaGeneral/> -->
    
    <b-row align-h="center" class="mt-5"> 
      <b-col cols="8">
        <b-card>

          <h4 class="mb-3 titleColor">Comisiones</h4>
          <template v-if= "tipoUsuario === 'profesor'">
            <b-card-text>
              Usted cuenta con una comisión abierta, puede consultar los detalles de la misma a continuación:
            </b-card-text>
            <a href="#" class="card-link">Comisión 000098</a>
          </template>
          <template v-else>
            <b-card-text>
              Actualmente usted no cuenta con una comisión. Puede abrir una comisión haciendo clic en el botón a continuación:
            </b-card-text>
            <b-button @click='mostrarForm' variant="light" class="botonPrimario">Crear comisión</b-button>
          </template>

        </b-card>
      </b-col>
    </b-row>



    <!-- FormComision -->
    <!-- <FormComision/> -->
    <div class="mt-5" :hidden="formEscondido">
      <b-card bg-variant="light">
        <b-form-group
          label-cols-lg="3"
          label="Shipping Address"
          label-size="lg"
          label-class="font-weight-bold pt-0"
          class="mb-0"
        >
          <b-form-group
            label-cols-sm="3"
            label="Street:"
            label-align-sm="right"
            label-for="nested-street"
          >
            <b-form-input id="nested-street"></b-form-input>
          </b-form-group>

          <b-form-group
            label-cols-sm="3"
            label="City:"
            label-align-sm="right"
            label-for="nested-city"
          >
            <b-form-input id="nested-city"></b-form-input>
          </b-form-group>

          <b-form-group
            label-cols-sm="3"
            label="State:"
            label-align-sm="right"
            label-for="nested-state"
          >
            <b-form-input id="nested-state"></b-form-input>
          </b-form-group>

          <b-form-group
            label-cols-sm="3"
            label="Country:"
            label-align-sm="right"
            label-for="nested-country"
          >
            <b-form-input id="nested-country"></b-form-input>
          </b-form-group>

          <b-form-group
            label-cols-sm="3"
            label="Ship via:"
            label-align-sm="right" class="mb-0"
          >
            <b-form-radio-group
              class="pt-2"
              :options="['Air', 'Courier', 'Mail']"
            ></b-form-radio-group>
          </b-form-group>
        </b-form-group>
      </b-card>
    </div>
    
  </div>
</template>





<script>
// Propiedades:
import { mapState } from 'vuex'

// Componentes:
import NavBar from '@/components/NavBar.vue'
import VistaGeneral from '@/components/profesor/VistaGeneral.vue'

// Atributos:
export default {
  name: 'home',
  computed: {
    ...mapState([
      'tipoUsuario'
    ]),
    // otras propiedades
  },
  components: {
    NavBar,
    VistaGeneral
  },
  data() {
    return {
      formEscondido: true
    }
  },
  methods:{
    mostrarForm(correo) {
      this.formEscondido = false;
    }
  }
}
</script>





<style>
.titleColor{
  color: #20603C;
}

.botonPrimario{
  background-color: #20603C;
  color: #ffffff;
}
</style>


