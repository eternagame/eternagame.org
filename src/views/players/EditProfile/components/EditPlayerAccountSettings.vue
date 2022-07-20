<template>
  <div>
    <h4 style="font-weight:bold">{{ $t('edit-profile:account-settings') }}</h4>
    <p style="font-weight:bold">{{ $t('edit-profile:change-password') }}</p>
    <input
      style="color:#fff"
      type="password"
      :placeholder="$t('edit-profile:new-password')"
      :aria-label="$t('edit-profile:new-password')"
      v-model="password"
      @input="sendPassword"
    />
    <input
      style="color:#fff"
      type="password"
      :placeholder="$t('edit-profile:confirm-password')"
      :aria-label="$t('edit-profile:confirm-password')"
      v-model="passwordConfirm"
      @input="sendPassword"
    />
    <p v-show="!passwordsMatch">Please make sure your password and confirmation match!</p>

    <p style="font-weight:bold;margin-top:10px">{{ $t('edit-profile:email-address') }}</p>
    <input type="email" aria-label="email" style="color:#fff" :value="email" @input="sendEmail" required />
    <p style="margin-top:13px">{{ $t('edit-profile:email-details') }}</p>
    <p style="font-weight:bold;margin-top:10px">{{ $t('edit-profile:email-notifications') }}</p>
    <b-form-checkbox :checked="messagesNotify" @change="toggleMessages">
      <b>{{ $t('edit-profile:email-private-messages') }}</b>
    </b-form-checkbox>
    <b-form-checkbox style="margin-top:15px" :checked="newsNotify" @change="toggleNews">
      <b>{{ $t('edit-profile:email-news-posts') }}</b>
    </b-form-checkbox>
    <p style="font-weight:bold;margin-top:10px">{{ $t('edit-profile:permissions') }}</p>
    <b-form-checkbox style="margin-top:15px" :checked="publicCertificate" @change="toggleCertificate">
      <b>{{ $t('edit-profile:certificate-public') }}</b>
    </b-form-checkbox>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import EditField from '@/components/Common/EditField.vue';

  @Component({
    components: { EditField },
  })
  export default class EditPlayerAccountSettings extends Vue {
    private password: string = '';

    private passwordConfirm: string = '';

    @Prop({ required: true }) private email!: string;

    @Prop({ required: true }) private messagesNotify!: boolean;

    @Prop({ required: true }) private newsNotify!: boolean;

    @Prop({ required: true }) private publicCertificate!: boolean;

    get passwordsMatch() {
      return this.passwordConfirm === this.password;
    }

    sendPassword() {
      if (this.passwordsMatch) this.$emit('update:password', this.password);
    }

    sendEmail(e: InputEvent) {
      this.$emit('update:email', (e.target as HTMLInputElement).value);
    }

    toggleNews(checked: boolean) {
      this.$emit('update:newsNotify', checked);
    }

    toggleMessages(checked: InputEvent) {
      this.$emit('update:messagesNotify', checked);
    }

    toggleCertificate(checked: InputEvent) {
      this.$emit('update:publicCertificate', checked);
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
