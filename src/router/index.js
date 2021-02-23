import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/view/Home'
import SingleUser from '@/view/SingleUser'

Vue.use(VueRouter)


const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
            exact: true
        },
        {
            path: '/single-user/:id',
            name: 'SingleUser',
            component: SingleUser
        }
    ]
})

export default router