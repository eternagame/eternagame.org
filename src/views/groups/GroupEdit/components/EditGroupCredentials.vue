<template>
  <div>
    <p style="font-weight:bold">{{ $t('edit-group:privacy') }}</p>
      <b-form-checkbox style="margin-top:15px" :checked="publicCertificate" @change="toggleCertificate">
      <b>{{ $t('edit-group:private') }}</b>
    </b-form-checkbox>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import EditField from '@/components/Common/EditField.vue';

  @Component({
    components: { EditField },
  })
  export default class GroupEditCredentials extends Vue {
    private password: string = '';

    private passwordConfirm: string = '';

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
