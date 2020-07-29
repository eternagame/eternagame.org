<template>
  <div class="page-content card">
    <MessageItem
      :sender="message.sender"
      :created="message.created"
      :message="content"
      :avatar="avatar"
    >
      <template>
          {{ notification.target2_name + ' ' }} {{ isInvite ? $t('activity-feed:invite') : $t('activity-feed:broadcast') + ' ' }}
          <router-link :to="`/groups/${nid}`">
              {{ title }}
          </router-link>
      </template>
    </MessageItem>
  </div>
</template>
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import {GroupNotificationItem, GroupNotificationMessage, RegularGroupNotificationMessage, NotificationType } from '@/types/common-types';
  import Utils from '@/utils/utils';
  import MessageItem from './MessageItem.vue';

  @Component({
    components: { MessageItem },
  })
  export default class GroupMessageItem extends Vue {
    @Prop({ required: true }) readonly notification!: GroupNotificationItem;
    
    @Prop({ required: true }) readonly message!: GroupNotificationMessage;

    get nid() {
      return this.notification.nid;
    }

    get title() {
      return this.isInvite ? 'a group' : (this.message as RegularGroupNotificationMessage).content.group;
    }

    get isInvite() {
      return typeof this.message.content === 'string';
    }

    get content() {
      return this.isInvite ? this.message.content : (this.message as RegularGroupNotificationMessage).content.body;
    }

    get avatar() {
      return Utils.getAvatar(this.notification.target2_picture);
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';
  
  .card {
    color: $white;
    padding: 1rem 2rem;
    margin-bottom: 1.5rem;
    max-height: 600px;
    // cursor: pointer;
    transition: background-color 0.5s ease;
  }
</style>
