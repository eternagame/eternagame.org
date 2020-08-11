<template>
  <EternaPage :title="$t('nav-bar:labs')">
    <div v-if="fetchState.firstFetchComplete">
      <Gallery>
        <LabCard v-for="lab in displayedLabs" :key="lab.nid" :lab="lab"  />
      </Gallery>
    </div>
    <div v-else-if="!fetchState.firstFetchComplete && pagesEnabled && loading">
      <Preloader />
    </div>
    <Pagination
      :key="labs && labs.length"
      @page="currentPage = $event"
      :total="total"
      :loading="loading"
      @loading="loading = $event"
    />
    <template #sidebar="{ isInSidebar }">
      <SearchPanel v-if="isInSidebar" :placeholder="$t('search:labs')" :isInSidebar="isInSidebar" />
      <ChooseView v-if="isInSidebar" />
      <FiltersPanel :filters="filters" paramName="filters" :isInSidebar="isInSidebar" class="pt-3 mb-0"/>
      <DropdownSidebarPanel
        class="mt-3 mb-1"
        :options="options"
        paramName="sort"
        replace
        :isInSidebar="isInSidebar"
      />
      <p v-if="isInSidebar" class="ml-1 mt-2 d-inline-block custom-control-label no-before no-after">{{ total }} results </p><br>
      <button v-if="isInSidebar" class="btn btn-primary mt-1 ml-1" @click="refresh">Refresh</button>
    </template>
    <template #mobileSearchbar>
      <SearchPanel :placeholder="$t('search:labs')" :isInSidebar="false" />
    </template>
  </EternaPage>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Mixins, Watch } from 'vue-property-decorator';
  import { RouteCallback, Route } from 'vue-router';
  import { AxiosInstance } from 'axios';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import FiltersPanel, { Filter } from '@/components/Sidebar/FiltersPanel.vue';
  import SearchPanel from '@/components/Sidebar/SearchPanel.vue';
  import DropdownSidebarPanel, { Option } from '@/components/Sidebar/DropdownSidebarPanel.vue';
  import Pagination from '@/components/PageLayout/Pagination.vue';
  import Preloader from '@/components/PageLayout/Preloader.vue';
  import FetchMixin from '@/mixins/FetchMixin';
  import ChooseView from '@/components/Sidebar/ChooseView.vue';
  import { navigationModes } from '@/store/pagination.vuex';
  import LabsExploreData, { LabCardData } from './types';
  import LabCard from './components/LabCard.vue';

  const INITIAL_NUMBER = 18;
  const INCREMENT = INITIAL_NUMBER;

  @Component({
    components: {
      LabCard,
      SearchPanel,
      EternaPage,
      FiltersPanel,
      Pagination,
      DropdownSidebarPanel,
      Preloader,
      ChooseView,
    },
  })
  export default class LabsExplore extends Mixins(FetchMixin) {
    labs: LabCardData[] | null = [];

    loading = true;

    total = 0;

    private filters: Filter[] = [
      { value: 'active', text: 'Active' },
      { value: 'inactive', text: 'Inactive' },
    ];

    private options: Option[] = [
      { value: 'desc', text: 'side-panel-options:desc' },
      { value: 'asc', text: 'side-panel-options:asc' },
    ];

    async fetch(refresh = false) {
      const { filters, sort, search, size, skip } = this.$route.query;

      const convertToIncrementOf = (num: number, inc: number) => Math.ceil(num / inc) * inc;
      const params = {
        skip: convertToIncrementOf(+skip || 0, INCREMENT).toString(),
        order: sort,
        filters,
        search,
        size: this.pagesEnabled ? INITIAL_NUMBER : (this.$route.query.size || INITIAL_NUMBER),
      };

      if (refresh) {
        params.size = (+params.size + +params.skip).toString();
        params.skip = '0';
      }
      const res = (
        await this.$http.get('/get/?type=get_labs_for_lab_cards', {
          params,
        })
      ).data.data as LabsExploreData;
      this.total = +res.num_labs;
      const skipped = parseInt(params.skip, 10);
      const labsLoaded = parseInt(params.size! as string, 10);
      // Ensure splice places items where they should go by making the array larger
      if (!this.labs) this.labs = [];
      while (this.labs.length < skipped && this.pagesEnabled) {
        this.labs?.push({} as LabCardData);
      }
      this.labs?.splice(skipped, labsLoaded, ...res.labs);
      this.labs = [...new Set(this.labs)];
      this.loading = false;
    }

    get displayedLabs() {
      if (this.pagesEnabled) {
        const start = (this.currentPage - 1) * INITIAL_NUMBER;
        return this.labs?.slice(start, start + INITIAL_NUMBER);
      }
      return this.labs;
    }

    get pagesEnabled() {
      return this.$vxm.pagination.navigation === navigationModes.NAVIGATION_PAGES;
    }

    @Watch('pagesEnabled')
    async refresh() {
      this.$route.query.skip = this.labs?.length.toString() || '';
      await this.fetch(true);
    }

    currentPage: number = 1;
  }
</script>

<style scoped>
.no-before::before, .no-after::after {
  content: none !important;
}
</style>