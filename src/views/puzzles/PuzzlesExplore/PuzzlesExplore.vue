<template>
  <EternaPage v-if="pageData" title="Puzzles">
    <Gallery>
      <PuzzleCard
        v-for="puzzle in pageData.puzzles"
        :key="puzzle.id"
        :nid="puzzle.id"
        :title="puzzle.title"
        :leftNumber="puzzle.reward"
        :rightNumber="puzzle['num-cleared']"
        :states="0"
      />
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
  import { AxiosInstance } from 'axios';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import FiltersPanel, { Filter } from '@/components/Sidebar/FiltersPanel.vue';
  import DropdownSidebarPanel, { Option } from '@/components/Sidebar/DropdownSidebarPanel.vue';
  import PageDataMixin from '@/mixins/PageData';
  import TagsPanel from '@/components/Sidebar/TagsPanel.vue';
  import PuzzleCard from '@/components/Cards/PuzzleCard.vue';
  import PuzzleViewData, { PuzzleCardData } from './types';

  async function fetchPageData(route: Route, http: AxiosInstance) {
    const { sort } = route.query;

    const res = (
      await http.get('/get/?type=puzzles&size=18&skip=0', {
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
