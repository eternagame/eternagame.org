<template>
<div>
      <EditField @input="setCommentText" :key="messagesSent" />

      <b-button
        class="btn-lg mt-2"
        type="submit"
        variant="primary"
        @click="sendMessage"
        :disabled="isSending || !commentText"
      >
        {{ $t('activity-feed:send') }}
        <b-spinner v-if="isSending" small></b-spinner>
      </b-button>
  </div>
</template>
<script lang="ts">
  import axios from 'axios';
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import EditField from '@/components/Common/EditField.vue';

  @Component({ components: { EditField } })
  export default class MessageCompose extends Vue {
    @Prop() readonly parentNID?: number;

    @Prop() readonly uid?: number;

    commentText: string = '';

    targetName = '';

    isSending: boolean = false;

    messagesSent = 0;

    mounted() {
      if (this.$route.query.message) {
        this.targetName = String(this.$route.query.message);
      }
    }

    setCommentText(text: string) {
      this.commentText = text;
    }

    async postMessage(message: string) {
      const params = {
        type: 'messages',
        action: 'add',
        notification_type: 'message',
        group_nid: (this.parentNID? this.parentNID : 'null').toString(),
        body: message,
      };

      await axios.post('/post/?type=message', new URLSearchParams(params));
    }

    async sendMessage() {
      this.isSending = true;
      try {
        await this.postMessage(this.commentText);
      } catch (e) {
        // eslint-disable-next-line
        alert(`Error posting message.\n${e}`);
      }
      this.isSending = false;
      this.$emit('submit-message');
      this.messagesSent += 1;
      this.targetName = '';
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';

  $extreme-dark: #010101;

  $very-dark: #101010;

  .page-content {
    background-color: $very-dark;
  }

  .page-content {
    background-color: lighten($med-dark-blue, 10);
  }

  :deep(.editor) {
    background-color: rgba(1, 1, 1, 0.53);
  }

  :deep(input) {
    color: $white;
    background-color: rgba(1, 1, 1, 0.53);
  }
</style>
