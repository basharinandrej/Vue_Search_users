<template>
  <section class="section-home">
    <div class="section-home__container container">
      <h1 class="section-home__title">User Search App</h1>

      <Form />

      <Loader v-if="startFetchUsers && !getError"/>

      <ListUsers
          v-if="!startFetchUsers && !getError && fetchUsers.length"
          :fetchUsers="fetchUsers"
      />

      <Stub
          v-if="!fetchUsers.length && !startFetchUsers"
      />

      <Errors v-if="getError"
              v-bind:error="getError"
      />

      <Pagination v-if="fetchUsers && !getError"
                  v-bind:limitViewButtons="limitPagesPagination"
                  v-bind:currentPagePagination="currentPagePagination"
                  v-bind:totalCountItems="totalCountItems"
                  v-bind:perPage="perPage"
                  v-on:clickPaginationHandler="clickPaginationHandler"
      />
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
import Errors from "@/components/Error";

export default {
  data() {
    return {
      textError: 'Users not found'
    }
  },
  components: {
    Errors,
    Form,
    ListUsers,
    Pagination,
    Stub, Sort, Loader
  },
  methods: {
    clickPaginationHandler(page) {
      this.$store.commit('updateCurrentPage', page)

      this.updateFetchUsers()
    },
    async updateFetchUsers() {
      await this.$store.dispatch('fetchUsers')
    }
  },
  computed: {
    startFetchUsers() {
      return this.$store.state.users.isLoading
    },
    fetchUsers() {
      return this.$store.state.users.items || false
    },
    getError() {
      return  this.$store.state.repos.errorMessage.trim() ||
              this.$store.state.users.errorMessage.trim()
    },
    limitPagesPagination() {
      return this.$store.state.pagination.limitPagePaginationHome
    },
    currentPagePagination() {
      return this.$store.state.users.currentPage
    },
    totalCountItems() {
      return this.$store.state.users.total_count
    },
    perPage() {
      return this.$store.state.users.perPage
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

  .stub, .error__paragraph
    margin-top: 96px

  .form
    margin-bottom: 24px

  .list
    margin-bottom: 24px
</style>