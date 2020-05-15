<template>
  <!-- TODO: i18nify all content -->
  <div class="page-content card">
    <div class="container">
      <div class="d-flex">
        <h4 class="mt-3 mr-3">To:</h4>
        <!-- TODO: Detect invalid/duplicate entries: https://bootstrap-vue.org/docs/components/form-tags#detecting-new-invalid-and-duplicate-tags -->
        <b-form-tags
          input-id="tags-basic"
          v-model="targetNames"
          placeholder="Add recipient..."
          class="mb-2"
        >
        </b-form-tags>
      </div>
      <!-- TODO: Replace with rich html editor -->
      <textarea
        rows="3"
        class="form-control"
        v-model="commentText"
        placeholder="Type your message..."
      />
      <b-button
        class="btn-lg mt-2"
        type="submit"
        variant="primary"
        @click="sendMessage"
        :disabled="isSending || targetNames.length == 0 || !commentText"
      >
        Share
        <b-spinner v-if="isSending" small></b-spinner>
      </b-button>
    </div>
  </div>
</template>
<script lang="ts">
  import axios, { AxiosInstance } from 'axios';

  import { Component, Vue, Mixins, Prop } from 'vue-property-decorator';

  @Component({})
  export default class MessageCompose extends Vue {
    commentText: string = '';

    targetNames: string[] = [''];

    isSending: boolean = false;

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
        if (this.targetNames.length > 1) {
          throw new Error('Messages can only have one recipient (for now).');
        }
        const targetUid: string = await this.lookupUid(this.targetNames[0]);
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

  .page-content {
    background-color: #101010;
  }

  ::v-deep textarea,
  ::v-deep .b-form-tags {
    background-color: #010101;

    background-color: #010101;
  }

  ::v-deep textarea:focus,
  ::v-deep .b-form-tags:focus {
    background-color: #101010;
  }

  ::v-deep input {
    color: $white;
  }
</style>
