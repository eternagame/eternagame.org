<template>
  <!-- TODO: i18nify all content -->
  <!-- TODO: De-duplicate the editfield and submit button -->
  <div v-if="parentNID">
    <EditField @input="setCommentText" :key="messagesSent" />

    <b-button
      class="mt-2"
      type="submit"
      variant="primary"
      @click="sendMessage"
      :disabled="isSending || !commentText"
    >
      {{ $t('activity-feed:send') }}
      <b-spinner v-if="isSending" small></b-spinner>
    </b-button>
    <b-button class="mt-2 ml-2" variant="secondary" @click="$emit('cancel')">
      {{ $t('activity-feed:cancel') }}
    </b-button>
  </div>
  <div class="page-content card" v-else>
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

    usernames = [];

    messagesSent = 0;

    async fetchData() {
      const res = await axios.get(
        `/get/?type=usernames&size=10${this.targetName ? `&search=${this.targetName}` : ''}`,
      );
      this.usernames = res.data.data.usernames;
    }

    created() {
      this.fetchData = debounce(this.fetchData, 200);
    }

    @Watch('targetName', { immediate: true, deep: true })
    getUserNames() {
      this.fetchData();
    }

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

    async postMessage(targetUid: string, message: string) {
      const params = {
        type: 'message',
        action: 'add',
        notification_type: 'message',
        target_uid: targetUid,
        body: message,
      };

      // @ts-ignore
      if (this.parentNID) params.parent_nid = this.parentNID;

      await axios.post('/post/?type=message', new URLSearchParams(params));
    }

    async sendMessage() {
      this.isSending = true;
      try {
        const targetUid: string = this.uid || (await this.lookupUid(this.targetName));
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

      const { usernames } = (
        await axios.get('/get/?type=usernames&filter=exact', {
          params: {
            size: 1,
            search: username,
          },
        })
      ).data.data;

      if (!usernames || usernames.length === 0) {
        throw new Error(`Could not find username: ${username}`);
      }

      const { uid } = usernames[0];
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
