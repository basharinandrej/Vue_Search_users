<template>
  <li @click="clickHandler">
      <span>
        <p> Login: {{ JSON.stringify(login) }} </p>
        <p> Status: {{ JSON.stringify(type )}} </p>
        <p> ID: {{ id }}</p>
        <p> countRepos: {{ cntRepos.length && cntRepos[0].repos.length || 0}}</p>
      </span>
  </li>
</template>

<script>
import {getCache, hasCache} from "@/cache/localStore";

export default {
  name: 'ListUsersItem',
  props: ['avatar_url', 'login', 'type', 'idx', 'repos', 'id'],
  data() {
    return {
      cntRepos: []
    }
  },
  async mounted() {
    const payload = {
      id: this.id,
      reposUrl: this.repos
    }
    const payloadCache = {
      id: this.id,
      name: 'repos'
    }

    console.log('payload_LUI', payload);
    console.log('hasCache', hasCache('repos', payload));

    hasCache('repos', payload)
      ? this.$store.commit('successFetchRepos', getCache(payloadCache))
      : await this.$store.dispatch('fetchRepos', payload)

    this.countRepos()
  },
  methods: {
    countRepos() {
      this.cntRepos = this.$store.state.repos.items.length &&
          this.$store.state.repos.items.filter((el, idx) => {
            return el.id === this.id ? el : null
      })
    },
    clickHandler() {
      this.$router.push({ name: 'SingleUser', params: { 'id': this.id }})
    }
  }
}
</script>