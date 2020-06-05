<template>
  <EternaPage :title="$t('nav-bar:labs')">
    <div v-if="fetchState.firstFetchComplete">
      <Gallery>
        <LabCard v-for="lab in labs" :key="lab.nid" :lab="lab" />
      </Gallery>
      <Pagination :key="labs && labs.length" />
    </div>
    <div v-else>
      <Preloader />
    </div>
    <template #sidebar="{ isInSidebar }">
      <SearchPanel v-if="isInSidebar" :placeholder="$t('search:labs')" :isInSidebar="isInSidebar" />
      <FiltersPanel :filters="filters" paramName="filters" :isInSidebar="isInSidebar" />
      <DropdownSidebarPanel
        :options="options"
        paramName="sort"
        replace
        :isInSidebar="isInSidebar"
      />
    </template>
    <template #mobileSearchbar>
      <SearchPanel :placeholder="$t('search:labs')" :isInSidebar="false" />
    </template>
  </EternaPage>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Mixins } from 'vue-property-decorator';
  import { RouteCallback, Route } from 'vue-router';
  import { AxiosInstance } from 'axios';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import SearchPanel from '@/components/Sidebar/SearchPanel.vue';
  import FiltersPanel, { Filter } from '@/components/Sidebar/FiltersPanel.vue';
  import DropdownSidebarPanel, { Option } from '@/components/Sidebar/DropdownSidebarPanel.vue';
  import Pagination from '@/components/PageLayout/Pagination.vue';
  import Preloader from '@/components/PageLayout/Preloader.vue';
  import FetchMixin from '@/mixins/FetchMixin';
  import LabsExploreData, { LabCardData } from './types';
  import LabCard from './components/LabCard.vue';

  const INITIAL_NUMBER = 18;

  @Component({
    components: {
      LabCard,
      SearchPanel,
      EternaPage,
      FiltersPanel,
      Pagination,
      DropdownSidebarPanel,
      Preloader,
    },
  })
  export default class LabsExplore extends Mixins(FetchMixin) {
    labs: LabCardData[] | null = null;

    private filters: Filter[] = [
      { value: 'active', text: 'Active' },
      { value: 'inactive', text: 'Inactive' },
    ];

    private options: Option[] = [
      { value: 'desc', text: 'side-panel-options:desc' },
      { value: 'asc', text: 'side-panel-options:asc' },
    ];

    async fetch() {
      const {sort} = this.$route.query;
      const res = (
        await this.$http.get('/get/?type=get_labs_for_lab_cards', {
          params: {
            order: this.$route.query.sort,
            filters: this.$route.query.filters ? this.$route.query.filters : '',
            search: this.$route.query.search,
            size: this.$route.query.size || INITIAL_NUMBER,
          },
        })
      ).data.data as LabsExploreData;
      this.labs = res.labs;
    }
  }
</script>
