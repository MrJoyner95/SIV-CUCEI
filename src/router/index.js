import Vue from 'vue'
import VueRouter from 'vue-router'

// Componentes:
import login from '@/components/login'
import home from '@/components/home'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {path: '/home/:usuario', name: 'homeRoute', component: home},
        {
            path: '/',
            name: 'Login',
            component: login
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