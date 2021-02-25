<template>
  <form
      @submit.prevent="submitHandler"
      class="form">
      <input type="search"
             required
             v-model.trim="search"
      >
      <button type="submit">
        Send
      </button>
  </form>
</template>

<script>

export default {
  data() {
    return {
      search: ''
    }
  },
  methods: {
    async submitHandler() {
      this.$store.commit('saveSearchValue', this.search)
      this.$store.commit('rollbackPage', 1)
      await this.$store.dispatch('fetchUsers')
    }
  }
}
</script>







