import Vuex from "vuex";
import Vue from "vue";
import axios from "axios";

Vue.use(Vuex)

{/*TODO Добавить мутацию с ошибкой*/ }
export default new Vuex.Store({
    state: {
        users: [],
        currentPage: 1,
        perPage: 10,
        total_count: null,
        searchValue: null,
        isLoading: false
    },
    actions: {
        async fetchUsers({commit, state}) {
            commit('startFetchUsers', true)

            const page = state.currentPage
            const name = state.searchValue
            const perPage = state.perPage

            try {
                const response = await axios.get(`https://api.github.com/search/users?q=${name}&page=${page}&per_page=${perPage}`)
                const users = await response.data
                const payloadAddUsers = {
                    users: users.items,
                    total_count: users.total_count,
                    isLoading: false
                }
                commit('successFetchUsers', payloadAddUsers)
            } catch (e) {
                {/*TODO Сделать вывод ошибки на экран и убрать статус загрузки*/}
                console.log('ERROR_Fetch', e)
            }
        }
    },
    mutations: {
        startFetchUsers(state, payload) {
            console.log('start');
            state.isLoading = payload
        },
        successFetchUsers(state, payload) {
            state.users = payload.users
            state.total_count = payload.total_count
            state.isLoading = payload.isLoading
        },
        saveSearchValue(state, payload) {
            state.searchValue = payload
        },
        updateCurrentPage(state, payload) {
            state.currentPage = payload
        }
    }
})
