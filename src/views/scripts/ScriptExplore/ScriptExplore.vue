<template>
  <EternaPage title="Scripts">
    <Paginator :loading="fetchState.pending" :total="total" :defaultIncrement="increment" @load="$fetch">
      <Gallery :sm="12" :md="12" setCur>
        <ScriptCard v-for="script in scripts" :key="script.nid" v-bind="script" />
      </Gallery>
    </Paginator>

    <template #sidebar="{ isInSidebar }">
      <SearchPanel v-if="isInSidebar" :placeholder="$t('search:scripts')" :isInSidebar="isInSidebar" />
      <UserSearchPanel placeholder="activity-feed:search-users" v-if="isInSidebar" class="mb-4"/>
      <FiltersPanel
        :filters="filters"
        paramName="filters"
        :isInSidebar="isInSidebar"
      />
      <DropdownSidebarPanel
        :options="options"
        paramName="scriptType"
        replace
        :isInSidebar="isInSidebar"
      />
      <PaginationPanel v-if="isInSidebar" :shownCount="scripts.length" :totalCount="total" />
      <div><b-btn variant="primary" to="/scripts/create">Create</b-btn></div>
      <div><b-btn variant="secondary" to="/scripts/docs">Documentation</b-btn></div>
    </template>
    <template #mobileSearchbar>
      <SearchPanel :placeholder="$t('search:scripts')" :isInSidebar="false" />
    </template>
  </EternaPage>
</template>

<script lang="ts">
  import { Component, Mixins } from 'vue-property-decorator';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import FiltersPanel, {Filter} from '@/components/Sidebar/FiltersPanel.vue';
  import SearchPanel from '@/components/Sidebar/SearchPanel.vue';
  import TagsPanel from '@/components/Sidebar/TagsPanel.vue';
  import CalendarPanel from '@/components/Sidebar/CalendarPanel.vue';
  import Preloader from '@/components/PageLayout/Preloader.vue';
  import { ScriptListResponse, ScriptItem } from '@/types/common-types';
  import FetchMixin from '@/mixins/FetchMixin';
  import PaginationPanel from '@/components/Sidebar/PaginationPanel.vue';
  import Paginator, { PaginatorEvent } from '@/components/PageLayout/Paginator.vue';
  import DropdownSidebarPanel, { Option } from '@/components/Sidebar/DropdownSidebarPanel.vue';
  import UserSearchPanel from '@/components/Sidebar/UserSearchPanel.vue';
  import ScriptCard from './components/ScriptCard.vue';

  const ROUTE = '/get/?type=script&need=lists';

  @Component({
    components: {
      EternaPage,
      FiltersPanel,
      CalendarPanel,
      SearchPanel,
      TagsPanel,
      ScriptCard,
      Preloader,
      PaginationPanel,
      Paginator,
      DropdownSidebarPanel,
      UserSearchPanel
    },
  })
  export default class ScriptExplore extends Mixins(FetchMixin) {
    increment = 18;

    total = 0;

    scripts: ScriptItem[] = [];

    options: Option[] = [
      { value: '', text: 'All' },
      { value: 'Booster', text: 'Booster'},
      { value: 'Etc', text: 'Etc'},
    ];

    filters: Filter[] = [
      { value: 'favorited', text: 'Favorited' }
    ];

    async fetch(
      {mode, size, skip}: PaginatorEvent = {
        mode: 'replace',
        skip: +this.$route.query.skip || 0,
        size: +this.$route.query.size || this.increment
      }
    ) {
      const { search, scriptType, filters, uid } = this.$route.query;

      const res = (
        await this.$http.get(ROUTE, {
          params: {
            search,
            size,
            skip,
            script_type: scriptType,
            favorites_only: filters && filters.includes('favorited'),
            uid
          },
        })
      ).data.data as ScriptListResponse;

      if (mode === 'replace') this.scripts = res.lists;
      else {
        const newScripts = res.lists.filter(
          (newItem) => !this.scripts.some((oldItem) => oldItem.nid === newItem.nid)
        );
        if (mode === 'append') this.scripts.push(...newScripts);
        if (mode === 'prepend') this.scripts.unshift(...newScripts);
      }
      this.total = parseInt(res.total_script, 10);
    }
  }
</script>
