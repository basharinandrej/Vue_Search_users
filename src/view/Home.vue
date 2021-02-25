<template>
  <div class="container">
    <h1>App Search Users</h1>
    <Form />

    <p v-if="startFetchUsers && !failureFetchRepos">
      Загрузка....
    </p>

    <Sort v-if="!startFetchUsers && !failureFetchRepos && fetchUsers.length " />

    <ListUsers
        v-if="!startFetchUsers && !failureFetchRepos"
        :fetchUsers="fetchUsers"
    />

    <Stub
        v-if="!fetchUsers.length && !failureFetchRepos"
    />

    {{ /*TODO Вынести в компонент вывод ошибки */ }}
    <p  v-if="failureFetchUsers">
      {{failureFetchUsers}}
    </p>

    <p v-if="failureFetchRepos">
      {{failureFetchRepos}}
    </p>

    <Pagination v-if="fetchUsers && !failureFetchRepos"/>
  </div>
</template>

<script>
import ListUsers from "@/components/ListUsers/ListUsers";
import Pagination from "@/components/Pagination";
import Form from "@/components/Form";
import Stub from "@/components/Stub";
import Sort from "@/components/Sort";

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
    Stub, Sort
  },
  computed: {
    startFetchUsers() {
      return this.$store.state.users.isLoading
    },
    fetchUsers() {
      return this.$store.state.users.items || false
    },
    /* TODO Вынести в файл вывод ошибок */
    failureFetchUsers() {
      const errorMessage = this.$store.state.users.errorMessage.trim()
      return errorMessage === 'Request failed with status code 403'
          ? 'Превышен лимит запросов к api GitHub. Подожди чуть-чуть, -а-а-аа'
          : null
    },
    failureFetchRepos() {
      const errorMessage = this.$store.state.repos.errorMessage.trim()
      return errorMessage === 'Request failed with status code 403'
          ? 'Превышен лимит запросов к api GitHub / repos. Подожди чуть-чуть, -а-а-аа'
          : null
    }
  }
}
</script>