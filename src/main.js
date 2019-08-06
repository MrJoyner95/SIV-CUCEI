import Vue from 'vue'
import App from './App.vue'



/**
 * Router
**/
import router from './router'



/**
 * Boostrap-Vue.js
**/
import BootstrapVue from 'bootstrap-vue'
// Archivos CSS:
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)



Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
