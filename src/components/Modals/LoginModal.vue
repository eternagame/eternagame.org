<template>
  <b-modal
    id="modal-login"
    ref="modal"
    body-class="py-0"
    header-border-variant="primary"
    hide-footer
  >
    <template #modal-title>
      <b>{{ $t('login-row:main-action') }}</b>
    </template>
    <transition name="fade">
      <b-alert class="mt-3" show variant="danger" v-if="errorMessage">
        {{ errorMessage }}
      </b-alert>
    </transition>
    <b-form @submit.prevent="login" class="pb-3">
      <b-input placeholder="username" v-model="form.username" required />
      <b-input type="password" placeholder="password" v-model="form.password" required />

      <b-button type="submit" variant="primary" class="submit-button">{{
        $t('login-modal:main-action')
      }}</b-button>
      <b-btn
        class="forgot-password mt-0"
        variant="secondary"
        size="sm"
        @click="$bvModal.hide('modal-login')"
        v-b-modal.modal-reset-password
      >
        {{ $t('login-sub:main-action') }}
      </b-btn>
      <b-btn
        class="forgot-password mt-0"
        variant="secondary"
        size="sm"
        @click="$bvModal.hide('modal-login')"
        v-b-modal.modal-register
      >
        {{ $t('login-modal:register-action') }}
      </b-btn>
    </b-form>
  </b-modal>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { BModal, BFormInput } from 'bootstrap-vue';
  import VueRecaptcha from 'vue-recaptcha';

  @Component({
    components: {
      VueRecaptcha,
    },
  })
  export default class RegisterModal extends Vue {
    form = {
      username: '',
      password: '',
    };

    errorMessage = '';

    $refs!: {
      modal: BModal;
      rePassword: BFormInput;
    };

    async login() {
      if (this.form.username && this.form.password) {
        const data = await this.$vxm.user.login({
          username: this.form.username,
          password: this.form.password,
        });
        if (data.success) {
          this.$router.push('/');
        } else {
          this.$vxm.user.showLoginFailedModal({ errorMessage: data.error });
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .submit-button {
    margin-top: 1.5rem;
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
