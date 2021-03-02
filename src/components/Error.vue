<template>
  <p class="error__paragraph" >
      {{ generationMessageError }}
  </p>
</template>

<script>

export default {
  name: 'Errors',
  props: ['error'],
  data() {
    return {
      errorMessage: ''
    }
  },
  mounted() {
    this.errorMessage = this.error
  },
  computed: {
    generationMessageError() {
      switch (this.errorMessage) {
        case 'Request failed with status code 403':
          return 'ERROR Превышен лимит запросов к api GitHub'
        case 'Request failed with status code 401':
            return 'Token не актуальный. Обновите его в - src/helpers/token/index.js'
      }
    }
  }
}

</script>

<style lang="sass">

.error__paragraph
  color: $default-color
  text-align: center

</style>