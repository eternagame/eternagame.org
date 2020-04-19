<template>
  <EternaPage :title="$t('activity-feed:title')">
    <Gallery :sm="12" :md="12">
      <NewActivity />
      <ActivityCard />
      <ActivityCard />
      <ActivityCard />
      <ActivityCard />
      <ActivityCard />
      <ActivityCard />
      <ActivityCard />
      <ActivityCard />
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
  import { AxiosInstance } from 'axios';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import FiltersPanel, { Filter } from '@/components/Sidebar/FiltersPanel.vue';
  import DropdownSidebarPanel, { Option } from '@/components/Sidebar/DropdownSidebarPanel.vue';
  import PageDataMixin from '@/mixins/PageData';
  import TagsPanel from '@/components/Sidebar/TagsPanel.vue';
  import ActivityCard from './components/ActivityCard.vue';
  import NewActivity from './components/NewActivity.vue';

  async function fetchPageData(route: Route, http: AxiosInstance) {
    const { sort } = route.query;

    const res = null;
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
