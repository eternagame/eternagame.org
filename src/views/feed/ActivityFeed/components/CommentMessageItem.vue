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
            {{ notification.target2_name }}
          </router-link>
          {{ ' ' + $t('activity-feed:commented-on') + ' ' }}
          <router-link :to="link">
              {{ message.content.node.title }}
          </router-link>
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
        return `/groups/${id}/`;
      case 'solution': {
        const pid = (this.message.content.node as any).puzzle_id;
        return `/puzzles/${pid}/browse?filter1=Id&filter1_arg1=${id}&filter1_arg2=${id}`;
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
    transition: background-color 0.5s ease;
  }
</style>
