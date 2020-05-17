<template>
  <!-- TODO: i18nify all content -->
  <div class="page-content card">
    <div class="container">
      <div class="d-flex">
        <h4 class="mt-3 mr-3">{{ $t('activity-feed:to') }}</h4>
        <vue-bootstrap-typeahead
          ref="typeahead"
          :placeholder="$t('activity-feed:add-recipient')"
          v-model="targetName"
          :data="usernames"
          :serializer="user => user.username"
          :key="messagesSent"
        >
          <template slot="suggestion" slot-scope="{ data, htmlText }">
            <div class="d-flex align-items-center">
              <img
                v-if="data.userpicture"
                class="rounded-circle"
                :src="`/${data.userpicture}`"
                style="width: 40px; height: 40px;margin-right:10px"
              />

              <span v-dompurify-html="htmlText" style="color: white"></span>
            </div>
          </template>
        </vue-bootstrap-typeahead>
      </div>
      <EditField @input="setCommentText" :key="messagesSent" />

      <b-button
        class="btn-lg mt-2"
        type="submit"
        variant="primary"
        @click="sendMessage"
        :disabled="isSending || !targetName.length || !commentText"
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
  import VueBootstrapTypeahead from 'vue-bootstrap-typeahead';

  @Component({ components: { EditField, VueBootstrapTypeahead } })
  export default class MessageCompose extends Vue {
    commentText: string = '';

    targetName = '';

    isSending: boolean = false;

    usernames = [];

    messagesSent = 0;

    async fetchData() {
      this.usernames = (await axios.get('/get/?type=usernames')).data.data.usernames;
    }

    mounted() {
      if (this.$route.query.message) {
        this.$refs.typeahead.inputValue = this.$route.query.message;
        this.targetName = this.$route.query.message;
      }
      this.fetchData();
    }

    setCommentText(text: string) {
      this.commentText = text;
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
      this.$emit('submit-message');
      this.messagesSent += 1;
      this.targetName = '';
    }

    async lookupUid(username: string) {
      if (!username) {
        throw new Error(`Could not find username: ${username}`);
      }

      const { users } = (
        await axios.get('/get/?type=users', {
          params: {
            size: 1,
            search: username,
          },
        })
      ).data.data;

      if (!users || users.length === 0) {
        throw new Error(`Could not find username: ${username}`);
      }

      const { uid } = users[0];
      return uid;
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

  ::v-deep .vbst-item {
  }

  ::v-deep .vbst-item.active {
  }

  ::v-deep input {
    color: $white;
  }
</style>
