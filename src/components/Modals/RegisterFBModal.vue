<template>
  <b-modal
    id="modal-register-fb"
    ref="modal"
    body-class="py-0"
    header-border-variant="primary"
    hide-footer
  >
    <template #modal-title>
      <b class="text-uppercase">{{ $t('register-modal-fb:title') }}</b>
    </template>
    {{ $t('register-modal-fb:register-explanation') }}
    <transition name="fade">
      <b-alert class="mt-3" show variant="danger" v-if="errorMessage">
        {{ $t(errorMessage) }}
      </b-alert>
    </transition>
    <b-form @submit.prevent="tryRegister" class="pb-3">
      <div class="custom-input-group">
        <b-input :placeholder="$t('register-modal:username')" v-model="form.username" required />
        <span class="input-group-append">
          <img src="@/assets/front-page/img/user.svg" alt="user" />
        </span>
      </div>
      <b-input
        type="email"
        :placeholder="$t('register-modal:email')"
        v-model="form.email"
        required
      />
      <div class="custom-input-group">
        <b-input
          type="password"
          :placeholder="$t('register-modal:password')"
          v-model="form.password"
          required
        />
        <span class="input-group-append">
          <img src="@/assets/front-page/img/lock.svg" alt="lock" />
        </span>
      </div>

      <div class="custom-input-group">
        <b-input
          type="password"
          :placeholder="$t('register-modal:re-enter-password')"
          v-model="form.rePassword"
          required
          ref="rePassword"
          :state="form.password === form.rePassword"
        />
        <span class="input-group-append">
          <img src="@/assets/front-page/img/lock.svg" alt="lock" />
        </span>
      </div>

      <vue-recaptcha
        :key="attemptNumber"
        ref="recaptcha"
        sitekey="6LcFwUsUAAAAAOQ9szhauSNv2bJuBOUtw_pGrRnd"
        recaptchaHost="www.recaptcha.net"
        :loadRecaptchaScript="true"
        @verify="captchaResponse = $event"
      />
      <div class="d-flex mt-2">
        <b-checkbox class="mr-1" v-model="accepted">
          {{ $t('register-modal:disclaimer-accept') }}
        </b-checkbox>
        <b-link size="sm" to="/terms" @click="modal.hide()">{{
          $t('register-modal:disclaimer')
        }}</b-link>
      </div>
      <b-button
        type="submit"
        variant="primary"
        class="submit-button mt-2 mb-5"
        :disabled="loading"
      >
        {{ $t('register-modal:main-action') }}
        <b-spinner v-if="loading" small />
      </b-button>
    </b-form>
  </b-modal>
</template>

<script lang="ts">
  import { Component, Vue, Ref } from 'vue-property-decorator';
  import { BModal, BFormInput } from 'bootstrap-vue';
  import VueRecaptcha from 'vue-recaptcha';

  const INITIAL_FORM = {
    username: '',
    email: '',
    password: '',
    rePassword: '',
  };

  @Component({
    components: {
      VueRecaptcha,
    },
  })
  export default class RegisterFBModal extends Vue {
    form = INITIAL_FORM;

    loading = false;

    accepted: boolean = false;

    captchaResponse = '';

    errorMessage = '';

    attemptNumber: number = 0;

    @Ref() readonly modal!: BModal;

    @Ref() readonly rePassword!: BFormInput;

    async tryRegister() {
      this.errorMessage = '';
      if (!this.accepted) {
        this.errorMessage = 'register-modal:error-accept-terms';
        return;
      }
      if (this.form.password !== this.form.rePassword) {
        this.errorMessage = 'register-modal:error-password-match';
        return;
      }

      this.loading = true;
      await this.register();
    }

    async register() {
      // $('#loader').modal('show');
      const response = await this.$http.post(
        '/login/',
        new URLSearchParams({
          name: this.form.username,
          pass: this.form.password,
          mail: this.form.email,
          type: 'create',
          method: 'facebook',
          captcha_response: this.captchaResponse,
        }),
        {
          headers: { 'Content-type': 'application/x-www-form-urlencoded' },
        },
      );
      const { data } = response;
      if (data.data.success) {
        this.form = INITIAL_FORM;
        await this.login();
      } else {
        this.errorMessage = data.data.error;
        this.attemptNumber += 1;
        this.loading = false;
      }
    }

    async login() {
      if (this.form.username && this.form.password) {
        const data = await this.$vxm.user.login({
          username: this.form.username,
          password: this.form.password,
        });
        if (data.success) {
          this.loading = false;
          this.modal.hide();
        } else {
          this.errorMessage = data.data.error;
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  /* Following styles are copied from LoginModal */
  .custom-input-group {
    position: relative;
  }

  .custom-input-group {
    span {
      position: absolute;
      top: 9.375px;
      right: 11.25px;
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.15s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
  :deep(.modal-header) {
    -webkit-backdrop-filter: blur(28.125px);
    backdrop-filter: blur(28.125px);
    background-color: #4a90e2;
    padding: 8.4375px;
    .modal-title {
      font-size: 15px;
      font-weight: bold;
      line-height: 1.38;
      margin: 0 auto;
      padding-left: 28.125px;
    }
    .close {
      opacity: 0.5;
      color: var(--white);
      margin-left: 0;
      &:focus {
        outline: none;
      }
      &:hover {
        opacity: 0.5;
      }
    }
  }

  :deep(.modal-dialog) {
    max-width: 400px;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;

    .modal-body {
      padding: 0 32.8125px;
      margin-top: 22.5px;

      .login_modal_content {
        display: flex;
        flex-direction: column;
        margin-bottom: 12.1875px;

        .form-control {
          width: 100%;
          height: 40.3125px;
          margin: 0 auto 13.125px;
          border-radius: 4.6875px;
          opacity: 0.5;
          border: solid 1.0005px var(--white);
          background-color: #000000;
        }

        .custom-input-group {
          position: relative;
        }

        .custom-input-group {
          span {
            position: absolute;
            top: 9.375px;
            right: 11.25px;
          }

          .lock {
            right: 15.9375px;
          }
        }

        .submit-button {
          width: 173.4375px;
          height: 40.3125px;
          margin: 0 auto 15.9375px;
          font-size: 16.875px;
          font-weight: bold;
          line-height: 1.33;
        }

        p {
          font-size: 11.25px;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
</style>
