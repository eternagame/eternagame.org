<template>
  <EternaPage :title="$t('nav-bar:puzzles')">
    <div v-if="fetchState.firstFetchComplete">
      <Paginator :loading="fetchState.pending" :total="total" :defaultIncrement="increment" @load="$fetch">
        <Gallery>
          <PuzzleCard
            v-for="puzzle in puzzles"
            :key="puzzle.id"
            :nid="puzzle.id"
            v-bind="puzzle"
            :cleared="puzzleCleared(puzzle.id)"
            :madeByPlayer="puzzle['made-by-player'] !== '0'"
            :is3d="puzzle['has3d'] === '1'"
          />
        </Gallery>
      </Paginator>
    </div>
    <div v-else>
      <Preloader />
    </div>
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
      <UserSearchPanel placeholder="activity-feed:search-users" v-if="isInSidebar"/>
      <!-- <TagsPanel :tags="tags" :isInSidebar="isInSidebar" /> -->
      <DropdownSidebarPanel
        :options="options"
        paramName="sort"
        replace
        :isInSidebar="isInSidebar"
      />
      <PaginationPanel v-if="isInSidebar" :shownCount="puzzles.length" :totalCount="total" />
    </template>
    <template #mobileSearchbar>
      <SearchPanel :placeholder="$t('search:puzzles')" :isInSidebar="false" />
    </template>
  </EternaPage>
</template>

<script lang="ts">
  import { Component, Mixins } from 'vue-property-decorator';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import FiltersPanel, { Filter } from '@/components/Sidebar/FiltersPanel.vue';
  import SearchPanel from '@/components/Sidebar/SearchPanel.vue';
  import DropdownSidebarPanel, { Option } from '@/components/Sidebar/DropdownSidebarPanel.vue';
  import TagsPanel from '@/components/Sidebar/TagsPanel.vue';
  import PuzzleCard from '@/components/Cards/PuzzleCard.vue';
  import Preloader from '@/components/PageLayout/Preloader.vue';
  import { PuzzleList, ClearedPuzzle, PuzzleItem } from '@/types/common-types';
  import FetchMixin from '@/mixins/FetchMixin';
  import UserSearchPanel from '@/components/Sidebar/UserSearchPanel.vue';
  import PaginationPanel from '@/components/Sidebar/PaginationPanel.vue';
  import Paginator, { PaginatorEvent } from '@/components/PageLayout/Paginator.vue';

  const INITIAL_SORT = 'date';

  const ROUTE = '/get/?type=puzzles';

  interface PuzzleExploreParams {
    puzzle_type: string;
    single: string;
    switch: string;
    notcleared: string;
    cleared: string;
    sort: string;
    search: string;
    size: string | number;
    skip: string | number;
    uid: number | null;
    creator_uid: number | null;
    '3d': boolean;
  }

  @Component({
    components: {
      PuzzleCard,
      EternaPage,
      FiltersPanel,
      SearchPanel,
      DropdownSidebarPanel,
      TagsPanel,
      Preloader,
      UserSearchPanel,
      PaginationPanel,
      Paginator
    },
  })
  export default class PuzzlesExplore extends Mixins(FetchMixin) {
    increment = 45;

    total = 0;

    puzzles: PuzzleItem[] = [];

    cleared: ClearedPuzzle[] = [];

    async fetch(
      {mode, size, skip}: PaginatorEvent = {
        mode: 'replace',
        skip: +this.$route.query.skip || 0,
        size: +this.$route.query.size || this.increment
      }
    ) {
      const getPuzzleType = (challenge: boolean, player: boolean) => {
        if (challenge === player) return 'AllChallengesPuzzle';
        if (player) return 'PlayerPuzzle';
        return 'Challenge';
      };
      const { filters, sort, search, uid } = this.$route.query;
      // Vue types filters as string | (string | null)[], but it's really string | (string | null)[] | undefined
      const filtersArr = (typeof filters === 'string' ? filters.split(',') : filters) || [];
      const params = {
        puzzle_type: getPuzzleType(
          Boolean(filtersArr.includes('challenge')),
          Boolean(filtersArr.includes('player')),
        ),
        single: filtersArr.includes('single') && 'checked',
        switch: filtersArr.includes('switch') && 'checked',
        notcleared: filtersArr.includes('notcleared') && 'true',
        cleared: filtersArr.includes('cleared') && 'true',
        '3d': filtersArr.includes('3d') && 'true',
        sort: sort || INITIAL_SORT,
        size,
        skip,
        creator_uid: uid || null,
        search,
      } as PuzzleExploreParams;

      if (this.$vxm.user.loggedIn) params.uid = this.$vxm.user.uid;

      const res = (await this.$http.get(ROUTE, {
        params,
      })).data.data as PuzzleList;
      if (mode === 'replace') this.puzzles = res.puzzles;
      else {
        const newPuzzles = res.puzzles.filter(
          (newItem) => !this.puzzles.some((oldItem) => oldItem.id === newItem.id)
        );
        if (mode === 'append') this.puzzles.push(...newPuzzles);
        if (mode === 'prepend') this.puzzles.unshift(...newPuzzles);
      }
      this.total = +res.num_puzzles;
      this.cleared = res.cleared || [];
    }

    puzzleCleared(id: string) {
      return this.cleared.some(puzzle => id === puzzle.id);
    }

    options: Option[] = [
      { value: 'date', text: 'side-panel-options:desc' },
      { value: 'date_asc', text: 'side-panel-options:asc' },
      { value: 'solved', text: 'side-panel-options:solved' },
      { value: 'length', text: 'side-panel-options:length' },
    ];

    filters: Filter[] = [
      { value: 'challenge', text: 'Challenge' },
      { value: 'player', text: 'Player' },
      { value: 'single', text: 'Single State' },
      // { value: '2-state', text: '2-state switch' },
      // { value: '3-state', text: '3-state switch' },
      // { value: '4-state', text: '4-state switch' },
      { value: 'switch', text: 'Switch' },
      { value: 'cleared', text: 'Cleared' },
      { value: 'notcleared', text: 'Uncleared' },
      { value: '3d', text: '3D' },
    ];
  }
</script>
