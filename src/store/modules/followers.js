import axios from "axios";

const state = {
    items: [],
    isLoading: false,
    errorMessage: ''
}

const actions = {
    async fetchFollowers({commit, state}, payload) {
        try {
            commit('startFetchFollowing')

            const response = await axios.get(payload)
            const followers = await response.data

            commit('successFetchFollowing', followers )
        } catch (e) {
            commit('failureFetchFollowing', e.message)
        }
    }
}

const mutations = {
    startFetchFollowing(state) {
        state.isLoading = true
    },
    successFetchFollowing(state, payload) {
        state.isLoading = false
        state.items = payload
    },
    failureFetchFollowing(state, payload) {
        state.errorMessage = payload
    }
}

export default {
    state,
    actions,
    mutations
}