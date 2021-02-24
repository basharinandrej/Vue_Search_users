<template>
  <div>
    <span class="sort" v-on:click="this.sortHandler">
      Вверх / Вниз
    </span>
  </div>
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
{/*TODO Поставить Loader webpack, чтобы поддерживались стили из компонентов*/}
</script>

