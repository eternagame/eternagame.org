<template>
  <EternaPage :title="$t('nav-bar:puzzles')">
    <div v-if="fetchState.firstFetchComplete">
      <Gallery>
        <PuzzleCard
          v-for="puzzle in displayedPuzzles"
          :key="puzzle.id"
          :nid="puzzle.id"
          v-bind="puzzle"
          :cleared="puzzleCleared(puzzle.id)"
        />
      </Gallery>
    </div>
    <div v-else-if="!fetchState.firstFetchComplete && pagesEnabled && loading">
      <Preloader />
    </div>
    <Pagination
      :key="puzzles && puzzles.length"
      @page="currentPage = $event"
      :total="total"
      :loading="loading"
      @loading="loading = $event"
    />
    <template #sidebar="{ isInSidebar }">
      <SearchPanel
        v-if="isInSidebar"
        :placeholder="$t('search:puzzles')"
        :isInSidebar="isInSidebar"
      />
      <UserSearch ref="userSearch" placeholder="activity-feed:search-users" v-if="isInSidebar" @uid="updateUID" class="mb-2"/>
      <ChooseView v-if="isInSidebar" />
      <FiltersPanel
        class="pt-3 mb-0"
        :filters="filters"
        paramName="filters"
        :isInSidebar="isInSidebar"
        :flagged="true"
      />
      <TagsPanel :tags="tags" :isInSidebar="isInSidebar" class="py-3 mb-0"/>
      <DropdownSidebarPanel
        class="mt-0 mb-3"
        :options="options"
        paramName="sort"
        replace
        :isInSidebar="isInSidebar"
      />
      <p v-if="isInSidebar" class="ml-1 mt-2 d-inline-block custom-control-label no-before no-after">{{ total }} results </p><br>
      <button v-if="isInSidebar" class="btn btn-primary mt-1 ml-1" @click="refresh">Refresh</button>
    </template>
    <template #mobileSearchbar>
      <SearchPanel :placeholder="$t('search:puzzles')" :isInSidebar="false" />
    </template>
  </EternaPage>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Mixins, Watch } from 'vue-property-decorator';
  import { RouteCallback, Route } from 'vue-router';
  import axios, { AxiosInstance } from 'axios';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import FiltersPanel, { Filter } from '@/components/Sidebar/FiltersPanel.vue';
  import SearchPanel from '@/components/Sidebar/SearchPanel.vue';
  import DropdownSidebarPanel, { Option } from '@/components/Sidebar/DropdownSidebarPanel.vue';
  import TagsPanel from '@/components/Sidebar/TagsPanel.vue';
  import VueAxios from 'vue-axios';
  import PuzzleCard from '@/components/Cards/PuzzleCard.vue';
  import Pagination from '@/components/PageLayout/Pagination.vue';
  import Preloader from '@/components/PageLayout/Preloader.vue';
  import { VXM } from '@/types/vue.d';
  import { PuzzleList, ClearedPuzzle, PuzzleItem } from '@/types/common-types';
  import FetchMixin from '@/mixins/FetchMixin';
  import ChooseView from '@/components/Sidebar/ChooseView.vue';
  import { navigationModes } from '@/store/pagination.vuex';
  import UserSearch from '@/views/feed/ActivityFeed/components/UserSearch.vue';

  const INITIAL_SORT = 'date';
  const INITIAL_NUMBER = 18;
  const INCREMENT = INITIAL_NUMBER;

  const ROUTE = '/get/?type=puzzles';

  interface PuzzleExploreParams {
    puzzle_type: string;
    single: string;
    switch: string;
    notcleared: string;
    sort: string;
    search: string;
    size: string;
    creator_uid: number | null;
    uid: number | null;
    skip: string | null;
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
      Preloader,
      ChooseView,
      UserSearch,
    },
  })
  export default class PuzzlesExplore extends Mixins(FetchMixin) {
    puzzles: PuzzleItem[] = [];

    cleared: ClearedPuzzle[] = [];

    total = 0;

    async fetch(refresh = false) {
      const getPuzzleType = (challenge: boolean, player: boolean) => {
        if (challenge === player) return 'AllChallengesPuzzle';
        if (player) return 'PlayerPuzzle';
        return 'Challenge';
      };
      const { filters, sort, search, size, skip } = this.$route.query;
      const convertToIncrementOf = (num: number, inc: number) => Math.ceil(num / inc) * inc;
      const params = {
        puzzle_type: getPuzzleType(
          Boolean(filters && filters.includes('challenge')),
          Boolean(filters && filters.includes('player')),
        ),
        single: filters && filters.includes('single') && 'checked',
        switch: filters && filters.includes('switch') && 'checked',
        notcleared: filters && filters.includes('notcleared') && 'true',
        sort: sort || INITIAL_SORT,
        size: this.pagesEnabled ? INITIAL_NUMBER : (size || INITIAL_NUMBER),
        search,
        skip: convertToIncrementOf(+skip || 0, INCREMENT).toString() ?? 0,
        creator_uid: this.uid || null,
      } as PuzzleExploreParams;

      if (refresh) {
        params.size = (parseInt(params.size, 10) + parseInt(params.skip!, 10)).toString();
        params.skip = '0';
      }

      if (this.$vxm.user.loggedIn) params.uid = this.$vxm.user.uid;

      const res = (await this.$http.get(ROUTE, {
        params,
      })).data.data as PuzzleList;
      this.total = parseInt(res.num_puzzles, 10);
      const skipped = parseInt(params.skip!, 10);
      const puzzlesLoaded = parseInt(params.size!, 10);
      // Ensure splice places items where they should go by making the array larger
      while (this.puzzles.length < skipped && this.pagesEnabled) {
        this.puzzles.push({} as PuzzleItem);
      }
      // Replace the old puzzles the new ones
      this.puzzles.splice(skipped, puzzlesLoaded, ...res.puzzles);
      // Remove duplicates, in case a new puzzles was added
      this.puzzles = [...new Set(this.puzzles)];
      this.cleared = res.cleared || [];
      this.loading = false;
    }

    puzzleCleared(id: string) {
      return this.cleared.some(puzzle => id === puzzle.id);
    }

    private options: Option[] = [
      { value: 'date', text: 'side-panel-options:desc' },
      { value: 'date_asc', text: 'side-panel-options:asc' },
      // TODO: i18nize these in en.json
      { value: 'solved', text: 'side-panel-options:solved' },
      { value: 'length', text: 'side-panel-options:length' },
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
      { value: 'switch', text: 'Switch' },
      { value: 'notcleared', text: 'Uncleared' },
    ];

    private tags = ['#POTW', '#RibosomeChallenge', '#COVID19', '#Eterna100'];

    get pagesEnabled() {
      return this.$vxm.pagination.navigation === navigationModes.NAVIGATION_PAGES;
    }

    @Watch('pagesEnabled')
    async refresh() {
      this.$route.query.skip = this.puzzles.length.toString();
      await this.fetch(true);
    }

    currentPage: number = 1;

    // The page starts out loading
    loading = true;

    get displayedPuzzles() {
      if (this.pagesEnabled) {
        const start = (this.currentPage - 1) * 18;
        return this.puzzles.slice(start, start + 18);
      }
      return this.puzzles;
    }

    uid = '';

    updateUID(newValue: string) {
      this.uid = newValue;
      this.fetch();
    }


  // private tags: string[] = ['#Switch', '#Ribosome', '#XOR', '#MS2', '#tRNA', '#mRNA'];
  }
</script>
<style scoped>
.no-before::before, .no-after::after {
  content: none !important;
}
</style>