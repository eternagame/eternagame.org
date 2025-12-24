<template>
  <b-modal
    id="modal-reset-password"
    ref="modal"
    body-class="py-0"
    header-border-variant="primary"
    hide-footer
  >
    <template #modal-title>
      <b>{{ $t('reset-password:title') }}</b>
    </template>
    {{ $t('reset-password:description') }}
    <transition name="fade">
      <b-alert class="mt-3" show variant="danger" v-if="errorMessage">
        {{ errorMessage }}
      </b-alert>
    </transition>
    <b-form @submit.prevent="resetPassword" class="pb-3">
      <b-input placeholder="username or email" v-model="usernameOrEmail" required />
      <Captcha
        :key="attemptNumber"
        @response="captchaResponse = $event"
      />
      <b-button type="submit" variant="primary" class="submit-button" :disabled="loading || captchaResponse === undefined">
        {{ $t('reset-password:main-action') }}
        <b-spinner v-if="loading" small />
      </b-button>
    </b-form>
  </b-modal>
</template>

<script lang="ts">
  import { Component, Vue, Ref } from 'vue-property-decorator';
  import { BModal } from 'bootstrap-vue';
  import Captcha from '../Common/Captcha.vue';

  @Component({
    components: {
      Captcha,
    },
  })
  export default class ResetPasswordModal extends Vue {
    usernameOrEmail = '';

    captchaResponse = undefined;

    loading = false;

    errorMessage = '';

    attemptNumber: number = 0;

    @Ref() readonly modal!: BModal;

    async resetPassword() {
      // $('#loader').modal('show');
      this.errorMessage = '';
      this.loading = true;
      const response = await this.$http.post(
        '/login/',
        new URLSearchParams({
          type: 'sendreset',
          resetID: this.usernameOrEmail,
          captchaResponse: this.captchaResponse ? JSON.stringify(this.captchaResponse) : '',
        }),
        {
          headers: { 'Content-type': 'application/x-www-form-urlencoded' },
        },
      );
      this.loading = false;
      // $('#loader').modal('hide');
      const { data } = response;
      if (data.data.success) {
        this.modal.hide();
        this.$vxm.user.showResetCompleteModal();
      } else {
        this.errorMessage = data.data.error;
        this.attemptNumber += 1;
        this.captchaResponse = undefined;
      }
    }
  }
</script>

<style scoped lang="scss">
  .submit-button {
    margin-top: 22.5px;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.15s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
</style>
