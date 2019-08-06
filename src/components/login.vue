<template>
  <div>
    <b-form @submit="onSubmit">

        <b-form-group id="input-group-1" label="Correo electrónico:" label-for="input-1">
            <b-form-input
            id="input-1"
            v-model="form.correo"
            type="email"
            required
            placeholder="correo..."
            ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Contraseña:" label-for="input-2">
            <b-form-input
            id="input-2"
            v-model="form.contrasena"
            type="password"
            required
            placeholder="contraseña..."
            ></b-form-input>
        </b-form-group>

        <b-form-group>
            <b-button type="submit" variant="primary">Ingresar</b-button>
            <b-button type="reset" variant="danger">Limpiar</b-button>
        </b-form-group>


        <b-form-group>
            <b-button v-b-modal.modal-prevent-closing>Recuperar contraseña</b-button>

            <div class="mt-3">
                Correos:
                <div v-if="submittedNames.length === 0">--</div>
                <ul v-else class="mb-0 pl-3">
                    <li v-for="name in submittedNames">{{ name }}</li>
                </ul>
            </div>

            <b-modal
                id="modal-prevent-closing"
                ref="modal"
                title="Recuperación de contraseña:"
                @show="resetModal"
                @hidden="resetModal"
                @ok="handleOk"
            >
            <form ref="form" @submit.stop.prevent="handleSubmit">
                <b-form-group
                :state="nameState"
                label="Correo:"
                label-for="name-input"
                invalid-feedback="Por favor, ingrese su correo."
                >
                <b-form-input
                    id="name-input"
                    v-model="name"
                    :state="nameState"
                    required
                ></b-form-input>
                </b-form-group>
            </form>
            </b-modal>
        </b-form-group>


      



    </b-form>
  </div>
</template>





<script>
  export default {
    data() {
      return {
        // Iniciar Sesion:
        form: {
          correo: '',
          contrasena: ''
        },
        
        // Recuperar contrasena:
        name: '',
        nameState: null,
        submittedNames: []
      }
    },
    methods: {
        // Iniciar Sesion:
        onSubmit(evt) {
            evt.preventDefault()
            alert(JSON.stringify(this.form))
        },
        onReset(evt) {
            evt.preventDefault()
            // Reset our form values
            this.form.email = ''
            this.form.name = ''
            this.form.food = null
            this.form.checked = []
            // Trick to reset/clear native browser form validation state
            this.show = false
            this.$nextTick(() => {
            this.show = true
            })
        },

        // Recuperar contrasena:
        checkFormValidity() {
            const valid = this.$refs.form.checkValidity()
            this.nameState = valid ? 'valid' : 'invalid'
            return valid
        },
        resetModal() {
            this.name = ''
            this.nameState = null
        },
        handleOk(bvModalEvt) {
            // Prevent modal from closing
            bvModalEvt.preventDefault()
            // Trigger submit handler
            this.handleSubmit()
        },
        handleSubmit() {
            // Exit when the form isn't valid
            if (!this.checkFormValidity()) {
            return
            }
            // Push the name to submitted names
            this.submittedNames.push(this.name)
            // Hide the modal manually
            this.$nextTick(() => {
            this.$refs.modal.hide()
            })
        }
    
    }
  }
</script>





<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
