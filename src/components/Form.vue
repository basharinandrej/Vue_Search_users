<template>
  <form
      @submit.prevent
      class="form">
      <input type="search"
             required
             v-model.trim="search"
             @input="searchHandler"
      >
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
    async searchHandler() {
      this.$store.commit('saveSearchValue', this.search)
      await this.$store.dispatch('fetchUsers')
    }
  }
}
</script>