import Vue from 'vue'
import VueRouter from 'vue-router'

// Componentes:
import login from '@/components/login'
import home from '@/components/home'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: home
        },
        {
            path: '/login',
            name: 'Login',
            component: login
        },
        {
            path: '/home',
            name: 'Home',
            component: home
        }
    ]
})