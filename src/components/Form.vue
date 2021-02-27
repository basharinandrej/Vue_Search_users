<template>
  <form
      @submit.prevent="submitHandler"
      class="form">
      <input type="search"
             required
             v-model.trim="search"
             class="form__input input"
      >
      <button
          class="form__button button"
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
  components: ['Favicon'],
  methods: {
    async submitHandler() {
      this.$store.commit('saveSearchValue', this.search)
      this.$store.commit('rollbackPage', 1)
      await this.$store.dispatch('fetchUsers')
    }
  }
}
</script>

<style lang="sass">

.form
  display: flex
  justify-content: center

input
  font-size: 16px
  padding: 4px 8px
  border-radius: 4px 0 0 4px
  border: none
  border-right: 1px solid $color_1

.button
  font-size: 12px
  padding: 0 12px
  cursor: pointer
  background: $default-color
  color: $color_1
  border: none
  border-radius: 0 4px 4px 0

img
  width: 50px
  height: 50px

</style>





