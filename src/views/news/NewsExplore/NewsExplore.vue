<template>
  <EternaPage :title="$t('news-explore:title')">
    <div v-if="fetchState.firstFetchComplete">
      <Gallery :sm="12" :md="12">
        <NewsCard v-for="article in newsItems" :key="article.nid" v-bind="article" />
      </Gallery>
      <Pagination :total="total" :increment="increment" :loading="fetchState.pending" />
    </div>
    <div v-else>
      <Preloader />
    </div>

    <template #sidebar="{ isInSidebar }">
      <SearchPanel v-if="isInSidebar" :placeholder="$t('search:news')" :isInSidebar="isInSidebar" />
      <!-- <DropdownSidebarPanel
        :options="options"
        paramName="sort"
        replace
        :isInSidebar="isInSidebar"
      /> -->
      <CalendarPanel @page-update="monthFetch" :notableDates="calendarItems" :isInSidebar="isInSidebar"/>
      <!-- <TagsPanel :tags="tags" :isInSidebar="isInSidebar" /> -->
      <PaginationPanel v-if="isInSidebar" :shownCount="newsItems.length" :totalCount="total" />
    </template>
    <template #mobileSearchbar>
      <SearchPanel :placeholder="$t('search:news')" :isInSidebar="false" />
    </template>
  </EternaPage>
</template>

<script lang="ts">
  import { Component, Mixins } from 'vue-property-decorator';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import FiltersPanel from '@/components/Sidebar/FiltersPanel.vue';
  import SearchPanel from '@/components/Sidebar/SearchPanel.vue';
  import TagsPanel from '@/components/Sidebar/TagsPanel.vue';
  import Pagination from '@/components/PageLayout/Pagination.vue';
  import CalendarPanel from '@/components/Sidebar/CalendarPanel.vue';
  import Preloader from '@/components/PageLayout/Preloader.vue';
  import { NewsItem, BlogItem, DateItem, NewsAndBlogResponse } from '@/types/common-types';
  import FetchMixin from '@/mixins/FetchMixin';
  import { navigationModes } from '@/store/pagination.vuex';
  import PaginationPanel from '@/components/Sidebar/PaginationPanel.vue';
  import NewsCard from './components/NewsCard.vue';

  const ROUTE = '/get/?type=newsandblogslist';

  @Component({
    components: {
      EternaPage,
      FiltersPanel,
      CalendarPanel,
      SearchPanel,
      TagsPanel,
      NewsCard,
      Pagination,
      Preloader,
      PaginationPanel
    },
  })
  export default class NewsExplore extends Mixins(FetchMixin) {
    increment = 18;

    total = 0;

    private tags: string[] = ['#Ribosome', '#XOR', '#MS2', '#tRNA', '#mRNA'];

    newsItems: (NewsItem|BlogItem)[] = [];

    calendarItems:{selectAttribute: { dot: string; dates: string; }[]} = {selectAttribute: []} ;

    async monthFetch(monthData: DateItem){

      const res = (
        await this.$http.get(ROUTE, {
          params: {
            size: this.increment,
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

    async fetch() {
      const { end_date, start_date, size, skip, search } = this.$route.query;

      const res = (
        await this.$http.get(ROUTE, {
          params: {
            search,
            size: size || this.increment,
            skip: skip || 0,
            from_created: start_date && new Date(start_date.toString().replace(/-/g, '/')).getTime() / 1000,
            to_created: end_date && (new Date(end_date.toString().replace(/-/g, '/')).getTime() / 1000),
          },
        })
      ).data.data as NewsAndBlogResponse;

      if (this.$vxm.pagination.navigation === navigationModes.NAVIGATION_SCROLL && skip) {
        res.entries.forEach((newItem) => {
          if (!this.newsItems.some((item) => item.nid === newItem.nid)) {
            this.newsItems.push(newItem);
          }
        });
      } else {
        this.newsItems = res.entries;
      }
      this.total = res.count;
    }
  }
</script>
