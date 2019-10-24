<template>
  <div>

    <div id="div_fondo">

      <!-- Login y Novedades -->
      <b-row align-h="center" class="mt-5">
        <b-col lg="10">
          
          <div id="div_login">
            <b-row no-gutters>
              <!-- ++++++++++++++++++++++++++++++++ Iniciar Sesion ++++++++++++++++++++++++++++++++ -->
              <b-col md="5">
                <div id="form_login">
                  <h4 class="mb-4 titulo">Iniciar Sesión</h4>

                  <!-- Form Login -->
                  <b-form @submit="iniciarSesion">
                    <b-form-group label="Código:">
                      <b-form-input
                        id="input-codigo"
                        v-model="codigo"
                        required
                        placeholder="..."
                      ></b-form-input>
                    </b-form-group>

                    <b-form-group label="NIP:">
                      <b-form-input
                        id="input-contrasena"
                        v-model="contrasena"
                        type="password"
                        required
                        placeholder="..."
                      ></b-form-input>
                    </b-form-group>

                    <b-form-group>
                      <b-row align-h="center" class="mt-2">
                        <b-col cols="4">
                          <b-button type="submit" block variant="outline-primary">Ingresar</b-button>
                        </b-col>
                        <b-col cols="4">
                          <b-button type="reset" block variant="outline-danger">Cancelar</b-button>
                        </b-col>
                      </b-row>
                    </b-form-group>
                  </b-form>


                  <!-- Alerta -->
                  <b-alert
                    variant="danger"
                    dismissible
                    fade
                    :show="mostrarAlertaServidor"
                    @dismissed="mostrarAlertaServidor=false"
                  >
                    Error: no se obtuvo respuesta del servidor.
                  </b-alert>


                  <!-- Recuperar contrasena -->
                  <b-row no-gutters align-h="center" class="mt-4">
                    <b-col cols="8" align="center">
                      <b-link v-b-modal.modal_recuperar_contrasena>Recuperar contraseña</b-link>
                    </b-col>
                  </b-row>

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



    <!-- Pantalla de carga -->
    <loading 
      :active.sync="mostrarPantallaCarga" 
      :can-cancel="false"
      :is-full-page="true"
      loader="dots"
      :height=100
      :width=100
      color="#1db255"
      background-color="#3e3e3e"
      :opacity=0.5
    >
    </loading>



    <!-- Modal Recuperar contrasena-->
    <b-modal
      id="modal_recuperar_contrasena"
      ref="modal_recuperar_contrasena"
      title="Recuperación de contraseña"
      centered
      buttonSize="md"
      okTitle="Enviar"
      cancelTitle="Cancelar"
      
      @show="ReiniciarModalRecuperarContrasena"
      @hidden="ReiniciarModalRecuperarContrasena"
      @ok="OkModalRecuperarContrasena"
    >
      <form ref="form_recuperar_contrasena" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="Ingrese su correo:"
          description="Enviaremos un enlace a su correo para restablecer su contrseña."
          invalid-feedback="Ingrese un correo válido"
          :state="stateModalRecuperarContrasena"
        >
          <b-form-input
            id="input-correoRecuperacion"
            v-model="correoRecuperacion"
            type="email"
            :state="stateModalRecuperarContrasena"
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>


  </div>
</template>





<script>
// State y Router:
import estado from "@/store.js";
import enrutador from "@/router.js";

// vue-loading-overlay:
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

