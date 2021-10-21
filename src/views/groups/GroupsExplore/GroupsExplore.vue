<template>
  <EternaPage :title="$t('nav-bar:groups')">
    <div v-if="fetchState.firstFetchComplete">
      <Gallery>
        <GroupCard
          v-for="group in groups"
          :key="group.nid"
          :nid="group.nid"
          v-bind="group"
          :joined="groupJoined(group.nid)"
          :madeByPlayer="group['made-by-player'] !== '0'"
        />
      </Gallery>
      <Pagination :key="groups && groups.length" />
    </div>
    <div v-else>
      <Preloader />
    </div>
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
    </template>
    <template #mobileSearchbar>
      <SearchPanel :placeholder="$t('search:groups')" :isInSidebar="false" />
    </template>
  </EternaPage>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Mixins } from 'vue-property-decorator';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import FiltersPanel, { Filter } from '@/components/Sidebar/FiltersPanel.vue';
  import SearchPanel from '@/components/Sidebar/SearchPanel.vue';
  import DropdownSidebarPanel, { Option } from '@/components/Sidebar/DropdownSidebarPanel.vue';
  import TagsPanel from '@/components/Sidebar/TagsPanel.vue';
  import GroupCard from '@/components/Cards/GroupCard.vue';
  import Pagination from '@/components/PageLayout/Pagination.vue';
  import Preloader from '@/components/PageLayout/Preloader.vue';
  import { GroupList, JoinedGroup, GroupItem } from '@/types/common-types';
  import FetchMixin from '@/mixins/FetchMixin';

  const INITIAL_SORT = 'date';
  const INITIAL_NUMBER = 18;

  const ROUTE = '/get/?type=groups';

  interface GroupExploreParams {
    group_type: string;
    single: string;
    joined: string;
    sort: string;
    search: string;
    size: string;
    uid: number | null;
  }

  @Component({
    components: {
      GroupCard,
      EternaPage,
      Pagination,
      FiltersPanel,
      SearchPanel,
      DropdownSidebarPanel,
      TagsPanel,
      Preloader,
    },
  })
  export default class GroupsExplore extends Mixins(FetchMixin) {
    groups: GroupItem[] = [];

    joined: JoinedGroup[] = [];

    async fetch() {
      const { filters, sort, search, size } = this.$route.query;
      const params = {
        joined: filters && filters.includes('joined') && 'true',
        sort: sort || INITIAL_SORT,
        size: size || INITIAL_NUMBER,
        search,
      } as GroupExploreParams;

      if (this.$vxm.user.loggedIn) params.uid = this.$vxm.user.uid;

      const res = (await this.$http.get(ROUTE, {
        params,
      })).data.data as GroupList;
      this.groups = res.groups;
      this.joined = res.joined || [];
    }

    groupJoined(id: string) {
      return this.joined.some(group => id === group.nid);
    }

    private options: Option[] = [
      { value: 'date', text: 'side-panel-options:desc' },
      { value: 'date_asc', text: 'side-panel-options:asc' },
      { value: 'size', text: 'side-panel-options:size' },
    ];

    private filters: Filter[] = [
      { value: 'joined', text: 'Joined' },
      { value: 'unjoined', text: 'Not Joined'},
      { value: 'public', text: 'Public' },
      { value: 'private', text: 'Private'}
    ];

  // private tags: string[] = ['#Switch', '#Ribosome', '#XOR', '#MS2', '#tRNA', '#mRNA'];
  }
</script>
