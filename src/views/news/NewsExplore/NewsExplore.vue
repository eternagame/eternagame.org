<template>
  <EternaPage :title="$t('news-explore:title')">
    <div v-if="fetchState.firstFetchComplete">
      <Gallery :sm="12" :md="12">
        <NewsCard v-for="article in filteredNewsItems" :key="article.nid" v-bind="article" />
      </Gallery>
    </div>
    <div v-else>
      <Preloader />
    </div>
      <Pagination
        :key="newsItems.length"
        @page="currentPage = $event"
        :total="total + 18"
        :loading="loading"
        @loading="loading = $event"
      />

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

      <ChooseView v-if="isInSidebar" />
      <span v-if="isInSidebar" class="ml-1 mt-2 d-inline-block custom-control-label no-before no-after">{{ total }} results </span><br>
      <button v-if="isInSidebar" class="btn btn-primary mt-1" @click="refresh">Refresh</button>
    </template>
    <template #mobileSearchbar>
      <SearchPanel :placeholder="$t('search:news')" :isInSidebar="false" />
    </template>
  </EternaPage>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Mixins, Watch } from 'vue-property-decorator';
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
  import ChooseView from '@/components/Sidebar/ChooseView.vue';
  import { navigationModes } from '@/store/pagination.vuex';
  import NewsCard from './components/NewsCard.vue';

  const INITIAL_NUMBER = 18;
  const INCREMENT = INITIAL_NUMBER;

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
      ChooseView,
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

    async fetch (refresh = false) {
      const { sort, end_date, start_date, size, search , skip} = this.$route.query;

      const params = {
        search,
        size: size || INITIAL_NUMBER,
        from_created: start_date && new Date(start_date as string).getTime() / 1000,
        to_created: end_date && new Date(end_date as string).getTime() / 1000,
        skip
      };

      if (refresh) {
        params.size = (parseInt(params.size as string, 10) + parseInt(params.skip! as string, 10)).toString();
        params.skip = '0';
      }

      const res = (
        await this.$http.get(ROUTE, {
          params,
        })
      ).data.data.entries as NewsItem[];

      const skipped = parseInt(params.skip as string, 10);
      const puzzlesLoaded = parseInt(params.size as string, 10);
      // Ensure splice places items where they should go by making the array larger
      while (this.newsItems.length < skipped && this.pagesEnabled) {
        this.newsItems.push({
          created: new Date().toLocaleDateString(),
          body: 'Loading...',
          title: 'Loading...',
          nid: '0'
        } as NewsItem);
      }
      // Replace the old puzzles the new ones
      this.newsItems.splice(skipped, puzzlesLoaded, ...res);
      // Remove duplicates, in case a new puzzles was added
      this.newsItems = [...new Set(this.newsItems)];
      this.loading = false;
      this.total = this.newsItems.length;
    }

    get pagesEnabled() {
      return this.$vxm.pagination.navigation === navigationModes.NAVIGATION_PAGES;
    }

    @Watch('pagesEnabled')
    async refresh() {
      this.$route.query.skip = this.newsItems.length.toString();
      await this.fetch(true);
    }

    currentPage: number = 1;

    loading = false;

    total = 0;

    get displayedNewsItems() {
      if (this.pagesEnabled) {
        const start = (this.currentPage - 1) * 18;
        return this.newsItems.slice(start, start + 18);
      }
      return this.newsItems;
    }

    get filteredNewsItems() {
      const { sort } = this.$route.query;
      switch (sort) {
        case 'news':
        case 'blogs':
          return this.displayedNewsItems.filter(entry => entry.type === sort);
        default:
          return this.displayedNewsItems;
      }
    }
  }
</script>

<style scoped>
.no-before::before, .no-after::after {
  content: none !important;
}
</style>