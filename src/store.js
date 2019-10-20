import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tipoUsuario: 'null',
    correo: 'null',
    // Profesor:

    // ++++++++++++++++++++++++++++++++ Login ++++++++++++++++++++++++++++++++
    usuario: {
      codigo: null,
      tipo: null,
      token: null
    },

    trabajador: {
      codigo: null,
      tipo: null,
      nombre: null,
      plazaLaboral: null,
      areaAdscripcion: null,
      token: null
    },

  },
  // Se usa para funciones con los atributos:
  getters: {

  },
  // Se usa para modificar atributos del state:
  mutations: {
    cambiarTipoUsuario(state, payload) {
      state.tipoUsuario = payload.tipoUsuario;
    },
    actualizarCorreo(state, payload) {
      state.correo = payload.correo;
    },



    // ++++++++++++++++++++++++++++++++ Login ++++++++++++++++++++++++++++++++
    establecerUsuario(state, payload){
      state.usuario.codigo = payload.codigo;
      state.usuario.tipo = payload.tipo;
      state.usuario.token = payload.token;
    },

    establecerTrabajador(state, payload){
      state.trabajador.codigo = payload.codigo;
      state.trabajador.tipo = payload.tipo;
      state.trabajador.nombre = payload.nombre;
      state.trabajador.plazaLaboral = payload.plazaLaboral;
      state.trabajador.areaAdscripcion = payload.areaAdscripcion;
      state.trabajador.token = payload.token;
    },

  },
  actions: {

  }
})
