<template>
  <EternaPage :title="$t('activity-feed:title')">
    <div v-if="fetchState.firstFetchComplete">
      <MessageCompose @submit-message="sentMessage" />
      <Gallery :sm="12" :md="12" style="margin-top:25px">
        <ActivityCard
          v-for="notification in displayedNotifications"
          :key="notification.nid"
          :notification="notification"
        />
      </Gallery>
    </div>
    <div v-else>
      <Preloader />
    </div>
      <Pagination
        :key="notifications && notifications.length"
        @page="currentPage = $event"
        :total="total"
        :loading="loading"
        @loading="loading = $event"
      />
    <template #sidebar="{ isInSidebar }">
      <SearchPanel v-if="isInSidebar" :isInSidebar="isInSidebar" />
      <UserSearch ref="userSearch" placeholder="activity-feed:search-users" v-if="isInSidebar" @uid="updateUID" class="mb-2"/>
      <ChooseView v-if="isInSidebar" />
      <DropdownSidebarPanel
        :options="options"
        class="my-3"
        paramName="filter"
        replace
        :isInSidebar="isInSidebar"
      />
      <p v-if="isInSidebar" class="ml-1 d-inline-block custom-control-label no-before no-after">{{ total }} results </p><br>
      <button v-if="isInSidebar" class="btn btn-primary mt-1 ml-1" @click="refresh">Refresh</button>
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
  import { navigationModes } from '@/store/pagination.vuex';
  import ChooseView from '@/components/Sidebar/ChooseView.vue';
  import UserSearch from './components/UserSearch.vue';
  import ActivityCard from './components/ActivityCard.vue';
  import MessageCompose from './components/MessageCompose.vue';

  const INITIAL_NUMBER = 18;

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
      UserSearch,
      ChooseView
    },
  })
  export default class ActivityFeed extends Mixins(FetchMixin) {
    notifications: NotificationItem[] = [];

    loading = true;

    async fetch(refresh = false) {
      const { filter, search, size, skip } = this.$route.query;
      const params = {
        search,
        size: size || INITIAL_NUMBER,
        filter: filter || 'all',
        skip,
        uid: this.uid || null,
      };

      if (refresh) {
        params.size = (parseInt(params.size as string, 10) + parseInt(params.skip! as string, 10)).toString();
        params.skip = '0';
      }

      const res = (
        await axios.get(ROUTE, {
          params,
        })
      ).data.data;

      const skipped = parseInt(params.skip as string, 10);
      const puzzlesLoaded = parseInt(params.size as string, 10);
      // Ensure splice places items where they should go by making the array larger
      while (this.notifications.length < skipped && this.pagesEnabled) {
        this.notifications.push({} as NotificationItem);
      }
      // Replace the old puzzles the new ones
      this.notifications.splice(skipped, puzzlesLoaded, ...res.entries);
      // Remove duplicates, in case a new puzzles was added
      this.notifications = [...new Set(this.notifications)];
      this.loading = false;
      this.total = res.count;
    }

    get pagesEnabled() {
      return this.$vxm.pagination.navigation === navigationModes.NAVIGATION_PAGES;
    }

    @Watch('pagesEnabled')
    async refresh() {
      this.$route.query.skip = this.notifications.length.toString();
      await this.fetch(true);
    }

    created() {
      this.refresh();
    }

    currentPage: number = 1;

    total = 0;

    get displayedNotifications() {
      if (this.pagesEnabled) {
        const start = (this.currentPage - 1) * 18;
        return this.notifications.slice(start, start + 18);
      }
      return this.notifications;
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

    uid = '';

    updateUID(newValue: string) {
      this.notifications = [];
      this.uid = newValue;
      this.fetch();
    }
  }
</script>

<style lang="scss" scoped>
.no-before::before, .no-after::after {
  content: none !important;
}
</style>
