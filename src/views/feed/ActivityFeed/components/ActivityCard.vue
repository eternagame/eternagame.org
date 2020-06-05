<template>
  <div>
    <MessageThread v-if="isPrivateMessage" :article="notification" />
    <CommentMessageItem v-if="isComment" :notification="notification" :message="commentMessage" />
    <NewsItem v-if="isNews" :notification="notification" />
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
  import MessageItem from './MessageItem.vue';
  import NewsItem from './NewsItem.vue';

  @Component({
    components: { MessageThread, NewsItem, MessageItem },
  })
  export default class ActivityCard extends Vue {
    @Prop() private notification!: NotificationItem;

    get isPrivateMessage() {
      return isPMNotiItem(this.notification);
    }

    get isComment() {
      return isCommentNotiItem(this.notification);
    }

    get commentMessage() {
      return (this.notification as CommentNotificationItem).message[0];
    }

    get isNews() {
      return this.notification.type === NotificationType.NEWS || NotificationType.BLOG;
    }
  }
</script>

<style lang="scss" scoped></style>
