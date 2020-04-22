<template>
  <div class="login-row">
    <b-form inline class="my-2 my-lg-0" name="loginform" id="loginform" onsubmit="return false">
      <b-form-group>
        <b-btn
          type="submit"
          id="loginButton"
          variant="primary"
          class="button"
          v-b-modal.modal-login
        >
          {{ $t('login-row:main-action') }}
        </b-btn>
        <b-btn variant="secondary" class="button" v-b-modal.modal-register>{{
          $t('login-row:secondary-action')
        }}</b-btn>
      </b-form-group>
    </b-form>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component({
    components: {},
  })
  export default class LoginRow extends Vue {
    private username: string = '';

    private password: string = '';

    async login() {
      if (this.username && this.password) {
        const data = await this.$vxm.user.login({
          username: this.username,
          password: this.password,
        });
        if (data.success) {
          this.$router.push('/labs');
        } else {
          this.$vxm.user.showLoginFailedModal({ errorMessage: data.error });
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .form-group > * > *:not(:first-child) {
    margin-left: 0.5rem;
  }
  .button {
    width: 129px;
    font-size: 1.2rem;
  }
</style>
