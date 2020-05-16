<template>
  <!-- TODO: i18nify all content -->
  <div class="page-content card">
    <div class="container">
      <div class="d-flex">
        <h4 class="mt-3 mr-3">{{ $t('activity-feed:to') }}</h4>
        <!-- TODO: Detect invalid/duplicate entries: https://bootstrap-vue.org/docs/components/form-tags#detecting-new-invalid-and-duplicate-tags -->
        <b-form-input
          input-id="input-basic"
          v-model="targetName"
          :placeholder="$t('activity-feed:add-recipient')"
          class="mb-2"
        >
        </b-form-input>
      </div>
      <EditField @input="setCommentText" />

      <b-button
        class="btn-lg mt-2"
        type="submit"
        variant="primary"
        @click="sendMessage"
        :disabled="isSending || targetName.length || !commentText"
      >
        {{ $t('activity-feed:share') }}
        <b-spinner v-if="isSending" small></b-spinner>
      </b-button>
    </div>
  </div>
</template>
<script lang="ts">
  import axios, { AxiosInstance } from 'axios';

  import { Component, Vue, Mixins, Prop } from 'vue-property-decorator';
  import EditField from '@/components/Common/EditField.vue';

  @Component({ components: { EditField } })
  export default class MessageCompose extends Vue {
    commentText: string = '';

    targetName = '';

    isSending: boolean = false;

    setCommentText(text: string) {
      this.commentText = text;
    }

    async lookupUid(username: string) {
      console.log(username);
      if (!username) {
        throw new Error(`Could not find username: ${username}`);
      }

      const { users } = (
        await axios.get('/get/?type=users', {
          params: {
            size: 10,
            search: username,
          },
        })
      ).data.data;

      if (!users || users.length === 0) {
        throw new Error(`Could not find username: ${username}`);
      }

      const { uid } = users[0];
      console.log(`Found: ${uid}`);
      return uid;
    }

    async postMessage(targetUid: string, message: string) {
      await axios.post(
        '/post/?type=message',
        new URLSearchParams({
          type: 'message',
          action: 'add',
          notification_type: 'message',
          target_uid: targetUid,
          body: message,
        }),
      );
    }

    async sendMessage() {
      this.isSending = true;
      try {
        const targetUid: string = await this.lookupUid(this.targetName);
        await this.postMessage(targetUid, this.commentText);
      } catch (e) {
        // TODO: Differentiate errors (no username? post issue?), use a better UI
        alert(`Error posting message.\n${e}`);
      }
      this.isSending = false;
      // TODO: Refresh feed to show the newly posted message
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

  ::v-deep .editor-box {
    background-color: $extreme-dark;
  }

  ::v-deep input {
    color: $white;
  }
</style>
