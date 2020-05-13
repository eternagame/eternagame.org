<template>
  <EternaPage :title="$t('nav-bar:leaderboards')">
    <div v-if="pageData">
      <div class="page-content">
        <template v-for="(player, index) in players">
          <PlayerCard :key="player.uid" :player="player" :index="index" />
          <hr class="bottom-border" :key="player.uid" />
        </template>
      </div>
      <Pagination :key="players.length" />
    </div>
    <div v-else>
      <Preloader/>
    </div>
    <template #sidebar="{ isInSidebar }">
      <SearchPanel
        v-if="isInSidebar"
        :placeholder="$t('search:players')"
        :isInSidebar="isInSidebar"
      />
      <DropdownSidebarPanel
        :options="options"
        paramName="sort"
        replace
        :isInSidebar="isInSidebar"
      />
    </template>
    <template #mobileSearchbar>
      <SearchPanel :placeholder="$t('search:players')" :isInSidebar="false" />
    </template>
  </EternaPage>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Mixins } from 'vue-property-decorator';
  import { RouteCallback, Route } from 'vue-router';
  import axios, { AxiosInstance } from 'axios';
  // @ts-ignore
  import get from 'lodash.get';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import FiltersPanel, { Filter } from '@/components/Sidebar/FiltersPanel.vue';
  import DropdownSidebarPanel, { Option } from '@/components/Sidebar/DropdownSidebarPanel.vue';
  import PageDataMixin from '@/mixins/PageData';
  import TagsPanel from '@/components/Sidebar/TagsPanel.vue';
  import Pagination from '@/components/PageLayout/Pagination.vue';
  import SearchPanel from '@/components/Sidebar/SearchPanel.vue';
  import Preloader from '@/components/PageLayout/Preloader.vue';
  import PlayerCard from './PlayerCard.vue';

  const INITIAL_NUMBER = 18;

  const ROUTE = 'https://eternagame.org/get/?type=users';

  async function fetchPageData(route: Route, http: AxiosInstance) {
    const { sort } = route.query;

    const res = (
      await http.get(`${ROUTE}&size=${INITIAL_NUMBER}`, {
        params: {
          sort: route.query.sort,
          filters: route.query.filters && (route.query.filters as string).split(','),
          size: route.query.size || INITIAL_NUMBER,
          search: route.query.search,
        },
      })
    ).data.data;
    return res;
  }

  @Component({
    components: {
      PlayerCard,
      EternaPage,
      SearchPanel,
      FiltersPanel,
      Pagination,
      DropdownSidebarPanel,
      TagsPanel,
      Preloader,
    },
  })
  export default class LeaderBoard extends Mixins(PageDataMixin(fetchPageData)) {
    get players() {
      return get(this.pageData, 'users', []);
    }

    private options: Option[] = [
      { value: 'active', text: 'side-panel-options:points-last-30-days' },
      { value: 'point', text: 'side-panel-options:total-points' },
      { value: 'synthesizes', text: 'side-panel-options:total-synthesized' },
      { value: 'update', text: 'side-panel-options:synthesized-latest' },
    ];
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';

  .bottom-border {
    border-top-color: $light-blue;
  }
</style>
