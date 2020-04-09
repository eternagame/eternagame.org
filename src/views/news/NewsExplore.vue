<template>
  <EternaPage title="News">
    <Gallery :sm="12" :md="12">
      <NewsCard />
      <NewsCard />
      <NewsCard />
      <NewsCard />
      <NewsCard />
      <NewsCard />
      <NewsCard />
      <NewsCard />
      <NewsCard />
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
  import SidebarPanel from '@/components/Sidebar/SidebarPanel.vue';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import FiltersPanel, { Filter } from '@/components/Sidebar/FiltersPanel.vue';
  import DropdownSidebarPanel, { Option } from '@/components/Sidebar/DropdownSidebarPanel.vue';
  import PageDataMixin from '@/mixins/PageData';
  import TagsPanel from '@/components/Sidebar/TagsPanel.vue';
  import CalendarPanel from '@/components/Sidebar/CalendarPanel.vue';
  import NewsCard from './components/NewsCard.vue';

  async function fetchPageData(route: Route, http: AxiosInstance) {
    const { sort } = route.query;

    const res = null;
    return res;
  }

  @Component({
    components: {
      SidebarPanel,
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
