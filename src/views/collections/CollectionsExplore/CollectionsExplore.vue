<template>
  <EternaPage>
    <div v-if="true">
      <h3 :style="{ fontSize: '16px', fontWeight: 'bold' }">
        {{ $t('collections-view:top-tip') }}
      </h3>

      <template v-if="hasLabAccess">
        <QuestActivity :sideQuests="masteringEternaAchievements" />
        <TutorialActivity
          :stages="tenToolsAchievements"
          :heading="$t('player-home:advanced-tutorials')"
        />
        <TutorialActivity
          :stages="eternaEssentialsAchievements"
          :heading="$t('player-home:eterna-essentials-completed')"
        />
      </template>
      <template v-else>
        <TutorialActivity
          :stages="eternaEssentialsAchievements"
          :heading="$t('player-home:eterna-essentials')"
        />
        <TutorialActivity
          :stages="tenToolsAchievements"
          :heading="$t('player-home:advanced-tutorials')"
        />
      </template>

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
        :placeholder="$t('Search Collectionss')"
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
        to="/create/collection"
      >
        {{ $t('Create a Collection') }}
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
  import Carousel from '@/components/Common/Carousel.vue';
  import Pagination from '@/components/PageLayout/Pagination.vue';
  import Preloader from '@/components/PageLayout/Preloader.vue';
  import SearchPanel from '@/components/Sidebar/SearchPanel.vue';
  import {
    CreatedCollection,
    CollectionItem,
    CollectionList,
    RoadmapAchievement,
    ProcessedRoadmapAchievement,
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
      Carousel,
      Pagination,
      Preloader,
      SearchPanel,
      QuestActivity,
      TutorialActivity,
    },
  })
  export default class CollectionsExplore extends Mixins(FetchMixin) {
    collections: CollectionItem[] = [];

    created: CreatedCollection[] = [];

    tenToolsAchievements: RoadmapAchievement[] = [];

    eternaEssentialsAchievements: RoadmapAchievement[] = [];

    masteringEternaAchievements: ProcessedRoadmapAchievement[] = [];

    async fetch() {
      const { filters, sort, search, size } = this.$route.query;
      const params = {
        sort: sort || INITIAL_SORT,
        size: size || INITIAL_NUMBER,
        search,
      } as CollectionExploreParams;

      const ROUTE: string = '/get/?type=collections';

      if (this.$vxm.user.loggedIn) params.uid = this.$vxm.user.uid;

      const res = (
        await this.$http.get(ROUTE, {
          params,
        })
      ).data.data as CollectionList;
      this.collections = res.collections;
      this.created = res.created || [];

      const res2 = await Promise.all([
        this.$http.get('/get/?type=side_project_roadmap'),
      ]);

      const roadmap = res2[0].data.data
        .achievement_roadmap as RoadmapAchievement[];
      this.tenToolsAchievements = roadmap.filter((p) => p.key === 'ten_tools');
      this.eternaEssentialsAchievements = roadmap.filter(
        (p) => p.key === 'eterna_essentials',
      );
      this.masteringEternaAchievements = roadmap
        .filter((p) => p.key.includes('side_quest'))
        .map((p) => ({
          ...p,
          prereqSatisfied:
            p.prereq === undefined ||
            roadmap.some(
              (ach) =>
                `${ach.key}${ach.level}` === ach.prereq &&
                Number(ach.current_level) >= ach.level,
            ),
        }));

      this.$vxm.user.refreshAchievements();

      console.log(this.tenToolsAchievements);
      console.log(this.eternaEssentialsAchievements);
      console.log(this.masteringEternaAchievements);
      console.log(this.collections);
    }

    get hasLabAccess() {
      return this.$vxm.user.hasLabAccess;
    }

    private filters: Filter[] = [
      { value: 'single_state', text: 'Single state' },
      { value: 'switches', text: 'Switches' },
      { value: 'boosting', text: 'Boosting' },
      { value: 'energy_traps', text: 'Energy Traps' },
      { value: 'bulges', text: 'Bulges' },
      { value: 'multiloops', text: 'Multiloops' },
      { value: 'riboswitches', text: 'Riboswitches' },
      { value: 'uncleared', text: 'Uncleared' },
    ];
  }
</script>
<style lang="scss" scoped>
::v-deep .swiper-pagination-bullet-active {
  background-color: white;
}
</style>
