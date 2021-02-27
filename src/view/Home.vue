<template>
  <section class="section-home">
    <div class="section-home__container container">
      <h1 class="section-home__title">User Search App</h1>

      <Form />

      <Loader  v-if="startFetchUsers && !failureFetchRepos"/>

      <ListUsers
          v-if="!startFetchUsers && !failureFetchRepos && fetchUsers.length"
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
  </section>
</template>

<script>
import ListUsers from "@/components/ListUsers/ListUsers"
import Pagination from "@/components/Pagination"
import Form from "@/components/Form"
import Stub from "@/components/Stub"
import Sort from "@/components/Sort"
import Loader from "@/components/Loader"

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
    Stub, Sort, Loader
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

<style lang="sass">

.section-home
  padding-top: 24px
  height: 100vh
  background: $gradient-color_1

  &__title
    text-align: center
    margin-bottom: 12px
    color: $default-color

  .stub
    margin-top: 96px

  .form
    margin-bottom: 24px

  .list
    margin-bottom: 24px
</style>