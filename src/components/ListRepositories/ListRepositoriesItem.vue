<template>
  <li class="list-repositories__item">
    <h4>name: {{ name }}</h4>
    <br>
    <p class="list-repositories__paragraph">desc: {{description || 'Без описания'}}</p>
    <br>
    <strong>size: {{size}}</strong>
  </li>
</template>

<script>
export default {
  name: 'ListRepositoriesItem',
  props: ['name', 'description', 'size']
}
</script>

<style lang="sass">

.list-repositories
  display: flex
  flex-wrap: wrap
  justify-content: space-between
  &__paragraph
    min-height: 56px
    overflow: hidden
    text-overflow: ellipsis
    -webkit-box-orient: vertical
    -webkit-line-clamp: 3
    display: block
    display: -webkit-box
  &__item
    padding: 4px 12px
    background: $color_2
    margin-bottom: 12px
    list-style: none
    flex-basis: 30%
    border-radius: 4px
    @media screen and (max-width: 768px)
      flex-basis: 48%
    @media screen and (max-width: 576px)
      flex-basis: 100%
  &__item:last-child
    margin-bottom: 0
    @media screen and (max-width: 576px)
      margin-bottom: 24px
</style>