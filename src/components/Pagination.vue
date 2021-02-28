<template>
  <nav class="pagination">
    <ul class="pagination__list"
        @click='clickHandler'
    >
      <li class="pagination__item"
          v-for="(item, idx) in cntButtons"
          :key="idx"
          :class="{active: +item === +getCurrentButton}"
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
  props: ['limitViewButtons', 'perPage', 'currentPagePagination', 'totalCountItems'],
  data() {
    return {
      currentButton: null,
      limitButtons: this.limitViewButtons
    }
  },
  methods: {
    clickHandler(e) {
      const target = e.target
      const page = this.currentButton = target.dataset.page

      if (target.dataset.page) {
        this.$emit('clickPaginationHandler', page)
      }
    }
  },
  computed: {
    cntButtons() {
      const configPagination = {
        LIMIT_VIEW_BUTTONS: this.limitButtons,
        TOTAL_ITEMS: this.totalCountItems,
        PER_PAGE_ITEMS: this.perPage,
        EQUATOR: Math.ceil(this.limitButtons / 2 ),
        OFFSET_PAGINATION: Math.ceil(this.limitButtons / 2 )
      }

      const currentButton = +this.currentButton
      const cntButtons = Math.ceil( configPagination.TOTAL_ITEMS / configPagination.PER_PAGE_ITEMS)
      const cntViewButtons = cntButtons > configPagination.LIMIT_VIEW_BUTTONS
          ? configPagination.LIMIT_VIEW_BUTTONS
          : cntButtons

      let showButtonsPagination = new Array( cntViewButtons )
        .fill(1)
        .map((el, idx) => {
          const indexPage = idx + 1
          const nextButtons = currentButton + idx
          const singleButton = 1
          const deltaButtons = configPagination.OFFSET_PAGINATION - singleButton

          if( cntViewButtons >= configPagination.LIMIT_VIEW_BUTTONS &&  cntButtons - currentButton <= deltaButtons ) {
            return cntButtons - configPagination.LIMIT_VIEW_BUTTONS + indexPage
          }

          if ( currentButton > configPagination.EQUATOR ) {
            return nextButtons - deltaButtons
          }
          return indexPage
        })

      if (cntButtons === 1) {
        return 0
      } else {
        return cntButtons ? showButtonsPagination : null
      }
    },
    getCurrentButton() {
      this.currentButton = this.currentPagePagination
      return this.currentPagePagination
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