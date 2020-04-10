<template>
  <EternaPage v-if="pageData" title="Terms And Conditions"> </EternaPage>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component({
    components: {},
  })
  export default class TermsAndConditions extends Vue {
    get loggedIn() {
      return this.$store.state.userStore.loggedIn; // TODO change
    }
  }
</script>

<style lang="scss" scoped>
  .page {
    margin-top: 120px;
  }
</style>
