<template>
  <div>
    <div class="page-content card">
      <PrivateMessageItem
        v-for="(item, index) in messages"
        :key="item.created"
        :message="item"
        :notification="notification"
        :style="{paddingLeft: index === 0 ? 0 : '50px'}"
      />
      <div style="margin-top: 5px;">
        <b-button
          class="mt-2"
          variant="primary"
          @click="showCompose = !showCompose"
          v-if="!showCompose && messages[0].type == 'message'"
        >
          {{ $t('activity-feed:reply') }}
        </b-button>
        <MessageCompose
          :parentNID="this.notification.nid"
          :uid="replyUID"
          v-if="showCompose"
          @cancel="showCompose = false"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { PrivateMessageNotificationItem } from '@/types/common-types';
  import PrivateMessageItem from './PrivateMessageItem.vue';
  import MessageCompose from './MessageCompose.vue';

  @Component({
    components: { PrivateMessageItem, MessageCompose },
  })
  export default class MessageThread extends Vue {
    @Prop({ required: true }) readonly notification!: PrivateMessageNotificationItem;

    private showCompose = false;

    private messages = this.notification.message;

    get replyUID() {
      return String(this.notification.target_uid) !== String(this.$vxm.user.uid)
        ? this.notification.target_uid
        : this.notification.target2_uid;
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';

  .card {
    color: $white;

    padding: 1rem 2rem;
    margin-bottom: 1.5rem;
    // cursor: pointer;
    transition: background-color 0.5s ease;
  }
</style>
