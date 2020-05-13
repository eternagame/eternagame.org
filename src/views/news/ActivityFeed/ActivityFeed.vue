<template>
  <EternaPage :title="$t('activity-feed:title')">
    <div v-if="pageData">
      <Gallery :sm="12" :md="12">
        <ActivityCard v-for="article in news" :key="article.nid" v-bind="article" />
      </Gallery>
      <Pagination :key="news.length" />
    </div>
    <div v-else>
      <Preloader/>
    </div>
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
  import Preloader from '@/components/PageLayout/Preloader.vue';
  import ActivityCard from './components/ActivityCard.vue';

  const INITIAL_NUMBER = 18;

  const ROUTE = '/get/?type=newsfeed&combined=true&filter=all';

  async function fetchPageData(route: Route, http: AxiosInstance) {
    const { sort } = route.query;
    const res = (
      await http.get(`${ROUTE}&size=${INITIAL_NUMBER}`, {
        params: {
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
      Pagination,
      Preloader,
    },
  })
  export default class ActivityFeed extends Mixins(PageDataMixin(fetchPageData)) {
    get news() {
      return get(this.pageData, 'entries', []);
    }
  }
</script>
