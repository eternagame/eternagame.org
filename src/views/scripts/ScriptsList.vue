<template>
  <EternaPage :title="$t('nav-bar:scripts')">
    <router-link :to="`/create/script/`"><button class="btn">Create</button></router-link>
    <div v-if="pageData">
      <ScriptCard
        v-for="script in scripts"
        :key="script.nid"
        :script="script"
        v-show="scriptVisible(script)"
      />
      <Pagination :key="scripts.length" />
    </div>
    <div v-else>
      <Preloader />
    </div>
    <template #sidebar="{ isInSidebar }">
      <SearchPanel
        v-if="isInSidebar"
        :placeholder="$t('search:scripts')"
        :isInSidebar="isInSidebar"
      />
      <FiltersPanel
        :filters="filters"
        paramName="filters"
        :isInSidebar="isInSidebar"
        :flagged="true"
        :scriptSearch="true"
      />
      <!-- <TagsPanel :tags="tags" :isInSidebar="isInSidebar" /> -->
      <DropdownSidebarPanel
        :options="options"
        paramName="sort"
        replace
        :isInSidebar="isInSidebar"
      />
    </template>
    <template #mobileSearchbar>
      <SearchPanel :placeholder="$t('search:scripts')" :isInSidebar="false" />
    </template>
  </EternaPage>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Mixins } from 'vue-property-decorator';
  import { RouteCallback, Route } from 'vue-router';
  import axios, { AxiosInstance } from 'axios';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import FiltersPanel, { Filter } from '@/components/Sidebar/FiltersPanel.vue';
  import SearchPanel from '@/components/Sidebar/SearchPanel.vue';
  import DropdownSidebarPanel, { Option } from '@/components/Sidebar/DropdownSidebarPanel.vue';
  import PageDataMixin from '@/mixins/PageData';
  import TagsPanel from '@/components/Sidebar/TagsPanel.vue';
  import VueAxios from 'vue-axios';
  // @ts-ignore
  import get from 'lodash.get';
  import Pagination from '@/components/PageLayout/Pagination.vue';
  import Preloader from '@/components/PageLayout/Preloader.vue';
  import { VXM } from '@/types/vue.d';
  import ScriptCard from './ScriptCard.vue';

  const INITIAL_SORT = 'date';
  const INITIAL_NUMBER = 18;

  const ROUTE = '/get/?type=script';

  async function fetchPageData(route: Route, http: AxiosInstance, vxm: VXM) {
    const params = {
      need: 'lists',
      skip: 0,
      sort: route.query.sort || INITIAL_SORT,
      search: route.query.search,
      size: route.query.size || INITIAL_NUMBER,
    };

    const res = (
      await http.get(ROUTE, {
        params,
      })
    ).data.data;
    return res;
  }

  @Component({
    components: {
      ScriptCard,
      EternaPage,
      Pagination,
      FiltersPanel,
      SearchPanel,
      DropdownSidebarPanel,
      TagsPanel,
      Preloader,
    },
  })
  export default class ScriptsList extends Mixins(PageDataMixin(fetchPageData)) {
    get scripts() {
      return get(this.pageData, 'lists', []);
    }

    private options: Option[] = [
      { value: 'date', text: 'side-panel-options:desc' },
      { value: 'success_rate', text: 'side-panel-options:success' },
    ];

    // TODO add additional filters in backend: https://app.clubhouse.io/vital-mind-media/story/755/make-filters-for-all-pages-work
    private filters: Filter[] = [
      { value: 'booster', text: 'Booster' },
      { value: 'etc', text: 'Etc' },
      { value: 'puzzle_solving', text: 'Puzzle Solving' },
      { value: 'rna_scoring', text: 'RNA Scoring' },
    ];

    scriptVisible(script: { type: string }) {
      const {filters} = this.$route.query;
      if (!filters) return true;
      const ret = true;
      const {type} = script;
      return filters.includes(type.toLowerCase().replace(' ', '_'));
    }
  }
</script>
