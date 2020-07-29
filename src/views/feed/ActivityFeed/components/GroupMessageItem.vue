<template>
  <div class="page-content card">
    <MessageItem
      :sender="message.sender"
      :created="message.created"
      :message="message.content.body"
      :avatar="avatar"
    >
      <template>
          {{ notification.target2_name + ' ' }} {{ $t('activity-feed:commented-on') + ' ' }}
          <router-link :to="`/groups/${nid}`">
              {{ title }}
          </router-link>
      </template>
    </MessageItem>
  </div>
</template>
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import {GroupNotificationItem, GroupNotificationMessage, RegularGroupNotificationMessage} from '@/types/common-types';
  import Utils from '@/utils/utils';
  import MessageItem from './MessageItem.vue';

  @Component({
    components: { MessageItem },
  })
  export default class GroupMessageItem extends Vue {
    @Prop({ required: true }) readonly notification!: GroupNotificationItem;
    
    @Prop({ required: true }) readonly message!: GroupNotificationMessage;

    get nid() {
      if (!this.message || !this.message.content) return '';
      const asNode = this.message.content as { node: { id: string } };
      if (!asNode || !asNode.node || !asNode.node.id) return '';
      return asNode.node.id;
    }

    get title() {
      if (!this.message || !this.message.content) return '';
      const asNode = this.message.content as { node: { title: string } };
      if (!asNode || !asNode.node || !asNode.node.title) return '';
      return asNode.node.title;
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
