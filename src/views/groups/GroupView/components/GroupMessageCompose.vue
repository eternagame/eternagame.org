<template>
  <div class="page-content card">
    <div class="container">
      <div class="d-flex">
        <h4 class="mt-3 mr-3">{{ $t('group-view:message') }}</h4>
      </div>
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
  </div>
</template>
<script lang="ts">
  import axios, { AxiosInstance } from 'axios';
  // @ts-ignore
  import debounce from 'lodash.debounce';
  import { Component, Vue, Mixins, Prop, Watch, Ref } from 'vue-property-decorator';
  import EditField from '@/components/Common/EditField.vue';
  // @ts-ignore
  import VueBootstrapTypeahead from 'vue-bootstrap-typeahead';

  @Component({ components: { EditField, VueBootstrapTypeahead } })
  export default class MessageCompose extends Vue {
    @Prop() readonly parentNID?: number;

    @Prop() readonly uid?: number;

    commentText: string = '';

    targetName = '';

    isSending: boolean = false;

    messagesSent = 0;

    @Ref('typeahead') readonly typeahead!: { inputValue: string };

    mounted() {
      if (this.$route.query.message) {
        this.typeahead.inputValue = String(this.$route.query.message);
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
        group_nid: this.parentNID?.toString(),
        body: message,
      };

      // @ts-ignore
      if (this.parentNID) params.parent_nid = this.parentNID;

      await axios.post('/post/?type=message', new URLSearchParams(params));
    }

    async sendMessage() {
      this.isSending = true;
      try {
        await this.postMessage(this.commentText);
      } catch (e) {
        // TODO: Differentiate errors (no username? post issue?), use a better UI
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

  ::v-deep .editor {
    background-color: rgba(1, 1, 1, 0.53);
  }

  ::v-deep input {
    color: $white;
    background-color: rgba(1, 1, 1, 0.53);
  }
</style>
