<template>
  <EternaPage :title="$t('news-explore:title')" v-if="pageData">
    <Gallery :sm="12" :md="12">
      <NewsCard
        v-for="article in pageData.combinelist"
        :key="article.nid"
        :text="article.body"
        :heading="article.title"
      />
    </Gallery>
    <template #sidebar="{ isInSidebar }">
      <DropdownSidebarPanel
        :options="options"
        paramName="sort"
        replace
        :isInSidebar="isInSidebar"
      />
      <CalendarPanel :isInSidebar="isInSidebar" />
      <TagsPanel :tags="tags" :isInSidebar="isInSidebar" />
    </template>
  </EternaPage>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Mixins } from 'vue-property-decorator';
  import { RouteCallback, Route } from 'vue-router';
  import { AxiosInstance } from 'axios';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import FiltersPanel, { Filter } from '@/components/Sidebar/FiltersPanel.vue';
  import DropdownSidebarPanel, { Option } from '@/components/Sidebar/DropdownSidebarPanel.vue';
  import PageDataMixin from '@/mixins/PageData';
  import TagsPanel from '@/components/Sidebar/TagsPanel.vue';
  import CalendarPanel from '@/components/Sidebar/CalendarPanel.vue';
  import get from 'lodash.get';
  import NewsCard from './components/NewsCard.vue';

  async function fetchPageData(route: Route, http: AxiosInstance) {
    const { sort } = route.query;
    const news = (
      await http.get('/get/?type=newslist&size=18&skip=0', {
        params: {
          order: route.query.sort,
          filters: route.query.filters && (route.query.filters as string).split(','),
        },
      })
    ).data.data;

    const blogs = (
      await http.get('/get/?type=blogslist&size=18&skip=0', {
        params: {
          order: route.query.sort,
          filters: route.query.filters && (route.query.filters as string).split(','),
        },
      })
    ).data.data;
    const res = {
      ...news,
      ...blogs,
      combinelist: [...get(news, 'newslist', []), ...get(blogs, 'blogslist', [])],
    };
    console.log(res);

    return res;
  }

  @Component({
    components: {
      EternaPage,
      FiltersPanel,
      CalendarPanel,
      DropdownSidebarPanel,
      TagsPanel,
      NewsCard,
    },
  })
  export default class NewsExplore extends Mixins(PageDataMixin(fetchPageData)) {
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
      { value: 'all', text: 'All Categories' },
      { value: 'announcements', text: 'Announcements' },
      { value: 'blogs', text: 'Blogs' },
      { value: 'labs', text: 'Labs' },
    ];
  }
</script>
