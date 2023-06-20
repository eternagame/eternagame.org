<template>
  <EternaPage :title="$t('nav-bar:collections')">
    <h3 :style="{ fontSize: '16px', fontWeight: 'bold' }">
      {{ $t('collections-view:top-tip') }}
    </h3>

    <QuestCarousel>
      <SwiperSlide v-for="item in quests" :key="item.title">
        <CollectionCard :key="item.title" :cleared="cleared" v-bind="item" />
      </SwiperSlide>
    </QuestCarousel>

    <h4
      :style="{
        fontSize: '16px',
        fontWeight: 'bold',
      }"
    >
      {{ $t('collections-view:section3') }}
    </h4>
    <Paginator :loading="fetchState.pending" :total="total" :defaultIncrement="increment" @load="$fetch">
      <Gallery setCur>
        <CollectionCard
          v-for="item in collections"
          :key="item.title"
          :cleared="cleared"
          v-bind="item"
        />
      </Gallery>
    </Paginator>

    <template #sidebar="{ isInSidebar }">
      <SearchPanel
        v-if="isInSidebar"
        :placeholder="$t('collections-view:search')"
        :isInSidebar="isInSidebar"
      />
      <FiltersPanel
        :filters="filters"
        paramName="filters"
        :isInSidebar="isInSidebar"
      />
      <!-- <TagsPanel
      :tags="['#Switch', '#Ribozyme', '#XOR', '#MS2', '#FMN', '#Telomerase']"
        :isInSidebar="isInSidebar"
      /> -->
      <DropdownSidebarPanel
        :options="options"
        paramName="sort"
        replace
        :isInSidebar="isInSidebar"
      />
      <PaginationPanel v-if="isInSidebar" :shownCount="collections.length" :totalCount="total" />
      <b-button
        type="submit"
        variant="primary"
        class="submit-button"
        to="/collections/create"
      >
        {{ $t('collections-view:create') }}
      </b-button>
    </template>
  </EternaPage>
</template>

<script lang="ts">
  import { BIconChevronRight, BIconChevronLeft } from 'bootstrap-vue';
  import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
  import { Component, Mixins } from 'vue-property-decorator';
  import TagsPanel from '@/components/Sidebar/TagsPanel.vue';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import FiltersPanel, { Filter } from '@/components/Sidebar/FiltersPanel.vue';
  import PuzzleCard from '@/components/Cards/PuzzleCard.vue';
  import CollectionCard from '@/components/Cards/CollectionCard.vue';
  import QuestCarousel from '@/views/collections/CollectionsExplore/QuestCarousel.vue';
  import DropdownSidebarPanel, {
    Option,
  } from '@/components/Sidebar/DropdownSidebarPanel.vue';
  import Preloader from '@/components/PageLayout/Preloader.vue';
  import SearchPanel from '@/components/Sidebar/SearchPanel.vue';
  import {
    CollectionItem,
    ClearedPuzzle,
    CollectionList,
  } from '@/types/common-types';
  import FetchMixin from '@/mixins/FetchMixin';
  import QuestActivity from '@/views/home/PlayerHome/components/activities/QuestActivity.vue';
  import TutorialActivity from '@/views/home/PlayerHome/components/activities/TutorialActivity.vue';
  import PaginationPanel from '@/components/Sidebar/PaginationPanel.vue';
  import Paginator, { PaginatorEvent } from '@/components/PageLayout/Paginator.vue';

  const INITIAL_SORT = 'date';

  interface CollectionExploreParams {
    collection_type: string;
    single: string;
    joined: string;
    sort: string;
    search: string;
    size: string | number;
    skip: string | number;
    uid: number | null;
    quest: boolean;
  }

  @Component({
    components: {
      EternaPage,
      TagsPanel,
      FiltersPanel,
      PuzzleCard,
      CollectionCard,
      Swiper,
      SwiperSlide,
      BIconChevronRight,
      BIconChevronLeft,
      QuestCarousel,
      Preloader,
      SearchPanel,
      QuestActivity,
      TutorialActivity,
      DropdownSidebarPanel,
      PaginationPanel,
      Paginator
    },
  })
  export default class CollectionsExplore extends Mixins(FetchMixin) {
    total = 0;

    increment = 18;

    collections: CollectionItem[] = [];

    quests: CollectionItem[] = [];

    cleared: ClearedPuzzle[] = [];

    async fetch(
      {mode, size, skip}: PaginatorEvent = {
        mode: 'replace',
        skip: +this.$route.query.skip || 0,
        size: +this.$route.query.size || this.increment
      }
    ) {
      const { filters, sort, search } = this.$route.query;
      const params = {
        sort: sort || INITIAL_SORT,
        quest: false,
        search,
        size,
        skip,
      } as CollectionExploreParams;

      const ROUTE: string = '/get/?type=collections';

      if (this.$vxm.user.loggedIn) params.uid = this.$vxm.user.uid;

      const res = await Promise.all([
        this.$http.get(ROUTE, { params }),
        this.$http.get('/get/?type=collections&quest=true&sort=title&size=30'),
        this.$http.get('/get/?type=puzzles'),
      ]);

      this.cleared = res[2].data.data?.cleared ?? [];

      const {collections, num_collections} = res[0].data.data as CollectionList;
      collections.forEach((c) => {
        c.progress = this.getProgress(c);
      });
      if (mode === 'replace') this.collections = collections;
      else {
        const newCollections = collections.filter(
          (newItem) => !this.collections.some((oldItem) => oldItem.nid === newItem.nid)
        );
        if (mode === 'append') this.collections.push(...newCollections);
        if (mode === 'prepend') this.collections.unshift(...newCollections);
      }

      this.total = +num_collections;

      switch (filters) {
      case 'cleared': {
        this.collections = this.collections.filter((c) => c.progress === 1);
        break;
      }
      case 'uncleared': {
        this.collections = this.collections.filter((c) => c.progress !== 1);
        break;
      }
      case 'inprogress': {
        this.collections = this.collections.filter(
          (c) => c.progress < 1 && c.progress > 0,
        );
        break;
      }
      case 'notstarted': {
        this.collections = this.collections.filter((c) => c.progress === 0);
        break;
      }
      default: {
        break;
      }
      }

      this.quests = (res[1].data.data.collections as CollectionItem[]).filter(q => q.achievement !== null);
      this.quests.forEach((c) => {
        c.progress = this.getProgress(c);
      });

      this.$vxm.user.refreshAchievements();
    }

    getProgress(c: CollectionItem) {
      const puzzleList = c.puzzles.replaceAll(' ', '').split(',');
      const cleared = this.cleared.filter((x) => puzzleList.includes(x.nid));
      return cleared.length / puzzleList.length;
    }

    get hasLabAccess() {
      return this.$vxm.user.hasLabAccess;
    }

    options: Option[] = [
      { value: 'date', text: 'side-panel-options:desc' },
      { value: 'title', text: 'side-panel-options:Alphabetical' },
    // { value: 'date_asc', text: 'side-panel-options:asc' },
    // { value: 'size', text: 'side-panel-options:size' },
    ];

    filters: Filter[] = [
      { value: 'cleared', text: 'Cleared' },
      { value: 'uncleared', text: 'Uncleared' },
      { value: 'inprogress', text: 'In Progress' },
      { value: 'notstarted', text: 'Not Started' },
    ];
  }
</script>
<style lang="scss" scoped>
:deep(.swiper-pagination-bullet-active) {
  background-color: white;
}
</style>
