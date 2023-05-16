<template>
  <EternaPage :title="$t('activity-feed:title')">
    <div v-if="fetchState.firstFetchComplete">
      <MessageCompose @submit-message="sentMessage" />
      <Gallery :sm="12" :md="12" style="margin-top:25px">
        <ActivityCard
          v-for="notification in notifications"
          :key="notification.nid"
          :notification="notification"
        />
      </Gallery>
      <Pagination :total="total" :increment="increment" :loading="fetchState.pending" />
    </div>
    <div v-else>
      <Preloader />
    </div>
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
  import Pagination from '@/components/PageLayout/Pagination.vue';
  import Preloader from '@/components/PageLayout/Preloader.vue';
  import FetchMixin from '@/mixins/FetchMixin';
  import { NotificationItem } from '@/types/common-types';
  import UserSearchPanel from '@/components/Sidebar/UserSearchPanel.vue';
  import PaginationPanel from '@/components/Sidebar/PaginationPanel.vue';
  import { navigationModes } from '@/store/pagination.vuex';
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
      Pagination,
      Preloader,
      MessageCompose,
      SearchPanel,
      UserSearchPanel,
      PaginationPanel
    },
  })
  export default class ActivityFeed extends Mixins(FetchMixin) {
    notifications: NotificationItem[] = [];

    total = 0;

    increment = 18;

    async fetch() {
      const { filter, search, size, skip, uid } = this.$route.query;
      const res = (
        await axios.get(ROUTE, {
          params: {
            size: size || this.increment,
            skip: skip || 0,
            search,
            filter: filter || 'all',
            uid
          },
        })
      ).data.data;
      if (this.$vxm.pagination.navigation === navigationModes.NAVIGATION_SCROLL && skip) {
        res.entries.forEach((newNotif: NotificationItem) => {
          if (!this.notifications.some((notif) => notif.nid === newNotif.nid)) {
            this.notifications.push(newNotif);
          }
        });
      } else {
        this.notifications = res.entries;
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
