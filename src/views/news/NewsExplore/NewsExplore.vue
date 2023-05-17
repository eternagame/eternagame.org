<template>
  <EternaPage :title="$t('news-explore:title')">
    <div v-if="fetchState.firstFetchComplete">
      <Paginator :loading="fetchState.pending" :total="total" :defaultIncrement="increment" @load="$fetch">
        <Gallery :sm="12" :md="12">
          <NewsCard v-for="article in newsItems" :key="article.nid" v-bind="article" />
        </Gallery>
      </Paginator>
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
  import CalendarPanel from '@/components/Sidebar/CalendarPanel.vue';
  import Preloader from '@/components/PageLayout/Preloader.vue';
  import { NewsItem, BlogItem, DateItem, NewsAndBlogResponse } from '@/types/common-types';
  import FetchMixin from '@/mixins/FetchMixin';
  import PaginationPanel from '@/components/Sidebar/PaginationPanel.vue';
  import Paginator, { PaginatorEvent } from '@/components/PageLayout/Paginator.vue';
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
      Preloader,
      PaginationPanel,
      Paginator
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

    async fetch(
      {mode, size, skip}: PaginatorEvent = {
        mode: 'replace',
        skip: +this.$route.query.skip || 0,
        size: +this.$route.query.size || this.increment
      }
    ) {
      const { end_date, start_date, search } = this.$route.query;

      const res = (
        await this.$http.get(ROUTE, {
          params: {
            from_created: start_date && new Date(start_date.toString().replace(/-/g, '/')).getTime() / 1000,
            to_created: end_date && (new Date(end_date.toString().replace(/-/g, '/')).getTime() / 1000),
            search,
            size,
            skip,
          },
        })
      ).data.data as NewsAndBlogResponse;

      if (mode === 'replace') this.newsItems = res.entries;
      else {
        const newNews = res.entries.filter(
          (newItem) => !this.newsItems.some((oldItem) => oldItem.nid === newItem.nid)
        );
        if (mode === 'append') this.newsItems.push(...newNews);
        if (mode === 'prepend') this.newsItems.unshift(...newNews);
      }
      this.total = res.count;
    }
  }
</script>