// Propiedades:
export default {
  name: "login",
  components: {
    Loading,
  },
  data() {
    return {
      // Iniciar Sesion:
      codigo: null,
      contrasena: null,
      // Recuperar contrasena:
      correoRecuperacion: null,
      stateModalRecuperarContrasena: null,
      // Recursos visuales:
      mostrarPantallaCarga: false,
      mostrarAlertaServidor: false,
    };
  },
  methods: {

    iniciarSesion(codigo) {

      // Muestra pantalla de carga:
      this.mostrarPantallaCarga = true;

      // Duplica el objeto raiz (this) para poder usarlo en una funcion interna dentro de "setInterval":
      var data = this; // Dentro de una funcion interna se llama a "data" en lugar de "this".

      // // ++++++++++++++++++++++++ Enviando JSON al servidor y esperando respuesta: ++++++++++++++++++++++++
      // var timeleft = 3;
      // var downloadTimer = setInterval(function(){

      //   // ++++++++++++++++ Peticion HTTP al servidor ++++++++++++++++
      //   // Define la peticion:
      //   var requestGetUser = new XMLHttpRequest();
      //   var url = "http://localhost:3000/trabajador";
      //   // Abre la peticion:
      //   requestGetUser.open('GET', url, true);
      //   // Envia la peticion:
      //   requestGetUser.send();
      //   // Agrega eventos:
      //   requestGetUser.addEventListener("readystatechange", processRequest, false);
      //   // Evento de la peticion:
      //   function processRequest(e) {
      //     // Comprueba que la peticion este en el estado "DONE" y estatus 200 del servidor:
      //     if(requestGetUser.readyState == 4 && requestGetUser.status == 200 || requestGetUser.readyState == 4 && requestGetUser.status == 304){

      //       var response = JSON.parse(requestGetUser.responseText);
      //       console.log(response);

      //       estado.commit("establecerTrabajador", {
      //         codigo: response.codigo,
      //         tipo: response.tipo,
      //         nombre: response.nombre,
      //         plazaLaboral: response.plazaLaboral,
      //         areaAdscripcion: response.areaAdscripcion,
      //         token: response.token,
      //       });

      //       // Esconde pantalla de carga:
      //       data.mostrarPantallaCarga = false;

      //       console.log("RESPUESTA DEL SERVIDOR");
      //       enrutador.push("/");

      //       // Detiene el contador:
      //       clearInterval(downloadTimer);
      //     }
      //   }

      //   // ++++++++++++++++ No hubo respuesta del servidor ++++++++++++++++
      //   timeleft -= 1;
      //   if(timeleft <= 0){

      //     // Cambia estado de mostrarAlertaServidor:
      //     data.mostrarAlertaServidor = true;
      //     // Esconde pantalla de carga:
      //     data.mostrarPantallaCarga = false;

      //     // Error al obtener datos desde el servidor:
      //     console.log("ERROR EN EL SERVIDOR");
      //     // enrutador.push("/error");

      //     // Detiene el contador:
      //     clearInterval(downloadTimer);
      //   }

      // }, 1000);



      // ++++++++++++++++++++++++ Enviando JSON al servidor y esperando respuesta: ++++++++++++++++++++++++
      const request = require('request');
      var timeleft = 3;
      var downloadTimer = setInterval(function(){

        // ++++++++++++++++ Peticion HTTP al servidor ++++++++++++++++
        request(
          {
            method: "GET",
            uri: "http://localhost:3000/iniciarSesion"
          },
          function (error, response) {

            if(error){
              // Muestra error:
              data.mostrarAlertaServidor = true;
              data.mostrarPantallaCarga = false;
              // Detiene el contador:
              clearInterval(downloadTimer);
            }
            else{
              if(response.statusCode == 200){

                console.log(response);

                // Obtiene el objeto JSON de response:
                var body = JSON.parse(response.body);
                console.log("Objeto JSON obtenido: ", body);

                // // Asigna objeto trabajador:
                // var trabajador = body.trabajador;
                // // Asigna objeto comision:
                // var comision = body.comisionActiva;
                // // Asigna objeto de historial de comisiones:
                // var historialComisiones = body.historialComisiones;



                // Todos los tipos de usuario:
                estado.commit("EstablecerTrabajador", {
                  trabajador: body.trabajador
                });

                estado.commit("EstablecerComisionActiva", {
                  comisionActiva: body.comisionActiva
                });

                estado.commit("EstablecerHistorialComisiones", {
                  historialComisiones: body.historialComisiones
                });

                
                
                // Rangos Medios y Directivos:
                if(body.solicitudesPendientes != null){
                  estado.commit("EstablecerSolicitudesPendientes", {
                    solicitudesPendientes: body.solicitudesPendientes
                  });
                }

                if(body.historicoSolicitudes != null){
                  estado.commit("EstablecerHistoricoSolicitudes", {
                    historicoSolicitudes: body.historicoSolicitudes
                  });
                }

                // Rectora:
                if(body.solicitudesSinResolver != null){
                  estado.commit("EstablecerSolicitudesSinResolver", {
                    solicitudesSinResolver: body.solicitudesSinResolver
                  });
                }



                if(body.finanzas != null){
                  estado.commit("EstablecerFinanzas", {
                    finanzas: body.finanzas
                  });
                }
                



                // Esconde pantalla de carga:
                data.mostrarPantallaCarga = false;
                // Detiene el contador:
                clearInterval(downloadTimer);
                // Continua la ruta:
                enrutador.push("/");
              }
            }
          }
        )

        // ++++++++++++++++ No hubo respuesta del servidor ++++++++++++++++
        timeleft -= 1;
        if(timeleft <= 0){
          // Muestra error:
          data.mostrarAlertaServidor = true;
          data.mostrarPantallaCarga = false;
          // Detiene el contador:
          clearInterval(downloadTimer);
          // Cancela la petition:
        }

      }, 1000);



    },

    // ++++++++++++++++++++++++++++++++ Recuperar contrasena ++++++++++++++++++++++++++++++++
    ReiniciarModalRecuperarContrasena() {
      this.correoRecuperacion = "";
      this.stateModalRecuperarContrasena = null;
    },
    OkModalRecuperarContrasena(bvModalEvt) {
      // Previene campos vacios:
      bvModalEvt.preventDefault();
      // Comprueba que el correo ingresado sea valido:
      const correoValido = this.$refs.form_recuperar_contrasena.checkValidity();
      // Asigna el estado del modal:
      this.stateModalRecuperarContrasena = correoValido;
      
      if(correoValido){
        // Ejecuta recuperar contrasena:
        this.recuperarContrasena();
      }
    },
    recuperarContrasena() {
      // Ejecuta funcion para enviar correo de recuperacion:

      // Esconde modal:
      this.$nextTick(() => {
        this.$refs.modal_recuperar_contrasena.hide();
      });
    },

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


