<template>
  <ul class="list">
    <li class="list__header">
      <p class="list__paragraph"> Login </p>
      <p class="list__paragraph list__paragraph--status"> Status </p>
      <p class="list__paragraph list__paragraph--id"> ID </p>
      <p class="list__paragraph"><Sort> CountRepos </Sort></p>
    </li>
    <ListUsersItem
      v-for="(item, idx) in fetchUsers"
      :key="item.id"
      :avatar_url="item.avatar_url"
      :login="item.login"
      :type="item.type"
      :repos="item.repos_url"
      :id="item.id"
      :idx="idx"
    />
  </ul>
</template>

<script>
import ListUsersItem from "@/components/ListUsers/ListUsersItem";
import Sort from "@/components/Sort";

export default {
  components: {ListUsersItem, Sort},
  props: ['fetchUsers']
}
</script>

<style lang="sass">

.list__header
  display: flex
  justify-content: space-between
  margin-bottom: 8px

  p
    width: 25%
    color: $default-color
    @media screen and (max-width: 768px)
      width: 50%
      text-align: center

  p:last-child
    text-align: end
    @media screen and (max-width: 768px)
      text-align: center

.list__paragraph
  &--id
    @media screen and (max-width: 768px)
      display: none

  &--status
    @media screen and (max-width: 576px)
      display: none

</style>