<template>
  <nav aria-label="Page navigation example" class="pagination">
    <ul class="pagination__list"
        @click="clickHandler"
    >
      <li class="page-item"
          v-for="(item, idx) in cntPages"
          :key="idx"
          :class="{active: +item === +currentPage}"
      >
        <p class="page-link"
           :data-page="+item"
        >
          {{item}}
        </p>
      </li>
    </ul>
  </nav>
</template>

<script>

export default {
  name: 'Pagination',
  data() {
    return {
      currentPage: 1
    }
  },
  methods: {
    clickHandler(e) {
      const target = e.target
      const page = this.currentPage = target.dataset.page
      this.$store.commit('updateCurrentPage', page)
      this.updateFetchUsers()
    },
    async updateFetchUsers() {
      await this.$store.dispatch('fetchUsers')
    }
  },
  computed: {
    cntPages() {
      const configPagination = {
        PER_PAGE: this.$store.state.users.perPage,
        LIMIT_PAGES: 5,
        EQUATOR: 3,
        TOTAL_COUNT: this.$store.state.users.total_count
      }
      const cntPages = Math.round( configPagination.TOTAL_COUNT / configPagination.PER_PAGE)
      const currentPage = +this.$store.state.users.currentPage
      const pagination = cntPages > configPagination.LIMIT_PAGES
          ? configPagination.LIMIT_PAGES
          : cntPages

      let fivePagesPagination = new Array( pagination )
        .fill(1)
        .map((el, idx) => {
          const indexPage = idx + 1
          const stepPagination = currentPage + idx
          {/*TODO вынести в константу 2*/ }
          const deltaPage = stepPagination - 2

          if ( currentPage > configPagination.EQUATOR
              && cntPages > configPagination.LIMIT_PAGES ) {
            return deltaPage
          }
          return indexPage === currentPage ? currentPage : indexPage
        })

      if (cntPages === 1) {
        return 0
      } else {
        return cntPages ? fivePagesPagination : null
      }
    }
  }
}
</script>

