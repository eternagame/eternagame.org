<template>
  <EternaPage :title="$t('nav-bar:groups')">
    <Paginator :loading="fetchState.pending" :total="total" :defaultIncrement="increment" @load="$fetch">
      <Gallery setCur>
        <GroupCard
          v-for="group in groups"
          :key="group.nid"
          v-bind="group"
          :joined="groupJoined(group.nid)"
        />
      </Gallery>
    </Paginator>
    <template #sidebar="{ isInSidebar }">
      <SearchPanel
        v-if="isInSidebar"
        :placeholder="$t('search:groups')"
        :isInSidebar="isInSidebar"
      />
      <FiltersPanel
        :filters="filters"
        paramName="filters"
        :isInSidebar="isInSidebar"
        :flagged="true"
      />
      <!-- <TagsPanel :tags="tags" :isInSidebar="isInSidebar" /> -->
      <DropdownSidebarPanel
        :options="options"
        paramName="sort"
        replace
        :isInSidebar="isInSidebar"
      />
      <PaginationPanel v-if="isInSidebar" :shownCount="groups.length" :totalCount="total" />
      <b-button
       type="submit"
        variant="primary"
        class="submit-button"
        to="/groups/create"
      >
      {{ $t('group-explore:create-group') }}
      </b-button>
    </template>
    <template #mobileSearchbar>
      <SearchPanel :placeholder="$t('search:groups')" :isInSidebar="false" />
    </template>
  </EternaPage>
</template>

<script lang="ts">
  import { Component, Mixins } from 'vue-property-decorator';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import FiltersPanel, { Filter } from '@/components/Sidebar/FiltersPanel.vue';
  import SearchPanel from '@/components/Sidebar/SearchPanel.vue';
  import DropdownSidebarPanel, { Option } from '@/components/Sidebar/DropdownSidebarPanel.vue';
  import TagsPanel from '@/components/Sidebar/TagsPanel.vue';
  import GroupCard from '@/components/Cards/GroupCard.vue';
  import Preloader from '@/components/PageLayout/Preloader.vue';
  import { GroupList, JoinedGroup, GroupItem } from '@/types/common-types';
  import FetchMixin from '@/mixins/FetchMixin';
  import PaginationPanel from '@/components/Sidebar/PaginationPanel.vue';
  import Paginator, { PaginatorEvent } from '@/components/PageLayout/Paginator.vue';

  const INITIAL_SORT = 'date';

  const MAINROUTE = '/get/?type=groups';

  interface GroupExploreParams {
    group_type: string;
    single: string;
    joined: string;
    sort: string;
    search: string;
    size: string | number;
    skip: string | number;
    uid: number | null;
    public: string;
    private: string;
    admin: string;
    unjoined: string;
    pending: string;
  }

  @Component({
    components: {
      GroupCard,
      EternaPage,
      FiltersPanel,
      SearchPanel,
      DropdownSidebarPanel,
      TagsPanel,
      Preloader,
      PaginationPanel,
      Paginator
    },
  })
  export default class GroupsExplore extends Mixins(FetchMixin) {
    total = 0;

    increment = 18;

    groups: GroupItem[] = [];

    joined: JoinedGroup[] = [];

    async fetch(
      {mode, size, skip}: PaginatorEvent = {
        mode: 'replace',
        skip: +this.$route.query.skip || 0,
        size: +this.$route.query.size || this.increment
      }
    ) {
      const { filters, sort, search } = this.$route.query;
      const params = {
        sort: sort || INITIAL_SORT,
        public: filters && filters.includes('public') && 'true',
        private: filters && filters.includes('private') && 'true',
        admin: filters && filters.includes('admin') && 'true',
        joined: filters && filters.includes('mygroups') && 'true',
        unjoined: filters && filters.includes('unjoined') && 'true',
        pending: filters && filters.includes('pending') && 'true',
        search,
        size,
        skip,
      } as GroupExploreParams;

      const ROUTE: string = MAINROUTE;

      if (this.$vxm.user.loggedIn) params.uid = this.$vxm.user.uid;

      const res = (await this.$http.get(ROUTE, {
        params,
      })).data.data as GroupList;

      if (mode === 'replace') this.groups = res.groups;
      else {
        const newGroups = res.groups.filter(
          (newItem) => !this.groups.some((oldItem) => oldItem.nid === newItem.nid)
        );
        if (mode === 'append') this.groups.push(...newGroups);
        if (mode === 'prepend') this.groups.unshift(...newGroups);
      }

      this.total = +res.num_groups;
      this.joined = res.joined || [];
    }

    groupJoined(id: string) {
      return this.joined.some(group => id === group.nid);
    }

    options: Option[] = [
      { value: 'date', text: 'side-panel-options:desc' },
      { value: 'date_asc', text: 'side-panel-options:asc' },
      { value: 'title', text: 'side-panel-options:Alphabetical' },
      { value: 'size', text: 'side-panel-options:size' },
    ];

    filters: Filter[] = [
      { value: 'mygroups', text: 'Joined' },
      { value: 'unjoined', text: 'Not Joined'},
      { value: 'admin', text: 'Admin',},
      { value: 'pending', text: 'Pending'},
      { value: 'public', text: 'Public' },
      { value: 'private', text: 'Private'},
    ];

  // private tags: string[] = ['#Switch', '#Ribosome', '#XOR', '#MS2', '#tRNA', '#mRNA'];
  }
</script>
