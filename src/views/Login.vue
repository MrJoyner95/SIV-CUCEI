<template>
  <div>

    <div id="div_fondo">

      <!-- Login y Novedades -->
      <b-row align-h="center" class="mt-5">
        <b-col cols="10">
          
          <!-- <b-card bg-variant="transparent" no-body class="overflow-hidden" border-variant="primary" > -->

          <div id="div_login">

            <b-row no-gutters>
              <b-col md="5">

                <!-- +++++++++++++++++++++++++++++++ Iniciar Sesion ++++++++++++++++++++++++++++++++ -->
                <div id="form_login">
                  <h4 class="mb-4 titulo">Iniciar Sesión</h4>

                  <!-- Form Login -->
                  <b-form @submit="iniciarSesion">
                    <b-form-group label="Correo electrónico:">
                      <b-form-input
                        id="input-correo"
                        v-model="correo"
                        required
                        placeholder="correo..."
                      ></b-form-input>
                    </b-form-group>

                    <b-form-group label="Contraseña:">
                      <b-form-input
                        id="input-contrasena"
                        v-model="contrasena"
                        type="password"
                        required
                        placeholder="contraseña..."
                      ></b-form-input>
                    </b-form-group>

                    <b-form-group>
                      <b-row align-h="center" class="mt-2">
                        <b-col cols="4">
                          <b-button type="submit" block variant="outline-primary">Ingresar</b-button>
                        </b-col>
                        <b-col cols="4">
                          <b-button type="reset" block variant="outline-danger">Limpiar</b-button>
                        </b-col>
                      </b-row>
                    </b-form-group>

                    <!-- Recuperar contrasena -->
                    <div>
                      <b-row no-gutters align-h="center" class="mt-4">
                        <b-col cols="8" align="center">
                          <b-link v-b-modal.modal-recuperarContrasena>Recuperar contraseña</b-link>
                        </b-col>
                      </b-row>

                      <b-modal
                        id="modal-recuperarContrasena"
                        ref="modal"
                        title="Recuperación de contraseña"
                        centered
                        @show="modalReset"
                        @hidden="modalReset"
                        @ok="modalOk"
                      >
                        <form ref="form" @submit.stop.prevent="handleSubmit">
                          <b-form-group
                            label="Ingrese su correo:"
                            description="Enviaremos un enlace a su correo para restablecer su contrseña."
                            invalid-feedback="Ingrese un correo válido"
                            :state="modalState"
                          >
                            <b-form-input
                              id="input-correoRecuperacion"
                              v-model="correoRecuperacion"
                              type="email"
                              :state="modalState"
                              required
                            ></b-form-input>
                          </b-form-group>
                        </form>
                      </b-modal>
                    </div>
                    
                  </b-form>
                </div>

              </b-col>


              <b-col md="7">
                
                <!-- Avisos -->
                <div id="div_avisos">
                  <ul id="lista_avisos">
                    <li>
                      <img src="../assets/icons/avisos/tutorial.png" alt="intro" height="70px">
                      <span> <b-link style="color: #ffffff;"> Conoce el sistema SIV CUCEI y los servicios que te ofrece. </b-link> </span>
                    </li>
                    <li>
                      <img src="../assets/icons/avisos/video.png" alt="tutorial" height="70px">
                      <span> <b-link style="color: #ffffff;"> ¿Necesitas ayuda?, mira los video-tutoriales que hemos preparado para ti. </b-link> </span>
                    </li>
                    <li>
                      <img src="../assets/icons/avisos/notificacion.png" alt="tutorial" height="70px">
                      <span> <b-link style="color: #ffffff;"> Novedades del sistema. </b-link> </span>
                    </li>
                    <li>
                      <img src="../assets/icons/avisos/terminos_condiciones.png" alt="tutorial" height="70px">
                      <span> <b-link style="color: #ffffff;"> Términos y condiciones del sistema SIV CUCEI. </b-link> </span>
                    </li>
                  </ul>
                </div>

              </b-col>

            </b-row>
          </div>

        </b-col>
      </b-row>
    </div>

  </div>
</template>





<script>
// Componentes:

// Propiedades:
export default {
  name: "login",
  components: {},
  data() {
    return {
      // Iniciar Sesion:
      correo: "",
      contrasena: "",

      // Recuperar contrasena:
      correoRecuperacion: "",
      modalState: null


    };
  },
  methods: {
    // ++++++++++++++++++++++++++++++++ Iniciar sesion ++++++++++++++++++++++++++++++++
    iniciarSesion(correo) {
      // Cambia state:
      this.$store.commit("cambiarTipoUsuario", {
        tipoUsuario: this.correo
      });
      // Manda a home:
      this.$router.push("/");
    },

    // ++++++++++++++++++++++++++++++++ Recuperar contrasena ++++++++++++++++++++++++++++++++
    modalCheck() {
      const valid = this.$refs.form.checkValidity();
      this.modalState = valid ? "valid" : "invalid";
      return valid;
    },
    modalReset() {
      this.correoRecuperacion = "";
      this.modalState = null;
    },
    modalOk(bvModalEvt) {
      // Cambia state:
      this.$store.commit("actualizarCorreo", {
        correo: this.name
      });
      // Prevent modal from closing
      bvModalEvt.preventDefault();

      // Ejecuta recuperar contrasena:
      this.recuperarContrasena();
    },
    recuperarContrasena() {
      // Sale si el form no es valido:
      if (!this.modalCheck()) {
        return;
      }

      // Ejecuta funcion para enviar correo de recuperacion:

      // Esconde modal:
      this.$nextTick(() => {
        this.$refs.modal.hide();
      });
    }

  }
};
</script>





<style scoped>

#div_fondo {
  /* border: 2px solid black; */
  padding: 25px;
  background: url("../assets/images/fondo_login.jpg") no-repeat center center fixed;
  background-repeat: no-repeat;
  background-size: cover;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  /* opacity: .95; */
  min-height: 94vh;
  /* height: 100%; */
}

#div_login{
  border: 1px solid green;
  /* border-radius:10px; regular */
  /* -moz-border-radius:10px;  for Firefox */
  /* -webkit-border-radius:10px; for Webkit-Browsers */
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  /* max-height: 450px; */
  box-shadow: 5px 5px 10px;
}

#form_login{
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  background: #ffffff;
  opacity: .95;
  padding: 5%;
  height: 100%;
}

#div_avisos{
  /* background: darkgrey; */
  background: url("../assets/images/fondo_oscuro.png");
  background-size: cover;
  /* opacity: .95; */
  padding: 4%;
  height: 100%;
  max-height: 450px;
}

#lista_avisos{
  list-style-type:none;
  padding: 0%;
}

</style>


