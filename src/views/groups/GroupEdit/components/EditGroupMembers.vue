<template>
<div>
    <div class="container">
      <h4 class="mt-3 mr-3">{{ $t('edit-group:add-members') }}</h4>
      <div class="d-flex">
        <vue-bootstrap-typeahead
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
                alt=""
                class="rounded-circle"
                :src="`/${data.userpicture}`"
                style="width: 40px; height: 40px;margin-right:10px"
              />

              <span v-dompurify-html="htmlText" style="color: white"></span>
            </div>
          </template>
        </vue-bootstrap-typeahead>
        <div>
            <b-button
                class="btn-lg mt-1 ml-2"
                type="submit"
                variant="primary"
                @click="inviteMember"
                :disabled="isSending || !targetName.length"
            >
                {{ $t('activity-feed:send') }}
                <b-spinner v-if="isSending" small></b-spinner>
            </b-button>
        </div>
      </div>
  </div>
    <div class="container">
      <h4 class="mt-3 mr-3">{{ $t('edit-group:add-admins') }}</h4>
      <div class="d-flex">
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
                alt=""
                class="rounded-circle"
                :src="`/${data.userpicture}`"
                style="width: 40px; height: 40px;margin-right:10px"
              />

              <span v-dompurify-html="htmlText" style="color: white"></span>
            </div>
          </template>
        </vue-bootstrap-typeahead>
        <div>
            <b-button
                class="btn-lg mt-1 ml-2"
                type="submit"
                variant="primary"
                @click="inviteAdmin"
                :disabled="isSendingAdmin || !targetName.length"
            >
                {{ $t('activity-feed:send') }}
                <b-spinner v-if="isSendingAdmin" small></b-spinner>
            </b-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import axios from 'axios';
  // @ts-ignore
  import debounce from 'lodash.debounce';
  import { Component, Vue, Prop, Watch, Ref } from 'vue-property-decorator';
  import VueBootstrapTypeahead from 'vue-bootstrap-typeahead';
  import EditField from '@/components/Common/EditField.vue';
  // @ts-ignore

  @Component({ components: { EditField, VueBootstrapTypeahead } })
  export default class EditGroupMembers extends Vue {
    @Prop() readonly parentNID?: number;

    @Prop() readonly uid?: number;

    targetName = '';

    isSending: boolean = false;

    isSendingAdmin: boolean = false;

    usernames = [];

    messagesSent = 0;

    fetchData: () => Promise<void> | undefined = async () => {};

    async doFetchData() {
      const res = await axios.get(
        `/get/?type=usernames&size=10${this.targetName ? `&search=${this.targetName}` : ''}`,
      );
      this.usernames = res.data.data.usernames;
    }

    created() {
      this.fetchData = debounce(this.doFetchData, 200);
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

    async postMemberInvite() {
      const params = {
        type: 'invite_member',
        group_nid: (this.parentNID? this.parentNID : 'null').toString(),
        action: 'add',
        target_names: this.targetName,
        body: `I'd like to invite you to our group.<br></br>Please come to <a transition='page' style='font-weight:bolder;font-size:13px;' href='/groups/${  (this.parentNID? this.parentNID : 'null').toString()  }/'>visit us.</a>`
      };

      await axios.post('/post/', new URLSearchParams(params));
    }

    async postAdminInvite() {
      const params = {
        type: 'add_admin',
        group_nid: (this.parentNID? this.parentNID : 'null').toString(),
        action: 'add',
        target_names: this.targetName,
        body: `You are now an administrator of <a transition='page' style='font-weight:bolder;font-size:13px;' href='/groups/${  (this.parentNID? this.parentNID : 'null').toString()  }/'>this group.</a>`
      };

      await axios.post('/post/', new URLSearchParams(params));
    }

    async inviteMember() {
      this.isSending = true;
      try {
        await this.postMemberInvite();
      } catch (e) {
        // eslint-disable-next-line
        alert(`Error posting message.\n${e}`);
      }
      this.isSending = false;
      this.$emit('submit-message');
      this.messagesSent += 1;
      this.targetName = '';
    }

    async inviteAdmin() {
      this.isSendingAdmin = true;
      try {
        await this.postAdminInvite();
      } catch (e) {
        // eslint-disable-next-line
        alert(`Error posting message.\n${e}`);
      }
      this.isSendingAdmin = false;
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

  :deep(.editor) {
    background-color: rgba(1, 1, 1, 0.53);
  }

  :deep(input) {
    color: $white;
    background-color: rgba(1, 1, 1, 0.53);
  }
</style>
