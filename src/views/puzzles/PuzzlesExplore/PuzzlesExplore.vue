<template>
  <EternaPage v-if="pageData" :title="$t('nav-bar:puzzles')">
    <Gallery>
      <PuzzleCard v-for="puzzle in puzzles" :key="puzzle.id" :nid="puzzle.id" v-bind="puzzle" />
    </Gallery>
    <template #sidebar="{ isInSidebar }">
      <FiltersPanel :filters="filters" paramName="filters" :isInSidebar="isInSidebar" />
      <TagsPanel :tags="tags" :isInSidebar="isInSidebar" />
    </template>
  </EternaPage>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Mixins } from 'vue-property-decorator';
  import { RouteCallback, Route } from 'vue-router';
  import axios, { AxiosInstance } from 'axios';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import FiltersPanel, { Filter } from '@/components/Sidebar/FiltersPanel.vue';
  import DropdownSidebarPanel, { Option } from '@/components/Sidebar/DropdownSidebarPanel.vue';
  import PageDataMixin from '@/mixins/PageData';
  import TagsPanel from '@/components/Sidebar/TagsPanel.vue';
  import VueAxios from 'vue-axios';
  import PuzzleCard from '@/components/Cards/PuzzleCard.vue';
  // @ts-ignore
  import get from 'lodash.get';
  import PuzzleViewData, { PuzzleCardData } from './types';

  const INITIAL_NUMBER = 18;

  const INCREMENT = 9;

  const ROUTE = '/get/?type=puzzles';

  async function fetchPageData(route: Route, http: AxiosInstance) {
    const { sort } = route.query;

    const res = (
      await http.get(`${ROUTE}&size=${INITIAL_NUMBER}`, {
        params: {
          order: route.query.sort,
          filters: route.query.filters && (route.query.filters as string).split(','),
        },
      })
    ).data.data as PuzzleViewData;
    return res;
  }

  @Component({
    components: {
      PuzzleCard,
      EternaPage,
      FiltersPanel,
      DropdownSidebarPanel,
      TagsPanel,
    },
  })
  export default class PuzzlesExplore extends Mixins(PageDataMixin(fetchPageData)) {
    private numFetched: number = INITIAL_NUMBER;

    get puzzles() {
      return this.puzzlesFetched.length ? this.puzzlesFetched : get(this.pageData, 'puzzles', []);
    }

    private puzzlesFetched = [];

    mounted() {
      window.onscroll = () => {
        const bottomOfWindow = document.documentElement.scrollTop + window.innerHeight
          === document.documentElement.offsetHeight;

        if (bottomOfWindow) {
          this.numFetched += INCREMENT;
          axios.get(`${ROUTE}&size=${this.numFetched}`).then(response => {
            this.puzzlesFetched = response.data.data.puzzles;
          });
        }
      };
    }

    private filters: Filter[] = [
      { value: 'single', text: 'Single State' },
      { value: '2-state', text: '2-state switch' },
      { value: '3-state', text: '3-state switch' },
      { value: '4-state', text: '4-state switch' },
      { value: 'vienna', text: 'Vienna' },
      { value: 'rnassd', text: 'RNAssd' },
      { value: 'inforna', text: 'Inforna' },
      { value: 'notcleared', text: 'Uncleared' },
    ];

    private tags: String[] = ['#Switch', '#Ribosome', '#XOR', '#MS2', '#tRNA', '#mRNA'];
  }
</script>
