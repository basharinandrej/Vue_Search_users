import Vue from 'vue'
import Vuex from 'vuex'
import users from '@/store/modules/users'
import repos from '@/store/modules/repos'
import pagination from '@/store/modules/pagination'
import followers from '@/store/modules/followers'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
    },
    mutations: {
    },
    actions: {
    },
    modules: {
        users, repos, pagination, followers
    }
})