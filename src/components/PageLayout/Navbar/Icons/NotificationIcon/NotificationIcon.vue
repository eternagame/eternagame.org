<template>
  <NavbarIcon @shown="onShown">
    <template #icon>
      <div class="unread" v-if="notificationsCount > 0"></div>
      <img class="icon" src="@/assets/navbar/Bell.svg" />
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
        <template v-for="item in notifications">
          <NewsNotification v-if="isNewsItem(item)" :key="getCreated(item)" :article="item" />
          <PrivateMessageNotification v-else-if="isPM(item)" :key="getCreated(item)" :pm="item" />
          <CommentNotification v-else-if="isComment(item)" :key="getCreated(item)" :comment="item" />
        </template>
        <b-dropdown-item v-if="notifications.length == 0">
          {{$t('activity-feed:empty')}}
        </b-dropdown-item>
      </div>
    </template>
  </NavbarIcon>
</template>
<script lang="ts">
  import { Component, Prop, Vue, Mixins } from 'vue-property-decorator';
  import { RouteCallback, Route } from 'vue-router';
  import {
    NotificationItem,
    isNotiNotiItem,
    isDirectedNotificationItem,
    NotificationMessage,
    isPMNotiItem,
    NotificationType,
    isCommentNotiItem
  } from '@/types/common-types';
  import FetchMixin from '@/mixins/FetchMixin';
  import Utils from '@/utils/utils';
  import NavbarIcon from '../NavbarIcon.vue';
  import NewsNotification from './NewsNotification.vue';
  import PrivateMessageNotification from './PrivateMessageNotification.vue';
  import CommentNotification from './CommentNotification.vue';

  const NUM_NOTIFICATIONS_ROUTE = '/get/?type=noti_count_for_user';

  const NEWS_FEED_ROUTE = '/get/?type=newsfeed&combined=true&filter=all';

  const USER_ROUTE = '/get/?type=user&uid=';

  const NUMBER_NOTIFICATIONS_TO_SHOW = 5;

  const REFRESH_FREQUENCY = 20000; // 20 seconds

  @Component({
    components: {
      NavbarIcon,
      NewsNotification,
      PrivateMessageNotification,
      CommentNotification
    },
  })
  export default class NotificationIcon extends Mixins(FetchMixin) {
    private notificationsCount = 0;

    private calledFetch = false;

    private notifications: NotificationItem[] = [];

    checkDataInterval?: number;

    async mounted() {
      this.checkDataInterval = setInterval(this.$fetch, REFRESH_FREQUENCY);
    }

    destroyed() {
      clearInterval(this.checkDataInterval);
    }

    async onShown() {
      await this.$http.post('/post/', new URLSearchParams({ type: 'notification_read' }));
      await this.$fetch();
    }

    async fetch() {
      const res = await this.$http.get(NUM_NOTIFICATIONS_ROUTE);
      this.notificationsCount = res.data.data.noti_count;
      if (res.data.data.noti_count > this.notificationsCount || !this.fetchState.firstFetchComplete) {
        await this.updateDropdownContents();
      }
    }

    async updateDropdownContents() {
      const response = await this.$http.get(NEWS_FEED_ROUTE);
      
      // TODO https://github.com/eternagame/eternagame.org/issues/17 improve typing
      const res = response.data.data.entries as NotificationItem[];

      this.notifications = res
        .map(this.splitMessageThreads)
        .flat()
        .sort((a, b) => this.getCreated(b) - this.getCreated(a))
        .slice(0, NUMBER_NOTIFICATIONS_TO_SHOW);
    }

    splitMessageThreads(notification: NotificationItem) {
      return isPMNotiItem(notification)
        ? notification.message.map(message => ({...notification, message: [message]}))
        : notification;
    }

    getCreated(notification: NotificationItem) {
      return Number(isDirectedNotificationItem(notification) ? notification.message[0].created : notification.timestamp);
    }

    private get uid() {
      return this.$vxm.user.userDetails?.uid;
    }

    private isNewsItem(notification: NotificationItem) {
      return notification.type === NotificationType.NEWS || notification.type === NotificationType.BLOG;
    }

    private isPM(notification: NotificationItem) {
      return isPMNotiItem(notification);
    }

    private isComment(notification: NotificationItem) {
      return isCommentNotiItem(notification);
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';

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

  img.icon {
    width: 24px;
    height: 24px;
  }
</style>
