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
    await this.$store.dispatch('fetchRepos', payload)

    this.countRepos()
  },
  methods: {
    countRepos() {
      this.cntRepos = this.$store.state.repos.items.length &&
          this.$store.state.repos.items.filter(el => {
            return el.id === this.id ? el : null
      })
    },
    clickHandler() {
      this.$router.push({ name: 'SingleUser', params: { 'id': this.id }})
    }
  }
}
</script>