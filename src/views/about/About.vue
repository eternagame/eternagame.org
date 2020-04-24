<template>
  <div>
    <EternaPage
      :title="$t('about:title')"
      header_title="TERMS & CONDITIONS"
      header_date="Last updated: Sept 9, 2018"
    >
      <div class="page-content">
        <h3>TBD</h3>
      </div>
    </EternaPage>
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
  export default class TermsAndConditions extends Vue {}
</script>
<style lang="scss" scoped>
  h3,
  p {
    font-size: 8.4px;
    font-weight: normal;
    line-height: 1.36;
  }

  h3 {
    font-weight: bold;
  }
  h2 {
    font-size: 160.8px;
    font-weight: bold;
  }
</style>
