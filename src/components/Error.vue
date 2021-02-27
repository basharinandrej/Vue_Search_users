<template>
  <p class="error__paragraph" >
      {{ this.errorMessage }}
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

    this.generationMessageError()
  },
  methods: {
    generationMessageError() {
      this.errorMessage === 'Request failed with status code 403'
        ? this.errorMessage = 'ERROR Превышен лимит запросов к api GitHub'
        : null
    }
  }
}

</script>

<style lang="sass">

.error__paragraph
  color: $default-color
  text-align: center

</style>