<template>
  <div>
    <EternaPage> TBD</EternaPage>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';

  @Component({
    components: {
      EternaPage,
    },
  })
  export default class QuickHelp extends Vue {}
</script>
<style lang="scss" scoped></style>
