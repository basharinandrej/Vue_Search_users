import axios from "axios"
import lodash from "lodash"

{ /* TODO Нужен ли limitUser, ведь есть perPage? */ }
const state = {
    items: [],
    isLoading: false,
    errorMessage: '',
    limitUser: null,
    sort: 'asc' // desc
}

const actions = {
    async fetchRepos({commit, state, dispatch}, payload) {
        commit('startFetchRepos', this.state.users.perPage)
        const headers = {
            /*TODO Token устаревает после commit in repositories*/
            "Authorization": `Token e655b96ef2705b79ff71bdad1b77c8902bbbaa21 `
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
    },
    sort({commit, state}, payload) {
        commit('sortMutation', payload)

        commit('sortUsers', state.items)
    }
}


const mutations = {
    startFetchRepos(state, payload) {
        state.limitUser = payload
        state.items = []
    },
    successFetchRepos(state, payload) {
        state.items.push(payload)
    },
    failureFetchRepos(state, payload) {
        state.errorMessage = payload
    },
    sortMutation(state, payload) {
        state.sort = state.sort === 'asc' ? 'desc' : 'asc'
        state.items = lodash.orderBy(state.items, [payload], state.sort)
    }
}

export default {
    state, actions, mutations
}