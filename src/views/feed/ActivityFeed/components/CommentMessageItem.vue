<template>
  <MessageItem
    :sender="message.sender"
    :created="message.created"
    :avatar="avatar"
  >
    <template>
        {{ notification.target2_name + ' ' }} {{ $t('activity-feed:commented-on') + ' ' }}
        <a :href="`/${message.content.node.node_type}s/${message.content.node.id}`">
            {{ message.content.node.title }}</a
        >
    </template>
  </MessageItem>
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
    @Prop() notification!: CommentNotificationItem;
    
    @Prop() message!: CommentNotificationMessage;

    get avatar() {
      return Utils.getAvatar(this.notification.target2_picture);
    }
  }
</script>

<style lang="scss" scoped>

</style>
