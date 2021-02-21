<template>
  <ul class="list">
    <ListUsersItem
        v-for="(item, idx) in fetchUsers"
        :key="item.id"
        :avatar_url="item.avatar_url"
        :login="item.login"
        :type="item.type"
        :idx="idx"
    />
  </ul>
</template>

<script>
import ListUsersItem from "@/components/ListUsers/ListUsersItem";

export default {
  components: {ListUsersItem},
  props: ['fetchUsers']
}
</script>