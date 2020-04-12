<template>
  <EternaPage v-if="pageData" title="Terms And Conditions"> {{ pageData }}</EternaPage>
</template>

<script lang="ts">
  import { Component, Vue, Mixins } from 'vue-property-decorator';
  import PageDataMixin from '@/mixins/PageData';
  import { RouteCallback, Route } from 'vue-router';
  import { AxiosInstance } from 'axios';
  import LabViewData, { LabData } from './types';

  const TERMS_AND_CONDITIONS_NID = 15121;

  async function fetchPageData(route: Route, http: AxiosInstance) {
    return (await http.get(`/get/?type=projenewsct&nid=${TERMS_AND_CONDITIONS_NID}`)).data
      .data as LabViewData;
  }

  @Component({
    components: {},
  })
  export default class TermsAndConditions extends Mixins(PageDataMixin(fetchPageData)) {
    get loggedIn() {
      return this.$vxm.user.loggedIn; // TODO change
    }
  }
</script>

<style lang="scss" scoped>
  .page {
    margin-top: 120px;
  }
</style>
