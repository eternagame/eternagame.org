<template>
  <EternaPage :title="$t('news-explore:title')" v-if="pageData">
    <div v-if="pageData">
      <Gallery :sm="12" :md="12">
        <NewsCard v-for="article in pageData.entries" :key="article.nid" v-bind="article" />
      </Gallery>
      <Pagination :key="pageData.entries.length" />
    </div>
    <div v-else>
      <Preloader />
    </div>

    <template #sidebar="{ isInSidebar }">
      <SearchPanel v-if="isInSidebar" :placeholder="$t('search:news')" :isInSidebar="isInSidebar" />
      <DropdownSidebarPanel
        :options="options"
        paramName="sort"
        replace
        :isInSidebar="isInSidebar"
      />
      <CalendarPanel :isInSidebar="isInSidebar" />
      <!-- <TagsPanel :tags="tags" :isInSidebar="isInSidebar" /> -->
    </template>
    <template #mobileSearchbar>
      <SearchPanel :placeholder="$t('search:news')" :isInSidebar="false" />
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
  import SearchPanel from '@/components/Sidebar/SearchPanel.vue';
  import PageDataMixin from '@/mixins/PageData';
  import TagsPanel from '@/components/Sidebar/TagsPanel.vue';
  import Pagination from '@/components/PageLayout/Pagination.vue';
  import CalendarPanel from '@/components/Sidebar/CalendarPanel.vue';
  // @ts-ignore
  import get from 'lodash.get';
  import Preloader from '@/components/PageLayout/Preloader.vue';
  import NewsCard from './components/NewsCard.vue';

  const INITIAL_NUMBER = 18;

  const ROUTE = '/get/?type=newsandblogslist';

  async function fetchPageData(route: Route, http: AxiosInstance) {
    const { sort, to_created, from_created, size, search } = route.query;
    const res = (
      await http.get(ROUTE, {
        params: {
          order: sort,
          search,
          size: size || INITIAL_NUMBER,
          from_created,
          to_created,
        },
      })
    ).data.data;
    return res;
  }

  @Component({
    components: {
      EternaPage,
      FiltersPanel,
      CalendarPanel,
      DropdownSidebarPanel,
      SearchPanel,
      TagsPanel,
      NewsCard,
      Pagination,
      Preloader,
    },
  })
  export default class NewsExplore extends Mixins(PageDataMixin(fetchPageData)) {
    private tags: string[] = ['#Ribosome', '#XOR', '#MS2', '#tRNA', '#mRNA'];

    private options: Option[] = [
      { value: 'all', text: 'side-panel-options:all' },
      { value: 'announcements', text: 'side-panel-options:announcements' },
      { value: 'blogs', text: 'side-panel-options:blogs' },
      { value: 'labs', text: 'side-panel-options:labs' },
    ];
  }
</script>
