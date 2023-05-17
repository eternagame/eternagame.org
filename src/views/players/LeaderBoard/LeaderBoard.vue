<template>
  <EternaPage :title="$t('nav-bar:leaderboards')">
    <div v-if="fetchState.firstFetchComplete">
      <Paginator :loading="fetchState.pending" :total="total" :defaultIncrement="increment" @load="$fetch">
        <div class="page-content">
          <table style="width: 100%">
            <tbody>
              <template v-for="(player, index) in users">
                <PlayerCard :key="player.uid" :player="player" :index="index" />
              </template>
            </tbody>
          </table>
        </div>
      </Paginator>
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
      <PaginationPanel v-if="isInSidebar" :shownCount="users.length" :totalCount="total" />
    </template>
    <template #mobileSearchbar>
      <SearchPanel :placeholder="$t('search:players')" :isInSidebar="false" />
    </template>
  </EternaPage>
</template>

<script lang="ts">
  import { Component, Mixins } from 'vue-property-decorator';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import FiltersPanel from '@/components/Sidebar/FiltersPanel.vue';
  import DropdownSidebarPanel, { Option } from '@/components/Sidebar/DropdownSidebarPanel.vue';
  import TagsPanel from '@/components/Sidebar/TagsPanel.vue';
  import SearchPanel from '@/components/Sidebar/SearchPanel.vue';
  import Preloader from '@/components/PageLayout/Preloader.vue';
  import FetchMixin from '@/mixins/FetchMixin';
  import PaginationPanel from '@/components/Sidebar/PaginationPanel.vue';
  import Paginator, { PaginatorEvent } from '@/components/PageLayout/Paginator.vue';
  import PlayerCard from './PlayerCard.vue';
  import { UserItem, UsersData } from '../types';

  const ROUTE = '/get/?type=users';

  @Component({
    components: {
      PlayerCard,
      EternaPage,
      SearchPanel,
      FiltersPanel,
      DropdownSidebarPanel,
      TagsPanel,
      Preloader,
      PaginationPanel,
      Paginator
    },
  })
  export default class LeaderBoard extends Mixins(FetchMixin) {
    increment = 18;

    total = 0;

    options: Option[] = [
      { value: 'active', text: 'side-panel-options:points-last-30-days' },
      { value: 'point', text: 'side-panel-options:total-points' },
      { value: 'synthesizes', text: 'side-panel-options:total-synthesized' },
    ];

    users: UserItem[] = [];

    async fetch(
      {mode, size, skip}: PaginatorEvent = {
        mode: 'replace',
        skip: +this.$route.query.skip || 0,
        size: +this.$route.query.size || this.increment
      }
    ) {
      const {sort, filters, search} = this.$route.query;

      const res = (
        await this.$http.get(ROUTE, {
          params: {
            filters: filters && (filters as string).split(','),
            sort,
            search,
            size,
            skip
          },
        })
      ).data.data as UsersData;
      if (mode === 'replace') this.users = res.users;
      else {
        const newUsers = res.users.filter(
          (newItem) => !this.users.some((oldItem) => oldItem.uid === newItem.uid)
        );
        if (mode === 'append') this.users.push(...newUsers);
        if (mode === 'prepend') this.users.unshift(...newUsers);
      }
      this.total = +res.num_users;
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';

  .bottom-border {
    border-top-color: $light-blue;
  }
</style>
