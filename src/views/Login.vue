<template>
  <div>

    <!-- Barra de navegacion -->
    <NavBar/>

    <!-- Card de Login -->
    <b-container>
        <b-row align-h="center" class="mt-5"> 
            <b-col cols="8">
                <b-card border-variant="success">
                    <h3 class="mb-4">Iniciar Sesión</h3>

                    <!-- Form -->
                    <b-form @submit="iniciarSesion">


                        <!-- +++++++++++++++++++++++++++++++ Iniciar Sesion ++++++++++++++++++++++++++++++++ -->
                        
                        <!-- <b-form-group id="input-group-1" label="Correo electrónico:" label-for="input-correo">
                            <b-form-input
                            id="input-correo"
                            v-model="formIniciarSesion.correo"
                            type="email"
                            required
                            placeholder="correo..."
                            ></b-form-input>
                        </b-form-group> -->
                        <b-form-group id="input-group-1" label="Correo electrónico:" label-for="input-correo">
                            <b-form-input
                            id="input-correo"
                            v-model="formIniciarSesion.correo"
                            required
                            placeholder="correo..."
                            ></b-form-input>
                        </b-form-group>

                        <b-form-group id="input-group-2" label="Contraseña:" label-for="input-contrasena">
                            <b-form-input
                            id="input-contrasena"
                            v-model="formIniciarSesion.contrasena"
                            type="password"
                            required
                            placeholder="contraseña..."
                            ></b-form-input>
                        </b-form-group>

                        <b-form-group >
                            <div class="d-flex justify-content-between">

                                <div>
                                    <b-button type="submit" variant="outline-primary">Ingresar</b-button>&nbsp;
                                    <b-button type="reset" variant="outline-danger">Limpiar</b-button>
                                </div>

                                <div>
                                    <!-- +++++++++++++++++++++++++++++++ Recuperar Contrasena (modal) ++++++++++++++++++++++++++++++++ -->
                                    <b-button v-b-modal.modal-prevent-closing variant="outline-secondary">Recuperar contraseña</b-button>

                                    <b-modal
                                        id="modal-prevent-closing"
                                        ref="modal"
                                        title="Recuperación de contraseña"
                                        @show="resetModal"
                                        @hidden="resetModal"
                                        @ok="handleOk"
                                    >
                                        <form ref="form" @submit.stop.prevent="handleSubmit">
                                            <b-form-group
                                            :state="nameState"
                                            label="Correo:"
                                            label-for="modal-input-correo"
                                            invalid-feedback="Por favor, ingrese su correo."
                                            >
                                            <b-form-input
                                                id="modal-input-correo"
                                                v-model="name"
                                                :state="nameState"
                                                required
                                            ></b-form-input>
                                            </b-form-group>
                                        </form>
                                    </b-modal>
                                </div>

                            </div>

                        </b-form-group>

                    </b-form>

                </b-card>
            </b-col>
        </b-row>
    </b-container>
    
  </div>
</template>





<script>
// Componentes:
import HelloWorld from '@/components/HelloWorld.vue'
import NavBar from '@/components/NavBar.vue'



export default {
  name: 'login',
  components: {
    NavBar
  },
  data() {
    return {
        
      // Iniciar Sesion:
      formIniciarSesion: {
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

      // ++++++++++++++++++++++++++++++++ Iniciar sesion ++++++++++++++++++++++++++++++++
      iniciarSesion(correo) {
          correo.preventDefault()
          // Muestra datos del form:
          // alert(JSON.stringify(this.formIniciarSesion))

          // Cambia state:
          this.$store.commit('cambiarTipoUsuario', {
            tipoUsuario: this.formIniciarSesion.correo
          })
          // Manda a home:
          this.$router.push('/');
      },
      onReset(evt) {
          evt.preventDefault()
          // Reinicia valores:
          this.formIniciarSesion.correo = ''
          this.formIniciarSesion.contrasena = ''
          // Trick to reset/clear native browser form validation state
          this.show = false
          this.$nextTick(() => {
          this.show = true
          })
      },



      // ++++++++++++++++++++++++++++++++ Recuperar contrasena ++++++++++++++++++++++++++++++++
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
        // Cambia state:
        this.$store.commit('actualizarCorreo', {
          correo: this.name
        })
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

</style>
