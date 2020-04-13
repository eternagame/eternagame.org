<template>
  <EternaPage v-if="pageData" :title="$t('nav-bar:quests')">
    <Gallery> </Gallery>
    <template #sidebar="{ isInSidebar }">
      <FiltersPanel :filters="filters" paramName="filters" :isInSidebar="isInSidebar" />
      <TagsPanel
        :tags="['#Switch', '#Ribozyme', '#XOR', '#MS2', '#FMN', '#Telomerase']"
        :isInSidebar="isInSidebar"
      />
    </template>
  </EternaPage>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Mixins } from 'vue-property-decorator';
  import { RouteCallback, Route } from 'vue-router';
  import { AxiosInstance } from 'axios';
  import TagsPanel from '@/components/Sidebar/TagsPanel.vue';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import FiltersPanel, { Filter } from '@/components/Sidebar/FiltersPanel.vue';
  import PageDataMixin from '@/mixins/PageData';
  import LabsExploreData, { LabCardData } from './types';

  async function fetchPageData(route: Route, http: AxiosInstance) {
    const { sort } = route.query;
    const res = (
      await http.get('/get/?type=get_labs_for_lab_cards&size=18&skip=0', {
        params: {
          order: route.query.sort,
          filters: route.query.filters && (route.query.filters as string).split(','),
        },
      })
    ).data.data as LabsExploreData;
    return res;
  }

  @Component({
    components: {
      EternaPage,
      TagsPanel,
      FiltersPanel,
    },
  })
  export default class LabsExplore extends Mixins(PageDataMixin(fetchPageData)) {
    private filters: Filter[] = [
      { value: 'single_state', text: 'Single state' },
      { value: 'switches', text: 'Switches' },
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
