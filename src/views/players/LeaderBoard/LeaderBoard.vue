<template>
  <EternaPage :title="$t('nav-bar:leaderboards')">
    <div v-if="fetchState.firstFetchComplete">
      <div class="page-content">
        <table style="width: 100%">
          <tbody>
            <template v-for="(player, index) in displayedUsers">
              <PlayerCard :key="player.uid" :player="player" :index="index + (currentPage - 1) * 18" />
            </template>
          </tbody>
        </table>
      </div>
    </div>
    <div v-else>
      <Preloader />
    </div>
    <Pagination
      :key="users.length"
      @page="currentPage = $event"
      :total="total"
      :loading="loading"
      @loading="loading = $event"
    />
    <template #sidebar="{ isInSidebar }">
      <SearchPanel
        v-if="isInSidebar"
        :placeholder="$t('search:players')"
        :isInSidebar="isInSidebar"
      />
      <ChooseView v-if="isInSidebar" />
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
      <SearchPanel :placeholder="$t('search:players')" :isInSidebar="false" />
    </template>
  </EternaPage>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Mixins, Watch } from 'vue-property-decorator';
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
  import ChooseView from '@/components/Sidebar/ChooseView.vue';
  import { navigationModes } from '@/store/pagination.vuex';
  import PlayerCard from './PlayerCard.vue';
  import { UserItem, UsersData } from '../types';

  const INITIAL_NUMBER = 18;
  const INCREMENT = INITIAL_NUMBER;

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
      ChooseView,
    },
  })
  export default class LeaderBoard extends Mixins(FetchMixin) {
    private options: Option[] = [
      { value: 'active', text: 'side-panel-options:points-last-30-days' },
      { value: 'point', text: 'side-panel-options:total-points' },
      { value: 'synthesizes', text: 'side-panel-options:total-synthesized' },
    ];

    private users: UserItem[] = [];

    get pagesEnabled() {
      return this.$vxm.pagination.navigation === navigationModes.NAVIGATION_PAGES;
    }

    @Watch('pagesEnabled')
    async refresh() {
      this.$route.query.skip = this.users.length.toString();
      await this.fetch(true);
    }

    currentPage: number = 1;

    loading = false;

    get displayedUsers() {
      if (this.pagesEnabled) {
        const start = (this.currentPage - 1) * 18;
        return this.users.slice(start, start + 18);
      }
      return this.users;
    }

    total = 0;

    async fetch(refresh = false) {
      const {sort, filters, size, search, skip} = this.$route.query;

      const params = {
        sort,
        search,
        filters: filters && (filters as string).split(','),
        size: size || INITIAL_NUMBER,
        skip,
      };

      const res = (
        await this.$http.get(`${ROUTE}&size=${INITIAL_NUMBER}`, {
          params,
        })
      ).data.data as UsersData;

      this.total = parseInt(res.num_users, 10);
      const skipped = parseInt(params.skip as string, 10);
      const puzzlesLoaded = parseInt(params.size as string, 10);
      // Ensure splice places items where they should go by making the array larger
      while (this.users.length < skipped && this.pagesEnabled) {
        this.users.push({} as UserItem);
      }
      // Replace the old puzzles the new ones
      this.users.splice(skipped, puzzlesLoaded, ...res.users);
      // Remove duplicates, in case a new puzzles was added
      this.users = [...new Set(this.users)];
      this.loading = false;
    }

    created() {
      this.refresh();
    }
  }
</script>

<style lang="scss" scoped>
.no-before::before, .no-after::after {
  content: none !important;
}
</style>
