<template>
  <li class="list__item" @click="clickHandler">
    <p class="list__paragraph"> {{ JSON.stringify(login) }} </p>
    <p class="list__paragraph list__paragraph--status"> {{ JSON.stringify(type )}} </p>
    <p class="list__paragraph list__paragraph--id"> {{ id }} </p>
    <p class="list__paragraph"> {{ cntRepos.length && cntRepos[0].repos.length || 0}} </p>
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

<style lang="sass">

.list__item
  display: flex
  background: $color_2
  margin-bottom: 4px
  padding: 4px 12px
  border-radius: 4px
  cursor: pointer
  justify-content: space-between

  p
    width: 25%
    display: block
    @media screen and (max-width: 768px)
      width: 33%
      text-align: center

  p:last-child
    text-align: end
    @media screen and (max-width: 768px)
      text-align: center

  .list__paragraph
    &--id
      @media screen and (max-width: 768px)
        display: none

  .list__paragraph
    &--status
      @media screen and (max-width: 576px)
        display: none

</style>