<template>
  <EternaPage v-if="pageData" :title="$t('nav-bar:labs')">
    <Gallery>
      <LabCard v-for="lab in pageData.labs" :key="lab.nid" :lab="lab" />
    </Gallery>
    <template #sidebar="{ isInSidebar }">
      <SearchPannel :placeholder="$t('search:labs')" :isInSidebar="isInSidebar" />
      <FiltersPanel :filters="filters" paramName="filters" :isInSidebar="isInSidebar" />
      <DropdownSidebarPanel
        :options="options"
        paramName="sort"
        replace
        :isInSidebar="isInSidebar"
      />
    </template>
    <Pagination />
  </EternaPage>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Mixins } from 'vue-property-decorator';
  import { RouteCallback, Route } from 'vue-router';
  import { AxiosInstance } from 'axios';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import SearchPannel from '@/components/Sidebar/SearchPannel.vue';
  import FiltersPanel, { Filter } from '@/components/Sidebar/FiltersPanel.vue';
  import DropdownSidebarPanel, { Option } from '@/components/Sidebar/DropdownSidebarPanel.vue';
  import PageDataMixin from '@/mixins/PageData';
  import Pagination from '@/components/PageLayout/Pagination.vue';
  import LabsExploreData, { LabCardData } from './types';
  import LabCard from './components/LabCard.vue';

  const INITIAL_NUMBER = 18;

  async function fetchPageData(route: Route, http: AxiosInstance) {
    const { sort } = route.query;
    const res = (
      await http.get('/get/?type=get_labs_for_lab_cards', {
        params: {
          order: route.query.sort,
          filters: route.query.filters && (route.query.filters as string).split(','),
          search: route.query.search,
          size: route.query.size || INITIAL_NUMBER,
        },
      })
    ).data.data as LabsExploreData;
    return res;
  }

  @Component({
    components: {
      LabCard,
      SearchPannel,
      EternaPage,
      FiltersPanel,
      Pagination,
      DropdownSidebarPanel,
    },
  })
  export default class LabsExplore extends Mixins(PageDataMixin(fetchPageData)) {
    private filters: Filter[] = [
      { value: 'active', text: 'Active' },
      { value: 'inactive', text: 'Inactive' },
    ];

    private options: Option[] = [
      { value: 'desc', text: 'side-panel-options:desc' },
      { value: 'asc', text: 'side-panel-options:asc' },
    ];
  }
</script>
