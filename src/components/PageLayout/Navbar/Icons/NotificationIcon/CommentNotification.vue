<template>
  <BaseNotification
    :to="`/feed#${comment.message[0].created}`"
    :avatar="avatar"
    :prefix="`${name} ${$t('bell-icon:comment')}`"
    :content="comment.message[0].content"
  />
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { CommentNotificationItem } from '@/types/common-types';
  import Utils from '@/utils/utils';
  import BaseNotification from './BaseNotification.vue';

  @Component({
      components: {
        BaseNotification
      },
  })
  export default class PrivateMessageNotification extends Vue {
    @Prop({ required: true }) readonly comment!: CommentNotificationItem;
    
    get name() {
      return this.comment.message[0].sender === this.comment.target_uid
        ? this.comment.target_name
        : this.comment.target2_name;
    }

    get avatar() {
      return Utils.getAvatar(
        this.comment.message[0].sender === this.comment.target_uid
          ? this.comment.target_picture
          : this.comment.target2_picture,
      );
    }
  }
</script>
