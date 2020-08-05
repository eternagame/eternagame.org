<template>
  <BaseNotification
    :to="`/feed#${group.message[0].created}`"
    :avatar="avatar"
    :prefix="`${name} ${isInvite ? $t('bell-icon:invite') : $t('bell-icon:broadcast')}`"
    :content="content"
  />
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { GroupNotificationItem, GroupNotificationMessage, RegularGroupNotificationMessage } from '@/types/common-types';
  import Utils from '@/utils/utils';
  import BaseNotification from './BaseNotification.vue';

  @Component({
      components: {
        BaseNotification
      },
  })
  export default class GroupNotification extends Vue {
    @Prop({ required: true }) readonly group!: GroupNotificationItem;

    get message() {
      return this.group.message[0];
    }

    get isInvite() {
      return typeof this.message.content === 'string';
    }

    get content() {
      return this.isInvite ? this.message.content : (this.message.content as { body: string}).body;
    }
    
    get name() {
      return this.group.message[0].sender === this.group.target_uid
        ? this.group.target_name
        : this.group.target2_name;
    }

    get avatar() {
      return Utils.getAvatar(
        this.group.message[0].sender === this.group.target_uid
          ? this.group.target_picture
          : this.group.target2_picture,
      );
    }
  }
</script>
