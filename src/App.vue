<template>
  <div class="container">
    <h1>App Search Users</h1>
    <Form />

    <p v-if="startFetchUsers">
      Загрузка....
    </p>

    <ListUsers
        v-if="!startFetchUsers"
        :fetchUsers="fetchUsers"
    />

    <Stub
      v-if="!fetchUsers.length"
    />

    <Pagination v-if="fetchUsers"/>
  </div>
</template>

<script>
import ListUsers from "@/components/ListUsers/ListUsers";
import Pagination from "@/components/Pagination";
import Form from "@/components/Form";
import Stub from "@/components/Stub";

export default {
  components: {
    Form,
    ListUsers,
    Pagination,
    Stub
  },
  computed: {
    startFetchUsers() {
      return this.$store.state.isLoading
    },
    fetchUsers() {
      return this.$store.state.users || false
    }
  }
}
</script>