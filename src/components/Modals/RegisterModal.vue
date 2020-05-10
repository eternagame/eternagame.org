<template>
  <b-modal
    id="modal-register"
    ref="modal"
    body-class="py-0"
    header-border-variant="primary"
    hide-footer
  >
    <template #modal-title>
      <b>{{ $t('register-modal:new-accont-text') }}</b>
    </template>
    {{ $t('register-modal:new-accont-explanation') }}
    <transition name="fade">
      <b-alert class="mt-3" show variant="danger" v-if="errorMessage">
        {{ $t(errorMessage) }}
      </b-alert>
    </transition>
    <b-form @submit.prevent="tryRegister" class="pb-3">
      <b-input placeholder="username" v-model="form.username" required />
      <b-input type="email" placeholder="email" v-model="form.email" required />
      <b-input type="password" placeholder="password" v-model="form.password" required />
      <b-input
        type="password"
        placeholder="re-enter password"
        v-model="form.rePassword"
        required
        ref="rePassword"
      />
      <vue-recaptcha
        :key="captchaResponse"
        ref="recaptcha"
        sitekey="6LcFwUsUAAAAAOQ9szhauSNv2bJuBOUtw_pGrRnd"
        :loadRecaptchaScript="true"
        @verify="captchaResponse = $event"
      />
      <b-button type="submit" variant="primary" class="submit-button" :disabled="submitted">{{
        $t('register-modal:main-action')
      }}</b-button>
      <div class="d-flex">
        <b-checkbox v-model="accepted">
          {{ $t('register-modal:disclaimer-accept') }}
        </b-checkbox>
        <b-link size="sm" to="/about/terms" @click="$bvModal.hide('modal-register')">{{
          $t('register-modal:disclaimer')
        }}</b-link>
      </div>
      <v-facebook-login :app-id="fbID" @login="fbLogIn()"></v-facebook-login>
    </b-form>
  </b-modal>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { BModal, BFormInput } from 'bootstrap-vue';
  import axios from 'axios';
  import VueRecaptcha from 'vue-recaptcha';
  // @ts-ignore
  import VFacebookLogin from 'vue-facebook-login-component';

  const FB_LOGIN_ROUTE = '/login/?type=login&method=facebook';

  @Component({
    components: {
      VueRecaptcha,
      VFacebookLogin,
    },
  })
  export default class RegisterModal extends Vue {
    form = {
      username: '',
      email: '',
      password: '',
      rePassword: '',
    };

    private fbID = process.env.VUE_APP_FACEBOOK_API_ID;

    private submitted = false;

    private accepted: boolean = false;

    captchaResponse = '';

    errorMessage = '';

    $refs!: {
      modal: BModal;
      rePassword: BFormInput;
    };

    fbLogIn() {
      axios.post(FB_LOGIN_ROUTE).then(res => {
        this.$bvModal.hide('modal-login');
        this.$router.push('/');
      });
    }

    mounted() {
      console.log(this.$refs.recaptcha);
    }

    async tryRegister(event: Event) {
      this.errorMessage = '';
      if (!this.accepted) {
        this.errorMessage = 'register-modal:error-accept-terms';
        this.$refs.recaptcha.reset();
        return;
      }
      if (this.form.password !== this.form.rePassword) {
        (this.$refs.rePassword.$el as HTMLInputElement).setCustomValidity('Password Must Match.');
        this.errorMessage = 'register-modal:error-password-match';
        this.$refs.recaptcha.reset();
        return;
      }
      this.submitted = true;
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
          captcha_response: this.captchaResponse,
        }),
        {
          headers: { 'Content-type': 'application/x-www-form-urlencoded' },
        },
      );
      const { data } = response;
      if (data.data.success) {
        await this.login();
      } else {
        this.errorMessage = data.data.error;
        this.submitted = false;
      }
    }

    async login() {
      if (this.form.username && this.form.password) {
        const data = await this.$vxm.user.login({
          username: this.form.username,
          password: this.form.password,
        });
        if (data.success) {
          this.$refs.modal.hide();
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
