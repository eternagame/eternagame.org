<template>
  <b-modal
    modal-class="login_modal"
    id="modal-login"
    ref="modal"
    body-class="py-0"
    header-border-variant="primary"
    hide-footer
    @shown="onShown"
  >
    <template #modal-title>
      <b class="text-uppercase">{{ $t('login-row:main-action') }}</b>
    </template>
    <transition name="fade">
      <b-alert class="mt-3" show variant="danger" v-if="errorMessage">
        {{ errorMessage }}
      </b-alert>
    </transition>
    <b-form @submit.prevent="login" class="login_modal_content">
      <div class="custom-input-group">
        <b-input :placeholder="$t('login-modal:username')" v-model="form.username" required />
        <span class="input-group-append">
          <img src="@/assets/front-page/img/user.svg" />
        </span>
      </div>
      <div class="custom-input-group">
        <b-input
          type="password"
          :placeholder="$t('login-modal:password')"
          v-model="form.password"
          required
        />
        <span class="input-group-append">
          <img src="@/assets/front-page/img/lock.svg" />
        </span>
      </div>

      <p
        class="mt-0"
        v-b-modal.modal-reset-password
        style="text-align:end; text-decoration:underline;margin-top:"
      >
        {{ $t('login-sub:main-action') }}
      </p>
      <b-button type="submit" variant="primary" class="submit-button text-uppercase" :disabled="loading">
        {{ $t('login-modal:main-action') }}
        <b-spinner v-if="loading" small />
      </b-button>

      <p style="text-align:center">
        {{ $t('login-modal:register-pre-text') }}
        <span
          style="text-decoration:underline"
          @click="modal.hide()"
          v-b-modal.modal-register
        >
          {{ $t('login-modal:register-action') }}
        </span>
      </p>
      <FacebookAuthentication @fb-verify="registerWithFacebook" class="btn"></FacebookAuthentication>
    </b-form>
  </b-modal>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Ref } from 'vue-property-decorator';
  import { BModal, BFormInput } from 'bootstrap-vue';
  import VueRecaptcha from 'vue-recaptcha';
  import FacebookAuthentication from './components/FacebookAuthentication.vue';

  @Component({
    components: {
      VueRecaptcha,
      FacebookAuthentication,
    },
  })
  export default class LoginModal extends Vue {
    @Ref() readonly modal!: BModal;

    @Ref() readonly rePassword!: BFormInput;

    form = {
      username: '',
      password: '',
    };

    errorMessage = '';

    FB = null;

    loading = false;

    private fbID = process.env.VUE_APP_FACEBOOK_API_ID;

    registerWithFacebook(data: { success: boolean; error: string }) {
      this.form.password = '';
      if (data.success) {
        this.modal.hide();
        this.$router.push('/');
      } else {
        this.errorMessage = data.error;
      }
    }

    async login() {
      if (this.form.username && this.form.password) {
        this.loading = true;
        const data = await this.$vxm.user.login({
          username: this.form.username,
          password: this.form.password,
        });
        this.loading = false;
        if (data.success) {
          this.form.username = '';
          this.modal.hide();
          this.$router.push('/');
        } else {
          this.errorMessage = data.error;
        }
      }
    }

    onShown() {
      this.errorMessage = '';
      this.form.username = '';
      this.form.password = '';
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

  p {
    font-size: 11.25px;
    cursor: pointer;

    &:focus {
      outline: none;
    }
  }

  ::v-deep .modal-header {
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

  ::v-deep .modal-dialog {
    max-width: 375px;
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
  FacebookAuthentication {
    
  }
</style>
