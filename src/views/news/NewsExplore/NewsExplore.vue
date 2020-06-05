<template>
  <EternaPage :title="$t('news-explore:title')">
    <div v-if="fetchState.firstFetchComplete">
      <Gallery :sm="12" :md="12">
        <NewsCard v-for="article in newsItems" :key="article.nid" v-bind="article" />
      </Gallery>
      <Pagination :key="newsItems.length" />
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
  import TagsPanel from '@/components/Sidebar/TagsPanel.vue';
  import Pagination from '@/components/PageLayout/Pagination.vue';
  import CalendarPanel from '@/components/Sidebar/CalendarPanel.vue';
  import Preloader from '@/components/PageLayout/Preloader.vue';
  import { NewsItem, BlogItem } from '@/types/common-types';
  import FetchMixin from '@/mixins/FetchMixin';
  import NewsCard from './components/NewsCard.vue';

  const INITIAL_NUMBER = 18;

  const ROUTE = '/get/?type=newsandblogslist';

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
  export default class NewsExplore extends Mixins(FetchMixin) {
    private tags: string[] = ['#Ribosome', '#XOR', '#MS2', '#tRNA', '#mRNA'];

    private options: Option[] = [
      { value: 'all', text: 'side-panel-options:all' },
      { value: 'news', text: 'side-panel-options:announcements' },
      { value: 'blogs', text: 'side-panel-options:blogs' },
    ];

    private newsItems: (NewsItem|BlogItem)[] = [];

    async fetch() {
      const { sort, end_date, start_date, size, search } = this.$route.query;

      const res = (
        await this.$http.get(ROUTE, {
          params: {
            search,
            size: size || INITIAL_NUMBER,
            from_created: start_date && new Date(start_date as string).getTime() / 1000,
            to_created: end_date && new Date(end_date as string).getTime() / 1000,
          },
        })
      ).data.data.entries as NewsItem[];
      // TODO https://github.com/eternagame/eternagame.org/issues/157 move filtering to backend
      switch (sort) {
        case 'news':
        case 'blogs':
          this.newsItems = res.filter(entry => entry.type === sort);
          break;
        default:
          this.newsItems = res;
      }
    }
  }
</script>
