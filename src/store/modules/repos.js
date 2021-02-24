import axios from "axios";

{ /* TODO Нужен ли limitUser, ведь есть perPage? */ }
const state = {
    items: [],
    isLoading: false,
    errorMessage: '',
    limitUser: null
}

{ /* TODO Сделать success.... */ }

const actions = {
    async fetchRepos({commit, state, dispatch}, payload) {
        commit('startFetchRepos', this.state.users.perPage)
        const headers = {
            "Authorization": `Token e5078fc6c8e150e162323f72a82f724e2cbf6e8b`
        }

        try {
            let response = await axios.get(payload.reposUrl, {
                "method": "GET",
                "headers": headers
            })
            let userRepos = {
                id: payload.id,
                repos: response.data
            }
            commit('successFetchRepos', userRepos)
        } catch (e) {
            commit('failureFetchRepos', e.message)
        }
    }
}


const mutations = {
    startFetchRepos(state, payload) {
        state.limitUser = payload
    },
    successFetchRepos(state, payload) {
        state.items.push(payload)
    },
    failureFetchRepos(state, payload) {
        state.errorMessage = payload
    },
}

export default {
    state, actions, mutations
}