<template>
  <EternaPage :title="$t('pubs:title')" v-if="pageData">
    <div v-if="pageData">
      <p class="overview-text">
        {{ $t('pubs:overview') }}
      </p>

      <h2>{{ $t('pubs:player-title') }}</h2>
      <Gallery :sm="12" :md="12">
        <PubsCard v-for="pub in pageData.playerpubslist" :key="pub.link" v-bind="pub" />
      </Gallery>

      <h2>{{ $t('pubs:researcher-title') }}</h2>
      <Gallery :sm="12" :md="12">
        <PubsCard v-for="pub in pageData.researcherpubslist" :key="pub.link" v-bind="pub" />
      </Gallery>
    </div>
    <div v-else>
      <h1>{{ $t('loading-text') }}</h1>
    </div>

    <template #sidebar="{ isInSidebar }">
      <SearchPanel
        v-if="isInSidebar"
        :placeholder="$t('search:publications')"
        :isInSidebar="isInSidebar"
      />
      <DropdownSidebarPanel
        :options="options"
        paramName="sort"
        replace
        :isInSidebar="isInSidebar"
      />
    </template>
    <template #mobileSearchbar>
      <SearchPanel :placeholder="$t('search:publications')" :isInSidebar="false" />
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
  import SearchPanel from '@/components/Sidebar/SearchPanel.vue';
  // @ts-ignore
  import get from 'lodash.get';
  import PubsCard from './PubsCard.vue';

  const ROUTE = '/get/?type=pubslist';

  async function fetchPageData(route: Route, http: AxiosInstance) {
    const res = (
      await http.get(ROUTE, {
        params: {
          search: route.query.search,
        },
      })
    ).data.data;
    return res;
  }

  @Component({
    components: {
      Pagination,
      EternaPage,
      PubsCard,
      DropdownSidebarPanel,
      SearchPanel,
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
