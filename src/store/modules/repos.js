import axios from "axios";
import {setCache} from '@/cache/localStore'

{ /* TODO Нужен ли limitUser, ведь есть perPage? */ }
const state = {
    items: [],
    isLoading: false,
    errorMessage: '',
    limitUser: null
}

let repos = []

{ /* TODO Сделать success.... */ }
const actions = {
    async fetchRepos({commit, state, dispatch}, payload) {
        commit('startFetchRepos', this.state.users.perPage)
        console.log('payload_Try', payload);

        try {
            let response = await axios.get(payload.reposUrl)
            let userRepos = {
                id: payload.id,
                url: payload.reposUrl,
                repos: response.data || response.data()
            }

            console.log('userRepos', userRepos);

            repos.push(userRepos)
            /*repos.push({
                id: payload.id,
                url: payload.reposUrl,
                repos: [
                    {repo: `${payload.id}.1`},
                    {repo: `${payload.id}.2`},
                    {repo: `${payload.id}.3`},
                ]
            })*/
        } catch (e) {
            console.log('ERROR_FETCH_Repos', e);
            commit('failureFetchUsers', e)
        } finally {
            {/*TODO Добавить в условие, то что если страница последняя то в неё не обязательно должно быть 10 users*/}

            if ( repos.length % state.limitUser === 0 ) {
                console.log('finally');
                console.log('repos', repos);

                setCache('repos', repos)
                commit('successFetchRepos', repos)
                repos = []
            }
        }
    }


}


const mutations = {
    startFetchRepos(state, payload) {
        state.limitUser = +payload
    },
    successFetchRepos(state, payload) {
        state.items = payload
    },
    failureFetchRepos(state, payload) {
        state.errorMessage = payload
    },
}

export default {
    state, actions, mutations
}