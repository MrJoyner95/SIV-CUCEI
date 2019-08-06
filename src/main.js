import Vue from 'vue'
import App from './App.vue'



/**
 * Boostrap-Vue.js
**/
import BootstrapVue from 'bootstrap-vue'
// Archivos CSS:
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// Aplicacion:
Vue.use(BootstrapVue)



Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
