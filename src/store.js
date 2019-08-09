import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tipoUsuario: 'null',
    correo: 'null',
    // Profesor:

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
    }
  },
  actions: {

  }
})
