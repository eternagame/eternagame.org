<template>
  <NavbarIcon @shown="onShown">
    <template #icon>
      <div class="d-inline-block">
        <div class="unread" v-if="notificationsCount > 0"></div>
        <img class="icon" src="@/assets/navbar/Bell.svg" alt="notifications" />
      </div>
    </template>
    <template #text>{{ $t('nav-bar:notifications') }}</template>
    <template v-slot="slotProp">
      <div class="activity-container">
        <div class="d-flex justify-content-between">
          <div style="display: flex;">
            <h1 class="header">{{ $t('nav-bar:notifications-title') }}</h1>
            <div v-if="isFetching" class="fetch-loader">
              <SimpleLoader />
            </div>
          </div>
        </div>
        <div class="border"></div>
        <template v-for="item in notifications">
          <NewsNotification v-if="isNewsItem(item)" :key="getCreated(item)" :article="item" />
          <PrivateMessageNotification v-else-if="isPM(item)" :key="getCreated(item)" :pm="item" />
          <CommentNotification v-else-if="isComment(item)" :key="getCreated(item)" :comment="item" />
          <GroupNotificationItem v-else-if="isGroup(item)" :key="getCreated(item)" :group="item" />
          <RewardNotificationItem v-else-if="isReward(item)" :key="getCreated(item)" :reward="item" />
        </template>
        <b-dropdown-item v-if="notifications.length == 0">
          {{$t('activity-feed:empty')}}
        </b-dropdown-item>
      </div>
      <div class="border"></div>
      <router-link to="/feed" style="color:white">
        <div class="view-all-link" @click="slotProp.hideDropdown.hide()">
          {{ $t('nav-bar:notifications-view-all') }}
        </div>
      </router-link>
    </template>
  </NavbarIcon>
</template>
<script lang="ts">
  import { Component, Mixins } from 'vue-property-decorator';
  import {
    NotificationItem,
    isDirectedNotificationItem,
    isPMNotiItem,
    NotificationType,
    isCommentNotiItem
  } from '@/types/common-types';
  import FetchMixin from '@/mixins/FetchMixin';
  import NavbarIcon from '../NavbarIcon.vue';
  import NewsNotification from './NewsNotification.vue';
  import PrivateMessageNotification from './PrivateMessageNotification.vue';
  import CommentNotification from './CommentNotification.vue';
  import GroupNotificationItem from './GroupNotification.vue';
  import RewardNotificationItem from './RewardNotification.vue';
  import SimpleLoader from '../../../SimpleLoader.vue';

  const NUM_NOTIFICATIONS_ROUTE = '/get/?type=noti_count_for_user';

  const NEWS_FEED_ROUTE = '/get/?type=newsfeed&combined=true&filter=all';

  const NUMBER_NOTIFICATIONS_TO_SHOW = 5;

  const REFRESH_FREQUENCY = 20000; // 20 seconds

  @Component({
    components: {
      NavbarIcon,
      NewsNotification,
      PrivateMessageNotification,
      CommentNotification,
      GroupNotificationItem,
      RewardNotificationItem,
      SimpleLoader
    },
  })
  export default class NotificationIcon extends Mixins(FetchMixin) {
    private notificationsCount = 0;

    private isDropdownShown = false;

    private isFetching = false;

    private notifications: NotificationItem[] = [];

    checkDataInterval?: number;

    async mounted() {
      this.checkDataInterval = setInterval(this.$fetch, REFRESH_FREQUENCY);
    }

    destroyed() {
      clearInterval(this.checkDataInterval);
    }

    async onShown(isShown: boolean) {
      this.isDropdownShown = isShown;
      await this.$fetch();
    }

    async fetch() {
      const res = await this.$http.get(NUM_NOTIFICATIONS_ROUTE);
      this.notificationsCount = res.data.data.noti_count;

      if (this.notificationsCount > 0 || !this.fetchState.firstFetchComplete) {
        this.isFetching = true;
        await this.updateDropdownContents();
        this.isFetching = false;

        if (this.isDropdownShown) {
          this.notificationsCount = 0;
          await this.$http.post('/post/', new URLSearchParams({ type: 'notification_read' }));
        }
      }
    }

    async updateDropdownContents() {
      const response = await this.$http.get(NEWS_FEED_ROUTE);

      // TODO https://github.com/eternagame/eternagame.org/issues/17 improve typing
      const res = response.data.data.entries as NotificationItem[];

      if (res) {
        this.notifications = res
          .map(this.splitMessageThreads)
          .flat()
          .sort((a, b) => this.getCreated(b) - this.getCreated(a))
          .slice(0, NUMBER_NOTIFICATIONS_TO_SHOW);
      }
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
      return this.$vxm.user.uid;
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

    private isGroup(notification: NotificationItem) {
      return isDirectedNotificationItem(notification);
    }

    private isReward(notification: NotificationItem) {
      return notification.type === NotificationType.REWARD;
    }

  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';

<<<<<<< HEAD
  :deep(a) {
=======
  ::v-deep a.dropdown-item {
>>>>>>> dev
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

    @include media-breakpoint-down(md) {
      font-size: 13px;
    }
  }

  .border {
    border: 1px solid red;
    width: 100%;
  }

  img.icon {
    width: 24px;
    height: 24px;
  }

  .view-all-link {
    padding: 10px;
    text-align: center;
    color: white !important;

    &:hover, &:focus {
      background-color: #212529;

      @include media-breakpoint-down(md) {
        background-color: var(--primary);
      }
    }
  }

  .fetch-loader {
    margin: 0 10px;
    width: 25px;
    height: 25px;
    align-self: center;

    @include media-breakpoint-down(md) {
      width: 18px;
      height: 18px;
    }
  }
</style>
