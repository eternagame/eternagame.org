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
    <input type="email" style="color:#fff" v-model="email" @change="sendEmail()" required />
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

    private email: string = '';

    private newsNotify: boolean = false;

    private messagesNotify: boolean = false;

    mounted() {
      this.email = this.user.mail;
      // HACK: Because this is backwards in the checkboxes for some reason...
      this.newsNotify = String(this.user['News mail notification']) !== 'on';
      this.messagesNotify = this.user['Mail notification'] !== 'on';

      this.sendMessages();
      this.sendNews();

      this.newsNotify = !this.newsNotify;
      this.messagesNotify = !this.messagesNotify;

      this.sendEmail();
    }

    get passwordsMatch() {
      return this.passwordConfirm === this.password;
    }

    sendPassword() {
      if (this.passwordsMatch) this.$emit('set-password', this.password);
    }

    sendNews() {
      // Why is this backwards???
      this.$emit('set-news', !this.newsNotify);
    }

    sendMessages() {
      // Why is this backwards???
      this.$emit('set-messages', !this.messagesNotify);
    }

    sendEmail() {
      this.$emit('set-email', this.email);
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
