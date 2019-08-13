import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Historicos from './views/Historicos.vue'
import Viaticos from './views/Viaticos.vue'
import Aportaciones from './views/Aportaciones.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/historicos',
      name: 'historicos',
      component: Historicos
    },
    {
      path: '/viaticos',
      name: 'viaticos',
      component: Viaticos
    },
    {
      path: '/aportaciones',
      name: 'aportaciones',
      component: Aportaciones
    }
  ]
})
