import axios from "axios"
import lodash from "lodash"
import {tokenGitHub} from '@/helpers/token/index'

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
            "Authorization": `Token ${tokenGitHub}  `
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