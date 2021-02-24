import axios from "axios";
import baseUrl from '@/helpers/url/baseUrl'

const state = {
    items: [],
    currentPage: 1,
    perPage: 10,
    total_count: null,
    searchValue: null,
    isLoading: false,
    errorMessage: '',
    currentUser: null
}

const actions = {
    async fetchUsers({commit, state}) {
        commit('startFetchUsers', {
            isLoading: true
        })

        const configRequest = {
            CURRENT_PAGE: state.currentPage,
            NAME: state.searchValue,
            PER_PAGE: state.perPage
        }

        try {
            const response = await axios
                .get(`${baseUrl}users?q=${configRequest.NAME}&page=${configRequest.CURRENT_PAGE}&per_page=${configRequest.PER_PAGE}`)

            const users = await response.data
            const payloadAddUsers = {
                items: users.items,
                total_count: users.total_count,
                isLoading: false
            }
            commit('successFetchUsers', payloadAddUsers)
        } catch (e) {
            const payloadFailureUser = {
                isLoading: false,
                errorMessage: e.message
            }
            commit('failureFetchUsers', payloadFailureUser)
        }
    }
}
const mutations = {
    startFetchUsers(state, payload) {
        state.isLoading = payload.isLoading
    },
    successFetchUsers(state, payload) {
        state.items = payload.items
        state.total_count = payload.total_count
        state.isLoading = payload.isLoading
    },
    failureFetchUsers(state, payload) {
        state.isLoading = payload.isLoading
        state.errorMessage = payload.errorMessage
    },
    saveSearchValue(state, payload) {
        state.searchValue = payload
    },
    updateCurrentPage(state, payload) {
        state.currentPage = payload
    },
    currentUser(state, payload) {
        state.currentUser = state.items.find(el => el.id === +payload)
    }
}

export default {
    state,
    actions,
    mutations
}
