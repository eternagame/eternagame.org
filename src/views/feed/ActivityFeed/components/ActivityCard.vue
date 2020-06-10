<template>
  <div>
    <MessageThread v-if="isPrivateMessage" :notification="notification" />
    <CommentMessageItem v-else-if="isComment" :notification="notification" :message="commentMessage" />
    <NewsItem v-else-if="isNews" :article="notification" />
  </div>
</template>
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import {
    NotificationItem,
    NotificationType,
    isPMNotiItem,
    isCommentNotiItem,
    CommentNotificationItem
  } from '@/types/common-types';
  import MessageThread from './MessageThread.vue';
  import CommentMessageItem from './CommentMessageItem.vue';
  import NewsItem from './NewsItem.vue';

  @Component({
    components: {
      MessageThread,
      NewsItem,
      CommentMessageItem
    },
  })
  export default class ActivityCard extends Vue {
    @Prop({ required: true }) readonly notification!: NotificationItem;

    get isPrivateMessage() {
      return isPMNotiItem(this.notification);
    }

    get isComment() {
      return isCommentNotiItem(this.notification);
    }

    get commentMessage() {
      return this.isComment ? (this.notification as CommentNotificationItem).message[0] : '';
    }

    get isNews() {
      return [NotificationType.NEWS, NotificationType.BLOG].includes(this.notification.type);
    }
  }
</script>

<style lang="scss" scoped></style>
