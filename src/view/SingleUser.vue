<template>
  <div>
    <h1>{{ getUser.login && getUser.login }}</h1>

    <img :src="getUser.avatar_url" alt="avatar">
    <router-link
      :to="{name: 'Home'}"
    > Home</router-link>

  </div>

</template>

<script>
export default {
  name: 'SingleUser',
  data() {
    return{
      currentUser: null,
      id: this.$route.params.id
    }
  },
  mounted() {
    this.$store.commit('currentFlat', this.id)
  },
  computed: {
    getUser() {
      return this.$store.state.users.currentUser
    }
  }
}
</script>