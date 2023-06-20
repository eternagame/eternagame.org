<template>
  <EternaPage :title="$t('activity-feed:title')">
    <MessageCompose @submit-message="sentMessage" />
    <Paginator :loading="fetchState.pending" :total="total" :defaultIncrement="increment" @load="$fetch">
      <Gallery :sm="12" :md="12" style="margin-top:25px" setCur>
        <ActivityCard
          v-for="notification in notifications"
          :key="notification.nid"
          :notification="notification"
        />
      </Gallery>
    </Paginator>
    <template #sidebar="{ isInSidebar }">
      <SearchPanel v-if="isInSidebar" :isInSidebar="isInSidebar" />
      <DropdownSidebarPanel
        :options="options"
        paramName="filter"
        replace
        :isInSidebar="isInSidebar"
      />
      <UserSearchPanel placeholder="activity-feed:search-users" v-if="isInSidebar" class="mb-4"/>
      <PaginationPanel v-if="isInSidebar" :shownCount="notifications.length" :totalCount="total" />
    </template>
    <template #mobileSearchbar>
      <SearchPanel :isInSidebar="false" />
    </template>
  </EternaPage>
</template>

<script lang="ts">
  import { Component, Mixins, Watch } from 'vue-property-decorator';
  import axios from 'axios';
  import SearchPanel from '@/components/Sidebar/SearchPanel.vue';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import FiltersPanel from '@/components/Sidebar/FiltersPanel.vue';
  import DropdownSidebarPanel, { Option } from '@/components/Sidebar/DropdownSidebarPanel.vue';
  import TagsPanel from '@/components/Sidebar/TagsPanel.vue';
  import Preloader from '@/components/PageLayout/Preloader.vue';
  import FetchMixin from '@/mixins/FetchMixin';
  import { NotificationItem, NotificationResponse } from '@/types/common-types';
  import UserSearchPanel from '@/components/Sidebar/UserSearchPanel.vue';
  import PaginationPanel from '@/components/Sidebar/PaginationPanel.vue';
  import Paginator, { PaginatorEvent } from '@/components/PageLayout/Paginator.vue';
  import MessageCompose from './components/MessageCompose.vue';
  import ActivityCard from './components/ActivityCard.vue';

  const ROUTE = '/get/?type=newsfeed&combined=true';

  @Component({
    components: {
      EternaPage,
      FiltersPanel,
      DropdownSidebarPanel,
      TagsPanel,
      ActivityCard,
      Preloader,
      MessageCompose,
      SearchPanel,
      UserSearchPanel,
      PaginationPanel,
      Paginator
    },
  })
  export default class ActivityFeed extends Mixins(FetchMixin) {
    notifications: NotificationItem[] = [];

    total = 0;

    increment = 18;

    async fetch(
      {mode, size, skip}: PaginatorEvent = {
        mode: 'replace',
        skip: +this.$route.query.skip || 0,
        size: +this.$route.query.size || this.increment
      }
    ) {
      const { filter, search, uid } = this.$route.query;
      const res = (
        await axios.get(ROUTE, {
          params: {
            search,
            filter: filter || 'all',
            uid,
            size,
            skip,
          },
        })
      ).data.data as NotificationResponse;
      if (mode === 'replace') this.notifications = res.entries;
      else {
        const newNotifications = res.entries.filter(
          (newItem) => !this.notifications.some((oldItem) => oldItem.nid === newItem.nid)
        );
        if (mode === 'append') this.notifications.push(...newNotifications);
        if (mode === 'prepend') this.notifications.unshift(...newNotifications);
      }

      this.total = res.count;
    }

    sentMessage() {
      this.$fetch();
    }

    async mounted() {
      // TODO: Handle SSR? We're currently overriding the mounted hook...
      if (!this.$vxm.user.loggedIn) {
        this.$bvModal.show('modal-login');
      }
    }

    @Watch('$vxm.user.userDetailsLoaded')
    loggedIn() {
      if (this.$vxm.user.userDetailsLoaded) {
        // We weren't logged in when we hit the page, so we have to fetch now
        this.$fetch();
      } else {
        // We're logged out, so it doesn't make sense to stay on this page
        this.$router.push('/');
      }
    }

    options: Option[] = [
      { value: 'all', text: 'side-panel-options:all-activity' },
      { value: 'groups', text: 'side-panel-options:my-groups' },
      { value: 'notifications', text: 'side-panel-options:my-messages' },
      { value: 'newsandblogs', text: 'side-panel-options:news' },
      { value: 'rewards', text: 'side-panel-options:labs'},
    ];
  }
</script>
