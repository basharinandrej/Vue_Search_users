<template>
    <span class="sort" v-on:click="this.sortHandler">
      <slot />
    </span>
</template>

<script>

export default {
  name: 'Sort',
  methods: {
    sortHandler() {
      this.$store.dispatch('sort', 'repos.length')
    }
  }
}

</script>

<style lang="sass">

.sort
  cursor: pointer

  &:before
    content: '↑ ↓'
    cursor: pointer

</style>