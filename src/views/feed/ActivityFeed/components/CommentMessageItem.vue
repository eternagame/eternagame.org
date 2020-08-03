<template>
  <div class="page-content card">
    <MessageItem
      :sender="message.sender"
      :created="message.created"
      :avatar="avatar"
      :message="message.content.body"
    >
      <template>
          {{ notification.target2_name + ' ' }} {{ $t('activity-feed:commented-on') + ' ' }}
          <a :href="`/${nodeType}/${message.content.node.id}`">
              {{ message.content.node.title }}
          </a>
      </template>
    </MessageItem>
  </div>
</template>
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import {CommentNotificationItem, CommentNotificationMessage} from '@/types/common-types';
  import Utils from '@/utils/utils';
  import MessageItem from './MessageItem.vue';

  @Component({
    components: { MessageItem },
  })
  export default class CommentMessageItem extends Vue {
    @Prop({ required: true }) readonly notification!: CommentNotificationItem;
    
    @Prop({ required: true }) readonly message!: CommentNotificationMessage;

    get avatar() {
      return Utils.getAvatar(this.notification.target2_picture);
    }

    get nodeType() {
      const { node_type } = this.message.content.node;
      if (node_type === 'puzzle') return 'puzzles';
      if (node_type === 'solution') return 'solutions';
      if (node_type === 'group') return 'groups';
      return `${node_type}s`;
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
