import Vue from 'vue'
import Vuex from 'vuex'
import users from '@/store/modules/users'
import repos from '@/store/modules/repos'
import pages from '@/store/modules/pages'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
    },
    mutations: {
    },
    actions: {
    },
    modules: {
        users, repos, pages
    }
})