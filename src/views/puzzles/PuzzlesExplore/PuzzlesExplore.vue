<template>
  <EternaPage :title="$t('nav-bar:puzzles')">
    <Paginator :loading="fetchState.pending" :total="total" :defaultIncrement="increment" @load="$fetch">
      <Gallery setCur>
        <PuzzleCard
          v-for="puzzle in puzzles"
          :key="puzzle.id"
          :nid="puzzle.id"
          v-bind="puzzle"
          :madeByPlayer="puzzle['made-by-player'] !== '0'"
          :is3d="puzzle['has3d'] === '1'"
        />
      </Gallery>
    </Paginator>
    <template #sidebar="{ isInSidebar }">
      <SearchPanel
        v-if="isInSidebar"
        :placeholder="$t('search:puzzles')"
        :isInSidebar="isInSidebar"
      />
      <DropdownSidebarPanel
        :options="options"
        paramName="sort"
        replace
        :isInSidebar="isInSidebar"
      />
      <FiltersPanel
        :filters="filters"
        paramName="filters"
        :isInSidebar="isInSidebar"
        :flagged="true"
      />
      <UserSearchPanel :isInSidebar="isInSidebar" placeholder="activity-feed:search-users" v-if="isInSidebar" />
      <RangePanel :isInSidebar="isInSidebar" label="Solvers" minParamName="minSolvers" maxParamName="maxSolvers" :absoluteMin="0" v-if="isInSidebar"/>
      <RangePanel :isInSidebar="isInSidebar" label="Length" minParamName="minLength" maxParamName="maxLength" :absoluteMin="1" v-if="isInSidebar"/>
      <RangePanel :isInSidebar="isInSidebar" label="Reward" minParamName="minReward" maxParamName="maxReward" :absoluteMin="0" v-if="isInSidebar"/>
      <RangePanel :isInSidebar="isInSidebar" label="States" minParamName="minStates" maxParamName="maxStates" :absoluteMin="1" v-if="isInSidebar"/>
      <SelectSidebarPanel
        :options="engineOptions"
        paramName="engine"
        :isInSidebar="isInSidebar"
        label="Engine"
        v-if="isInSidebar"
      />
      <!-- <TagsPanel :tags="tags" :isInSidebar="isInSidebar" /> -->
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
  import SelectSidebarPanel from '@/components/Sidebar/SelectSidebarPanel.vue';
  import TagsPanel from '@/components/Sidebar/TagsPanel.vue';
  import PuzzleCard from '@/components/Cards/PuzzleCard.vue';
  import Preloader from '@/components/PageLayout/Preloader.vue';
  import { PuzzleList, ClearedPuzzle, PuzzleItem } from '@/types/common-types';
  import FetchMixin from '@/mixins/FetchMixin';
  import UserSearchPanel from '@/components/Sidebar/UserSearchPanel.vue';
  import PaginationPanel from '@/components/Sidebar/PaginationPanel.vue';
  import RangePanel from '@/components/Sidebar/RangePanel.vue';
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
    solver_min: string | number;
    solver_max: string | number;
    length_min: string | number;
    length_max: string | number;
    reward_min: string | number;
    reward_max: string | number;
    states_min: string | number;
    states_max: string | number;
    engine: string;
  }

  @Component({
    components: {
      PuzzleCard,
      EternaPage,
      FiltersPanel,
      SearchPanel,
      DropdownSidebarPanel,
      SelectSidebarPanel,
      TagsPanel,
      Preloader,
      UserSearchPanel,
      PaginationPanel,
      RangePanel,
      Paginator
    },
  })
  export default class PuzzlesExplore extends Mixins(FetchMixin) {
    increment = 18;

    total = 0;

    puzzles: (PuzzleItem & {cleared: boolean})[] = [];

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
      const { filters, sort, search, uid, minSolvers, maxSolvers, minReward, maxReward, minLength, maxLength, minStates, maxStates, engine } = this.$route.query;
      // Vue types filters as string | (string | null)[], but it's really string | (string | null)[] | undefined
      const filtersArr = (typeof filters === 'string' ? filters.split(',') : filters) || [];
      const params = {
        puzzle_type: getPuzzleType(
          Boolean(filtersArr.includes('challenge')),
          Boolean(filtersArr.includes('player')),
        ),
        notcleared: filtersArr.includes('notcleared') && 'true',
        cleared: filtersArr.includes('cleared') && 'true',
        '3d': filtersArr.includes('3d') && 'true',
        sort: sort || INITIAL_SORT,
        size,
        skip,
        creator_uid: uid || null,
        search,
        solver_min: minSolvers,
        solver_max: maxSolvers,
        reward_min: minReward,
        reward_max: maxReward,
        length_min: minLength,
        length_max: maxLength,
        states_min: minStates,
        states_max: maxStates,
        engine,
      } as PuzzleExploreParams;

      if (this.$vxm.user.loggedIn) params.uid = this.$vxm.user.uid;

      const res = (await this.$http.get(ROUTE, {
        params,
      })).data.data as PuzzleList;
      this.cleared = res.cleared || [];
      // We calculated the cleared status ahead of time for performance
      if (mode === 'replace') this.puzzles = res.puzzles.map((puz) => ({...puz, cleared: this.puzzleCleared(puz.id)}));
      else {
        const newPuzzles = res.puzzles.filter(
          (newItem) => !this.puzzles.some((oldItem) => oldItem.id === newItem.id)
        ).map((puz) => ({...puz, cleared: this.puzzleCleared(puz.id)}));
        if (mode === 'append') this.puzzles.push(...newPuzzles);
        if (mode === 'prepend') this.puzzles.unshift(...newPuzzles);
      }
      this.total = +res.num_puzzles;
    }

    puzzleCleared(id: string) {
      return this.cleared.some(puzzle => id === puzzle.id);
    }

    options: Option[] = [
      { value: 'date', text: 'side-panel-options:desc' },
      { value: 'date_asc', text: 'side-panel-options:asc' },
      { value: 'solved', text: 'side-panel-options:solved' },
      { value: 'solved_asc', text: 'side-panel-options:solved_asc' },
      { value: 'length_desc', text: 'side-panel-options:length_desc' },
      { value: 'length', text: 'side-panel-options:length' },
      { value: 'reward_desc', text: 'side-panel-options:reward_desc' },
      { value: 'reward', text: 'side-panel-options:reward' },
    ];

    engineOptions: Option[] = [
      { value: '', text: '' },
      { value: 'ContraFold', text: 'ContraFold' },
      { value: 'EternaFold', text: 'EternaFold' },
      { value: 'EternaFoldThreshknot', text: 'EternaFoldThreshknot' },
      { value: 'LinearFoldE', text: 'LinearFoldEternaFold' },
      { value: 'LinearFoldV', text: 'LinearFoldVienna' },
      { value: 'LinearFoldC', text: 'LinearFoldContraFold' },
      { value: 'NuPACK', text: 'NuPACK'},
      { value: 'Vienna', text: 'Vienna 1' },
      { value: 'Vienna2', text: 'Vienna 2' },
    ];

    filters: Filter[] = [
      { value: 'challenge', text: 'Challenge' },
      { value: 'player', text: 'Player' },
      { value: 'cleared', text: 'Cleared' },
      { value: 'notcleared', text: 'Uncleared' },
      { value: '3d', text: '3D' },
    ];
  }
</script>
