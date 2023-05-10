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
      <Pagination :key="notifications.length" />
    </div>
    <div v-else>
      <Preloader />
    </div>
    <template #sidebar="{ isInSidebar }">
      <!--SearchPanel v-if="isInSidebar" :isInSidebar="isInSidebar" /-->
      <DropdownSidebarPanel
        :options="options"
        paramName="filter"
        replace
        :isInSidebar="isInSidebar"
      />
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
    },
  })
  export default class ActivityFeed extends Mixins(FetchMixin) {
    notifications: NotificationItem[] = [];

    async fetch() {
      const { filter, search, size } = this.$route.query;
      const res = (
        await axios.get(ROUTE, {
          params: {
            size: size || INITIAL_NUMBER,
            search,
            filter: filter || 'all',
          },
        })
      ).data.data;
      this.notifications = res.entries;
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
