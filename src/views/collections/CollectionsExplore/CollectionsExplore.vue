<template>
  <EternaPage>
    <div v-if="true">
      <h3 :style="{ fontSize: '16px', fontWeight: 'bold' }">
        {{ $t('collections-view:top-tip') }}
      </h3>

        <QuestCarousel :slideTo="slideTo">
          <SwiperSlide v-for="item in quests" :key="item.name">
            <CollectionCard :key="item.name" :cleared="cleared" v-bind="item" />
          </SwiperSlide>
        </QuestCarousel>

      <h4
        :style="{
          fontSize: '16px',
          fontWeight: 'bold',
          textTransform: 'uppercase',
        }"
      >
        {{ $t('collections-view:section3') }}
      </h4>
      <div v-if="fetchState.firstFetchComplete">
        <Gallery>
          <CollectionCard
            v-for="item in collections"
            :key="item.name"
            :cleared="cleared"
            v-bind="item"
          />
        </Gallery>
        <Pagination :key="fetch.length" />
      </div>
    </div>
    <div v-else>
      <Preloader />
    </div>

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
  import { Component, Mixins, Vue } from 'vue-property-decorator';
  import TagsPanel from '@/components/Sidebar/TagsPanel.vue';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import FiltersPanel, { Filter } from '@/components/Sidebar/FiltersPanel.vue';
  import PuzzleCard from '@/components/Cards/PuzzleCard.vue';
  import CollectionCard from '@/components/Cards/CollectionCard.vue';
  import Pagination from '@/components/PageLayout/Pagination.vue';
  import QuestCarousel from '@/views/collections/CollectionsExplore/QuestCarousel.vue';
  import Preloader from '@/components/PageLayout/Preloader.vue';
  import SearchPanel from '@/components/Sidebar/SearchPanel.vue';
  import {
    CreatedCollection,
    CollectionItem,
    CollectionList,
    RoadmapAchievement,
    ProcessedRoadmapAchievement,
    PuzzleItem,
  } from '@/types/common-types';
  import FetchMixin from '@/mixins/FetchMixin';
  import QuestActivity from '@/views/home/PlayerHome/components/activities/QuestActivity.vue';
  import TutorialActivity from '@/views/home/PlayerHome/components/activities/TutorialActivity.vue';

  const INITIAL_SORT = 'date';
  const INITIAL_NUMBER = 18;

  interface CollectionExploreParams {
    collection_type: string;
    single: string;
    joined: string;
    sort: string;
    search: string;
    size: string;
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
      Pagination,
      Preloader,
      SearchPanel,
      QuestActivity,
      TutorialActivity,
    },
  })
  export default class CollectionsExplore extends Mixins(FetchMixin) {
    collections: CollectionItem[] = [];

    quests: CollectionItem[] = [];

    created: CreatedCollection[] = [];

    cleared: PuzzleItem[] = [];

    async fetch() {
      const { filters, sort, search, size } = this.$route.query;
      const params = {
        sort: sort || INITIAL_SORT,
        size: size || INITIAL_NUMBER,
        quest: false,
        search,
      } as CollectionExploreParams;
      const questParams = { quest: true } as CollectionExploreParams;

      const ROUTE: string = '/get/?type=collections';

      if (this.$vxm.user.loggedIn) params.uid = this.$vxm.user.uid;

      const res = await Promise.all([
        this.$http.get(ROUTE, { params }),
        this.$http.get('/get/?type=collections&quest=true'),
        this.$http.get('/get/?type=puzzles'),
      ]);

      this.collections = res[0].data.data.collections;
      this.created = res[0].data.data.created || [];

      this.quests = res[1].data.data.collections as CollectionItem[];

      this.$vxm.user.refreshAchievements();

      this.cleared = res[2].data.data.cleared;
    }

    get hasLabAccess() {
      return this.$vxm.user.hasLabAccess;
    }

    private filters: Filter[] = [
      { value: 'cleared', text: 'Cleared' },
      { value: 'uncleared', text: 'Uncleared' },
    ];
  }
</script>
<style lang="scss" scoped>
::v-deep .swiper-pagination-bullet-active {
  background-color: white;
}
</style>
