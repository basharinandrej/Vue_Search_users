<template>
  <div>
    <h3 class="section-single__title section-single__title--gap">
      Repositories {{ cntRepositories }}
    </h3>
    <ul class="list-repositories">
      <ListRepositoriesItem
        v-for="(repo, idx) in repositories"
        :key="idx"
        :description="repo.description"
        :contributors="repo.contributors_url"
        :commits="repo.commits_url"
        :size="repo.size"
        :default_branch="repo.default_branch"
        :private="repo.private"
        :name="repo.name"
      />
    </ul>

    <Pagination
      v-bind:limitViewButtons="limitPagesPagination"
      v-bind:currentPagePagination="currentPagePagination"
      v-bind:totalCountItems="cntRepositories"
      v-bind:perPage="perPage"
      v-on:clickPaginationHandler="clickPaginationHandler"
    />
  </div>
</template>

<script>
import ListRepositoriesItem from '@/components/ListRepositories/ListRepositoriesItem'
import Pagination from "@/components/Pagination";

export default {
  name: 'ListRepositories',
  props: ['repositories'],
  components: {Pagination, ListRepositoriesItem},
  mounted() {
    this.$store.commit('viewPartRepo', 1)
  },
  computed: {
    limitPagesPagination() {
      return this.$store.state.pagination.limitPagePaginationRepositories
    },
    currentPagePagination() {
      return this.$store.state.repos.paginationSinglePage.currentPartView
    },
    cntRepositories() {
      return this.$store.getters.cntRepositories
    },
    perPage() {
      return this.$store.state.repos.paginationSinglePage.cntViewRepo
    }
  },
  methods: {
    clickPaginationHandler(page) {
      this.$store.commit('viewPartRepo', page)
    }
  }
}
</script>
