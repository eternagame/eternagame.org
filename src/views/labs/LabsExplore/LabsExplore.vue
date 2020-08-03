<template>
  <EternaPage :title="$t('nav-bar:labs')">
    <div v-if="fetchState.firstFetchComplete">
      <Gallery>
        <LabCard v-for="lab in displayedLabs" :key="lab.nid" :lab="lab"  />
      </Gallery>
      <!-- Total is labs.length + 1 so user can always go to the next page, even if those labs aren't loaded.
      Will be fixed once total labs is set up on the backend instead of loaded labs count -->
      <Pagination
        :key="labs && labs.length"
        :total="labs.length + 1"
        @page="currentPage = $event"
        :loading="loading"
        @loading="loading = $event"
      />
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
      <ChooseView />
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
  import SearchPanel from '@/components/Sidebar/SearchPanel.vue';
  import FiltersPanel, { Filter } from '@/components/Sidebar/FiltersPanel.vue';
  import DropdownSidebarPanel, { Option } from '@/components/Sidebar/DropdownSidebarPanel.vue';
  import Pagination from '@/components/PageLayout/Pagination.vue';
  import Preloader from '@/components/PageLayout/Preloader.vue';
  import FetchMixin from '@/mixins/FetchMixin';
  import { navigationModes } from '@/store/pagination.vuex';
  import ChooseView from '@/components/Sidebar/ChooseView.vue';
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
      ChooseView,
    },
  })
  export default class LabsExplore extends Mixins(FetchMixin) {
    labs: LabCardData[] | null = null;

    loading = false;

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
            skip: this.$route.query.skip,
            order: this.$route.query.sort,
            filters: this.$route.query.filters ? this.$route.query.filters : '',
            search: this.$route.query.search,
            size: this.pagesEnabled ? '12' : (this.$route.query.size || INITIAL_NUMBER),
          },
        })
      ).data.data as LabsExploreData;
      const skipped = parseInt(this.$route.query.skip as string || '0', 10);
      const labsLoaded = parseInt(this.$route.query.size! as string || '12', 10);
      // Ensure splice places items where they should go by making the array larger
      if (!this.labs) this.labs = [];
      while ((this.labs?.length || 0) < skipped && this.pagesEnabled) {
        this.labs?.push({} as LabCardData);
      }
      this.labs?.splice(skipped, labsLoaded, ...res.labs);
      this.labs = [...new Set(this.labs)];
      this.loading = false;
    }

    get displayedLabs() {
      if (this.pagesEnabled) {
        const start = (this.currentPage - 1) * 12;
        return this.labs?.slice(start, start + 12);
      }
      return this.labs;
    }

    get pagesEnabled() {
      return this.$vxm.pagination.navigation === navigationModes.NAVIGATION_PAGES;
    }

    currentPage: number = 1;
  }
</script>
