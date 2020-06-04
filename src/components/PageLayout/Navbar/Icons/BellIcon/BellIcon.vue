<template>
  <NavbarIcon @shown="shown">
    <template #icon>
      <div class="unread" v-if="notificationsCount > 0"></div>
      <img class="icon mr-1" src="@/assets/navbar/Bell.svg" />
    </template>
    <template #text>{{ $t('nav-bar:notifications') }}</template>
    <template v-slot="slotProp">
      <div class="activity-container">
        <div class="d-flex justify-content-between">
          <h1 class="header">{{ $t('nav-bar:notifications-title') }}</h1>
          <router-link to="/feed">
            <img
              class="mt-2"
              src="@/assets/navbar/popOut.svg"
              @click="slotProp.hideDropdown.hide()"
            />
          </router-link>
        </div>
        <div class="border"></div>
        <b-dropdown-item
          v-for="item in notifications"
          :key="item.created || item.timestamp || item.nid || item.id"
          style="padding-left:0px;margin-left:0px"
          :to="isMessageRelated(item) ? `/feed#${item.created}` : `/news/${item.nid || item.id}`"
        >
          <PlayerMessageNotification v-if="isMessageRelated(item)" :article="item" />
          <NewsNotification v-else v-bind="item" />
        </b-dropdown-item>
        <b-dropdown-item v-if="notifications.length == 0">{{
          $t('activity-feed:empty')
        }}</b-dropdown-item>
      </div>
    </template>
  </NavbarIcon>
</template>
<script lang="ts">
  import { Component, Prop, Vue, Mixins } from 'vue-property-decorator';
  import { RouteCallback, Route } from 'vue-router';
  import axios, { AxiosInstance } from 'axios';
  import PageDataMixin from '@/mixins/PageData';
  import { NewsItem, UserMessage, NotificationItem } from '@/types/common-types';
  import Utils from '@/utils/utils';
  import NavbarIcon from '../NavbarIcon.vue';
  import NewsNotification from './NewsNotification.vue';
  import PlayerMessageNotification from './PlayerMessageNotification.vue';

  const NUM_NOTIFICATIONS_ROUTE = '/get/?type=noti_count_for_user';

  const NEWS_FEED_ROUTE = '/get/?type=newsfeed&combined=true&filter=all';

  const NOTIFICATIONS_READ = '/post/';

  const USER_ROUTE = '/get/?type=user&uid=';

  const NUMBER_NOTIFICATIONS_TO_SHOW = 5;

  const REFRESH_FREQUENCY = 30000; // 30 seconds

  @Component({
    components: {
      NavbarIcon,
      NewsNotification,
      PlayerMessageNotification,
    },
  })
  export default class BellIcon extends Vue {
    private notificationsCount = 0;

    private calledFetch = false;

    private notifications: Array<NewsItem> = [];

    shown() {
      this.fetchData();
      axios.post(NOTIFICATIONS_READ, new URLSearchParams({ type: 'notification_read' }));
    }

    isMessageRelated(item: NewsItem) {
      return item.type === 'notifications' || item.type === 'message';
    }

    refreshData() {
      axios.get(NUM_NOTIFICATIONS_ROUTE).then(response => {
        const notificationCount = response.data.data.noti_count;
        this.notificationsCount = notificationCount;
        if (notificationCount > 0) this.fetchData();
      });
    }

    checkDataInterval: any = null;

    mounted() {
      this.fetchData();
      if (!this.checkDataInterval) {
        this.checkDataInterval = setInterval(this.refreshData, REFRESH_FREQUENCY);
      }
    }

    destroyed() {
      clearInterval(this.checkDataInterval);
    }

    async fetchData() {
      // Note: newsfeed endpoint requires credentials
      const response = await axios.get(NEWS_FEED_ROUTE, {
        withCredentials: true,
      });
      // TODO https://github.com/eternagame/eternagame.org/issues/17 improve typing
      const res = response.data.data as any;

      this.notifications = res.entries
        .map((entry: NewsItem) => this.addMessageData(entry))
        .flat()
        .sort((a: NewsItem, b: NewsItem) => b.created - a.created)
        .slice(0, NUMBER_NOTIFICATIONS_TO_SHOW);
    }

    private uid = this.$vxm.user.userDetails?.uid;

    addMessageData(entry: NewsItem) {
      if (!this.isMessageRelated(entry)) return entry;
      const messages = entry.message || [];
      return (
        messages
          .map((message: UserMessage) => ({ ...message, ...entry }))
          // TODO https://github.com/eternagame/eternagame.org/issues/17 improve typing
          .filter(item => item.sender !== this.uid)
      );
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';

  .icon {
    margin-left: -0.2rem;
  }

  ::v-deep a {
    padding-right: 10px !important;
    padding-left: 10px !important;
    border-radius: 3px;
  }

  .activity-container {
    padding: 4%;
    width: 300px;
    max-width: 100%;
  }

  .header {
    font-size: 16px;
    font-weight: bold;
    margin-top: 14.5px;
  }

  .border {
    border: 1px solid red;
    width: 100%;
  }
</style>
