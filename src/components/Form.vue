<template>
  <form
      @submit.prevent="submitHandler"
      class="form">
      <input type="search"
             required
             v-model.trim="search"
             class="input"
      >
      <button
          class="button"
          type="submit">
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

<style lang="sass" scoped>

.form
  background: $color_1

.button
  font-size: 100px


</style>





