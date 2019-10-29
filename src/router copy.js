import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
import Login from './views/Login.vue'
import Historicos from './views/Historicos.vue'
import Viaticos from './views/Viaticos.vue'
import Aportaciones from './views/Aportaciones.vue'
import Estadisticas from './views/Estadisticas.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
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
    },
    {
      path: '/estadisticas',
      name: 'estadisticas',
      component: Estadisticas
    }
  ]
})
