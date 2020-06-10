<template>
  <BaseNotification
    :to="`/feed#${pm.message[0].created}`"
    :avatar="avatar"
    :prefix="`${name} ${$t('bell-icon:message')}`"
    :content="pm.message[0].content"
  />
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { PrivateMessageNotificationItem } from '@/types/common-types';
  import Utils from '@/utils/utils';
  import BaseNotification from './BaseNotification.vue';

  @Component({
      components: {
        BaseNotification
      },
  })
  export default class PrivateMessageNotification extends Vue {
    @Prop({ required: true }) readonly pm!: PrivateMessageNotificationItem;

    get name() {
      return this.pm.message[0].sender === this.pm.target_uid
        ? this.pm.target_name
        : this.pm.target2_name;
    }

    get avatar() {
      return Utils.getAvatar(
        this.pm.message[0].sender === this.pm.target_uid
          ? this.pm.target_picture
          : this.pm.target2_picture,
      );
    }
  }
</script>
