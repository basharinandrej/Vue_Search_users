<template>
  <div>
    <div>
      <h1>{{ this.currentUser && this.currentUser.login }}</h1>

      <img :src="this.currentUser && this.currentUser.avatar_url " alt="avatar">
      <router-link
          :to="{name: 'Home'}"
      > Home</router-link>
    </div>

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
    this.$store.commit('currentUser', this.id)
    this.getUser()
  },
  methods: {
    getUser() {
      this.currentUser = this.$store.state.users.currentUser
    }
  }
}
</script>