<template>
  <div>
    <p style="font-weight:bold">{{ $t('edit-profile:change-password') }}</p>
    <input
      style="color:#fff"
      type="password"
      :placeholder="$t('edit-profile:new-password')"
      v-model="password"
      @change="sendPassword()"
    />
    <input
      style="color:#fff"
      type="password"
      :placeholder="$t('edit-profile:confirm-password')"
      v-model="passwordConfirm"
      @change="sendPassword()"
    />
    <p v-show="!passwordsMatch">Please make sure passwords match!</p>

    <p style="font-weight:bold;margin-top:10px">{{ $t('edit-profile:email-address') }}</p>
    <input type="email" style="color:#fff" v-model="mail" @change="sendEmail()" required />
    <p style="margin-top:13px">{{ $t('edit-profile:email-details') }}</p>
    <p style="font-weight:bold;margin-top:10px">{{ $t('edit-profile:email-notifications') }}</p>
    <b-form-checkbox v-model="messagesNotify" @change="toggleMessages()">
      <b>{{ $t('edit-profile:email-private-messages') }}</b>
    </b-form-checkbox>
    <b-form-checkbox style="margin-top:15px" v-model="newsNotify" @change="toggleNews()">
      <b>{{ $t('edit-profile:email-news-posts') }}</b>
    </b-form-checkbox>
    <p style="font-weight:bold;margin-top:10px">{{ $t('edit-profile:permissions') }}</p>
    <b-form-checkbox style="margin-top:15px" v-model="certificatePublic" @change="toggleCertificate()">
      <b>{{ $t('edit-profile:certificate-public') }}</b>
    </b-form-checkbox>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import EditField from '@/components/Common/EditField.vue';
  import { UserData } from '@/types/common-types';

  @Component({
    components: { EditField },
  })
  export default class PlayerEditCredentials extends Vue {
    get user(): UserData {
      return {
        ...(this.$vxm.user.userDetails as UserData),
      };
    }

    private addingSection: boolean = false;

    private password: string = '';

    private passwordConfirm: string = '';

    private mail: string = '';

    private newsNotify: boolean = false;

    private messagesNotify: boolean = false;

    private certificatePublic: boolean = false;

    mounted() {
      this.mail = this.user.mail;
      this.newsNotify = this.user['News mail notification'] === 'on';
      this.messagesNotify = this.user['Mail notification'] === 'on';
      this.certificatePublic = this.user['Certificate public'] === 'on';
    }

    get passwordsMatch() {
      return this.passwordConfirm === this.password;
    }

    sendPassword() {
      if (this.passwordsMatch) this.$emit('set-password', this.password);
    }

    toggleNews() {
      this.newsNotify = !this.newsNotify;
      this.$emit('set-news', this.newsNotify);
    }

    toggleMessages() {
      this.messagesNotify = !this.messagesNotify;
      this.$emit('set-messages', this.messagesNotify);
    }

    toggleCertificate() {
      this.certificatePublic = !this.certificatePublic;
      this.$emit('set-certificate', this.certificatePublic);
    }

    sendEmail() {
      this.$emit('set-email', this.mail);
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
