<template>
  <EternaPage title="Not Found">
    <div class="page">
      Could not find this page sorry, please go back
    </div>
  </EternaPage>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component({
    components: {},
  })
  export default class CodeOfConduct extends Vue {}
</script>

<style lang="scss" scoped>
  .page {
    margin-top: 120px;
    padding: 20px;
  }
</style>
