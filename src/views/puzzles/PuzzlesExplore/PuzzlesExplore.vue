<template>
  <EternaPage :title="$t('nav-bar:puzzles')">
    <div v-if="fetchState.firstFetchComplete && !loading">
      <Gallery>
        <PuzzleCard
          v-for="puzzle in displayedPuzzles"
          :key="puzzle.id"
          :nid="puzzle.id"
          v-bind="puzzle"
          :cleared="puzzleCleared(puzzle.id)"
        />
      </Gallery>
      <Pagination :key="puzzles && puzzles.length" />
    </div>
    <div v-else>
      <Preloader />
    </div>
    <b-pagination
      v-if="pagesEnabled"
      v-model="currentPage"
      :total-rows="total"
      :per-page="12"
      style="bottom: 0;"
      :style="{ position: loading ? 'absolute': 'relative'}"
      align="center"
      limit=15
    />
    <template #sidebar="{ isInSidebar }">
      <SearchPanel
        v-if="isInSidebar"
        :placeholder="$t('search:puzzles')"
        :isInSidebar="isInSidebar"
      />
      <FiltersPanel
        :filters="filters"
        paramName="filters"
        :isInSidebar="isInSidebar"
        :flagged="true"
      />
      <!-- <TagsPanel :tags="tags" :isInSidebar="isInSidebar" /> -->
      <DropdownSidebarPanel
        :options="options"
        paramName="sort"
        replace
        :isInSidebar="isInSidebar"
      />
      <ChooseView v-if="isInSidebar" />
      <span v-if="isInSidebar" class="ml-1 mt-2 d-inline-block custom-control-label no-before no-after">{{ total }} results </span><br>
      <button v-if="isInSidebar" class="btn btn-primary mt-1" @click="refresh">Refresh</button>
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
  import { navigationModes } from '../../../store/pagination.vuex';

  const INITIAL_SORT = 'date';
  const INITIAL_NUMBER = 18;

  const ROUTE = '/get/?type=puzzles';

  interface PuzzleExploreParams {
    puzzle_type: string;
    single: string;
    switch: string;
    notcleared: string;
    sort: string;
    search: string;
    size: string;
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
      const params = {
        puzzle_type: getPuzzleType(
          Boolean(filters && filters.includes('challenge')),
          Boolean(filters && filters.includes('player')),
        ),
        single: filters && filters.includes('single') && 'checked',
        switch: filters && filters.includes('switch') && 'checked',
        notcleared: filters && filters.includes('notcleared') && 'true',
        sort: sort || INITIAL_SORT,
        size: this.pagesEnabled ? '12' : (size || INITIAL_NUMBER),
        search,
        skip,
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

    get pagesEnabled() {
      return this.$vxm.pagination.navigation === navigationModes.NAVIGATION_PAGES;
    }

    currentPage: number = 1;

    @Watch('currentPage')
    async updateQuery() {
      this.loading = true;
      await this.$router.replace({ name: this.$route.name!, query: this.getQuery(), });
    }

    getQuery() {
      const query = { ...this.$route.query };
      if (this.pagesEnabled) query.skip = (12 * (this.currentPage - 1)).toString();
      return query;
    }

    loading = false;

    get displayedPuzzles() {
      if (this.pagesEnabled) {
        const start = (this.currentPage - 1) * 12;
        return this.puzzles.slice(start, start + 12);
      }
      return this.puzzles;
    }

    @Watch('pagesEnabled')
    reload() {
      window.location.reload();
    }

    async refresh() {
      await this.fetch(true);
    }

    created() {
      if (this.$route.query.skip) this.currentPage = parseInt(this.$route.query.skip as string, 10) / 12 + 1;
      if (!this.pagesEnabled) {
        this.$route.query.skip = '0';
        this.$route.query.size = INITIAL_NUMBER.toString();
      }
      this.$router.replace({ name: this.$route.name!, query: this.$route.query });
    }

  // private tags: string[] = ['#Switch', '#Ribosome', '#XOR', '#MS2', '#tRNA', '#mRNA'];
  }
</script>
<style scoped>
.no-before::before, .no-after::after {
  content: none !important;
}
</style>