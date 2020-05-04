<template>
  <div>
    <p style="font-weight:bold">{{ $t('edit-profile:change-password') }}</p>
    <input
      style="color:#fff"
      type="text"
      :placeholder="$t('edit-profile:new-password')"
      v-model="password"
      @change="sendPassword()"
    />
    <input
      style="color:#fff"
      type="text"
      :placeholder="$t('edit-profile:confirm-password')"
      v-model="passwordConfirm"
      @change="sendPassword()"
    />
    <p v-show="!passwordsMatch">Please make sure passwords match!</p>

    <p style="font-weight:bold;margin-top:10px">{{ $t('edit-profile:email-address') }}</p>
    <input type="email" style="color:#fff" placeholder="me@here.com" />
    <p style="margin-top:13px">{{ $t('edit-profile:email-details') }}</p>
    <p style="font-weight:bold;margin-top:10px">{{ $t('edit-profile:email-notifications') }}</p>
    <b-form-checkbox v-model="messagesNotify" @change="sendMessages()">
      <b>{{ $t('edit-profile:email-private-messages') }}</b>
    </b-form-checkbox>
    <b-form-checkbox style="margin-top:15px" v-model="newsNotify" @change="sendNews()">
      <b>{{ $t('edit-profile:email-news-posts') }}</b>
    </b-form-checkbox>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import EditField from '@/components/Common/EditField.vue';
  // @ts-ignore
  import get from 'lodash.get';

  @Component({
    components: { EditField },
  })
  export default class PlayerEditCredentials extends Vue {
    get user() {
      return {
        ...this.$vxm.user.userDetails,
        'News mail notification': '',
        'Mail notification': '',
      };
    }

    private addingSection: boolean = false;

    private password: string = '';

    private passwordConfirm: string = '';

    private newsNotify: boolean = Boolean(this.user['News mail notification']);

    private messagesNotify: boolean = Boolean(this.user['Mail notification']);

    get passwordsMatch() {
      return this.passwordConfirm === this.password;
    }

    sendPassword() {
      if (this.passwordsMatch) this.$emit('set-password', this.password);
    }

    sendNews() {
      this.$emit('set-news', this.newsNotify);
    }

    sendMessages() {
      this.$emit('set-messages', this.messagesNotify);
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';

  input {
    background-color: #0a223c;
    border: 0px;
    width: 90%;
    padding: 10px;
    margin-right: 5px;
    margin-top: 5px;
  }
</style>
