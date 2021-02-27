<template>
  <div>
    <h3 class="section-single__title section-single__title--gap">
      Followers {{followers.length}}
    </h3>

      <ul class="list-followers">
        <ListFollowersItem
            v-for="(f, idx) in followers"
            :key="idx"
            :login="f.login"
            :avatar="f.avatar_url"
        />
      </ul>
  </div>

</template>

<script>
import ListFollowersItem from '@/components/ListFollowers/ListFollowersItem'

export default {
  name: 'Followers',
  props: ['followers'],
  components: {
    ListFollowersItem
  }
}
</script>

<style lang="sass">
.list-followers
  display: flex
  overflow: auto
  padding-bottom: 24px


</style>