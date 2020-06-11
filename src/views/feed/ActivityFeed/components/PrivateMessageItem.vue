<template>
  <MessageItem
    :sender="message.sender"
    :created="message.created"
    :avatar="avatar"
    :message="message.content"
  >
    {{ senderName }} > {{ recieverName }}:
  </MessageItem>
</template>
<script lang="ts">
  import { Component, Prop, Vue, Watch, Ref } from 'vue-property-decorator';
  import { PrivateNotificationMessage, PrivateMessageNotificationItem } from '@/types/common-types';
  import Utils from '@/utils/utils';
  import MessageItem from './MessageItem.vue';

  @Component({
    components: { MessageItem },
  })
  export default class PrivateMessageItem extends Vue {
    @Prop({ required: true }) readonly notification!: PrivateMessageNotificationItem;
    
    @Prop({ required: true }) readonly message!: PrivateNotificationMessage;

    get senderName() {
      return this.message.sender === this.notification.target_uid
        ? this.notification.target_name
        : this.notification.target2_name;
    }

    get recieverName() {
      return this.message.sender === this.notification.target_uid
        ? this.notification.target2_name
        : this.notification.target_name;
    }

    get avatar() {
      return Utils.getAvatar(
        this.message.sender === this.notification.target_uid
          ? this.notification.target_picture
          : this.notification.target2_picture,
      );
    }
  }
</script>

<style lang="scss" scoped>

</style>
