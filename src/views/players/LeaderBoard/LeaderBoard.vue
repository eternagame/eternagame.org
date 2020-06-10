<template>
  <EternaPage :title="$t('nav-bar:leaderboards')">
    <div v-if="fetchState.firstFetchComplete">
      <div class="page-content">
        <table style="width: 100%">
          <tbody>
            <template v-for="(player, index) in users">
              <PlayerCard :key="player.uid" :player="player" :index="index" />
            </template>
          </tbody>
        </table>
      </div>
      <Pagination :key="users.length" />
    </div>
    <div v-else>
      <Preloader />
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
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import FiltersPanel, { Filter } from '@/components/Sidebar/FiltersPanel.vue';
  import DropdownSidebarPanel, { Option } from '@/components/Sidebar/DropdownSidebarPanel.vue';
  import TagsPanel from '@/components/Sidebar/TagsPanel.vue';
  import Pagination from '@/components/PageLayout/Pagination.vue';
  import SearchPanel from '@/components/Sidebar/SearchPanel.vue';
  import Preloader from '@/components/PageLayout/Preloader.vue';
  import FetchMixin from '@/mixins/FetchMixin';
  import PlayerCard from './PlayerCard.vue';
  import { UserItem, UsersData } from '../types';

  const INITIAL_NUMBER = 18;

  const ROUTE = '/get/?type=users';

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
  export default class LeaderBoard extends Mixins(FetchMixin) {
    private options: Option[] = [
      { value: 'active', text: 'side-panel-options:points-last-30-days' },
      { value: 'point', text: 'side-panel-options:total-points' },
      { value: 'synthesizes', text: 'side-panel-options:total-synthesized' },
    ];

    private users: UserItem[] = [];

    async fetch() {
      const {sort, filters, size, search} = this.$route.query;

      const res = (
        await this.$http.get(`${ROUTE}&size=${INITIAL_NUMBER}`, {
          params: {
            sort,
            search,
            filters: filters && (filters as string).split(','),
            size: size || INITIAL_NUMBER,
          },
        })
      ).data.data as UsersData;
      this.users = res.users;
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';

  .bottom-border {
    border-top-color: $light-blue;
  }
</style>
