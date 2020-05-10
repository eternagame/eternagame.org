<template>
  <EternaPage :title="$t('activity-feed:title')">
    <div v-if="pageData">
      <Gallery>
        <Gallery :sm="12" :md="12">
          <ActivityCard v-for="article in news" :key="article.nid" v-bind="article" />
        </Gallery>
        <Pagination :key="news.length" />
      </Gallery>
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
      <TagsPanel :tags="tags" :isInSidebar="isInSidebar" />
    </template>
  </EternaPage>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Mixins } from 'vue-property-decorator';
  import { RouteCallback, Route } from 'vue-router';
  import axios, { AxiosInstance } from 'axios';
  // @ts-ignore
  import get from 'lodash.get';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import FiltersPanel, { Filter } from '@/components/Sidebar/FiltersPanel.vue';
  import DropdownSidebarPanel, { Option } from '@/components/Sidebar/DropdownSidebarPanel.vue';
  import PageDataMixin from '@/mixins/PageData';
  import TagsPanel from '@/components/Sidebar/TagsPanel.vue';
  import Pagination from '@/components/PageLayout/Pagination.vue';
  import ActivityCard from './components/ActivityCard.vue';
  import NewActivity from './components/NewActivity.vue';

  const INITIAL_NUMBER = 18;

  const ROUTE = '/get/?type=newslist';

  async function fetchPageData(route: Route, http: AxiosInstance) {
    const { sort } = route.query;
    const res = (
      await http.get(`${ROUTE}&size=${INITIAL_NUMBER}`, {
        params: {
          order: route.query.sort,
          filters: route.query.filters && (route.query.filters as string).split(','),
          size: route.query.size || INITIAL_NUMBER,
        },
      })
    ).data.data;
    return res;
  }
  @Component({
    components: {
      EternaPage,
      FiltersPanel,
      DropdownSidebarPanel,
      TagsPanel,
      ActivityCard,
      NewActivity,
      Pagination,
    },
  })
  export default class ActivityFeed extends Mixins(PageDataMixin(fetchPageData)) {
    get news() {
      return get(this.pageData, 'newslist', []);
    }

    private filters: Filter[] = [
      { value: 'single', text: 'Single State' },
      { value: '2-state', text: '2-state switch' },
      { value: '3-state', text: '3-state switch' },
      { value: '4-state', text: '4-state switch' },
      { value: 'vienna', text: 'Vienna' },
      { value: 'rnassd', text: 'RNAssd' },
      { value: 'inforna', text: 'Inforna' },
      { value: 'notcleared', text: 'Uncleared' },
    ];

    private tags: string[] = ['#Ribosome', '#XOR', '#MS2', '#tRNA', '#mRNA'];

    private options: Option[] = [
      { value: 'all', text: 'side-panel-options:all' },
      { value: 'announcements', text: 'side-panel-options:announcements' },
      { value: 'blogs', text: 'side-panel-options:blogs' },
      { value: 'labs', text: 'side-panel-options:labs' },
    ];
  }
</script>
