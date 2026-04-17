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
    <password v-model="password" :strength-meter-only="true" @score=setScore @feedback=setFeedback />
    <input
      style="color:#fff"
      type="password"
      :placeholder="$t('edit-profile:confirm-password')"
      :aria-label="$t('edit-profile:confirm-password')"
      v-model="passwordConfirm"
      @input="sendPassword"
    />
    <p v-show="!passwordsMatch">Please make sure your password and confirmation match!</p>
    <p v-show="!passwordStrong">Please choose a stronger password!</p>

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
    password: string = '';

    passwordConfirm: string = '';

    score: number = 0;

    suggestions: string = '';

    warning: string = '';

    @Prop({ required: true }) email!: string;

    @Prop({ required: true }) messagesNotify!: boolean;

    @Prop({ required: true }) newsNotify!: boolean;

    @Prop({ required: true }) publicCertificate!: boolean;

    async setScore(score: number) {
      this.score = score;
    }

    async setFeedback({suggestions, warning}: {suggestions: string, warning: string}) {
      this.suggestions = suggestions;
      this.warning = warning;
    }

    get passwordStrong() {
      return this.score >= 3.0;
    }

    get passwordsMatch() {
      return this.passwordConfirm === this.password;
    }

    sendPassword() {
      if (this.passwordsMatch && this.passwordStrong) this.$emit('update:password', this.password);
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
