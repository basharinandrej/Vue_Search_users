<template>
  <nav class="pagination">
    <ul class="pagination__list"
        @click="clickHandler"
    >
      <li class="pagination__item"
          v-for="(item, idx) in cntPages"
          :key="idx"
          :class="{active: +item === +getCurrentPage}"
      >
        <p class="pagination__paragraph"
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
      currentPage: null,
      limitPages: this.$store.state.pages.limitPagePagination
    }
  },
  methods: {
    clickHandler(e) {
      const target = e.target
      const page = this.currentPage = target.dataset.page

      if (target.dataset.page) {
        this.$store.commit('updateCurrentPage', page)
        this.updateFetchUsers()
      }
    },
    async updateFetchUsers() {
      await this.$store.dispatch('fetchUsers')
    }
  },
  computed: {
    cntPages() {
      const configPagination = {
        LIMIT_PAGES: this.limitPages,
        PER_PAGE: this.$store.state.users.perPage,
        EQUATOR: Math.round(this.limitPages / 2 ),
        TOTAL_COUNT: this.$store.state.users.total_count,
        OFFSET_PAGINATION: Math.round(this.limitPages / 2 ) - 1
      }
      const cntPages = Math.round( configPagination.TOTAL_COUNT / configPagination.PER_PAGE)
      const currentPage = +this.currentPage
      const pagination = cntPages > configPagination.LIMIT_PAGES
          ? configPagination.LIMIT_PAGES
          : cntPages

      let showPagesPagination = new Array( pagination )
        .fill(1)
        .map((el, idx) => {
          const indexPage = idx + 1
          const stepPagination = currentPage + idx
          const deltaPage = stepPagination - configPagination.OFFSET_PAGINATION

          if ( currentPage > configPagination.EQUATOR
              && cntPages > configPagination.LIMIT_PAGES ) {
            return deltaPage
          }
          return indexPage === currentPage ? currentPage : indexPage
        })

      if (cntPages === 1) {
        return 0
      } else {
        return cntPages ? showPagesPagination : null
      }
    },
    getCurrentPage() {
      this.currentPage = this.$store.state.users.currentPage
      return this.$store.state.users.currentPage
    }
  }
}
</script>

<style lang="sass">
  .pagination
    display: flex
    justify-content: center

    &__list
      display: flex

    &__item
      background: $default-color
      list-style: none
      cursor: pointer
      margin-right: 12px
      border-radius: 4px

    &__paragraph
      padding: 8px 12px

    &__item.active
      background: $color_3
</style>