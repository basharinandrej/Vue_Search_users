<template>
  <div class="container">
    <h1>App Search Users</h1>
    <Form />

    <p v-if="startFetchUsers && !failureFetchUsers">
      Загрузка....
    </p>

    <ListUsers
        v-if="!startFetchUsers && !failureFetchUsers"
        :fetchUsers="fetchUsers"
    />

    <Stub
        v-if="!fetchUsers.length && !failureFetchUsers"
    />

    <p  v-if="failureFetchUsers">
      {{failureFetchUsers}}
    </p>

<!--    <p>-->
<!--      {{failureFetchRepos}}-->
<!--    </p>-->

    <Pagination v-if="fetchUsers && !failureFetchUsers"/>
  </div>
</template>

<script>
import ListUsers from "@/components/ListUsers/ListUsers";
import Pagination from "@/components/Pagination";
import Form from "@/components/Form";
import Stub from "@/components/Stub";

export default {
  data() {
    return {
      cache: null
    }
  },
  components: {
    Form,
    ListUsers,
    Pagination,
    Stub
  },
  mounted() {
    /*this.cache = getCache('repos')*/
  },
  computed: {
    startFetchUsers() {
      return this.$store.state.users.isLoading
    },
    fetchUsers() {
      return this.$store.state.users.items || false
    },
    failureFetchUsers() {
      const errorMessage = this.$store.state.users.errorMessage.trim()
      return errorMessage === 'Request failed with status code 403'
          ? 'Превышен лимит запросов к api GitHub. Подожди чуть-чуть, -а-а-аа'
          : null
    },
    // failureFetchRepos() {
    //   const errorMessage = this.$store.state.repos.errorMessage.trim()
    //
    //   return errorMessage === 'Request failed with status code 403'
    //       ? 'Превышен лимит запросов к api GitHub / repos. Подожди чуть-чуть, -а-а-аа'
    //       : null
    // }
  }
}
</script>