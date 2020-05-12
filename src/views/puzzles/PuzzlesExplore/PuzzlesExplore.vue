<template>
  <EternaPage :title="$t('nav-bar:puzzles')">
    <div v-if="pageData">
      <Gallery>
        <PuzzleCard
          v-for="puzzle in puzzles"
          :key="puzzle.id"
          :nid="puzzle.id"
          v-bind="puzzle"
          :cleared="puzzleCleared(puzzle.id)"
        />
      </Gallery>
      <Pagination :key="puzzles.length" />
    </div>
    <div v-else>
      <h1>{{ $t('loading-text') }}</h1>
    </div>
    <template #sidebar="{ isInSidebar }">
      <SearchPanel
        v-if="isInSidebar"
        :placeholder="$t('search:puzzles')"
        :isInSidebar="isInSidebar"
      />
      <FiltersPanel :filters="filters" paramName="filters" :isInSidebar="isInSidebar" />
      <!-- <TagsPanel :tags="tags" :isInSidebar="isInSidebar" /> -->
      <DropdownSidebarPanel
        :options="options"
        paramName="sort"
        replace
        :isInSidebar="isInSidebar"
      />
    </template>
    <template #mobileSearchbar>
      <SearchPanel :placeholder="$t('search:puzzles')" :isInSidebar="false" />
    </template>
  </EternaPage>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Mixins } from 'vue-property-decorator';
  import { RouteCallback, Route } from 'vue-router';
  import axios, { AxiosInstance } from 'axios';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import FiltersPanel, { Filter } from '@/components/Sidebar/FiltersPanel.vue';
  import SearchPanel from '@/components/Sidebar/SearchPanel.vue';
  import DropdownSidebarPanel, { Option } from '@/components/Sidebar/DropdownSidebarPanel.vue';
  import PageDataMixin from '@/mixins/PageData';
  import TagsPanel from '@/components/Sidebar/TagsPanel.vue';
  import VueAxios from 'vue-axios';
  import PuzzleCard from '@/components/Cards/PuzzleCard.vue';
  // @ts-ignore
  import get from 'lodash.get';
  import Pagination from '@/components/PageLayout/Pagination.vue';
  import PuzzleViewData, { PuzzleCardData } from './types';

  const INITIAL_NUMBER = 18;

  const ROUTE = '/get/?type=puzzles';

  async function fetchPageData(route: Route, http: AxiosInstance) {
    const getPuzzleType = (challenge: boolean, player: boolean) => {
      if (challenge === player) return 'AllChallengesPuzzle';
      if (player) return 'PlayerPuzzle';
      return 'Challenge';
    };
    const { filters } = route.query;
    const res = (
      await http.get(ROUTE, {
        params: {
          puzzle_type: getPuzzleType(
            Boolean(filters && filters.includes('challenge')),
            Boolean(filters && filters.includes('player')),
          ),
          single: filters && filters.includes('single') && 'checked',
          notcleared: filters && filters.includes('notcleared') && 'true',
          order: route.query.sort,
          // TODO replace filters in backend: https://app.clubhouse.io/vital-mind-media/story/755/make-filters-for-all-pages-work
          // filters: filters && (filters as string).split(','),
          search: route.query.search,
          size: route.query.size || INITIAL_NUMBER,
        },
      })
    ).data.data as PuzzleViewData;
    return res;
  }

  @Component({
    components: {
      PuzzleCard,
      EternaPage,
      Pagination,
      FiltersPanel,
      SearchPanel,
      DropdownSidebarPanel,
      TagsPanel,
    },
  })
  export default class PuzzlesExplore extends Mixins(PageDataMixin(fetchPageData)) {
    get puzzles() {
      return get(this.pageData, 'puzzles', []);
    }

    puzzleCleared(id: number) {
      return this.pageData.cleared.map(puzzle => puzzle.id).includes(id);
    }

    private options: Option[] = [
      { value: 'date_asc', text: 'side-panel-options:desc' },
      { value: 'asc', text: 'side-panel-options:asc' },
    ];

    // TODO add additional filters in backend: https://app.clubhouse.io/vital-mind-media/story/755/make-filters-for-all-pages-work
    private filters: Filter[] = [
      { value: 'challenge', text: 'Challenge' },
      { value: 'player', text: 'Player' },
      { value: 'single', text: 'Single State' },
      // { value: '2-state', text: '2-state switch' },
      // { value: '3-state', text: '3-state switch' },
      // { value: '4-state', text: '4-state switch' },
      // { value: 'vienna', text: 'Vienna' },
      // { value: 'rnassd', text: 'RNAssd' },
      // { value: 'inforna', text: 'Inforna' },
      { value: 'notcleared', text: 'Uncleared' },
    ];

    // private tags: string[] = ['#Switch', '#Ribosome', '#XOR', '#MS2', '#tRNA', '#mRNA'];
  }
</script>
