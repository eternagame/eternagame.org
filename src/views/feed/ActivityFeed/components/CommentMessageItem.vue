<template>
  <div class="page-content card">
    <MessageItem
      :sender="message.sender"
      :created="message.created"
      :avatar="avatar"
      :message="message.content.body"
    >
      <template>
          <router-link :to="`/players/` + message.sender">
            {{ notification.target2_name + ' ' }} 
          </router-link>
          {{ $t('activity-feed:commented-on') + ' ' }}
          <a :href="link">
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

    get link() {
      const { node_type, id } = this.message.content.node;
      switch (node_type) {
        case 'puzzle':
          return `/puzzles/${id}`;
        case 'lab':
          return `/labs/${id}`;
        case 'news':
        case 'blog':
          return `/news/${id}`;
        case 'group':
        case 'eterna_group':
          return `${process.env.VUE_APP_API_BASE_URL}/group/${id}/`;
        case 'solution': {
          const pid = (this.message.content.node as any).puzzle_id;
          return `${process.env.VUE_APP_API_BASE_URL}/game/browse/${pid}/?filter1=Id&filter1_arg1=${id}&filter1_arg2=${id}`;
        }
        default:
          return '#';
      }
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
