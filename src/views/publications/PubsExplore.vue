<template>
  <EternaPage title="Eterna Publications%" v-if="pageData">
    <div v-if="pageData">
      <p class="overview-text">
        Over 60,000 Eterna players have contributed to scientific publications, including several
        players as lead authors. Have a new paper idea? Want to help us edit upcoming player papers?
        Please contact Omei. The Eterna project has lead to the publication of 25 papers.%
      </p>

      <h2>Player Publications%</h2>
      <Gallery :sm="12" :md="12">
        <PubsCard v-for="pub in pageData.playerpubslist" :key="pub.link" v-bind="pub" />
      </Gallery>
      <Pagination />

      <h2>Researcher Publications%</h2>
      <Gallery :sm="12" :md="12">
        <PubsCard v-for="pub in pageData.researcherpubslist" :key="pub.link" v-bind="pub" />
      </Gallery>
      <Pagination />
    </div>
    <div v-else>
      <h1>{{ $t('loading-text') }}</h1>
    </div>

    <template #sidebar="{ isInSidebar }">
      <DropdownSidebarPanel
        :options="options"
        paramName="sort"
        replace
        :isInSidebar="isInSidebar"
      />
    </template>
  </EternaPage>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Mixins } from 'vue-property-decorator';
  import { RouteCallback, Route } from 'vue-router';
  import { AxiosInstance } from 'axios';
  import DropdownSidebarPanel, { Option } from '@/components/Sidebar/DropdownSidebarPanel.vue';
  import PageDataMixin from '@/mixins/PageData';
  import Pagination from '@/components/PageLayout/Pagination.vue';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  // @ts-ignore
  import get from 'lodash.get';
  import PubsCard from './PubsCard.vue';

  const ROUTE = '/get/?type=pubslist';

  async function fetchPageData(route: Route, http: AxiosInstance) {
    const res = (await http.get(ROUTE)).data.data;
    return res;
  }

  @Component({
    components: {
      Pagination,
      EternaPage,
      PubsCard,
      DropdownSidebarPanel,
    },
  })
  export default class NewsExplore extends Mixins(PageDataMixin(fetchPageData)) {
    private options: Option[] = [{ value: 'all', text: 'side-panel-options:all' }];
  }
</script>

<style scoped lang="scss">
  .overview-text {
    margin: 0.4rem 2rem;
    font-size: 1.1rem;
    font-style: italic;
  }

  h2 {
    line-height: 4rem;
    font-size: 2rem;
    font-weight: bold;
  }
</style>
