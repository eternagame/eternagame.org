<template>
  <EternaPage :title="$t('nav-bar:labs')">
    <div v-if="fetchState.firstFetchComplete">
      <Paginator :loading="fetchState.pending" :total="total" :defaultIncrement="increment" @load="$fetch">
        <Gallery>
          <LabCard v-for="lab in labs" :key="lab.nid" :lab="lab" />
        </Gallery>
      </Paginator>
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
      <PaginationPanel v-if="isInSidebar" :shownCount="labs.length" :totalCount="total" />
    </template>
    <template #mobileSearchbar>
      <SearchPanel :placeholder="$t('search:labs')" :isInSidebar="false" />
    </template>
  </EternaPage>
</template>

<script lang="ts">
  import { Component, Mixins } from 'vue-property-decorator';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import SearchPanel from '@/components/Sidebar/SearchPanel.vue';
  import FiltersPanel, { Filter } from '@/components/Sidebar/FiltersPanel.vue';
  import DropdownSidebarPanel, { Option } from '@/components/Sidebar/DropdownSidebarPanel.vue';
  import Preloader from '@/components/PageLayout/Preloader.vue';
  import FetchMixin from '@/mixins/FetchMixin';
  import PaginationPanel from '@/components/Sidebar/PaginationPanel.vue';
  import Paginator, { PaginatorEvent } from '@/components/PageLayout/Paginator.vue';
  import LabsExploreData, { LabCardData } from './types';
  import LabCard from './components/LabCard.vue';

  @Component({
    components: {
      LabCard,
      SearchPanel,
      EternaPage,
      FiltersPanel,
      DropdownSidebarPanel,
      Preloader,
      PaginationPanel,
      Paginator,
    },
  })
  export default class LabsExplore extends Mixins(FetchMixin) {
    labs: LabCardData[] = [];

    filters: Filter[] = [
      { value: 'active', text: 'Active' },
      { value: 'inactive', text: 'Inactive' },
    ];

    options: Option[] = [
      { value: 'desc', text: 'side-panel-options:desc' },
      { value: 'asc', text: 'side-panel-options:asc' },
    ];

    total = 0;

    increment = 18;

    async fetch(
      {mode, size, skip}: PaginatorEvent = {
        mode: 'replace',
        skip: +this.$route.query.skip || 0,
        size: +this.$route.query.size || this.increment
      }
    ) {
      const res = (
        await this.$http.get('/get/?type=get_labs_for_lab_cards', {
          params: {
            order: this.$route.query.sort,
            filters: this.$route.query.filters ? this.$route.query.filters : '',
            search: this.$route.query.search,
            size,
            skip
          },
        })
      ).data.data as LabsExploreData;
      if (mode === 'replace') this.labs = res.labs;
      else {
        const newLabs = res.labs.filter(
          (newItem) => !this.labs.some((oldItem) => oldItem.nid === newItem.nid)
        );
        if (mode === 'append') this.labs.push(...newLabs);
        if (mode === 'prepend') this.labs.unshift(...newLabs);
      }
      this.total = +res.num_labs;
    }
  }
</script>
