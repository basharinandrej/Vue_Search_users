<template>
    <li class="list-followers__item">
      <img :src="avatar" class="list-followers__avatar" alt="avatar">
      <h5 class="list-followers__title">
        {{ login }}
      </h5>
    </li>
</template>

<script>
export default {
  name: 'ListFollowersItem',
  props: ['login', 'avatar']
}
</script>

<style lang="sass">
.list-followers
  &__item
    list-style: none
    margin-right: 32px
  &__item:last-child
    margin-right: 0

  &__title
    color: $default-color
    text-align: center

  &__avatar
    max-width: 64px
    width: 64px
    height: 64px
    border-radius: 50%
    object-fit: cover
    margin-bottom: 12px

</style>