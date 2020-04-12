<template>
  <EternaPage v-if="pageData" title="Labs">
    <Gallery>
      <LabCard v-for="lab in pageData.labs" :key="lab.nid" :lab="lab" />
    </Gallery>
    <template #sidebar="{ isInSidebar }">
      <FiltersPanel :filters="filters" paramName="filters" :isInSidebar="isInSidebar" />
      <DropdownSidebarPanel
        :options="options"
        paramName="sort"
        replace
        :isInSidebar="isInSidebar"
      />
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
  import LabsExploreData, { LabCardData } from './types';
  import LabCard from './components/LabCard.vue';

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
      LabCard,
      EternaPage,
      FiltersPanel,
      DropdownSidebarPanel,
    },
  })
  export default class LabsExplore extends Mixins(PageDataMixin(fetchPageData)) {
    private filters: Filter[] = [
      { value: 'active', text: 'Active' },
      { value: 'inactive', text: 'Inactive' },
    ];

    private options: Option[] = [
      { value: 'desc', text: 'Newest First' },
      { value: 'asc', text: 'Oldest First' },
    ];
  }
</script>
