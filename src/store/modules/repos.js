import axios from "axios"
import lodash from "lodash"
import {tokenGitHub} from '@/helpers/token'

{ /* TODO Нужен ли limitUser, ведь есть perPage? */ }
const state = {
    currentUserId: '',
    items: [],
    isLoading: false,
    errorMessage: '',
    limitUser: null,
    sort: 'asc', // desc
    paginationSinglePage: {
        cntViewRepo: 6,
        currentPartView: 1
    }
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
    },
    getCurrentUser(state, payload) {
        state.currentUserId = payload
    },
    viewPartRepo(state, payload) {
        state.paginationSinglePage.currentPartView = payload
    }
}

const getters = {
    getCurrentRepositories(state) {
        let repoArr = state.items.find(repo => repo.id === state.currentUserId).repos

        repoArr = repoArr.filter((el, idx) => {
            const index = idx + 1
            const topLine = state.paginationSinglePage.cntViewRepo * state.paginationSinglePage.currentPartView
            const bottomLine = topLine - state.paginationSinglePage.cntViewRepo + 1

            return index >= bottomLine && index <= topLine ? el : null
        })
        return repoArr
    },
    cntRepositories(state) {
        return state.items.find(repo => repo.id === state.currentUserId).repos.length
    }
}

export default {
    state, actions, mutations, getters
}