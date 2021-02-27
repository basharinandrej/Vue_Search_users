<template>
  <li class="list-repositories__item">
    <h4>{{ name }}</h4>
    <p>{{description}}</p>
    <strong>{{size}}</strong>
  </li>
</template>

<script>
export default {
  name: 'ListRepositoriesItem',
  props: ['name', 'description', 'contributors', 'commits', 'size', 'default_branch', 'private']
}
</script>

<style lang="sass">

.list-repositories
  display: flex
  flex-wrap: wrap
  justify-content: space-between
  &__item
    padding: 4px 12px
    background: $color_2
    margin-bottom: 12px
    list-style: none
    flex-basis: 30%
    border-radius: 4px
  &__item:last-child
    margin-bottom: 0
</style>