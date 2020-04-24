<template>
  <EternaPage :title="$t('activity-feed:title')">
    <Gallery :sm="12" :md="12">
      <ActivityCard v-for="article in news" :key="article.nid" v-bind="article" />
    </Gallery>
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
  import ActivityCard from './components/ActivityCard.vue';
  import NewActivity from './components/NewActivity.vue';

  const INITIAL_NUMBER = 18;

  const NEWS_INCREMENT = 9;

  const ROUTE = '/get/?type=newslist';

  async function fetchPageData(route: Route, http: AxiosInstance) {
    const { sort } = route.query;
    const res = (
      await http.get(`${ROUTE}&size=${INITIAL_NUMBER}`, {
        params: {
          order: route.query.sort,
          filters: route.query.filters && (route.query.filters as string).split(','),
        },
      })
    ).data.data;
    console.log(res.newslist);
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
    },
  })
  export default class ActivityFeed extends Mixins(PageDataMixin(fetchPageData)) {
    private numFetched: number = INITIAL_NUMBER;

    private newsFetched = [];

    get news() {
      return this.newsFetched.length ? this.newsFetched : get(this.pageData, 'newslist', []);
    }

    mounted() {
      window.onscroll = () => {
        const bottomOfWindow = document.documentElement.scrollTop + window.innerHeight
          === document.documentElement.offsetHeight;
        if (bottomOfWindow) {
          this.numFetched += NEWS_INCREMENT;
          axios.get(`${ROUTE}&size=${this.numFetched}`).then(response => {
            this.newsFetched = response.data.data.newslist;
          });
        }
      };
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

    private tags: String[] = ['#Ribosome', '#XOR', '#MS2', '#tRNA', '#mRNA'];

    private options: Option[] = [
      { value: 'all', text: 'side-panel-options:all' },
      { value: 'announcements', text: 'side-panel-options:announcements' },
      { value: 'blogs', text: 'side-panel-options:blogs' },
      { value: 'labs', text: 'side-panel-options:labs' },
    ];
  }
</script>
