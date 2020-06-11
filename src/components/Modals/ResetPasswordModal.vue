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
      <b-button type="submit" variant="primary" class="submit-button">{{
        $t('reset-password:main-action')
      }}</b-button>
    </b-form>
  </b-modal>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Ref } from 'vue-property-decorator';
  import { BModal, BFormInput } from 'bootstrap-vue';
  import VueRecaptcha from 'vue-recaptcha';

  @Component({
    components: {
      VueRecaptcha,
    },
  })
  export default class ResetPasswordModal extends Vue {
    usernameOrEmail = '';

    errorMessage = '';

    @Ref() readonly modal!: BModal;

    async resetPassword() {
      // $('#loader').modal('show');
      this.errorMessage = '';
      const response = await this.$http.post(
        '/login/',
        new URLSearchParams({
          resetID: this.usernameOrEmail,
          type: 'sendreset',
        }),
        {
          headers: { 'Content-type': 'application/x-www-form-urlencoded' },
        },
      );
      // $('#loader').modal('hide');
      const { data } = response;
      if (data.data.success) {
        this.modal.hide();
        this.$vxm.user.showResetCompleteModal();
      } else {
        this.errorMessage = data.data.error;
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
