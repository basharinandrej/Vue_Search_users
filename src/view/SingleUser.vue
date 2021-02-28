<template>
  <section class="section-single">
    <div class="container">
      <div class="section-single__head">
        <router-link
          class="section-single__router-link"
          :to="{name: 'Home'}"
        > Back</router-link>

        <span class="section-single__title-wrapper">
          Name:&nbsp;
          <h1 class="section-single__title"> {{ this.currentUser && this.currentUser.login }}</h1>
        </span>
      </div>

      <img :src="this.currentUser && this.currentUser.avatar_url "
           class="section-single__avatar"
           alt="avatar">

      <ListFollowers
        v-if="getFollowers.length"
        v-bind:followers="getFollowers"
      />

      <ListRepositories
        v-bind:repositories="getRepositories"
      />

      <Loader v-if="isLoading"/>
    </div>
  </section>
</template>

<script>
import ListFollowers from "@/components/ListFollowers/ListFollowers"
import ListRepositories from "@/components/ListRepositories/ListRepositories"
import Loader from "@/components/Loader"

export default {
  name: 'SingleUser',
  components: {
    ListFollowers, Loader, ListRepositories
  },
  data() {
    return{
      currentUser: null,
      id: this.$route.params.id
    }
  },
  mounted() {
    this.$store.commit('currentUser', this.id)
    this.getUser()
    this.fetchFollowers()
  },
  methods: {
    getUser() {
      this.currentUser = this.$store.state.users.currentUser
      this.$store.commit('getCurrentUser', this.id)
    },
    fetchFollowers() {
      this.$store.dispatch('fetchFollowers', this.currentUser.followers_url)
    }
  },
  computed: {
    getFollowers() {
      return this.$store.state.followers.items
    },
    getRepositories() {
      return this.$store.getters.getCurrentRepositories
    },
    isLoading() {
      return this.$store.state.followers.isLoading
    }
  }
}
</script>

<style lang="sass">
.section-single
  padding-top: 24px
  min-height: 100vh
  background: $gradient-color_2
  &__title
    color: $default-color
    text-align: center

  &__title-wrapper
    margin-right: auto
    display: flex
    align-items: center
    color: $default-color

  &__title--gap
    margin-bottom: 32px
    text-align: left

  &__head
    display: flex
    margin-bottom: 24px

  &__router-link
    color: $default-color
    margin-right: auto

  &__avatar
    width: 124px
    height: 124px
    object-fit: cover
    margin: 0 auto 24px auto
    display: block

  &__link
    color: $default-color
    text-align: center

  .list-followers
    margin-bottom: 24px

  .pagination
    padding-bottom: 24px
</style>