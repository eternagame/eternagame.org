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
      <ChooseView v-if="isInSidebar" />

      <!-- <DropdownSidebarPanel
        class="mt-3"
        :options="options"
        paramName="sort"
        replace
        :isInSidebar="isInSidebar"
      /> -->
      <CalendarPanel @page-update="monthFetch" :notableDates="calendarItems" :isInSidebar="isInSidebar"/>
      <p v-if="isInSidebar" class="ml-1 mt-0 d-inline-block custom-control-label no-before no-after">{{ total }} results</p><br>
      <button v-if="isInSidebar" class="btn btn-primary mt-1 ml-1" @click="refresh">Refresh</button>
      <!-- <TagsPanel :tags="tags" :isInSidebar="isInSidebar" /> -->
    </template>
    <template #mobileSearchbar>
      <SearchPanel :placeholder="$t('search:news')" :isInSidebar="false" />
    </template>
  </EternaPage>
</template>

<script lang="ts">
  import { Component, Mixins, Watch } from 'vue-property-decorator';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import FiltersPanel from '@/components/Sidebar/FiltersPanel.vue';
  import DropdownSidebarPanel, { Option } from '@/components/Sidebar/DropdownSidebarPanel.vue';
  import SearchPanel from '@/components/Sidebar/SearchPanel.vue';
  import TagsPanel from '@/components/Sidebar/TagsPanel.vue';
  import Pagination from '@/components/PageLayout/Pagination.vue';
  import CalendarPanel from '@/components/Sidebar/CalendarPanel.vue';
  import Preloader from '@/components/PageLayout/Preloader.vue';
  import { NewsItem, BlogItem, DateItem } from '@/types/common-types';
  import FetchMixin from '@/mixins/FetchMixin';
  import ChooseView from '@/components/Sidebar/ChooseView.vue';
  import { navigationModes } from '@/store/pagination.vuex';
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

    newsItems: (NewsItem|BlogItem)[] = [];

    calendarItems:{selectAttribute: { dot: string; dates: string; }[]} = {selectAttribute: []} ;

    async monthFetch(monthData: DateItem){

      const res = (
        await this.$http.get(ROUTE, {
          params: {
            size: INITIAL_NUMBER,
            from_created: new Date(monthData.year, monthData.month - 1, 1).getTime() / 1000,
            to_created: new Date(monthData.year, monthData.month, 1).getTime() / 1000,
          }
        })
      ).data.data.entries as NewsItem[];

      // Timezone in UTC, calendar dates parsing is incorrect

      this.calendarItems.selectAttribute = res.map((element) =>({
        dot: 'blue',
        dates: new Date(Number(element.timestamp) * 1000).toLocaleString('en-US', {timeZone: 'UTC'}),
      }));
    }

    async fetch(refresh = false) {
      const { end_date, start_date, size, search, skip } = this.$route.query;

      const params = {
        search,
        size: size || INITIAL_NUMBER,
        from_created: start_date && new Date(start_date.toString().replace(/-/g, '/')).getTime() / 1000,
        to_created: end_date && (new Date(end_date.toString().replace(/-/g, '/')).getTime() / 1000),
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

    loading = true;

    total = 0;

    get displayedNewsItems() {
      if (this.pagesEnabled) {
        const start = (this.currentPage - 1) * 18;
        return this.newsItems.slice(start, start + 18);
      }
      return this.newsItems;
    }

    get filteredNewsItems() {
      // TODO https://github.com/eternagame/eternagame.org/issues/157 move filtering to backend
      const { sort } = this.$route.query;

      switch (sort) {
      case 'news':
      case 'blogs':
        return this.displayedNewsItems.filter(entry => entry.type === sort);
      default:
        return this.displayedNewsItems;
      }
    }

    created() {
      this.refresh();
    }
  }
</script>

<style scoped>
.no-before::before, .no-after::after {
  content: none !important;
}
</style>
